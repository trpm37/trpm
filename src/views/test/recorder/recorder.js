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
    stream: null, //音频流
    bufferSize: 4096, //表示音频缓冲区的大小。必须是以下值之一：256, 512, 1024, 2048, 4096, 8192, 或 16384。这个值决定了每次处理多少帧的音频数据。缓冲区越大，延迟越高，但计算负荷越低。通常，4096 是一个常见的选择。
    sampleBuf: new Int16Array(), //采样数据
    sendBuf: null, //发送数据
    audioContext: {
      obj: null,
      node: null,
    },
    mediaRecorder: {
      obj: null,
    },
  },
  vueData: reactive({
    tips: "",
    socket_status: -1, //-1未连接 0成功 1停止 2失败
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
  },
  // 录音开始
  record_start: async function () {
    console.log("开始录音");
    // recorderObj.data.rec.open(function () {
    //   recorderObj.data.rec.start();
    //   recorderObj.vueData.tips = "开始录音";
    //   console.log("开始录音");
    // });
    //启用麦克风
    let mikeData = await recorderObj.enableMike();
    console.log(mikeData);
    recorderObj.vueData.isRec = true;
  },
  // 录音停止
  record_stop: function () {
    recorderObj.stream_AudioContext_stop();

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
      recorderObj.data.sendBuf=null;
    }
    console.log("停止", sendParams);
    recorderObj.socket_send(JSON.stringify(sendParams));

    recorderObj.vueData.online_text = recorderObj.vueData.offline_text = "";
    recorderObj.vueData.isRec = false;

    if (recorderObj.data.way == "mic") {
      //等待3s关闭连接，需要重新连接
      // setTimeout(function () {
      //   recorderObj.socket_stop();
      //   console.log("等待3s关闭连接，需要重新连接");
      // }, 3000);
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
  //录音中
  record_process2: function (buffer, bufferSampleRate) {
    if (recorderObj.vueData.isRec) {
      console.log("----Process----", buffer, bufferSampleRate);
      let data_48k = buffer[buffer.length - 1];
      let array_48k = new Array(data_48k);
      let data_16k = recorderObj.SampleData(
        array_48k,
        bufferSampleRate,
        16000
      ).data;

      // let data_16k=recorderObj.int16ArrayMerge(buffer);
      recorderObj.data.sampleBuf = Int16Array.from([
        ...recorderObj.data.sampleBuf,
        ...data_16k,
      ]);
      let chunk_size = 960; // for asr chunk_size [5, 10, 5]
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
    // console.log("message: ", params);
    let jsonMsg = JSON.parse(params.data);
    let recTxt = "" + jsonMsg["text"];
    let asrModel = jsonMsg["mode"];
    let is_final = jsonMsg["is_final"];
    let timestamp = jsonMsg["timestamp"];
    console.log("message: ",asrModel, recTxt);
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
    let reData = { status: 0, info: "", data: null };

    // 检查浏览器是否支持 mediaDevices getUserMedia
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      reData = { status: 0, info: "浏览器不支持 mediaDevices" };
      return reData;
    }

    try {
      // 请求获取音频流
      let stream = await navigator.mediaDevices
        .getUserMedia({ audio: true, video: false })
        .catch(function (err) {
          console.error("获取音频流失败：", err);
        });
      if (stream) {
        console.log("音频访问权限获取成功:navigator.mediaDevices.getUserMedia");
        recorderObj.data.stream = stream;
        reData = { status: 1, data: stream };
        recorderObj.do_stream(stream, 0);
      }

      // navigator.mediaDevices
      //   .getUserMedia({ audio: true, video: false })
      //   .then(function (stream) {
      //     console.log(
      //       "音频访问权限获取成功:navigator.mediaDevices.getUserMedia"
      //     );
      //     recorderObj.data.stream = stream;
      //     reData = { status: 1, data: stream };
      //     recorderObj.do_stream(stream, 0);
      //   })
      //   .catch(function (err) {
      //     console.error("获取音频流失败：", err);
      //   });
    } catch (err) {
      console.log("访问权限获取失败", err);
      reData = { status: 0, info: err };
    }

    return reData;
  },
  // 禁用麦克风
  disableMike: async () => {
    let reData = { status: 0, info: "" };
    if (recorderObj.data.stream) {
      // recorderObj.data.stream.getTracks().forEach((track) => {
      //   // track.stop();
      //   if (track.kind == "audio") {
      //     track.stop();
      //   }
      // });
      recorderObj.data.stream.getTracks()[0].stop();
      reData.status = 1;
    }
    return reData;
  },
  // 处理音频流
  do_stream: async (stream, way) => {
    console.log(
      "处理音频",
      way,
      stream,
      stream._rd,
      stream.sampleRate,
      stream.getTracks()
    );
    //way 处理音频方式0 1
    if (way == 1) {
      recorderObj.stream_MediaRecorder(stream);
    } else {
      recorderObj.stream_AudioContext(stream);
    }
  },
  // 处理音频流 window.AudioContext
  stream_AudioContext: async (stream) => {
    console.log("处理音频：stream_AudioContext");
    let calls = []; // 存储数据块

    recorderObj.data.audioContext.obj = new AudioContext();
    recorderObj.data.audioContext.node =
      recorderObj.data.audioContext.obj.createScriptProcessor(
        recorderObj.data.bufferSize,
        1,
        1
      );

    // 设置处理音频数据的回调函数
    recorderObj.data.audioContext.node.onaudioprocess = function (event) {
      const inputBuffer = event.inputBuffer;
      const float32Arr = inputBuffer.getChannelData(0); // 获取单声道数据
      console.log("2222222222222222222", float32Arr);

      let int16Arr = recorderObj.float32ArrayToInt16Array(float32Arr).data;
      calls.push(int16Arr);
      // console.log(calls);
      recorderObj.record_process2(calls, 48000);
    };

    // 连接音频流和处理节点，并连接到输出设备
    const mediaStreamSource =
      recorderObj.data.audioContext.obj.createMediaStreamSource(stream);
    mediaStreamSource.connect(recorderObj.data.audioContext.node);
    recorderObj.data.audioContext.node.connect(
      recorderObj.data.audioContext.obj.destination
    );
  },
  stream_AudioContext_stop: () => {
    // 断开createScriptProcessor的连接
    recorderObj.data.audioContext.node.disconnect();

    // 关闭整个音频上下文
    recorderObj.data.audioContext.obj.close().then(() => {
      console.log("关闭整个音频上下文");
    });
  },
  // 处理音频流 window.MediaRecorder
  stream_MediaRecorder: async (stream) => {
    console.log("处理音频：stream_MediaRecorder");

    let mimeType = "audio/webm; codecs=pcm";
    // 检查浏览器是否支持 MediaRecorder 和指定的 mimeType
    if (!MediaRecorder.isTypeSupported(mimeType)) {
      console.error("该浏览器不支持指定的 MIME 类型:", mimeType);
      return;
    }

    let calls = []; // 存储数据块

    let mediaRecorder = new MediaRecorder(stream, { mimeType });
    mediaRecorder.ondataavailable = function (event) {
      let blob = event.data;
      if (blob && blob.size > 0) {
        // 使用 FileReader 读取数据
        let reader = new FileReader();
        reader.onloadend = function () {
          let arrayBuffer = reader.result;
          let uint8Arr = new Uint8Array(arrayBuffer);
          let float32Arr = new Float32Array(uint8Arr.length / 2);
          console.log("44444444444444444", float32Arr);

          let int16Arr = recorderObj.float32ArrayToInt16Array(float32Arr).data;
          calls.push(int16Arr);
          // console.log(calls);
          recorderObj.record_process2(calls, 48000);
        };
        reader.readAsArrayBuffer(blob);
      }
    };

    // 开始录制
    mediaRecorder.start(~~(recorderObj.data.bufferSize / 48));

    // 停止录制并清理资源
    // mediaRecorder.onstop = function () {
    //   stream.getTracks().forEach((track) => track.stop());
    // };
  },
  stream_MediaRecorder_stop: () => {
    recorderObj.data.mediaRecorder.obj.stop();
  },
  /*对pcm数据的采样率进行转换
	  pcmDatas: [[Int16,...]] pcm片段列表
	  pcmSampleRate:48000 pcm数据的采样率
	  newSampleRate:16000 需要转换成的采样率，newSampleRate>=pcmSampleRate时不会进行任何处理，小于时会进行重新采样
	  prevChunkInfo:{} 可选，上次调用时的返回值，用于连续转换，本次调用将从上次结束位置开始进行处理。或可自行定义一个ChunkInfo从pcmDatas指定的位置开始进行转换
	  option:{ 可选，配置项
			  frameSize:123456 帧大小，每帧的PCM Int16的数量，采样率转换后的pcm长度为frameSize的整数倍，用于连续转换。目前仅在mp3格式时才有用，frameSize取值为1152，这样编码出来的mp3时长和pcm的时长完全一致，否则会因为mp3最后一帧录音不够填满时添加填充数据导致mp3的时长变长。
			  frameType:"" 帧类型，一般为rec.set.type，提供此参数时无需提供frameSize，会自动使用最佳的值给frameSize赋值，目前仅支持mp3=1152(MPEG1 Layer3的每帧采采样数)，其他类型=1。
				  以上两个参数用于连续转换时使用，最多使用一个，不提供时不进行帧的特殊处理，提供时必须同时提供prevChunkInfo才有作用。最后一段数据处理时无需提供帧大小以便输出最后一丁点残留数据。
		  }
	  
	  返回ChunkInfo:{
		  //可定义，从指定位置开始转换到结尾
		  index:0 pcmDatas已处理到的索引
		  offset:0.0 已处理到的index对应的pcm中的偏移的下一个位置
		  
		  //仅作为返回值
		  frameNext:null||[Int16,...] 下一帧的部分数据，frameSize设置了的时候才可能会有
		  sampleRate:16000 结果的采样率，<=newSampleRate
		  data:[Int16,...] 转换后的PCM结果；如果是连续转换，并且pcmDatas中并没有新数据时，data的长度可能为0
	  }
	  */
  SampleData: function (
    pcmDatas,
    pcmSampleRate,
    newSampleRate,
    prevChunkInfo,
    option
  ) {
    prevChunkInfo || (prevChunkInfo = {});
    let index = prevChunkInfo.index || 0;
    let offset = prevChunkInfo.offset || 0;

    let frameNext = prevChunkInfo.frameNext || [];
    option || (option = {});
    let frameSize = option.frameSize || 1;
    if (option.frameType) {
      frameSize = option.frameType == "mp3" ? 1152 : 1;
    }

    let nLen = pcmDatas.length;
    if (index > nLen + 1) {
      console.log("SampleData似乎传入了未重置chunk " + index + ">" + nLen, 3);
    }
    let size = 0;
    for (let i = index; i < nLen; i++) {
      size += pcmDatas[i].length;
    }
    size = Math.max(0, size - Math.floor(offset));

    //采样 https://www.cnblogs.com/blqw/p/3782420.html
    let step = pcmSampleRate / newSampleRate;
    if (step > 1) {
      //新采样低于录音采样，进行抽样
      size = Math.floor(size / step);
    } else {
      //新采样高于录音采样不处理，省去了插值处理
      step = 1;
      newSampleRate = pcmSampleRate;
    }

    size += frameNext.length;
    let res = new Int16Array(size);
    let idx = 0;
    //添加上一次不够一帧的剩余数据
    for (let i = 0; i < frameNext.length; i++) {
      res[idx] = frameNext[i];
      idx++;
    }
    //处理数据
    for (; index < nLen; index++) {
      let o = pcmDatas[index];
      let i = offset,
        il = o.length;
      while (i < il) {
        //res[idx]=o[Math.round(i)]; 直接简单抽样

        //https://www.cnblogs.com/xiaoqi/p/6993912.html
        //当前点=当前点+到后面一个点之间的增量，音质比直接简单抽样好些
        let before = Math.floor(i);
        let after = Math.ceil(i);
        let atPoint = i - before;

        let beforeVal = o[before];
        let afterVal =
          after < il
            ? o[after]
            : //后个点越界了，查找下一个数组
              (pcmDatas[index + 1] || [beforeVal])[0] || 0;
        res[idx] = beforeVal + (afterVal - beforeVal) * atPoint;

        idx++;
        i += step; //抽样
      }
      offset = i - il;
    }
    //帧处理
    frameNext = null;
    let frameNextSize = res.length % frameSize;
    if (frameNextSize > 0) {
      let u8Pos = (res.length - frameNextSize) * 2;
      frameNext = new Int16Array(res.buffer.slice(u8Pos));
      res = new Int16Array(res.buffer.slice(0, u8Pos));
    }

    return {
      index: index,
      offset: offset,

      frameNext: frameNext,
      sampleRate: newSampleRate,
      data: res,
    };
  },
  // Float32Array 转换为 Int16Array
  float32ArrayToInt16Array: function (float32Array) {
    let sum = 0;
    const int16Array = new Int16Array(float32Array.length);
    for (let i = 0; i < float32Array.length; i++) {
      let s = Math.max(-1, Math.min(1, float32Array[i]));
      s = s < 0 ? s * 0x8000 : s * 0x7fff;
      int16Array[i] = s;
      sum += Math.abs(s);
    }
    return { data: int16Array, sum };
  },
  // Int16Array 转换为 Float32Array
  int16ArrayToFloat32Array: function (int16Array) {
    let sum = 0;
    const float32Array = new Float32Array(int16Array.length);
    for (let i = 0; i < int16Array.length; i++) {
      let s = int16Array[i];
      s = s < 0 ? s / 0x8000 : s / 0x7fff;
      float32Array[i] = s;
      sum += Math.abs(s);
    }
    return { data: float32Array, sum };
  },
  // 将多个Int16Array 合并成一个Int16Array
  int16ArrayMerge: function (int16Arrays) {
    // 计算总长度
    let totalLength = int16Arrays.reduce(
      (sum, int16Array) => sum + int16Array.length,
      0
    );

    // 创建一个新的 Int16Array
    let combinedArray = new Int16Array(totalLength);

    // 拷贝每个 Int16Array 的数据到新的 Int16Array 中
    let offset = 0;
    for (let int16Array of int16Arrays) {
      combinedArray.set(int16Array, offset);
      offset += int16Array.length;
    }

    // console.log(combinedArray);
    return combinedArray;
  },
};

export default recorderObj;
