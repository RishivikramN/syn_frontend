import React from 'react'
import {Navbar as BootStrapNavBar,Nav} from "react-bootstrap"
import { Link } from 'react-router-dom'

export default function NavBar() {
    return (
        <BootStrapNavBar bg="primary" variant="dark" expand="sm">
            <BootStrapNavBar.Brand as={Link} to="/">
                <div className="text-light">
                Maze Mover
                </div> 
            </BootStrapNavBar.Brand>     
            <BootStrapNavBar.Toggle aria-controls="responsive-navbar-nav" />    
            <BootStrapNavBar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto"/>
                <Nav>
                    <Nav.Link as={Link} to="/user">
                        <div className="text-light">
                            Profile
                        </div>
                    </Nav.Link>
                </Nav>
            </BootStrapNavBar.Collapse>  
        </BootStrapNavBar>
    )
}
