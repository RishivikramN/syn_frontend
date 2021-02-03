import React,{useState} from 'react'
import {Alert,Card,Button} from "react-bootstrap"
import {useAuth} from "../../contexts/AuthContext"
import { Link , useHistory} from 'react-router-dom';
import CenteredContainer from "../authentication/CenteredContainer";


export default function Profile() {
    const [error,setError] = useState("");
    const history = useHistory();

    const {currentUser,logout} = useAuth();

    const handleLogout = ()=>{
        setError("");
        try{
            logout();
            history.push("/login");
        }
        catch(ex){
            setError("Failed to Logout");
        }
    }

    return (
        <CenteredContainer>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <strong>Email: </strong>{currentUser && currentUser.emailId}
                    {/*<Link to="/update-profile" className="btn btn-primary w-100 mt-5"> Update Profile </Link>*/}
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}>Log Out</Button>
            </div>
        </CenteredContainer>
    )
}
