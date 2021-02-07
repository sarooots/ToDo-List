import React, {PureComponent} from "react"
import { Navbar, Nav} from "react-bootstrap"
import {NavLink} from "react-router-dom"
import classes from "./NavMenu.module.sass"

class NavMenu extends PureComponent {
    render() {
        return (
            <Navbar variant="dark" className={classes.navMenu}>
                <Navbar.Brand href="#home" className={`${classes.logo} ${classes.item}`}>To Do List</Navbar.Brand>
                <Nav className={`${classes.menu} ${classes.item}`}>
                    <NavLink to="/home" className={`${classes.link}`}>Home</NavLink>
                    <NavLink to="/about" className={`${classes.link}`}>About</NavLink>
                    <NavLink to="/contact" className={`${classes.link}`}>Contact</NavLink>
                </Nav>
            </Navbar>
        )
    }
}

export default NavMenu