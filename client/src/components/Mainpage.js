import React, { Component } from "react"
import { Link } from "react-router-dom"

export default class Mainpage extends Component {

    state = {
        isAdminViewDisplayed: false
    }

    handleToggleAdminView= () => {
		this.setState(state => {
			return { isAdminViewDisplayed: !state.isAdminViewDisplayed };
		});
	};

    render() {
        return (
            <div className='mainpage'>
            {this.state.isAdminViewDisplayed ? (
                <div className='wrapper1'>
                    <div className='menu'>
                        <Link to='/menusAdmin'><button>Menu Items</button></Link>
                    </div>
                    <div className='ticket'>
                        <Link to='/ticketsAdmin'><button>Tickets</button></Link>
                    </div>
                    <div className='user'>
                        <Link to='/usersAdmin'><button>Employees</button></Link>
                    </div>
                    <div className='mainpage'>
                        <button onClick={this.handleToggleAdminView}>Log Out</button>
                    </div>
                </div>
            
            ) : (
                <div className='wrapper1'>
                    <div className='menu'>
                        <Link to='/menus'><button>Menu Items</button></Link>
                    </div>
                    <div className='login'>
                        <Link to='/users'><button>Employees Log In</button></Link>
                    </div>
                    <div className='admin'>
                        <button onClick={this.handleToggleAdminView}>Admin</button>
                    </div>
                </div>
            )
            }
            </div>
        )
    }
}
