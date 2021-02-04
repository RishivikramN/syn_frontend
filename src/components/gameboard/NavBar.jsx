import React from 'react'
import {Navbar as BootStrapNavBar,Nav} from "react-bootstrap"
import { Link,useHistory } from 'react-router-dom'
import {useAuth} from "../../contexts/AuthContext"
import {clearGameArea} from "./StageArea"


export default function NavBar({DashBoardScore}) {
    const history = useHistory();

    const {currentUser,logout} = useAuth();

    const handleLogout = ()=>{
        try{
            logout();
            history.push("/login");
            clearGameArea();
        }
        catch(ex){
            
        }
    }

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
                    <Nav.Link as={Link} to="#">
                        <div className="text-light">
                            <strong>Hello! </strong>{currentUser && currentUser.emailId}
                        </div>
                    </Nav.Link>
                    <Nav.Link as={Link} to="#">
                        <div className="text-light">
                            <strong>Highest Score :</strong> {DashBoardScore}
                        </div>
                    </Nav.Link>
                    <Nav.Link as={Link} to="#" onClick={handleLogout}>
                        <div className="text-light">
                            <strong>LogOut</strong>
                        </div>
                    </Nav.Link>
                </Nav>
            </BootStrapNavBar.Collapse>  
        </BootStrapNavBar>
    )
}
