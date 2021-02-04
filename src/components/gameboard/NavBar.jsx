import React,{useEffect} from 'react'
import {Navbar as BootStrapNavBar,Nav} from "react-bootstrap"
import { Link,useHistory } from 'react-router-dom'
import {useAuth} from "../../contexts/AuthContext"
import {clearGameArea} from "./StageArea"
import {useGameDetail} from "../../contexts/GameContext"


export default function NavBar({DashBoardScore,GameCount}) {
    const history = useHistory();

    const {currentUser,logout} = useAuth();
    const {getGameCount}  = useGameDetail();

    const handleLogout = ()=>{
        try{
            logout();
            history.push("/login");
            clearGameArea();
        }
        catch(ex){
            
        }
    }

    useEffect(()=>{
        getGameCount(currentUser.emailId);
    },[]);

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
                            <strong>Attempts Remaining :</strong> {GameCount}
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
