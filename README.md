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
│   ├── config/               # 站点全局配置
│   │   ├── index.js          # 全局配置
│   │   └── nprogress.js      # 进度配置
│   ├── routers/          # Router 模块
│   │   ├── index.js      # 路由配置
│   │   ├── modules/      # 可拆分的路由模块
│   │   │   ├── front.js  # 前台路由配置
│   │   │   └── back.js   # 后台路由配置
│   ├── stores/              # Store 存储模块
│   │   ├── index.js         # store 实例化
│   │   ├── site/            # 站点公共管理
│   │   │   ├── global.js    # 全局信息管理
│   │   │   ├── user.js      # 用户信息管理
│   │   │   └── auth.js      # 用户权限管理
│   │   ├── threeD/          # 3d项目
│   │   │   └── threeD.js    # 3d项目数据存储
│   │   ├── human/           # 数值人项目
│   │   │   └── threeD.js    # 数值人项目数据存储
│   │   └── helpers/         # store 辅助函数
│   ├── utils/                  # 全局工具函数
│   │   ├── utils.js            # 各种工具方法
│   │   ├── slider.js           # 滑块
│   │   ├── errorHandler.js     # 全局代码错误捕捉
│   ├── views/            # 项目页面目录
│   │   ├── web/          # 站点页面
│   │   ├── login/        # 站点登录页面
│   │   ├── admin/        # 后台管理项目
│   │   │   ├── layout/   # 布局页面
│   │   │   └── ...       # 其他前台页面
│   │   ├── threeD/       # 3d项目
│   │   │   ├── layout/   # 布局页面
│   │   │   └── ...       # 其他后台页面
│   │   ├── human/        # 数字人项目
│   │   │   ├── layout/   # 布局页面
│   │   │   └── ...       # 其他后台页面
│   │   └── test/         # 用于测试项目
│   │       └── BackLayout.vue  # 后台管理布局
│   ├── main.js           # 入口文件
│   ├── App.vue           # 根组件
├── index.html            # 入口 HTML 文件
├── vite.config.js        # Vite 配置文件
├── .gitignore            # Git 忽略文件
├── package.json          # 项目配置文件和依赖
└── README.md             # 项目说明文件
```
