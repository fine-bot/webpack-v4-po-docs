# 通用优化手段
## 使用最新且稳定的版本
升级 webpack、Node.js、npm 等工具版本，webpack 基于 Node 运行环境，升级 Node 提升 webpck 构建性能，升级 npm 帮助我们更快分析包依赖。
## 缩小文件搜索范围
### 优化 loader 配置
loader 对文件的转换操作很耗时，应在尽可能少的模块上应用loader。
### 优化 resolve.modules 配置
### 优化 resolve.mainFields 配置
### 优化 resolve.alias 配置
### 优化 resolve.extensions 配置
### 优化 module.noParse 配置