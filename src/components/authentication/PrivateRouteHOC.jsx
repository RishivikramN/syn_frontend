import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function PrivateRouteHOC({component:Component , ...restprops}){
    const {currentUser} = useAuth();
    console.log(currentUser);
    return (
        <Route
        {...restprops}
        render={
            props=> { return currentUser ? <Component {...props}/> : <Redirect to="/login"/>}
        }
        >

        </Route>
    )
}