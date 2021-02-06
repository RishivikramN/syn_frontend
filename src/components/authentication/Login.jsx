import React,{useRef,useState} from 'react'
import {Alert,Form,Card,Button} from "react-bootstrap"
import { Link, useHistory } from 'react-router-dom';
import {useAuth} from "../../contexts/AuthContext"
import CenteredContainer from "../authentication/CenteredContainer";
var validator = require("email-validator");

export default function SignUp() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const history = useHistory();
    
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);
    const [validation,setValidation] = useState({email:"",password:""});

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

     // validation handler
     const handleOnChange = (e)=>{
        let email = emailRef.current.value;
        let password = passwordRef.current.value;

        setValidation({email:"",password:""});
        
        if(!validator.validate(email) && email.length >=1)
            setValidation({email:"Please Enter valid Email "});
        if(password.length < 5 && password.length >=1)
            setValidation({password:"Password should have min 5 characters"});
    };

    return (
        <CenteredContainer>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} onChange={handleOnChange} required/>
                        </Form.Group>
                        {validation.email && <Alert variant="danger">{validation.email}</Alert>}
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} onChange={handleOnChange} required/>
                        </Form.Group>
                        {validation.password && <Alert variant="danger">{validation.password}</Alert>}
                        <Button type="submit" className="w-100 text-center mt-2" disabled={loading}>{loading ? 
                            <div class="spinner-border text-light" role="status">
                        </div>
                      : "Login"}</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
        </CenteredContainer>
    )
}
