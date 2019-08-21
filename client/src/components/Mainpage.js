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
                <div className='wrapper5'>
                    <div className='menu'>
                        <Link to='/menusAdmin'><button>MENU ITEMS</button></Link>
                    </div>
                    <div className='ticket'>
                        <Link to='/ticketsAdmin'><button>TICKETS</button></Link>
                    </div>
                    <div className='user'>
                        <Link to='/usersAdmin'><button>EMPLOYEES</button></Link>
                    </div>
                    <div className='mainpage'>
                        <button onClick={this.handleToggleAdminView}>LOG OUT</button>
                    </div>
                </div>
            
            ) : (
                <div className='wrapper5'>
                    <div className='menu'>
                        <Link to='/menus'><button>MENU ITEMS</button></Link>
                    </div>
                    <div className='login'>
                        <Link to='/users'><button>EMPLOYEES LOG IN</button></Link>
                    </div>
                    <div className='admin'>
                        <button onClick={this.handleToggleAdminView}>ADMIN</button>
                    </div>
                </div>
            )
            }
            </div>
        )
    }
}
