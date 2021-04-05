import React from "react"
import {history} from "../../helpers/history"
import {withRouter} from "react-router-dom"
import cls from "./Wrapper.module.sass"

function Wrapper(WrappedComponent) {




return withRouter(function Component(props)  {

  const pageAddress = history.location.pathname.substr(1)
  if (pageAddress === "contact") {
    document.title = "Todo - Contact"
  }
  if (pageAddress === "tasks") {
    document.title = "Todo - Tasks"
  }
  if (pageAddress === "about") {
    document.title = "Todo - About"
  }
  if (pageAddress === "signin") {
    document.title = "Todo - Login"
  }
  if (pageAddress === "signup") {
    document.title = "Todo - Register"
  }
  if (pageAddress === "not-found") {
    document.title = "Todo - Oops! 404 bad request"
  }
  if (pageAddress.substr(0,5) === "task/") {
    document.title = "Todo - View task"
  }
  if (pageAddress === "") {
    document.title = "Todo"
  }
  return <div id="mainWrapper" className="wrapper">
    <WrappedComponent  {...props}
                       article={cls.article}
                       intro={cls.intro}
    />
  </div>
})
}


export default Wrapper
