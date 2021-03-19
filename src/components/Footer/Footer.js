import React from "react"
import cls from "./Footer.module.sass"
import {Link} from "react-router-dom";

// the following 4 arrays includes links addresses and link text
const author = [
  {
    title: "Github",
    address: "https://github.com/sarooots"
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
]

const trainer = [
  {
    title: "Github",
    address: "https://github.com/MASISKAR"
  },
  {
    title: "Facebook",
    address: "https://www.facebook.com/masiskar"
  },
]
const bitschool = [
  {
    title: "Website",
    address: "https://bitschool.am/"
  },
  {
    title: "Facebook",
    address: "https://www.facebook.com/bitschool.am"
  },
]

function Footer () {
  return (

    <footer className={cls.footer}>

      {/*1st element of footer, all links grouped*/}
      <div className={cls.links}>
        <div className={cls.row}>
          <div className={cls.linkGroup}>
            <h4 className={cls.title}>Pages</h4>
            {
              pages.map((link, index)=>(
                <Link to={link.address}
                      className={cls.link}
                      key={index}
                >
                  {link.title}
                </Link>
              ))
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
            <h4 className={cls.title}>Trainer</h4>
            {
              trainer.map((link, index)=>(
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

export default Footer