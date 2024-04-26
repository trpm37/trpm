# metaverse 元宇宙项目


# trpm37.github.io

```text
项目目录：
├── public/               # 静态资源目录
│   ├── favicon.ico       # 网站图标
│   └── images/           # 其他静态资源
│   └── styles/           # 静态样式文件
│   ├── ***.html          # HTML 模板文件
├── src/                  # 项目源代码目录
│   ├── assets/           # 项目全局资源模块
│   │   ├── images/       # 项目图片资源
│   │   └── styles/       # 项目全局样式文件
│   ├── apis/             # API 模块
│   │   ├── user.js       # 用户相关 API
│   │   └── index.js      # API 导出或统一处理
│   ├── components/       # 通用组件目录
│   │   ├── upload/       # 上传组件
│   │   └── index.js      # 组件导出
│   ├── routers/          # Router 模块
│   │   ├── index.js      # 路由配置
│   │   ├── modules/      # 可拆分的路由模块
│   │   │   ├── front.js  # 前台路由配置
│   │   │   └── back.js   # 后台路由配置
│   ├── stores/           # Store 存储模块
│   │   ├── index.js      # store 实例化
│   │   ├── modules/      # 可拆分的 store 模块
│   │   │   ├── user.js   # 用户状态管理
│   │   │   └── app.js    # 应用全局状态管理
│   │   └── helpers/      # store 辅助函数
│   ├── utils/            # 全局工具函数
│   │   ├── index.js      # utils导出
│   ├── views/            # 页面目录
│   │   ├── Front/        # 前台展示模块
│   │   │   ├── Home.vue  # 首页
│   │   │   └── ...       # 其他前台页面
│   │   ├── Back/        # 后台管理模块
│   │   │   ├── Home.vue  # 后台首页
│   │   │   └── ...       # 其他后台页面
│   │   └── Layout/       # 布局组件
│   │       └── BackLayout.vue  # 后台管理布局
│   ├── main.js           # 入口文件
│   ├── App.vue           # 根组件
├── index.html            # 入口 HTML 文件
├── vite.config.js        # Vite 配置文件
├── .gitignore            # Git 忽略文件
├── package.json          # 项目配置文件和依赖
└── README.md             # 项目说明文件
```
