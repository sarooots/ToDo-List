import React, {useEffect} from "react"
import {history} from "../../helpers/history"
import {withRouter} from "react-router-dom"
import cls from "./Wrapper.module.sass"
import OverlayScrollbars from 'overlayscrollbars';
import {store} from "../../store/store";
import * as act from "../../store/actTypes";

function Wrapper(WrappedComponent) {

  return withRouter(function Component(props)  {

    // add custom scrollbar and onscroll event function
    useEffect(() => {
      const instance = OverlayScrollbars(document.querySelector("body"), {
        scrollbars: {clickScrolling: true},
        callbacks: {
          onScroll: () => {
            let scrollTop = instance.scroll().position.y >40
            if (instance.scroll().position.y < 150) {
              store.dispatch({type: act.SET_OFFSET, scrollTop})
            }
          }
        }
      });

    })

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
