import { reactive } from "vue";
import { Recorder } from "./recorder-core";

let recorderObj = {
  data: {
    socket: null,
    socket_url: "wss://io.wasee.com:10096/", //设置wss asr online接口地址 如 wss://111.205.137.58:5821/wss/
    way: "mic", //选择录音模式 mic file
    file_ext: "", //文件格式
    sampleRate: 16000, //采样率
    bitRate: 8, //比特率
    mode: "2pass", //asr模型模式: 2pass online offline
    itn: false, //逆文本标准化(ITN) false true
    hotWords: '{"阿里巴巴":20,"hello world":40}', //热词
    rec: null, //录音对象
    sampleBuf: new Int16Array(),
    sendBuf: null,
    stream: null,
  },
  vueData: reactive({
    tips: "",
    socket_status: 0,
    isRec: false, //是否在录音
    online_text: "", //用于在线记录asr结果
    offline_text: "", //用于脱机记录asr结果
  }),
  // 连接
  connect: async function () {
    console.log("连接");
    if (!recorderObj.data.rec) {
      recorderObj.data.rec = new Recorder({
        type: "pcm",
        bitRate: 16,
        sampleRate: 16000,
        onProcess: recorderObj.record_process,
      });
    }
    recorderObj.vueData.tips = "正在连接asr服务器，请等待...";
    console.log("正在连接asr服务器，请等待...");
    recorderObj.vueData.online_text = "";
    recorderObj.vueData.offline_text = "";
    await recorderObj.socket_init().catch((rej) => {
      recorderObj.vueData.tips = rej;
      console.log("rej");
    });
    recorderObj.vueData.isRec = true;
  },
  // 录音开始
  record_start: async function () {
    console.log("开始");
    // recorderObj.data.rec.open(function () {
    //   recorderObj.data.rec.start();
    //   recorderObj.vueData.tips = "开始录音";
    //   console.log("开始录音");
    // });
    //启用麦克风
    let mikeData = await recorderObj.enableMike();
    console.log(mikeData);
    // recorderObj.vueData.tips = "开始录音";
    // //处理音频
    // recorderObj.do_audio(mikeData.data, function () {
    //   console.log(mikeData.data);
    //   recorderObj.socket_send(mikeData.data);
    // });
  },
  // 录音停止
  record_stop: function () {
    let sendParams = {
      chunk_size: new Array(5, 10, 5),
      wav_name: "h5",
      is_speaking: false,
      chunk_interval: 10,
      mode: recorderObj.data.mode,
    };

    if (recorderObj.data.sampleBuf.length > 0) {
      recorderObj.socket_send(recorderObj.data.sampleBuf);
      recorderObj.data.sampleBuf = new Int16Array();
    }
    console.log("停止", sendParams);
    recorderObj.socket_send(JSON.stringify(sendParams));

    recorderObj.vueData.isRec = false;
    recorderObj.vueData.tips = "发送完数据,请等候,正在识别...";
    console.log("发送完数据,请等候,正在识别...");

    if (recorderObj.data.way == "mic") {
      //wait 3s for asr result
      setTimeout(function () {
        recorderObj.socket_stop();
        recorderObj.vueData.tips = "等待3s关闭连接，需要重新连接";
        console.log("等待3s关闭连接，需要重新连接");
      }, 3000);

      // recorderObj.data.rec.stop(
      //   function (blob, duration) {
      //     console.log(blob, duration);
      //     //pcm直接转码成wav
      //     //   let data={ sampleRate: 16000, bitRate: 16, blob: blob };
      //     //   Recorder.pcm2wav(
      //     //     data,
      //     //     function (theblob, duration) {
      //     //       console.log(theblob);
      //     //       let audio_record = document.getElementById("audio_record");
      //     //       audio_record.src = (window.URL || webkitURL).createObjectURL(theblob);
      //     //       audio_record.controls = true;
      //     //       //audio_record.play();
      //     //     },
      //     //     function (msg) {
      //     //       console.log(msg);
      //     //     }
      //     //   );
      //   },
      //   function (errMsg) {
      //     console.log("errMsg: " + errMsg);
      //   }
      // );
    }
  },
  //录音中
  record_process: function (
    buffer,
    powerLevel,
    bufferDuration,
    bufferSampleRate,
    newBufferIdx,
    asyncEnd
  ) {
    if (recorderObj.vueData.isRec) {
      let data_48k = buffer[buffer.length - 1];
      let array_48k = new Array(data_48k);
      let data_16k = Recorder.SampleData(
        array_48k,
        bufferSampleRate,
        16000
      ).data;

      recorderObj.data.sampleBuf = Int16Array.from([
        ...recorderObj.data.sampleBuf,
        ...data_16k,
      ]);
      let chunk_size = 960; // for asr chunk_size [5, 10, 5]
      recorderObj.vueData.tips = "" + bufferDuration / 1000 + "s";
      while (recorderObj.data.sampleBuf.length >= chunk_size) {
        recorderObj.data.sendBuf = recorderObj.data.sampleBuf.slice(
          0,
          chunk_size
        );
        recorderObj.data.sampleBuf = recorderObj.data.sampleBuf.slice(
          chunk_size,
          recorderObj.data.sampleBuf.length
        );
        console.log("----record_process----", recorderObj.data.sendBuf);
        recorderObj.socket_send(recorderObj.data.sendBuf);
      }
    }
  },
  //socket初始
  socket_init: function () {
    let _this = recorderObj;
    return new Promise(function (resolve, reject) {
      if (!_this.data.socket_url.match(/wss:\S*|ws:\S*/)) {
        console.log("请检查wss地址正确性");
        reject("请检查wss地址正确性");
      } else {
        if ("WebSocket" in window) {
          _this.data.socket = new WebSocket(_this.data.socket_url);
          _this.data.socket.onopen = function (e) {
            console.log("socket 连接成功", e);
            //   _this.socket_stateHandle(0);
            _this.socket_openHandle(e);
            resolve(e);
          };
          _this.data.socket.onmessage = function (e) {
            console.log("socket 消息", e);
            _this.socket_msgHandle(e);
          };
          _this.data.socket.onclose = function (e) {
            console.log("socket 关闭", e);
            //_this.data.socket.close();
            _this.socket_stateHandle(1);
          };
          _this.data.socket.onerror = function (e) {
            console.log("socket 错误", e);
            _this.socket_stateHandle(2);
          };
        } else {
          console.log("当前浏览器不支持 WebSocket");
          reject("当前浏览器不支持 WebSocket");
        }
      }
    });
  },
  // 发送信息
  socket_send: function (params) {
    // let sendParams = {
    //   chunk_size: new Array(5, 10, 5),
    //   wav_name: "h5",
    //   is_speaking: true,
    //   chunk_interval: 10,
    //   mode: "2pass", //asr模型模式: 2pass online offline
    //   itn: false, //逆文本标准化(ITN)
    //   wav_format: "PCM", //文件格式 PCM wav
    //   audio_fs: 16000, //wav文件采样率
    //   hotwords: "", //热词
    //   audio_fs: "", //采样率
    // };

    if (
      recorderObj.data.socket &&
      recorderObj.data.socket.readyState === 1 &&
      params
    ) {
      recorderObj.data.socket.send(params);
      console.log(
        "----发送信息----",
        recorderObj.data.socket.readyState,
        params
      );
    }
  },
  // 停止
  socket_stop: function () {
    if (recorderObj.data.socket) {
      recorderObj.data.socket.close();
    }
  },
  socket_openHandle: function (params) {
    let _this = recorderObj;
    let sendParams = {
      chunk_size: new Array(5, 10, 5),
      wav_name: "h5",
      is_speaking: true,
      chunk_interval: 10,
      itn: _this.data.itn,
      mode: _this.data.mode,
    };
    //文件模式
    if (_this.data.way == "file") {
      sendParams.wav_format = _this.data.file_ext;
      if (_this.data.file_ext == "wav") {
        sendParams.wav_format = "PCM";
        sendParams.audio_fs = _this.data.sampleRate;
      }
    }
    //热词
    if (_this.data.hotWords) {
      sendParams.hotwords = _this.data.hotWords;
    }
    console.log("open打开", sendParams);
    _this.data.socket.send(JSON.stringify(sendParams));

    _this.socket_stateHandle(0);
  },
  socket_stateHandle: function (state) {
    recorderObj.vueData.socket_status = state;
    if (state === 0) {
      //on open
      recorderObj.vueData.tips = "连接成功!请点击开始";
      console.log("连接成功!请点击开始");
      if (recorderObj.data.way == "file") {
        recorderObj.vueData.tips = "请耐心等待,大文件等待时间更长";
        console.log("请耐心等待,大文件等待时间更长");
        // start_file_send();
      } else {
        // recorderObj.start();
      }
    } else if (state === 1) {
      //recorderObj.record_stop();
    } else if (state === 2) {
      recorderObj.record_stop();
      recorderObj.vueData.tips = "连接失败,请检查asr地址和端口。再连接。";
      console.log("连接失败,请检查asr地址和端口。再连接");
    }
  },
  socket_msgHandle: function (params) {
    console.log("message: ", params);
    let jsonMsg = JSON.parse(params.data);
    let recTxt = "" + jsonMsg["text"];
    let asrModel = jsonMsg["mode"];
    let is_final = jsonMsg["is_final"];
    let timestamp = jsonMsg["timestamp"];
    if (asrModel == "2pass-offline" || asrModel == "offline") {
      recorderObj.vueData.offline_text =
        recorderObj.vueData.offline_text +
        recorderObj.handleWithTimestamp(recTxt, timestamp);
      recorderObj.vueData.online_text = recorderObj.vueData.offline_text;
    } else {
      recorderObj.vueData.online_text =
        recorderObj.vueData.online_text + recTxt;
    }

    if (recorderObj.data.way == "file" && is_final == true) {
      //   play_file();
      recorderObj.socket_stop();
      recorderObj.vueData.tips = "is_final=true关闭连接，需要重新连接";
      console.log("is_final=true关闭连接，需要重新连接");
    }
  },
  handleWithTimestamp: function (tmptext, tmptime) {
    console.log("tmptext: " + tmptext);
    console.log("tmptime: " + tmptime);
    if (tmptime == null || tmptime == "undefined" || tmptext.length <= 0) {
      return tmptext;
    }
    tmptext = tmptext.replace(/。|？|，|、|\?|\.|\ /g, ","); // in case there are a lot of "。"
    let words = tmptext.split(","); // split to chinese sentence or english words
    let jsontime = JSON.parse(tmptime); //JSON.parse(tmptime.replace(/\]\]\[\[/g, "],[")); // in case there are a lot segments by VAD
    let char_index = 0; // index for timestamp
    let text_withtime = "";
    for (let i = 0; i < words.length; i++) {
      if (words[i] == "undefined" || words[i].length <= 0) {
        continue;
      }
      console.log("words===", words[i]);
      console.log(
        "words: " + words[i] + ",time=" + jsontime[char_index][0] / 1000
      );
      if (/^[a-zA-Z]+$/.test(words[i])) {
        // if it is english
        text_withtime =
          text_withtime +
          jsontime[char_index][0] / 1000 +
          ":" +
          words[i] +
          "\n";
        char_index = char_index + 1; //for english, timestamp unit is about a word
      } else {
        // if it is chinese
        text_withtime =
          text_withtime +
          jsontime[char_index][0] / 1000 +
          ":" +
          words[i] +
          "\n";
        char_index = char_index + words[i].length; //for chinese, timestamp unit is about a char
      }
    }
    return text_withtime;
  },
  //启用麦克风
  enableMike: async () => {
    // let reData = { status: 0, info: "", data: null };

    // // 检查浏览器是否支持 mediaDevices
    // if (!navigator.mediaDevices) {
    //   console.log("navigator.mediaDevices 不存在");
    //   reData = { status: 0, info: "浏览器不支持 mediaDevices" };
    //   return reData;
    // }

    // try {
    //   // 使用现代的 getUserMedia 方法请求音频权限
    //   recorderObj.data.stream = await navigator.mediaDevices.getUserMedia({
    //     audio: true,
    //   });
    //   console.log("访问权限获取成功");
    //   reData = { status: 1, data: recorderObj.data.stream };
    // } catch (err) {
    //   console.log("访问权限获取失败", err);
    //   reData = { status: 0, info: err };
    // }

    // return reData;

    // 检查浏览器是否支持 getUserMedia
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    console.error('getUserMedia is not supported in this browser');
    return;
  }

  // 请求获取音频流
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function(stream) {
      const audioContext = new AudioContext();
      const bufferSize = 4096;//4096 2048
      const scriptProcessorNode = audioContext.createScriptProcessor(bufferSize, 1, 1);

      // 设置处理音频数据的回调函数
      scriptProcessorNode.onaudioprocess = function(event) {
        const inputBuffer = event.inputBuffer;
        const inputData = inputBuffer.getChannelData(0); // 获取单声道数据
        let float32Arr = new Float32Array(inputData); 


        onReceive(float32Arr);

        console.log(calls);
        // recorderObj.socket_send(dataArray);
      };

      // 连接音频流和处理节点，并连接到输出设备
      const mediaStreamSource = audioContext.createMediaStreamSource(stream);
      mediaStreamSource.connect(scriptProcessorNode);
      scriptProcessorNode.connect(audioContext.destination);
    })
    .catch(function(err) {
      console.error('获取音频流失败：', err);
    });

    let calls = [];

    //浏览器回传的音频数据处理
    let onReceive = function (float32Arr) {
      for (let k0 in calls) {
        //has item
        let size = float32Arr.length;
  
        let pcm = new Int16Array(size);
        let sum = 0;
        for (let j = 0; j < size; j++) {
          //floatTo16BitPCM
          let s = Math.max(-1, Math.min(1, float32Arr[j]));
          s = s < 0 ? s * 0x8000 : s * 0x7fff;
          pcm[j] = s;
          sum += Math.abs(s);
        }
  
        for (let k in calls) {
          calls.push(pcm);
        }
  
        return;
      }
    };
  },
  // 禁用麦克风
  disableMike: async () => {
    let reData = { status: 0, info: "" };
    if (chatObj.vueData.userMedia.stream) {
      console.log(chatObj.vueData.userMedia.stream.getTracks());
      // chatObj.vueData.userMedia.stream.getTracks().forEach(track => {
      //     if(track.kind=="audio"){
      //         track.stop();
      //     }
      // })
      chatObj.vueData.userMedia.stream.getTracks()[0].stop();
      reData.status = 1;
    }
    return reData;
  },
  // 处理音频
  do_audio: async (stream, callback) => {
    console.log("处理音频", stream);
    // const audioContext = new window.AudioContext();
    // const input = audioContext.createMediaStreamSource(stream);
    // const processor = audioContext.createScriptProcessor(4096, 1, 1);

    // processor.onaudioprocess = (e) => {
    // //   console.log(e);
    //   const float32Array = e.inputBuffer.getChannelData(0);
    //   const int16Array = Int16Array.from(float32Array.map((n) => n * 0x7fff));
    //   if (callback) {
    //     callback(int16Array.buffer);
    //   }
    // };

    // input.connect(processor);
    // processor.connect(audioContext.destination);

    const audioContext = new AudioContext();
    const bufferSize = 2048;
    const scriptProcessorNode = audioContext.createScriptProcessor(
      bufferSize,
      1,
      1
    );

    // 设置处理音频数据的回调函数
    scriptProcessorNode.onaudioprocess = function (event) {
      const inputBuffer = event.inputBuffer;
      const inputData = inputBuffer.getChannelData(0); // 获取单声道数据

      // 将浮点数数据转换为整数数组
      const dataArray = [];
      for (let i = 0; i < inputData.length; i++) {
        const value = Math.round(inputData[i] * 256); // 转换为整数，根据需要调整乘数
        dataArray.push(value);
      }

      // 调用传入的回调函数，将处理后的整数数组传递给回调函数
      callback(dataArray);
    };

    // 连接音频流和处理节点，并连接到输出设备
    const mediaStreamSource = audioContext.createMediaStreamSource(stream);
    mediaStreamSource.connect(scriptProcessorNode);
    scriptProcessorNode.connect(audioContext.destination);
  },
};

export default recorderObj;
