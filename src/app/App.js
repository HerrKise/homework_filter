import React from "react";
import Users from "./components/users";
import NavBar from "./components/navBar";
import { Route, Switch } from "react-router-dom";
import MainPage from "./components/mainPage";
import Login from "./components/login";
import UserPage from "./components/userPage";

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/users/:id" component={UserPage} />
                <Route path="/users" component={Users} />
                <Route path="/login" component={Login} />
                <Route path="/" component={MainPage} />
            </Switch>
        </>
    );
}

export default App;
