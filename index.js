import React from "./react"
import ReactDOM from "./react-dom"

const ele = (
  <div className="active" title="123">
    hello<span>, react</span>
  </div>
)

ReactDOM.render(ele, document.querySelector("#root"))

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
