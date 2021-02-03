import { AuthProvider } from "../contexts/AuthContext";
import SignUp from "./authentication/SignUp";
import Profile from "./authentication/Profile";
import Login from "./authentication/Login";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import PrivateRouteHOC from "./authentication/PrivateRouteHOC";
import DashBoard from "./gameboard/DashBoard";

function App() {
  return (
          <Router>
            <AuthProvider>
              <Switch>
                <PrivateRouteHOC exact path="/" component={DashBoard}/>
                {/* Auth Routes */}
                <PrivateRouteHOC path="/user" component={Profile}/>
                <Route path="/signup" component={SignUp}/>
                <Route path="/login" component={Login}/>
              </Switch>
            </AuthProvider>
          </Router>
  );
}

export default App;
