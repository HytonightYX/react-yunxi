const ReactDOM = {
  render
}

/**
 * 渲染
 * @param {any} vnode 虚拟 Node
 * @param {any} container 节点
 */
function render(vnode, container) {
  // 如果没传，什么也不做
  if (vnode === undefined) return

  // 如果 vnode 仅仅是个字符串，则返回一个文本节点
  if (typeof vnode === 'string') {
    const textNode = document.createTextNode(vnode)

    return container.appendChild(textNode)
  }

  // 到了这一步，说明 vnode 是个正经的虚拟 DOM 节点
  // 我们要根据 vnode 里面的 tag 来创建真实 DOM 节点了
  const { tag, attrs } = vnode
  // 创建节点对象
  const dom = document.createElement(tag)

  // 是否有属性
  if (attrs) {
    console.log(attrs)
    Object.keys(attrs).forEach(key => {
      const value = attrs[key]
      setAttribute(dom, key, value)
    })
  }

  // 递归渲染子节点
  vnode.childrens.forEach(child => {
    render(child, dom)
  })

  return container.appendChild(dom)
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
