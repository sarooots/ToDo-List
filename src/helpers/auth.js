import decode from "jwt-decode"
import {logout} from "../store/actions"

//get API host, this will be used to make request to API
const apiHost = process.env.REACT_APP_API_HOST

// this request function is used to make request to API without passing token in "headers"
export default function request(url, method = "GET", body) {
  const config = {
    method,
    headers: {
      "Content-Type": 'application/json',
    }
  }
  if(body) {
    config.body = JSON.stringify(body)
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










// anyway returns jwt token or calls logout function
export const getToken = () =>{
  //get token from local storage, it gives us a JSON string
  const token = localStorage.getItem("token")
  if (token) {

    //create object from the string we have got
    //the object has 2 pairs of key and value,
    //first key is "jwt" and the second one is "refreshToken"
    const parsed =  JSON.parse(token)
    //creates object with 4 pairs of keys and values
    // "userId", "timestamp", "iat", "exp"
    const decoded = decode(parsed.jwt)
    const currentDate = new Date().getTime()/1000
    // get token expiration date
    const tokenDate = decoded.exp

    //checks if token is up to date then returns current jwt token
    if (tokenDate - currentDate > 60) {
      return Promise.resolve(parsed.jwt)
    }
    //works when token expired, send request to API to get new token
    else {
      return request(`${apiHost}/user/${decoded.userId}/token`,"PUT",
        {
          refreshToken: parsed.refreshToken
        })
        .then(token => {
          saveToken(token)
          return token.jwt
        })
        .catch(()=>{
          //logout when API didn't returned new token, we pass jwt token to logout action
          const parsed =  JSON.parse(token)
          logout(parsed.jwt)
        })
    }
  }
  else{
    const parsed =  JSON.parse(token)
    logout(parsed.jwt)
  }
}


//save token in local storage
export function saveToken(token) {
  localStorage.setItem("token", JSON.stringify(token))
}

// returns true if token exist in local storage else returns false
export function checkLoginStatus () {
  const token = localStorage.getItem("token")
  return !!token
}