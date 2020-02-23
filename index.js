import React from './react'
import ReactDOM from './react-dom'

const ele = (
  <div className="active" title="123">
    hello,<span>react</span>
  </div>
)

function FuncComp() {
  return (
    <div className="active" title="123">
      hello,<span>我是函数组件</span>
    </div>
  )
}

class ClassComp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      num: 0
    }
  }

  componentWillMount() {
    console.log('componnentWillMount 组件将要挂载')
  }

  componentWillReceiveProps() {
    console.log('componentWillReceiveProps')
  }

  componentDidMount() {
    console.log('componentDidMount 组件挂载完成')
  }

  componentWillUpdate() {
    console.log('componentWillUpdate 组件将要更新')
  }

  componentDidUpdate() {
    console.log('componentDidUpdate 组件更新完成')
  }

  handleClick() {
    // 修改状态
    this.setState({
      num: this.state.num + 1
    })
  }

  render() {
    return (
      <div className="active" title="123">
        hello,<span>我是类组件，num：{this.state.num}</span>
        <div>
          <button onClick={this.handleClick.bind(this)}>点我</button>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <ClassComp name={'我是类组件'} />,
  document.querySelector('#root')
)

/* babel complier
React.createElement(tag, attrs, ...rest)

var ele = React.createElement(
  "div",
  {
    className: "active",
    title: "123"
  },
  React.createElement("span", null, "hello, react")
);
*/
