import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Mainpage from "./components/Mainpage";
import Users from "./components/Users";
import User from "./components/User"
import Tickets from "./components/Tickets"
import MenuItems from "./components/MenuItems"
import MenuItem from "./components/MenuItem"
import Display from "./components/Display"
import Ticket from "./components/Ticket"
import "./App.css";
import NewUserForm from "./components/NewUserForm"
import NewMenuItemForm from "./components/NewMenuItemForm"
import NewTicketForm from "./components/NewTicketForm";

class App extends Component {
    render() {
        return (
            <Router>
                <div className='container'>
                    <div className='wrapper2'>
                        <Mainpage />
                    </div>
                    {/* <div className='container2'>
                        <div className='wrapper3'>
                            <MenuItems />
                        </div>
                        <div className='wrapper4'>
                            <Display />
                        </div>
                    </div> */}
                        
                            <div className='container2'>
                                <div className='wrapper3'>
                                    <Switch>
                                        <Route path="/menus/new" component={NewMenuItemForm}/>
                                        <Route path="/menus/:id" component={MenuItem}/>
                                        <Route path="/menus" component={MenuItems}/>
                                        <Route path="/users/:id/tickets/new" component={NewTicketForm}/>
                                        <Route path="/tickets/:id" component={Ticket}/>
                                        <Route path="/tickets" component={Tickets}/>
                                        <Route path="/users/new" component={NewUserForm}/>
                                        <Route path="/users/:id" component={User}/>
                                        <Route path="/users" component={Users}/>
                                    </Switch>

                                </div>
                            <div className='wrapper4'>
                                <Display />
                        </div>
                        </div>
                    
                    
                </div>
            </Router>
        );
    }
}

export default App;
