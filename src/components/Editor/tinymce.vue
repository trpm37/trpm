<template>
  <div class="editor-box">
    <div>接收父值---{{ props.content }}</div>
    <div class="tinymce-box">
      <textarea id="tinymce-editor"></textarea>
    </div>
  </div>
</template>

<script setup lang="ts">
import {watch, onMounted, onBeforeUnmount } from "vue";

//接收父值
const props=defineProps({
    content:{
        type:String,
        default:""
    }
});
console.log("222222",props.content);
//子给父传值
const emit= defineEmits(["change"]);

let editorObj:any = {
  instance: null,
  key: "bhdyrdet7r4y02o78r95ibbapdcg1rv9awwxh6tnp7c5v767",
  init: {
    base_url: "/tinymce", // 添加此行配置资源路径 "/node_modules/tinymce"
    language: "zh_CN",
    language_url: "/tinymce/langs/zh_CN.js", // 设置语言包的路径
    selector: "#tinymce-editor",
    height: "100%",
    branding: false,
    resize: false,
    menubar: false,
    plugins:
      "searchreplace  autolink help quickbars  directionality visualblocks visualchars fullscreen image link media  code codesample table pagebreak nonbreaking  advlist lists wordcount emoticons", // autosave自动保存插件
    toolbar: [
      "fullscreen undo redo   | blocks fontsize |  pastetext removeformat forecolor backcolor bold italic underline strikethrough   | alignleft aligncenter alignright alignjustify outdent indent | bullist numlist lineheight | blockquote subscript superscript  |  table link image axupimgs  media  emoticons codesample hr visualblocks  | searchreplace code print indent2em wordcount help",
    ],
    block_formats:
      "段落=p;二级标题=h2;三级标题=h3;四级标题=h4;五级标题=h5;六级标题=h6",
    font_size_formats: "12px 14px 16px 18px 24px 36px 48px 56px 72px",
    font_family_formats:
      "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;",
    placeholder: "请输入内容...",
    help_accessibility: false,
    help_tabs: ["shortcuts"],
    codesample_languages: [
      {
        text: "HTML/XML",
        value: "markup",
      },
      {
        text: "JavaScript、JSON、Dart",
        value: "javascript",
      },
      {
        text: "CSS",
        value: "css",
      },
      {
        text: "PHP、Objective-C、YAML",
        value: "php",
      },
      {
        text: "Ruby",
        value: "ruby",
      },
      {
        text: "Python",
        value: "python",
      },
      {
        text: "Java、Kotlin、Switf",
        value: "java",
      },
      {
        text: "C",
        value: "c",
      },
      {
        text: "C#",
        value: "csharp",
      },
      {
        text: "C++",
        value: "cpp",
      },
    ],
    quickbars_selection_toolbar: "bold italic underline | link blockquote",
    quickbars_insert_toolbar: false,
    paste_data_images: true,
    file_picker_types: "image,file",
    elementpath: false,
    contextmenu: "link",
    convert_urls: false,
    // autosave_ask_before_unload: true, // 在用户关闭页面或者刷新页面时询问是否保存修改过的内容
    // autosave_interval: "3s", // 自动保存的间隔时间，可以设置为一个数字（以毫秒为单位）或者一个字符串（包含单位，例如'30s'表示30秒）
    setup: function (editor:any) {
      console.log("----编辑器初始之前-----", editor.id, editor);
      // 监听TinyMCE的change事件 'input change undo redo'
      editor.on("input change", function () {
        let content = editor.getContent(); // 获取编辑器内容
        emit("change", content);
      });
      //禁用ctrl+s
      editor.on("keydown", function (e:any) {
        // 检测是否按下了 Ctrl + S
        if ((e.keyCode == 83 || e.keyCode == 115) && e.ctrlKey) {
          // 取消默认行为和事件传播
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      });
    },
    init_instance_callback: function (editor:any) {
      editorObj.instance = editor;
      // console.log("----编辑器初始之后-----", editor.id, editor);
      editor.setContent(props.content); // 设置初始值
    },
    // 自定义的图片上传处理函数
    // 你需要根据实际情况将blobInfo中的图片数据上传到服务器
    // 当上传完成时，调用success方法，并传递图片的URL
    // 当上传失败时，调用failure方法，并传递一个错误消息
    images_upload_handler: async (blobInfo:any, success:any, failure:any) => {
      console.log("----自定义的图片上传处理函数-----",blobInfo);
      success("https://www.baidu.com/img/bd_logo1.png");
      failure("上传失败");
    //   const file = blobInfo.blob();
    //   let res = await editor_uploadImg(file);
    //   console.log("图片上传", res);
    //   if (res.status == 1) {
    //     let reData: any = res.data;
    //     success(reData.path);
    //   } else {
    //     failure(res.info);
    //   }
    },
    //自定义文件选择器的回调内容
    file_picker_callback: function (callback:any, value:any, meta:any) {
      console.log("----自定义文件选择器的回调内容-----", value, meta);
      if (meta.filetype === "file") {
        callback("https://www.baidu.com/img/bd_logo1.png", { text: "My alt text" });
        //打开文件素材库
        // materialRef.value?.open({
        //   type: 1,
        //   callback(bkData) {
        //     console.log("-----------", bkData);
        //     let item = bkData[0];
        //     callback(item.path, { text: item.title, title: item.title });
        //   }
        // });
      }
      if (meta.filetype === "image") {
        // callback("https://www.baidu.com/img/bd_logo1.png", { alt: "My alt text" });
        //打开图片素材库
        // materialRef.value?.open({
        //   type: 2,
        //   callback(bkData) {
        //     console.log("-----------", bkData);
        //     let item = bkData[0];
        //     callback(item.path, { alt: item.title });
        //   }
        // });
      }
      if (meta.filetype === "media") {
        // callback("movie.mp4", { source2: "alt.ogg", poster: "https://www.baidu.com/img/bd_logo1.png" });
        //打开视频素材库
        // materialRef.value?.open({
        //   type: 3,
        //   callback(bkData) {
        //     console.log("-----------", bkData);
        //     let item = bkData[0];
        //     callback(item.path, { poster: item.cover_url });
        //   }
        // });
      }
    },
    paste_postprocess: function (editor:any, args:any) {
      console.log("----对粘贴的内容进行处理-----", editor.content, args);
    }
  },
};

// 加载 编辑器脚本和样式
import tinymce from "tinymce";

// 引入必要的插件
// import "tinymce/plugins/link";
// import "tinymce/plugins/table";
// import "tinymce/plugins/image";

// 引入主题和图标
// import "tinymce/themes/silver";
// import "tinymce/icons/default";
// import "tinymce/skins/ui/oxide/skin.min.css";

// 初始化 编辑器
const initEditor = () => {
    tinymce.init(editorObj.init);
};

// 销毁  编辑器
function destroyEditor() {
  if (editorObj.instance) {
    // editorObj.instance.remove();
    tinymce.remove("#tinymce-editor");
    editorObj.instance = null;
  }
}

//监听接收内容
watch(
  () => props.content,
  newVal => {
    // console.log(接收父值：", newVal);
    if (editorObj.instance) {
      editorObj.instance.setContent(newVal); // 设置初始值
    }
  }
);

onMounted(() => {
    initEditor();
});

onBeforeUnmount(() => {
    destroyEditor()
});
</script>

<style scoped lang="scss">
.editor-box {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .tinymce-box {
    flex: 1;
    width: 100%;
    overflow: hidden;
    :deep(.tox-tinymce) {
      border: 1px solid #e4e7ed;
      border-radius: 6px;
      .tox-statusbar {
        padding: 0 17px 8px 0;
        border-top: none;
      }
      .tox-edit-area::before {
        border: none;
      }
    }
  }
}
</style>
