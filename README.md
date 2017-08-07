# wechat-small-program

[线上地址](http://SJVicky.github.io/wechat-small-program)

[English Document](https://github.com/SJVicky/wechat-small-program/master/README.md)




## 功能



## 开发
```bash
    # 克隆项目
    git clone https://github.com/PanJiaChen/vue-element-admin.git

    # 安装依赖
    npm install
    //or # 建议不要用cnpm  安装有各种诡异的bug 可以通过如下操作解决npm速度慢的问题
    npm install --registry=https://registry.npm.taobao.org

    # 本地开发 开启服务
    npm run dev
```


## 发布
```bash
    # 发布测试环境 带webpack ananalyzer
    npm run build:sit-preview

    # 构建生成环境
    npm run build:prod
```

## 目录结构
```shell
├── build                      // 构建相关  
├── config                     // 配置相关
├── src                        // 源代码
│   ├── api                    // 所有请求
│   ├── assets                 // 主题 字体等静态资源
│   ├── components             // 全局公用组件
│   ├── directive              // 全局指令
│   ├── filtres                // 全局filter
│   ├── mock                   // mock数据
│   ├── router                 // 路由
│   ├── store                  // 全局store管理
│   ├── styles                 // 全局样式
│   ├── utils                  // 全局公用方法
│   ├── view                   // view
│   ├── App.vue                // 入口页面
│   └── main.js                // 入口 加载组件 初始化等
├── static                     // 第三方不打包资源
│   ├── jquery
│   └── Tinymce                // 富文本
├── .babelrc                   // babel-loader 配置
├── eslintrc.js                // eslint 配置项
├── .gitignore                 // git 忽略项
├── favicon.ico                // favicon图标
├── index.html                 // html模板
└── package.json               // package.json

```

## 效果图

#### 两步验证登录 支持微信和qq

//![两步验证 here](https://github.com/PanJiaChen/vue-element-admin/blob/master/gifs/2login.gif)

#### 真正的动态换肤

//![真正的动态换肤](https://github.com/PanJiaChen/vue-element-admin/blob/master/gifs/theme.gif)<br />

#### tabs

//![tabs](https://github.com/PanJiaChen/vue-element-admin/blob/master/gifs/tabs.gif)<br />



#### 可收起侧边栏

//![enter image description here](https://github.com/PanJiaChen/vue-element-admin/blob/master/gifs/leftmenu.gif)

#### table拖拽排序

//![enter image description here](https://github.com/PanJiaChen/vue-element-admin/blob/master/gifs/order.gif)


#### 动态table

//![enter image description here](https://github.com/PanJiaChen/vue-element-admin/blob/master/gifs/dynamictable.gif)


#### 上传裁剪头像

//![enter image description here](https://github.com/PanJiaChen/vue-element-admin/blob/master/gifs/uploadAvatar.gif)


#### 错误统计

//![enter image description here](https://github.com/PanJiaChen/vue-element-admin/blob/master/gifs/errorlog.gif)


#### 富文本(整合七牛 打水印等个性化功能)

//![enter image description here](https://github.com/PanJiaChen/vue-element-admin/blob/master/gifs/editor.gif)

#### 封装table组件

//![enter image description here](https://github.com/PanJiaChen/vue-element-admin/blob/master/gifs/table.gif)


#### 导出excel

//![enter image description here](https://github.com/PanJiaChen/vue-element-admin/blob/master/gifs/excel.png)



## License

MIT
