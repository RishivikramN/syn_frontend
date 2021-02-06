import { AuthProvider } from "../contexts/AuthContext";
import SignUp from "./authentication/SignUp";
import Login from "./authentication/Login";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import PrivateRouteHOC from "./authentication/PrivateRouteHOC";
import DashBoard from "./gameboard/DashBoard";
import { GameDetailProvider } from "../contexts/GameContext";

function App() {
  return (
          <Router>
            <AuthProvider>
                <GameDetailProvider>
                <Switch>
                  <PrivateRouteHOC exact path="/" component={DashBoard}/>
                  {/* Auth Routes */}
                  <Route path="/signup" component={SignUp}/>
                  <Route path="/login" component={Login}/>
                </Switch>
              </GameDetailProvider>
            </AuthProvider>
          </Router>
  );
}

export default App;
