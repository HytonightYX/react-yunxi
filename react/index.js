class Component {
  constructor(props = {}) {
    this.props = props
    this.state = {}
  }
}
Component.prototype.isReactComponent = { }

function createElement(tag, attrs, ...childrens) {
  return {
    tag,
    attrs,
    childrens
  }
}

const React = {
  Component,
  createElement
}

export default React