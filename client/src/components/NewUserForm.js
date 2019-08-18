import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from "react-router-dom"

export default class NewUserForm extends Component {
    
    state = {
        newUser: {
            first_name: '',
            last_name: '',
            phone: '',
        },
        redirectToAllUsers: false
    }
    
    handleChange = event => {
		const copiedNewUser = { ...this.state.newUser };
		copiedNewUser[event.target.name] = event.target.value;
		this.setState({ newUser: copiedNewUser });
	};

	handleSubmit = (event) => {
		event.preventDefault();
        axios.post(`/api/v1/users/`, this.state.newUser)
            .then(() => {
			this.setState({
				newUser: {
                    first_name: '',
                    last_name: '',
                    phone: '',
                },
                redirectToAllUsers: true
			});
		});
	};

	render() {
		if (this.state.redirectToAllUsers) {
			return <Redirect to={`/usersAdmin`} />;
		}
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<div>
						<label htmlFor='user-first_name'>First Name: </label>
						<input
							type='text'
							id='user-first_name'
							name='first_name'
							value={this.state.newUser.first_name}
							onChange={this.handleChange}
						/>
					</div>
					<div>
						<label htmlFor='user-last_name'>Last Name: </label>
						<input
							type='text'
							id='user-last_name'
							name='last_name'
							value={this.state.newUser.last_name}
							onChange={this.handleChange}
						/>
					</div>
					<div>
						<label htmlFor='user-phone'>Phone: </label>
						<input
							type='text'
							id='user-phone'
							name='phone'
							value={this.state.newUser.phone}
							onChange={this.handleChange}
						/>
					</div>
					<div>
						<input type='submit' value='Submit' />
					</div>
				</form>
			</div>
		);
	}
}
