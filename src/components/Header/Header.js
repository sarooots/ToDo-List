import React, {useState, useEffect} from "react"
import {Nav} from "react-bootstrap"
import {NavLink} from "react-router-dom"
import cls from "./Header.module.sass"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {logout, getUserInfo} from "../../store/actions"
import Logo from "../Style assets/Todo.svg"
import {history} from "../../helpers/history";
import 'overlayscrollbars/css/OverlayScrollbars.css';



// creating array of menu links
// "title" is shown in link element
// "address" is used in link as part of link address
const links = [
  {
    title: "Tasks",
    address: "tasks",
  },
  {
    title: "About",
    address: "about",

  },
  {
    title: "Contact",
    address: "contact",

  },
  {
    title: "Sign up",
    address: "signup"
  },
  {
    title: "Sign in",
    address: "signin"
  },
  {
    title: "Logout",
    address: "welcome"
  },
]


function Header ({isAuthenticated, logout, user, getUserInfo, offset}) {
  const [show, setShow] = useState(false) // used for conditional css class adding to menu

  useEffect(() => {
    getUserInfo()
  }, [isAuthenticated, getUserInfo])
  const {pathname} = history.location, showButton = pathname.substr(0, 5) === "/task"
  return (

    // please check "Header.module.sass" file to understand the code
    <header className={`${cls.header} ${ offset && cls.withBG}`}
    >
      <NavLink to="/" className={`${cls.logo}`}>
        <img src={Logo} alt=""/>
      </NavLink>
      <Nav className={`${cls.menu} ${show && cls.show}`}>
        {

          links.map((link, index)=>{
            // checks if user is authenticated then hides "signin" and "signup" links
            // either if user isn't authenticated then hides "tasks" link instead of "signin" and "signup" links
            if (isAuthenticated) {
              if (link.title === "Sign up" || link.title === "Sign in") {
                return null
              }
            }
            else {
              if (link.title === "Tasks" || link.title === "Logout") {
                return null
              }
            }

            // checks if current page is one of these "Tasks", "SingleTask"
            // then adds ".offset" class to "Link" element
            return (
                <NavLink to={`/${link.address}`} key={index}
                         activeClassName={cls.active}
                         className={`${cls.label}  
                                ${isAuthenticated ? cls.logedIn: cls.logedOut}
                                ${ offset || showButton ? cls.linkWithBG:""}
                                `}
                  // change "show" value to hide menu after clicking one of links
                         onClick={()=> {
                           setShow(!show)
                           if (link.address === "welcome" && isAuthenticated) {
                             const token = JSON.parse(localStorage.getItem("token"))
                             logout(token.jwt)
                           }
                         }}
                >
                  <div className={`${cls.link}`}>
                    {link.title}
                  </div>
                </NavLink>
            )
          })

        }
      </Nav>
      {
        user &&
        <span className={`
        ${cls.user}         
        ${offset || showButton ? cls.withBG:""}
        `}
        >{`${user.name} ${user.surname}`} </span>
      }


      <button className={`${cls.bars} ${show ? cls.show:''}`}
        // change "show" value to hide or show menu
              onClick={()=> setShow( !show)}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>

    </header>
  )
}

const mapStateToProps = (state) => {
  return{
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    offset: state.offset
  }
}
const mapDispatchToProps = {
  logout,
  getUserInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)