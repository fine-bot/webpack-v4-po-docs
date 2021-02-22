# 生产环境下的优化实践
## 抽取并压缩样式文件
### 使用 mini-css-extract-plugin 抽取 CSS
将 CSS 提取到单独的文件中。它为每个包含 CSS 的 JS 文件创建一个 CSS 文件。具体用法如下：
```typescript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css', // 直接引用
      chunkFilename: '[name].chunk.css', // 间接引用
    }),
  ],
}
```
`mini-css-extract-plugin` 会将一个 JS 文件下所引入的所有 CSS 文件抽取并合并为一个文件。
### 使用 optimize-css-assets-plugin 压缩 CSS
使用方法如下：
```typescript
module.exports = {
  optimaization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})],
  }
}
```
`optimize-css-assets-plugin` 可搭配 `SplitChunksPlugin` 插件对多入口的样式文件进行合并压缩。具体请参考 [`SplitChunksPlugin`](https://v4.webpack.js.org/plugins/split-chunks-plugin/) 官方文档。