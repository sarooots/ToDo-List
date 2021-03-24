import decode from "jwt-decode";
import {store} from "../store/store"
import {LOGOUT_SECCESS} from "../store/actTypes";
import {history} from "./history"

export default function request(url, method = "GET", body) {
  const config = {
    method,
    headers: {
      "Content-Type": 'application/json',
    }
  }
  if(body) {
    config.body = JSON.stringify(body);
  }

  return fetch(url, config)
    .then(async (response)=>{
      const res = await response.json()
      if (response.status >= 400 && response.status <600) {
        throw res.error ?res.error : new Error("Something went wrong!")
      }

      return res
    })
}











export const getToken = () =>{
  const token = localStorage.getItem("token")
  if (token) {

    const parsed =  JSON.parse(token)
    const decoded = decode(parsed.jwt)

    const currentDate = new Date().getTime()/1000
    const tokenDate = decoded.exp

    if (tokenDate - currentDate > 60) {
      return Promise.resolve(parsed.jwt)
    }
    else {
      const apiHost = process.env.REACT_APP_API_HOST
      return request(`${apiHost}/user/${decoded.user}/token`,"PUT",
        {
          refreshToken: parsed.refreshToken
        })
        .then(token => {
          saveToken(token)
          console.log(token.jwt)
          return token.jwt
        })
        .catch(()=>{
          logout()
        })
    }
  }
  else{
    logout()
  }
}

export function saveToken(token) {
  localStorage.setItem("token", JSON.stringify(token))
}

export function logout() {
  localStorage.removeItem("token")
  store.dispatch({type: LOGOUT_SECCESS})
  history.push("/")

}

export function checkLoginStatus () {
  const token = localStorage.getItem("token")
  return !!token
}