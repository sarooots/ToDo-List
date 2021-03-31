import React, {Component} from "react"
import {Nav} from "react-bootstrap"
import {NavLink} from "react-router-dom"
import cls from "./Header.module.sass"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {logout} from "../../store/actions"
import Logo from "../Style assets/Todo.svg"
import {history} from "../../helpers/history";
import 'overlayscrollbars/css/OverlayScrollbars.css';
import OverlayScrollbars from 'overlayscrollbars';


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


class Header extends Component {
  state = {
    offset: false, // used for conditional css class adding to header component
    show: false, // used for conditional css class adding to menu
  }




  handleHideMenu = () => {
    this.state.show && this.setState({show: false})
  }
  // add handleScroll function on window.scroll event
  componentDidMount() {
    //function to check if user scrolled down then change value of state "show" from "false" to "true"

    let customScroll = OverlayScrollbars(document.querySelectorAll('body'), {})

      document.addEventListener("DOMContentLoaded", function() {
      //The first argument are the elements to which the plugin shall be initialized
      //The second argument has to be at least a empty object or a object with your desired options
      OverlayScrollbars(document.querySelectorAll('body'), {
        scrollbars: {clickScrolling: true},
        callbacks: {
          onScroll: () => {
            let scrollTop = customScroll.scroll().position.y
            let newOffset = scrollTop> 40
            this.state.offset !== newOffset && this.setState({offset: newOffset})
          }
        }
      });
    }.bind(this));

    document.getElementById("mainWrapper").onmousedown = this.handleHideMenu
  }



  render() {
    const {offset, show} = this.state
    const {isAuthenticated, logout} = this.props
    const {pathname} = history.location
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
              // then adds ".offset" class to "Navlink" element
              const showButton = pathname.substr(0,5) === "/task"
              return <NavLink to={`/${link.address}`} key={index}
                              activeClassName={cls.active}
                              className={`${cls.label}  
                                ${isAuthenticated ? cls.logedIn: cls.logedOut}
                                ${ offset || showButton ? cls.linkWithBG:""}
                                `}
                // change "show" value to hide menu after clicking one of links
                              onClick={()=> {
                                this.setState({show: !show})
                                if (link.address === "welcome" && isAuthenticated) {
                                  const token = JSON.parse(localStorage.getItem("token"))
                                  logout(token.jwt)
                                }
                              }}
              >
                <div className={`${cls.link}`}>{link.title}</div>
              </NavLink>
            })

          }
        </Nav>
        <button className={`${cls.bars} ${show ? cls.show:''}`}
          // change "show" value to hide or show menu
                onClick={()=> this.setState({show: !show})}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

      </header>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    isAuthenticated: state.isAuthenticated,
  }
}
const mapDispatchToProps = {
  logout,
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)