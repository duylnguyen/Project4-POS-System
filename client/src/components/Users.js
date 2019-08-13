import React, { Component } from "react"
import axios from "axios"

export default class Users extends Component {

    state = {
        users: []
    }

    componentDidMount() {
        this.getAllUsers()
    }

    getAllUsers = async () => {
        const res = await axios.get('/api/user')
        this.setState({
            users: res.data
        })
        console.log(res)
    }

    render() {
        let usersList = this.state.users.map((user) => {
            return (
                <div>
                    <h3>{user.firstName} {user.lastName}</h3>
                    <p>Phone: {user.phone}</p>
                </div>
            )
        })

        return (
            <div>
                {usersList}
            </div>
        )
    }
}
