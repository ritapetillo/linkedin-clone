import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useContex } from "react";
import Profile from "./Pages/Profile";
import NavBar from "./Components/Navbar";
import Footerr from "./Components/Footerr";
import { Route, Redirect } from "react-router-dom";
import Feeds from "./Pages/Feeds";
import Dashboard from "./Components/Dashboard";
import Connections from "./Pages/Connections";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import AppState from "./Context/app-context";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="margin-80">
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>

        <Route exact path="/connections" component={Connections} />
        <Route exact path="/signup" component={SignUp} />

        <Route
          exact
          path="/profile/:user"
          render={(props) => <Profile {...props} />}
        />
        <Route exact path="/feeds" render={(props) => <Feeds {...props} />} />
        <Route exact path="/login" render={(props) => <Login {...props} />} />
      </div>
      <Footerr />
    </div>
  );
}

export default App;
