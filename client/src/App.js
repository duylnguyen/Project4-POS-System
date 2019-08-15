import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Mainpage from "./components/Mainpage";
import Users from "./components/Users";
import User from "./components/User"
import Tickets from "./components/Tickets"
import "./App.css";
import NewUserForm from "./components/NewUserForm";

class App extends Component {
    render() {
        return (
            <Router>
                <Mainpage />
                {/* <div> */}
                    <Switch>
                        <Route path="/tickets" component={Tickets}/>
                        <Route path="/users/new" component={NewUserForm}/>
                        <Route path="/users/:id" component={User}/>
                        <Route path="/users" component={Users}/>
                    </Switch>
                {/* </div> */}
            </Router>
        );
    }
}

export default App;
