import React,{useRef,useState} from 'react'
import {Alert,Form,Card,Button} from "react-bootstrap"
import { Link, useHistory } from 'react-router-dom';
import {useAuth} from "../contexts/AuthContext"

export default function SignUp() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const history = useHistory();
    
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);

    const {login} = useAuth();

    //handlers
    const handleSubmit = async (e)=>{
        e.preventDefault();

        
        let email = emailRef.current.value;
        let password = passwordRef.current.value;
    
        try{
            setLoading(true);
            setError("");
            await login(email, password);    
            history.push("/");
        }
        catch(ex){
            setError("Email/Password is Incorrect");
        }
        setLoading(false);
    }

    return (
        <React.Fragment>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required/>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required/>
                        </Form.Group>
                        <Button type="submit" className="w-100 text-center mt-2">Login</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
        </React.Fragment>
    )
}
