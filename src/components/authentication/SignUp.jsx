import React,{useRef,useState} from 'react'
import {Alert,Form,Card,Button} from "react-bootstrap"
import { Link , useHistory} from 'react-router-dom';
import {useAuth} from "../../contexts/AuthContext"
import CenteredContainer from "../authentication/CenteredContainer";
var validator = require("email-validator");

export default function SignUp() {
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const history = useHistory();


    const [error,setError] = useState("");
    const [validation,setValidation] = useState({email:"",userName:"",password:""});
    const [loading,setLoading] = useState(false);

    const {signUp} = useAuth();

    //handlers
    const handleSubmit = async (e)=>{
        e.preventDefault();

        let username = usernameRef.current.value;
        let email = emailRef.current.value;
        let password = passwordRef.current.value;
        
        try {
            setLoading(true);
            setError("");
            await signUp(username, email, password);    
            history.push("/login");

        } catch (ex) {
            setError("Failed to Sign Up");    
        }
        
        setLoading(false);
    };

    // validation handler
    const handleOnChange = (e)=>{
        let username = usernameRef.current.value;
        let email = emailRef.current.value;
        let password = passwordRef.current.value;

        setValidation({email:"",userName:"",password:""});
        
        if(username.length < 5 && username.length >=1)
            setValidation({userName:"Username should have min 5 characters"});
        if(!validator.validate(email) && email.length >=1)
            setValidation({email:"Please Enter valid Email "});
        if(password.length < 5 && password.length >=1)
            setValidation({password:"Password should have min 5 characters"});
    };

    return (
        <CenteredContainer>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="username">
                            <Form.Label>User Name</Form.Label>
                            <Form.Control for="username" type="text" ref={usernameRef} onChange={handleOnChange} required/>
                        </Form.Group>
                        {validation.userName && <Alert variant="danger">{validation.userName}</Alert>}
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
                        : "Sign Up"}</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login">Login</Link>
            </div>
        </CenteredContainer>
    )
}
