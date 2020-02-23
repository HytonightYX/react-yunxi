import React from './react'
import ReactDOM from './react-dom'

const ele = (
  <div className="active" title="123">
    hello<span>, react</span>
  </div>
)

function FC() {
  return (
    <div className="active" title="123">
      hello<span>, react</span>
    </div>
  )
}

class CC extends React.Component {
  render() {
    return (
      <div className="active" title="123">
        hello<span>, react</span>
      </div>
    )
  }
}

ReactDOM.render(<FC name={'我是函数组件'} />, document.querySelector('#root'))

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
