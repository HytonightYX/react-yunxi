# 手写一个简易 React

> 写一个简易 React，为日后阅读 React 源码打下基础。



## 这个 Demo 解答了什么问题？

- **JSX 和虚拟 DOM**

  - 为什么只是写 `JSX` 就必须要引入 `React` ?

  - 为什么 `ReactDOM.render()` 必须要引入 `React` ?
  - 组件分为函数式组件和类组件，传入 `render()` 方法有什么区别？

- **组件实现**
  
  - `React` 如何区分 `Class组件` 和 `Function组件`？
  - `Function组件` 如何转换为 `Class组件` ？
  - 组件 -> `JSX`  -> `VDOM` -> `DOM` 的全流程？
  
- 实现生命周期

  - 为何 `componnentWillMount` 和 `componentWillReceiveProps` 要被取缔？
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





## JSX 和虚拟DOM

### 为什么只是写 `JSX` 就必须要引入 `React` ?



### 为什么 `ReactDOM.render()` 必须要引入 `React` ?



## 组件实现

### `React` 如何区分 `Class组件` 和 `Function组件` ？

通过在 Component 原型上写入 isReactComponent 标识

```javascript
class Component {
  constructor(props = {}) {
    this.props = props
    this.state = {}
  }
  ...
}

// 就是这里
Component.prototype.isReactComponent = {}

export default Component
```

然后，只需这样做判断

```javascript
//先保证 typeof component === 'function'
if (component.prototype && component.prototype.isReactComponent) {
  console.log('是类组件')
} else {
  console.log('是函数组件')
}
```

