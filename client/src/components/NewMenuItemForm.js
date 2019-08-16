import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from "react-router-dom"

export default class NewMenuItemForm extends Component {
    
    state = {
        newMenuItem: {
            menu_type: '',
            name: '',
            price: '',
            tickets: []
        },
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

	render() {
		if (this.state.redirectToMenuItems) {
			return <Redirect to='/menus' />;
		}
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<div>
						<label htmlFor='menu-menu_type'>Type: </label>
						<input
							type='text'
							id='menu-menu_type'
							name='menu_type'
							value={this.state.newMenuItem.menu_type}
							onChange={this.handleChange}
						/>
					</div>
					<div>
						<label htmlFor='menu-name'>Item Name: </label>
						<input
							type='text'
							id='menu-name'
							name='name'
							value={this.state.newMenuItem.name}
							onChange={this.handleChange}
						/>
					</div>
					<div>
						<label htmlFor='menu-price'>Price: </label>
						<input
							type='text'
							id='menu-price'
							name='price'
							value={this.state.newMenuItem.price}
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