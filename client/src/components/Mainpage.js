import React, { Component } from "react"
import { Link } from "react-router-dom"

export default class Mainpage extends Component {
    render() {
        return (
            <div className='mainpage'>
                <div className='wrapper1'>
                    <div className='logo'>
                        <h1>POS</h1>
                    </div>
                    <div className='menu'>
                        <button>Menu Items</button>
                    </div>
                    <div className='ticket'>
                        <button>Ticket</button>
                    </div>
                    <div className='user'>
                        <Link to='/users'><button>Employees</button></Link>
                    </div>
                    {/* <div className='space'>

                    </div> */}
                    <div className='login'>
                        <button>Log In</button>
                    </div>
                </div>
            </div>
        )
    }
}
