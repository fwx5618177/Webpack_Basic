# webpack base

## webpack
1. up to 5.0, 采用`monorepo`
2. `package.json`写`build`指令:
    - 不写的话，我们就得这么写`./node_modules/webpack/bin/webpack.js`
    - 为了简单,直接写在声明文件里。当调用时，直接写命令就行
3. `wepack`分为4种:
    - 开发文件，页面文件
    - loader: 开发文件里的代码进行处理
        - 把css插入js的时候，是以字符串的形式插入的
    - plugin: 扩展，补充，读取，实现一些工具功能
4. 顺序: 先plugin -> loader

