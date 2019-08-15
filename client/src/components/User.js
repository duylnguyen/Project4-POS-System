import React, { Component } from "react"
import axios from "axios"

export default class User extends Component {

    state = {
        user: {
            first_name: '',
            last_name: '',
            phone: '',
            tickets: []
        },
        isEditFormDisplayed: false,
        redirectToUsers: false,
        error: ''
    }

    componentDidMount() {
        const userId = this.props.match.params.id
        this.getSingleUser(userId)
    }

    getSingleUser = async (userId) => {
        try {
            const res = await axios.get(`/api/v1/users/${userId}/`)
            this.setState({
                user: res.data,
                tickets: res.data.tickets
            })
        } catch(error) {
            this.setState({ error: error.message })
        }
    }

    handleToggleEditForm = () => {
        this.setState((state) => {
            return { isEditFormDisplayed: !state.isEditFormDisplayed }
        })
    }
 
    render() {
        return this.state.isEditFormDisplayed ? (
			<form onSubmit={this.handleSubmit}>
				<div>
					<label htmlFor='user-first_name'>First Name:</label>
					<input
						type='text'
						name='first_name'
						id='user-first_name'
						onChange={this.handleChange}
						value={this.state.user.first_name}
					/>
				</div>

				<div>
					<label htmlFor='user-last_name'>Last Name:</label>
					<input
						type='text'
						name='last_name'
						id='user-last_name'
						onChange={this.handleChange}
						value={this.state.user.last_name}
					/>
				</div>

				<div>
					<label htmlFor='user-phone'>Phone: </label>
					<input
						type='text'
						name='phone'
						id='user-phone'
						onChange={this.handleChange}
						value={this.state.user.phone}
					/>
				</div>

				<input type='submit' value='Submit' />
			</form>
		) : (
            <div>
                <p>First Name: {this.state.user.first_name}</p>
                <p>Last Name: {this.state.user.last_name}</p>
                <p>Phone: {this.state.user.phone}</p>
            </div>
        )
    }
}
