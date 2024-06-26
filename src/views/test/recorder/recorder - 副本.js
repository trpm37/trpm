
let recorderObj = {
  data: {
    socket: null,
    socket_url: "wss://io.wasee.com:10096/", //设置wss asr online接口地址 如 wss://111.205.137.58:5821/wss/
    way: "mic", //选择录音模式 mic file
    file_ext: "", //文件格式
    sampleRate: 16000, //采样率
    bitRate: 8, //比特率
    mode: "2pass", //asr模型模式: 2pass online offline
    itn: "false", //逆文本标准化(ITN) 'false' 'true'
    hotWords: "", //热词
    rec: null, //录音对象
    sampleBuf: new Int16Array(),
    sendBuf: null,
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
    recorderObj.vueData.tips = "正在连接asr服务器，请等待...";
    recorderObj.vueData.online_text = "";
    recorderObj.vueData.offline_text = "";
    await chat_socket.socket_init().catch((rej) => {
      recorderObj.vueData.tips = rej;
    });
    recorderObj.vueData.isRec = true;
  },
  // 录音开始
  record_start: function () {
    console.log("开始");
    recorderObj.data.rec.open(function () {
      recorderObj.data.rec.start();
      recorderObj.vueData.tips = "开始录音";
    });
  },
  // 录音停止
  record_stop: function () {
    console.log("停止");
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
    recorderObj.socket_send(JSON.stringify(sendParams));

    recorderObj.vueData.isRec = false;
    recorderObj.vueData.tips = "发送完数据,请等候,正在识别...";

    if (recorderObj.data.way == "mic") {
      //wait 3s for asr result
      setTimeout(function () {
        recorderObj.socket_stop();
        recorderObj.vueData.tips = "等待3s关闭连接，需要重新连接";
      }, 3000);

      recorderObj.data.rec.stop(
        function (blob, duration) {
          console.log(blob, duration);
          //pcm直接转码成wav
          //   let data={ sampleRate: 16000, bitRate: 16, blob: blob };
          //   Recorder.pcm2wav(
          //     data,
          //     function (theblob, duration) {
          //       console.log(theblob);
          //       let audio_record = document.getElementById("audio_record");
          //       audio_record.src = (window.URL || webkitURL).createObjectURL(theblob);
          //       audio_record.controls = true;
          //       //audio_record.play();
          //     },
          //     function (msg) {
          //       console.log(msg);
          //     }
          //   );
        },
        function (errMsg) {
          console.log("errMsg: " + errMsg);
        }
      );
    }
  },
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

      recorderObj.data.sampleBuf = Int16Array.from([...recorderObj.data.sampleBuf, ...data_16k]);
      let chunk_size = 960; // for asr chunk_size [5, 10, 5]
      recorderObj.vueData.tips = "" + bufferDuration / 1000 + "s";
      while (recorderObj.data.sampleBuf.length >= chunk_size) {
        recorderObj.data.sendBuf = recorderObj.data.sampleBuf.slice(0, chunk_size);
        recorderObj.data.sampleBuf = recorderObj.data.sampleBuf.slice(chunk_size, recorderObj.data.sampleBuf.length);
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
    //   itn: "false", //逆文本标准化(ITN)
    //   wav_format: "PCM", //文件格式 PCM wav
    //   audio_fs: 16000, //wav文件采样率
    //   hotwords: "", //热词
    //   audio_fs: "", //采样率
    // };
    if (recorderObj.data.socket && recorderObj.data.socket.readyState === 1 && params) {
        recorderObj.data.socket.send(params);
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
    console.log(sendParams);
    _this.data.socket.send(JSON.stringify(request));

    _this.socket_stateHandle(0);
  },
  socket_stateHandle: function (state) {
    recorderObj.vueData.socket_status = state;
    if (state === 0) {
      //on open
      recorderObj.vueData.tips = "连接成功!请点击开始";
      if (recorderObj.data.way == "file") {
        recorderObj.vueData.tips = "请耐心等待,大文件等待时间更长";
        // start_file_send();
      } else {
        // recorderObj.start();
      }
    } else if (state === 1) {
      //recorderObj.stop();
    } else if (state === 2) {
      recorderObj.stop();
      recorderObj.vueData.tips = "连接失败,请检查asr地址和端口。再连接。";
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
    chat_enableMike: async () => {
      let reData = { status: 0, info: "", data: null };

      // 检查浏览器是否支持 mediaDevices
      if (!navigator.mediaDevices) {
        console.log("navigator.mediaDevices 不存在");
        reData = { status: 0, info: "浏览器不支持 mediaDevices" };
        return reData;
      }

      try {
        // 使用现代的 getUserMedia 方法请求音频权限
        chatObj.vueData.userMedia.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log("访问权限获取成功");
        reData = { status: 1, data: chatObj.vueData.userMedia.stream };
      } catch (err) {
        console.log("访问权限获取失败", err);
        reData = { status: 0, info: err };
      }

      return reData;
    },
    // 禁用麦克风
    chat_disableMike: async () => {
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
    chat_audio: async (stream, callback) => {
      const audioContext = new window.AudioContext();
      const input = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(4096, 1, 1);

      processor.onaudioprocess = e => {
        const float32Array = e.inputBuffer.getChannelData(0);
        const int16Array = Int16Array.from(float32Array.map(n => n * 0x7fff));
        if (callback) {
          callback(int16Array.buffer);
        }
      };

      input.connect(processor);
      processor.connect(audioContext.destination);
    }
  /*
    pcm编码
    编码原理：本编码器输出的pcm格式数据其实就是Recorder中的buffers原始数据（经过了重新采样），16位时为LE小端模式（Little Endian），并未经过任何编码处理
    编码的代码和wav.js区别不大，pcm加上一个44字节wav头即成wav文件；所以要播放pcm就很简单了，直接转成wav文件来播放，已提供转换函数 Recorder.pcm2wav
  */
  pcm: function (res, True) {
    let _this = recorderObj;
    let size = res.length,
      bitRate = _this.data.bitRate == 8 ? 8 : 16;

    let buffer = new ArrayBuffer(size * (bitRate / 8));
    let data = new DataView(buffer);
    let offset = 0;

    // 写入采样数据
    if (bitRate == 8) {
      for (let i = 0; i < size; i++, offset++) {
        //16转8据说是雷霄骅的 https://blog.csdn.net/sevennight1989/article/details/85376149 细节比blqw的按比例的算法清晰点，虽然都有明显杂音
        let val = (res[i] >> 8) + 128;
        data.setInt8(offset, val, true);
      }
    } else {
      for (let i = 0; i < size; i++, offset += 2) {
        data.setInt16(offset, res[i], true);
      }
    }

    True(new Blob([data.buffer], { type: "audio/pcm" }));
  },
  /*
   pcm直接转码成wav
   可以直接用来播放；需同时引入wav.js
    data: {
        sampleRate:16000 pcm的采样率
        bitRate:16 pcm的位数 取值：8 或 16
        blob:blob对象
    }
    data 如果直接提供的blob将默认使用16位16khz的配置 仅用于测试
  */
  pcm2wav: function (data, True, False) {
    if (data.slice && data.type != null) {
      //Blob 测试用
      data = { blob: data };
    }
    let sampleRate = data.sampleRate || 16000,
      bitRate = data.bitRate || 16;
    if (!data.sampleRate || !data.bitRate) {
      console.log("pcm2wav必须提供sampleRate和bitRate");
    }

    let reader = new FileReader();
    reader.onloadend = function () {
      let pcm;
      if (bitRate == 8) {
        //8位转成16位
        let u8arr = new Uint8Array(reader.result);
        pcm = new Int16Array(u8arr.length);
        for (let j = 0; j < u8arr.length; j++) {
          pcm[j] = (u8arr[j] - 128) << 8;
        }
      } else {
        pcm = new Int16Array(reader.result);
      }
      console.log(sampleRate);
      //   Recorder({
      //     type: "wav",
      //     sampleRate: sampleRate,
      //     bitRate: bitRate,
      //   })
      //     .mock(pcm, sampleRate)
      //     .stop(function (wavBlob, duration) {
      //       True(wavBlob, duration);
      //     }, False);
    };
    reader.readAsArrayBuffer(data.blob);
  },
  /*
    wav编码
    当然最佳推荐使用mp3、wav格式，代码也是优先照顾这两种格式
    编码原理：给pcm数据加上一个44直接的wav头即成wav文件；pcm数据就是Recorder中的buffers原始数据（重新采样），16位时为LE小端模式（Little Endian），实质上是未经过任何编码处理
  */
  wav: function (res, True) {
    let _this = recorderObj;
    let size = res.length,
      sampleRate = _this.data.sampleRate,
      bitRate = _this.data.bitRate == 8 ? 8 : 16;

    let dataLength = size * (bitRate / 8);
    let buffer = new ArrayBuffer(44 + dataLength);
    let data = new DataView(buffer);

    let offset = 0;
    let writeString = function (str) {
      for (let i = 0; i < str.length; i++, offset++) {
        data.setUint8(offset, str.charCodeAt(i));
      }
    };
    let write16 = function (v) {
      data.setUint16(offset, v, true);
      offset += 2;
    };
    let write32 = function (v) {
      data.setUint32(offset, v, true);
      offset += 4;
    };

    /* RIFF identifier */
    writeString("RIFF");
    /* RIFF chunk length */
    write32(36 + dataLength);
    /* RIFF type */
    writeString("WAVE");
    /* format chunk identifier */
    writeString("fmt ");
    /* format chunk length */
    write32(16);
    /* sample format (raw) */
    write16(1);
    /* channel count */
    write16(1);
    /* sample rate */
    write32(sampleRate);
    /* byte rate (sample rate * block align) */
    write32(sampleRate * (bitRate / 8)); // *1 声道
    /* block align (channel count * bytes per sample) */
    write16(bitRate / 8); // *1 声道
    /* bits per sample */
    write16(bitRate);
    /* data chunk identifier */
    writeString("data");
    /* data chunk length */
    write32(dataLength);
    // 写入采样数据
    if (bitRate == 8) {
      for (let i = 0; i < size; i++, offset++) {
        //16转8据说是雷霄骅的 https://blog.csdn.net/sevennight1989/article/details/85376149 细节比blqw的按比例的算法清晰点，虽然都有明显杂音
        let val = (res[i] >> 8) + 128;
        data.setInt8(offset, val, true);
      }
    } else {
      for (let i = 0; i < size; i++, offset += 2) {
        data.setInt16(offset, res[i], true);
      }
    }

    True(new Blob([data.buffer], { type: "audio/wav" }));
  },
};

export default recorder;
