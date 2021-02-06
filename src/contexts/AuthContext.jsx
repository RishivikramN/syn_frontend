import React, { useContext, useState } from 'react';
import useStateRef from "react-usestateref";
import axios from "axios";
import { signupEndpoint, signinEndpoint } from "../Endpoints";

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}){
    const [currentUser,setCurrentUser] = useState();
    const [token, setToken] = useState("");
    const [serverError,setServerError, serverErrorRef] = useStateRef("");

    const signUp = async (username,email,password) => {
        const JSONPayload = {
            userName: username,
            emailId : email,
            password
        }
            setServerError("");
            const response = await axios.post(signupEndpoint, JSONPayload);
            console.log(response.data.error);
            if(response.data.error && response.data.error.length > 0){
                setServerError(response.data.error);
                console.log(serverErrorRef.current);
            }
            else
                setCurrentUser(response.data);
    }

    const login = async ( email, password) =>{
        const JSONPayload = {
            emailId : email,
            password
        }
        const result = await axios.post(signinEndpoint, JSONPayload);
        setCurrentUser({emailId:email,userName:result.data.username});

        setToken(result.data.token.toString());
        localStorage.setItem("authtoken",token);
    }

    const logout = () => {
        localStorage.removeItem("authtoken");
        setToken("");
    }

    const value={
        currentUser,
        signUp,
        login,
        logout,
        token,
        serverError : serverErrorRef.current
    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}