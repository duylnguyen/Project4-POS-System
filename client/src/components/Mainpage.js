import React, { Component } from "react"
import { Link } from "react-router-dom"

export default class Mainpage extends Component {
    render() {
        return (
            <div className='mainpage'>
                <div className='wrapper1'>
                    <div className='menu'>
                        <Link to='/menus'><button>Menu Items</button></Link>
                    </div>
                    <div className='ticket'>
                        <Link to='/tickets'><button>Tickets</button></Link>
                    </div>
                    <div className='user'>
                        <Link to='/users'><button>Employees</button></Link>
                    </div>
                    <div className='login'>
                        <button>Log In</button>
                    </div>
                </div>
            </div>
        )
    }
}
