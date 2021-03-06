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
		isKeyboardDisplayed: false,
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

	handleToggleKeyboard = () => {
		this.setState(state => {
			return { isKeyboardDisplayed: !state.isKeyboardDisplayed }
		})
	} 

	render() {
		if (this.state.redirectToAllUsers) {
			return <Redirect to={`/usersAdmin`} />;
		}
		return (
			<div className="newForm">
				<form className="ui form" id="newUserForm" onSubmit={this.handleSubmit}>
					<div className="field">
						<label htmlFor='user-first_name'>FIRST NAME</label>
						<input 
							placeholder="First Name" 
							type='text'
							id='user-first_name'
							name='first_name'
							value={this.state.newUser.first_name}
							onChange={this.handleChange}
						/>
					</div>
					<div className="field">
						<label htmlFor='user-last_name'>LAST NAME</label>
						<input 
							placeholder="Last Name"
							type='text'
							id='user-last_name'
							name='last_name'
							value={this.state.newUser.last_name}
							onChange={this.handleChange}
						/>
					</div>
					<div className="field">
							<label htmlFor='user-phone'>PHONE</label>
							<input
								type='text'
								id='user-phone'
								name='phone'
								value={this.state.newUser.phone}
								onChange={this.handleChange}
							/>
					</div>
						<button type="submit" class="ui button" id="newUserBtn">SUBMIT</button>
						<button onClick={this.handleToggleKeyboard}>Keyboard</button>
					</form>
					{this.state.isKeyboardDisplayed ? (
						<div>
							<Keyboard
								onChange={input =>
								this.onChange(input)}
								onKeyPress={button =>
								this.onKeyPress(button)}
							/>
						</div>
					) : ( null)}
			</div>
		)
	}
}