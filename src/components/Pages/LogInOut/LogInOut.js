import React from "react"
import {history} from "../../../helpers/history"
import Register from "./Register"
import Login from "./Login"


export default function LogInOut() {
    let {pathname} = history.location
    pathname = pathname.substr(1)
    return(
        <>
            {pathname === "signup" && <Register/>}
            {pathname === "signin" && <Login/>}
        </>
    )

}


