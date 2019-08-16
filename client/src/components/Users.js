import React, { Component } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

export default class Users extends Component {

    state = {
        users: [],
        error: ''
    }

    componentDidMount() {
        this.getAllUsers()
    }

    getAllUsers = async () => {
        try {
            const res = await axios.get('/api/v1/users/')
            this.setState({ users: res.data })
        } catch(err) {
            console.log(err)
            this.setState({ error: err.message })
        }   
    }

    // getAllUsers = () => {
    //     axios.get(`/api/v1/users/`)
    //         .then(res => {
    //             this.setState({users: res.data})
    //         })
    // }

    render() {
        if (this.state.error){
            return <div>{this.state.error}</div>
        }
        return (
            <div className='menuItem'>
            
                    {/* <h1>All Users</h1> */}
                    {this.state.users.map(user => (
                        <div key={user.id} className='items'>
                            <Link to={`/users/${user.id}`} ><button>{user.first_name} {user.last_name}</button></Link>
                        </div>
                    ))}
                

                
                    <Link className='new-user-form' to='/users/new'><button>Add User</button></Link>
            
            </div>
        );
    }
}

