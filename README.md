# 手写一个简易 React

> 写一个简易 React，为阅读 React 源码打下基础。



## 这个 Demo 解答了什么问题？

- **JSX 和虚拟 DOM**
  - 为什么只是写 `JSX` 就必须要引入 `React` ?
  - 为什么 `ReactDOM.render()` 必须要引入 `React` ?
  - 组件分为函数式组件和类组件，传入 `render()` 方法有什么区别？
- **组件实现**
  - `React` 如何区分 `Class组件` 和 `Function组件`？
  - `Function组件` 如何转换为 `Class组件` ？
  - 组件 -> `JSX`  -> `VDOM` -> `DOM` 的全流程？
- **实现生命周期**
  - 各个生命周期执行的时机？
  - 代码层面如何实现的？
- **实现 Diff 算法**
  - 为什么要  Diff ？
  - Diff 的原理是什么？



todo:

- [x] 手写 diff 算法
- [ ] 支持子组件更新
- [ ] 异步 setState



## 环境配置

新建项目

```
// 取一个好听的名字
mkdir react-yunxi && cd react-yunxi
// 创建一下文件和文件夹
touch index.html index.js
mkdir react react-dom
// yarn 初始化
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



## 实现生命周期



## 实现 diff

### 为什么要  diff ？

如图，现在的情况是：

![image-20200224225625451](https://tva1.sinaimg.cn/large/0082zybply1gc7vth4jisj309608yq43.jpg)



在大型应用中，这显然是不可忍受的。

那么问题来了，如何减少 DOM 更新？我们找出渲染前后真正变化的部分，只更新这一小部分。而找这个“变化”的算法，就是 Diff 算法。

因此，React 通过引入Virtual DOM 的概念，极大地避免无效的 DOM 操作。Virtual DOM + React diff 的组合极大地保障了React的性能。

拓展阅读：[React diff原理探究以及应用实践](https://juejin.im/post/5cb5b4926fb9a068b52fb823)



diff 算法有3个规则：

- **Web UI中DOM节点跨层级的移动操作特别少，可以忽略不计**（同级对比）。
- **拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构**。
- **对于同一层级的一组子节点，它们可以通过唯一 id 进行区分**。

![image-20200225185233073](https://tva1.sinaimg.cn/large/0082zybply1gc8ue1h8kbj30hi09fq6t.jpg)



显然，我们要对 `_render` 方法加以修改。