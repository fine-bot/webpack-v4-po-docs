# 通用优化手段
## 使用最新且稳定的版本
升级 webpack、Node.js、npm 等工具版本，webpack 基于 Node 运行环境，升级 Node 提升 webpck 构建性能，升级 npm 帮助我们更快分析包依赖。
## 缩小文件搜索范围
webpack 构建过程中有两个重要的步骤，根据导入路径寻找相应文件，根据文件后缀名使用对应的 loader 进行处理。针对以上两个过程，给出以下优化参考。
### 优化 loader 配置
loader 对文件的转换操作很耗时，应在尽可能少的模块上应用loader。
```javascript
module.exports = {
  module: {
    rules: [
      test: /\.js$/, // 精确匹配js文件，提高正则表达式性能
      use: ['babel-loader?cacheDirectory'], // 缓存转译后的文件结果，提速两倍以上
      include: path.resolve(__dirname, 'src'), // 只对src目录下的文件采用此 loader 处理
      exclude: /node_modules/, // 排除的文件目录，优先级高于 include
    ]
  }
}
```
### 优化 resolve.modules 配置
`resolve.modules` 用于配置 webpack 去哪些目录下寻找第三方模块。默认值为 ['node_modules']，含义是先去当前目录下的 ./node_modules 目录下去找想找的模块，如果没找到就去上一级目录 ../node_modules 中找，再没有就去 ../../node_modules 中找。
当安装的第三方模块都放在项目根目录下的 ./node_modules 目录下时，没有必要按照默认的方式去一层层的寻找，可以指明存放第三方模块的绝对路径，以减少寻找，配置如下：
```typescript
module.exports = {
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')]
  }
}
```
### 优化 module.noParse 配置
针对一些非模块化的第三方依赖，可以使用 `noParse` 忽略对这些库文件的递归解析处理，提高构建性能。
```javascript
module.exports = {
  module: {
    noParse: /lodash/,
  }
}
```
> 注意被忽略掉的文件里不应该包含 `import`、`require`、`define` 等模块化语句，否则会导致构建出的代码中包含无法在浏览器环境下执行的模块化语句。
## 优化图片资源的加载
### 使用 url-loader 减少 http 请求
`url-loader` 中的 `limit` 参数用于设置阈值，当图片大小小于等于该值时，图片会被转为 `base64URI`，从而减少图片的 http 请求数量。
```typescript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(jpg|png|gif)/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]_hash.[ext]',
            outputPath: 'images/',
            limit: 10240, // 小于等于10kb时转换为base64
          },
        },
      },
    ]
  }
  
}
```