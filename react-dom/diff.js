export function diff(dom, vnode, container) {
  console.log(dom)
  // 对比真实DOM和虚拟DOM的变化
  const ret = diffNode(dom, vnode)
  if (container) {
    container.appendChild(ret)
  }
  return ret
}

/**
 * 对比节点变化，返回更新后的节点
 * @param {HTMLElement} dom 真实DOM
 * @param {object} vnode 虚拟DOM，JSX 转换的对象
 */
function diffNode(dom, vnode) {
  let out = dom
  console.log(vnode)
  if (vnode === undefined || vnode === null || typeof vnode === 'boolean') {
    vnode = ''
  }

  if (typeof vnode === 'number') {
    vnode = String(vnode)
  }

  if (typeof vnode === 'string') {
    if (dom && dom.nodeType === Node.TEXT_NODE) {
      if (dom.textContent !== vnode) {
        // 更新节点内容
        dom.textContent = vnode
      }
    } else {
      // 创建这个文本节点
      out = document.createTextNode(vnode)
      if (dom && dom.parentNode) {
        dom.parentNode.replaceChild(out, dom)
      }
    }
    return out
  }

  // 非文本/数字，即 JSX 或者 组件
  if (!out) {
    out = document.createElement(vnode.tag)
  }

  // 开始 diff 属性
  diffAttribute(out, vnode)

  if (vnode.childrens && vnode.childrens.length > 0 || (out.childrens && out.childNodes.length > 0)) {
    // 对比组件或者子节点
    // diffChildren(out, vnode.childrens)
  }

  return out
}

/**
 * diff 属性
 */
function diffAttribute(dom, vnode) {

  const oldAttrs = {}
  const newAttrs = vnode.attrs
  const domAttrs = dom.attributes

  // 保存之前的DOM的所有属性
  for (const attr of [...domAttrs]) {
    oldAttrs[attr.name] = attr.value
  }

  // 比较原来的属性和新的属性
  // 如果老属性不在新的属性中，则将其移除（设为 undefined）
  for (let key in oldAttrs) {
    // 移除
    if (!(key in newAttrs)) {
      setAttribute(dom, key, undefined)
    }
  }

  // 如果新的属性存在在老属性中，比较值是否相等
  for (let key in newAttrs) {
    console.log(dom, key, newAttrs[key])
    // 值不同，更新值
    if (oldAttrs[key] !== newAttrs[key]) {
      setAttribute(dom, key, newAttrs[key])
    }
  }
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