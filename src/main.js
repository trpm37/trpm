import { createApp } from 'vue'
import App from './App.vue'
import "../public/iconfont/iconfont.css";
import './assets/styles/pub.scss'
import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import * as Icons from "@element-plus/icons-vue";
import router from './routers'
import pinia from "./stores"
import errorHandler from './utils/errorHandler'
// vue i18n
import I18n from "./languages/index";

// createApp(App).mount('#app')
let app=createApp(App);
app.config.errorHandler=errorHandler;
// register the element Icons component
Object.keys(Icons).forEach(key => {
  app.component(key, Icons[key]);
});
app.use(ElementPlus).use(router).use(pinia).use(I18n).mount('#app');
