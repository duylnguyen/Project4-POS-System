import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from "react-router-dom"
import Keyboard from 'react-simple-keyboard'

export default class NewMenuItemForm extends Component {
    
    state = {
        newMenuItem: {
            menu_type: '',
            name: '',
            price: '',
            tickets: []
		},
		isKeyboardDisplayed: false,
        redirectToMenuItems: false
    }
    
    handleChange = event => {
		const copiedNewMenuItem = { ...this.state.newMenuItem };
		copiedNewMenuItem[event.target.name] = event.target.value;
		this.setState({ newMenuItem: copiedNewMenuItem});
	};

	handleSubmit = (event) => {
		event.preventDefault();
        axios.post(`/api/v1/menus/`, this.state.newMenuItem)
            .then(() => {
			this.setState({
				newMenuItem: {
                    menu_type: '',
                    name: '',
                    price: ''
                },
                redirectToMenuItems: true
			});
		});
	};

	handleToggleKeyboard = () => {
		this.setState(state => {
			return { isKeyboardDisplayed: !state.isKeyboardDisplayed }
		})
	} 

	render() {
		if (this.state.redirectToMenuItems) {
			return <Redirect to='/menus' />;
		}
		return (
			<div className="newForm">
				<form className="ui form" id="newMenuForm" onSubmit={this.handleSubmit}>
					<div className="field">
						<label htmlFor='menu-menu_type'>TYPE</label>
						<input 
							placeholder="Type" 
							type='text'
							id='menu-menu_type'
							name='menu_type'
							value={this.state.newMenuItem.menu_type}
							onChange={this.handleChange}
						/>
					</div>
					<div className="field">
						<label htmlFor='menu-name'>ITEM NAME</label>
						<input 
							placeholder="Item Name"
							type='text'
							id='menu-name'
							name='name'
							value={this.state.newMenuItem.name}
							onChange={this.handleChange}
						/>
					</div>
					<div className="field">
							<label htmlFor='menu-price'>PRICE</label>
							<input
								type='text'
								id='menu-price'
								name='price'
								value={this.state.newMenuItem.price}
								onChange={this.handleChange}
							/>
					</div>
						<button type="submit" class="ui button" id="newUserBtn">Submit</button>
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
		);
	}
}

