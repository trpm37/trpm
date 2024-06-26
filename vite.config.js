import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import { config } from 'dotenv'

// 根据当前环境加载对应的配置文件
// let envPath = '.env'
// if (process.env.NODE_ENV === 'production') {
//   envPath = '.env.production'
// } else if (process.env.NODE_ENV === 'development') {
//   envPath = '.env.development'
// } else if (process.env.NODE_ENV === 'test') {
//   envPath = '.env.test'
// }
// config({ path: envPath })
// console.log('环境变量:',process.env.NODE_ENV, process.env.VITE_TITLE, process.env.VITE_BASE_URL)

/**
 * vite官网配置：https://vitejs.dev/config/
 * 开发环境process.env.NODE_ENV production生产development开发test测试
 */
export default defineConfig(()=>{
  // 打印环境变量 VITE_TITLE，VITE_BASE_URL等自定义的环境变量无效不清楚什么原因
  console.log('---环境变量---:',process.env.NODE_ENV, process.env.VITE_TITLE, process.env.VITE_BASE_URL)
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    base:  process.env.NODE_ENV === 'production' ? '/trpm/' : '/',  //process.env.VITE_BASE_URL,
    build: {
      outDir: 'trpm', // 输出目录 默认dist
    },
    server: {
      https: {
        key: 'E:/key/key.pem',
        cert: 'E:/key/cert.pem',
      }
    }
  }
})



