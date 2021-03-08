import React, {Component} from "react"
import {Nav} from "react-bootstrap"
import {NavLink} from "react-router-dom"
import classes from "./NavMenu.module.sass"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";

const links = [
    {
        title: "Home",
        address: "home"
    },
    {
        title: "About",
        address: "about"
    },
    {
        title: "Contact",
        address: "contact"
    },
    {
        title: "Sign up",
        address: "login"
    },
]


class NavMenu extends Component {
    state = {
        offset: false,
        show: false,
    }

    handleScroll =() => {
        let DOMPosition = document.body.getBoundingClientRect()
        let scrollTop = Math.abs(DOMPosition.y)
        if (!this.state.offset && scrollTop> 40) {
            this.setState({offset: true})
        }
        if (this.state.offset && scrollTop< 40) {
            this.setState({offset: false})
        }


    }
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll)
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll)
    }

    render() {
        const {offset, show} = this.state
        return (
            <header className={`${classes.navMenu} ${ offset? classes.offset:""}`}>
                <NavLink to="/" className={`${classes.logo}`}>
                    <div>Todo</div>
                </NavLink>
                <Nav className={`${classes.menu} ${show? classes.show:""}`}>
                    {
                        links.map((link, index)=>(
                            <NavLink to={`/${link.address}`} key={index}
                                     activeClassName={classes.active}
                                     className={`${classes.label}`}
                                     onClick={()=> this.setState({show: !show})}
                            >
                                <div className={`${classes.link}`}>{link.title}</div>
                            </NavLink>
                        ))
                    }
                </Nav>
                <button className={`${classes.bars} ${show? classes.show:""}`}
                        onClick={()=> this.setState({show: !show})}
                >
                    <FontAwesomeIcon icon={faBars} />
                </button>

            </header>
        )
    }
}

export default NavMenu