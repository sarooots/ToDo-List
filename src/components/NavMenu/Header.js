import React, {Component} from "react"
import {Nav} from "react-bootstrap"
import {NavLink} from "react-router-dom"
import classes from "./Header.module.sass"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";

// creating array of menu links
// "title" is shown in link element
// "address" is used in link as part of link address
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
        address: "signup"
    },
]


class Header extends Component {
    state = {
        offset: false, // used for conditional css class adding to header component
        show: false, // used for conditional css class adding to menu

    }

    //function to check if user scrolled down then change value of state "show" from "false" to "true"
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
    // add handleScroll function on window.scroll event
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll)
    }
    // remove handleScroll function from window.scroll event
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll)
    }

    render() {
        const {offset, show} = this.state
        return (

            // please check "Header.module.sass" file to understand the code

            <header className={`${classes.header} ${ offset && classes.offset}`}>
                <NavLink to="/" className={`${classes.logo}`}>
                    <div>Todo</div>
                </NavLink>
                <Nav className={`${classes.menu} ${show && classes.show}`}>
                    {
                        links.map((link, index)=>(
                            <NavLink to={`/${link.address}`} key={index}
                                     activeClassName={classes.active}
                                     className={`${classes.label}`}
                                     // change "show" value to hide menu after clicking one of links
                                     onClick={()=> this.setState({show: !show})}
                            >
                                <div className={`${classes.link}`}>{link.title}</div>
                            </NavLink>
                        ))
                    }
                </Nav>
                <button className={`${classes.bars} ${show && classes.show}`}
                        // change "show" value to hide or show menu
                        onClick={()=> this.setState({show: !show})}
                >
                    <FontAwesomeIcon icon={faBars} />
                </button>

            </header>
        )
    }
}

export default Header