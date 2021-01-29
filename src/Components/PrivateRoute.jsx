import React, { useContext, useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "../utils";
import AppContext from "../Context/app-context";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { appState, updateCurrentUser } = useContext(AppContext);
  const [isLogin, setLogin] = useState("false");
  useEffect(() => {
    if (appState.currentUser && appState.isAuth) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [appState]);
  useEffect(() => {
    if (appState.currentUser && appState.isAuth) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
