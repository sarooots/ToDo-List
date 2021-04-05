import React from "react"
import cls from "./Footer.module.sass"
import {Link} from "react-router-dom";
import {connect} from "react-redux"

// the following 4 arrays includes links addresses and link text
const author = [
  {
    title: "Github",
    address: "https://github.com/sarooots"
  },
  {
    title: "Linkedin",
    address: "https://www.linkedin.com/in/sarooots"
  },
  {
    title: "Behance",
    address: "https://www.behance.net/sarooots"
  },
  {
    title: "DeviantArt",
    address: "https://www.deviantart.com/haykmkrtchyan"
  },
  {
    title: "Facebook",
    address: "https://www.facebook.com/sarooots"
  },
]
const pages = [
  {
    title: "Home",
    address: "/"
  },
  {
    title: "Tasks",
    address: "/tasks"
  },
  {
    title: "About",
    address: "/about"
  },
  {
    title: "Contact",
    address: "/contact"
  },
  {
    title: "Signup",
    address: "/signup"
  },
  {
    title: "Signin",
    address: "/signin"
  },
]
const bitschool = [
  {
    title: "Website",
    address: "https://bitschool.am/"
  },
  {
    title: "Linkedin",
    address: "https://www.linkedin.com/school/bitschool-it-and-business-school/"
  },
  {
    title: "Facebook",
    address: "https://www.facebook.com/bitschool.am"
  },
]

function Footer ({isAuthenticated}) {

  return (

    <footer className={cls.footer}>

      {/*1st element of footer, all links grouped*/}
      <div className={cls.links}>
        <div className={cls.row}>
          <div className={cls.linkGroup}>
            <h4 className={cls.title}>Pages</h4>
            {
              pages.map((link, index)=> {
                // checks if user is authenticated then hides "signin" and "signup" links
                // either if user isn't authenticated then hides "tasks" link instead of "signin" and "signup" links
                if (isAuthenticated) {
                  if(link.address === "/signup" || link.address === "/signin") {
                    return null
                  }
                }
                else {
                  if(link.address === "/tasks") {
                    return null
                  }
                }

                  return <Link to={link.address}
                                        className={cls.link}
                                        key={index}
                  >
                    {link.title}
                  </Link>
              })
            }
          </div>

          <div className={cls.linkGroup}>
            <h4 className={cls.title}>Author</h4>
            {
              author.map((link, index)=>(
                <a href={link.address}
                   target="_blank"
                   className={cls.link}
                   rel="noopener noreferrer"
                   key={index}
                >
                  {link.title}
                </a>
              ))
            }
          </div>
        </div>

        <div className={cls.row}>

          <div className={cls.linkGroup}>
            <h4 className={cls.title}>Bitschool</h4>
            {
              bitschool.map((link, index)=>(
                <a href={link.address}
                   target="_blank"
                   className={cls.link}
                   rel="noopener noreferrer"
                   key={index}
                >
                  {link.title}
                </a>
              ))
            }
          </div>
        </div>
      </div>

      {/*2nd element of footer, information about designer*/}
      <p className={cls.copyright}>
        design by               <a href='https://www.facebook.com/FrozenSisian'
                                   target="_blank"
                                   rel="noopener noreferrer"
      >
        Frozen Sisian Productions
      </a>
      </p>
    </footer>
  )
}


const mapStateToProps = (state) => {
  return{
    isAuthenticated: state.isAuthenticated,
  }
}

export default connect(mapStateToProps)(Footer)