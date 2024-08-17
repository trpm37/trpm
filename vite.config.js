import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'; //要了解一下，path 模块: 是 Node.js 的内置模块，用于处理和转换文件路径。它提供了很多有用的方法来操作路径，比如 resolve, join, basename, dirname 等等

/**
 * vite官网配置：https://vitejs.dev/config/
 * 开发环境(env.NODE_ENV): production生产 development开发 test测试
 */
export default defineConfig(({ mode })=>{
  // 加载对应环境的变量
  const env = loadEnv(mode, process.cwd());
  // 打印环境变量 process.env 和使用loadEnv的区别
  console.log('---环境变量---:',process.env.NODE_ENV, mode, env.VITE_OUTDIR, env.VITE_BASE_PATH)
  return {
    base: env.VITE_BASE_PATH,  // 基础路径
    build: {
      outDir: env.VITE_OUTDIR, // 输出目录 默认dist
    },
    resolve: {
      alias: {
        // '@': '/src',
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      //本地要使用https需要配置key和cert
      https: { 
        key: 'D:/key/key.pem',
        cert: 'D:/key/cert.pem',
      }
    },
    plugins: [vue()]
  }
})



