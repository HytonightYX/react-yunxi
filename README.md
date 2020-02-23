# 手写一个简易 React



## 这个 Demo 解答了什么问题？

- JSX 和虚拟 DOM

  - 为什么只是写 `JSX` 就必须要引入 `React` ?

  - 为什么 `ReactDOM.render()` 必须要引入 `React` ?
  - 组件分为函数式组件和类组件，传入 `render()` 方法有什么区别？

- 组件实现
  
  - `React` 如何区分 `Class组件` 和 `Function组件`？
  - `Function组件` 如何转换为 `Class组件` ？
  - 组件 -> `JSX`  -> `VDOM` -> `DOM` 的全流程？
  
- 



## 环境配置

新建项目

```
// 取一个好听的名字
mkdir react-yunxi && cd react-yunxi
// 创建一下文件和文件夹
touch index.html index.js
mkdir react react-dom
yarn init
```

安装依赖

```
// babel 环境
yarn add @babel/core @babel/preset-env @babel/plugin-transform-react-jsx --dev
// 为了方便，使用了 parcel 打包
yarn global add parcel-bundler
```

配置`.babelrc`

```json
// 目录下新建.babelrc文件，写入
{
  "presets": ["@babel/preset-env"],
  "plugins": ["@babel/plugin-transform-react-jsx"]
}
```
