import React,{useRef,useState} from 'react'
import {Alert,Form,Card,Button} from "react-bootstrap"
import { Link , useHistory} from 'react-router-dom';
import {useAuth} from "../contexts/AuthContext"

export default function SignUp() {
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const history = useHistory();


    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);

    const {signUp} = useAuth();

    //handlers
    const handleSubmit = (e)=>{
        e.preventDefault();

        let username = usernameRef.current.value;
        let email = emailRef.current.value;
        let password = passwordRef.current.value;
        
        try {
            setLoading(true);
            setError("");
            signUp(username, email, password);    
            history.push("/");
        } catch (error) {
            setError("Failed to Sign in");    
        }
        
        setLoading(false);
    }

    return (
        <React.Fragment>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="username">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control type="text" ref={usernameRef} required/>
                        </Form.Group>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required/>
                        </Form.Group>
                        <Button type="submit" className="w-100 text-center mt-2">Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login">Login</Link>
            </div>
        </React.Fragment>
    )
}
