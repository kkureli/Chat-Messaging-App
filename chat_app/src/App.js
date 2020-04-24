import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./components/Homepage/Homepage";
import ChatPage from "./components/Chat/ChatPage";
import SignIn from "./components/auth/SignIn";
import Signup from "./components/auth/SignUp";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/chat/:id" component={ChatPage} />
        <Route exact path="/chat" component={ChatPage} />
        <Route exact path="/login" component={SignIn}></Route>
        <Route exact path="/signup" component={Signup}></Route>
        <Route path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
