import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from "react-router-dom"
import Keyboard from 'react-simple-keyboard'
// import 'simple-keyboard/build/css/index.css'

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
		const copiedNewUser = { ...this.state.newUser }
		copiedNewUser[event.target.name] = event.target.value;
		this.setState({ newUser: copiedNewUser })
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

	onChange = (input) => {
		console.log("Input changed", input);
	}
	
	onKeyPress = (button) => {
		console.log("Button pressed", button);
	}

	render() {
		if (this.state.redirectToAllUsers) {
			return <Redirect to={`/usersAdmin`} />;
		}
		return (
			<div>
				<form class="ui form" id="newUserForm" onSubmit={this.handleSubmit}>
					<div class="field">
						<label htmlFor='user-first_name'>First Name</label>
						<input 
							placeholder="First Name" 
							type='text'
							id='user-first_name'
							name='first_name'
							value={this.state.newUser.first_name}
							onChange={this.handleChange}
						/>
					</div>
					<div class="field">
						<label htmlFor='user-last_name'>Last Name</label>
						<input 
							placeholder="Last Name"
							type='text'
							id='user-last_name'
							name='last_name'
							value={this.state.newUser.last_name}
							onChange={this.handleChange}
						/>
					</div>
					<div class="field">
							<label htmlFor='user-phone'>Phone: </label>
							<input
								type='text'
								id='user-phone'
								name='phone'
								value={this.state.newUser.phone}
								onChange={this.handleChange}
							/>
					</div>
					<button type="submit" class="ui button" id="newUserBtn">Submit</button>
					</form>
					<div>
					<Keyboard
						onChange={input =>
						this.onChange(input)}
						onKeyPress={button =>
						this.onKeyPress(button)}
					/>
					</div>
			</div>
		);
	}
}