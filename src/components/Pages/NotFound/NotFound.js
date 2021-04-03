import React from "react"
import cls from "./NotFound.module.sass";
import illustration from "../../Style assets/Not found page illustration.png";
import Wrapper from "../../HOC Wrapper/Wrapper";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

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

function NotFound({article, intro, isAuthenticated}){
  return <>
    {/*whole page content*/}
    <section className={cls.wrapper}>
      {/*first section of page, intro*/}
      <article className={`${intro} ${article} ${cls.article}`}>
        <div className={`${cls.introItem}`}>
          <img src={illustration} alt=""
               className={`${cls.illustration}`}
          />
        </div>

        <div className={`${cls.introItem} ${cls.introInfo}`}>
          <h1 className={`${cls.introTitle}`}>Oops! page not found</h1>
          <p className={cls.message}>The link is broken or has been moved, try these pages instead: </p>
          <div className={cls.links}>
            {

              links.map((link, index)=>{
                if (isAuthenticated) {
                  if (link.title === "Sign up" || link.title === "Sign in" || link.title === "Logout") {
                    return null
                  }
                }
                else {
                  if (link.title === "Tasks" || link.title === "Logout") {
                    return null
                  }
                }
                return <Link to={`/${link.address}`} key={index}
                             activeClassName={cls.active}
                             className={`${cls.link}  
                                `}
                >
                  {link.title}
                </Link>
              })

            }
          </div>
        </div>
      </article>

    </section>
  </>
}



const mapStateToProps = (state) => {
  return{
    isAuthenticated: state.isAuthenticated,
  }
}

export default Wrapper(connect(mapStateToProps)(NotFound))
