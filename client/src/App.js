import React, {Component} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Mainpage from "./components/Mainpage";
import Users from "./components/Users";
import UsersAdmin from "./components/UsersAdmin"
import User from "./components/User"
import UserAdmin from "./components/UserAdmin"
import Tickets from "./components/Tickets"
import MenuItemList from "./components/MenuItemList"
import MenuItemsAdmin from "./components/MenuItemsAdmin"
import MenuItem from "./components/MenuItem"
import MenuItemAdmin from "./components/MenuItemAdmin"
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
                    <div className='container2'>
                        <div className='wrapper3'>
                            <Switch>
                                <Route path="/menus/new" component={NewMenuItemForm}/>
                                <Route path="/menus/:id" component={MenuItem}/>
                                <Route path="/menusAdmin/:id" component={MenuItemAdmin}/>
                                <Route path="/menus" component={MenuItemList}/>
                                <Route path="/menusAdmin" component={MenuItemsAdmin}/>
                                <Route path="/users/:id/tickets/new" component={NewTicketForm}/>
                                
                                <Route path="/users/:id/tickets/:id" component={Ticket}/>
                                <Route path="/tickets/:id" component={Ticket}/>
                                <Route path="/tickets" component={Tickets}/>
                                <Route path="/users/new" component={NewUserForm}/>
                                <Route path="/usersAdmin/:id" component={UserAdmin}/>
                                <Route path="/users/:id" component={User}/>
                                <Route path="/users" component={Users}/>
                                <Route path="/usersAdmin" component={UsersAdmin}/>
                            </Switch>
                        </div>
                        <div className='wrapper4'>
                            
                        </div>
                    </div> 
                </div>
            </Router>
        );
    }
}

export default App;
