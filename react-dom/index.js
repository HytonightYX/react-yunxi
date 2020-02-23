/**
 * render 流程：
 * 1.ReactDOM.render(comp, node)
 * 2.将 comp 送入 _render() 函数
 *    2.1 创建组件
 *    2.2 setComponentProps() 来设置组件属性
 *    2.3 渲染组件(将类组件转换为 DOM)
 * 3.最后 DOM 回到render()，container.appendChild() 将 DOM 插入到 HTML 中
 * 
 */

import React from '../react'
const ReactDOM = {
  render
}

/**
 * 挂载真实 DOM
 * @param {any} vnode 虚拟 Node
 * @param {any} container 节点
 */
function render(vnode, container) {
  const dom = _render(vnode)
  return container.appendChild(dom)
}

function createComponent(comp, props) {
  let inst
  // 如果是类组件，则创建实例返回
  if (comp.prototype && comp.prototype.isReactComponent) {
    console.log('是类组件')
    inst = new comp(props)
  } else {
    console.log('是函数组件')
    // 如果是函数组件, 则构造为类组件，方便统一管理
    inst = new React.Component(props)
    inst.constructor = comp
    // 定义 render 函数
    inst.render = function () {
      return this.constructor(props)
    }
  }

  return inst
}

/**
 * 将类组件转为DOM
 * @param {React.Component} comp 类组件
 */
export function renderComponent(comp) {
  // 拿到类组件中的JSX
  const compJSX = comp.render()
  const base = _render(compJSX)

  // 这里可以实现 componentWillUpdate 方法
  if (comp.base && comp.componentWillUpdate) {
    comp.componentWillUpdate()
  }

  if (comp.base) {
    if (comp.componentDidUpdate) {
      comp.componentDidUpdate()
    }
  } else if (comp.componentDidMount) {
    comp.componentDidMount()
  }

  // 节点整个替换
  if (comp.base && comp.base.parentNode) {
    comp.base.parentNode.replaceChild(base, comp.base)
  }
  // 根据 JSX 拿到 真实DOM
  comp.base = base
}

/**
 * 设置类组件的属性
 * @param {object} comp 组件
 * @param {object} props 属性
 */
function setComponentProps(comp, props) {

  // comp 实例还没有被加载
  // 可以实现 componentWillMount/componentWillReceiveProps 两个生命周期
  if (!comp.base) {
    if (comp.componentWillMount) {
      comp.componentWillMount()
    } else if (comp.componentWillReceiveProps) {
      comp.componentWillReceiveProps()
    }
  }

  // 设置组件的属性
  comp.props = props
  // 渲染组件
  renderComponent(comp)
}

/**
 * 根据JSX对象生成DOM节点
 * @param {any} vnode JSX 对象
 */
function _render(vnode) {

  // 如果没传，什么也不做
  if (vnode === undefined || vnode === null || typeof vnode === 'boolean') {
    vnode = ''
  }

  if (typeof vnode === 'number') {
    console.log('是数字啊')
    vnode = String(vnode)
  }

  // 如果 vnode 仅仅是个字符串，则返回一个文本节点
  if (typeof vnode === 'string') {
    return document.createTextNode(vnode)
  }

  // 如果 tag 是组件
  if (typeof vnode.tag === 'function') {
    // 1 创建组件
    const comp = createComponent(vnode.tag, vnode.attrs)
    // 2 设置组件的属性
    setComponentProps(comp, vnode.attrs)
    // 3 组件渲染的节点对象返回
    return comp.base
  }

  // 到了这一步，说明 vnode 是个正经的虚拟 DOM 节点
  // 我们要根据 vnode 里面的 tag 来创建真实 DOM 节点了
  const { tag, attrs } = vnode
  // 创建节点对象
  const dom = document.createElement(tag)

  // 是否有属性
  if (attrs) {
    Object.keys(attrs).forEach(key => {
      const value = attrs[key]
      setAttribute(dom, key, value)
    })
  }

  console.log(vnode)
  // 递归渲染子节点
  vnode.childrens.forEach(child => {
    render(child, dom)
  })

  return dom
}

// 设置属性
function setAttribute(dom, key, value) {
  if (key === 'className') {
    key = 'class'
  }

  if (key === 'style') {
    if (!value || typeof value === 'string') {
      dom.style.cssText = value
    } else if (value && typeof value === 'object') {
      // {width: 20}
      for (const _key in value) {
        dom.style[_key] =
          typeof value[_key] === 'number' ? value[_key] + 'px' : value[_key]
      }
    }
  } else if (/on\w+/.test(key)) {
    // 正则判断是否为事件，onClick, onBlur ...
    key = key.toLowerCase()
    dom[key] = value || ''
  } else {
    if (key in dom) {
      dom[key] = value || ''
    }

    if (value) {
      dom.setAttribute(key, value)
    } else {
      dom.removeAttribute(key)
    }
  }
}

export default ReactDOM
