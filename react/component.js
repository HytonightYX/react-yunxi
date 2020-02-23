import {renderComponent} from '../react-dom'

class Component {
  constructor(props = {}) {
    this.props = props
    this.state = {}
  }

  setState(stateChange) {
    // immutable
    Object.assign(this.state, stateChange)

    // 状态发生改变，就要重新 render 组件
    renderComponent(this)
  }
}

Component.prototype.isReactComponent = {}

export default Component