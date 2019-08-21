import React, { Component } from "react"
import axios from "axios"
import { Redirect } from "react-router-dom"

export default class MenuItem extends Component {

    state = {
        menu: {
            menu_type: '',
            name: '',
            price: '',
            tickets: []
        },
        isEditFormDisplayed: false,
        redirectToMenuItems: false,
        error: ''
    }

    componentDidMount() {
        const menuId = this.props.match.params.id
        this.getSingleMenuItem(menuId)
    }

    getSingleMenuItem = async (menuId) => {
        try {
            const res = await axios.get(`/api/v1/menus/${menuId}/`)
            this.setState({
                menu: res.data,
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

    handleChange = (event) => {
        let copiedMenu = {...this.state.menu}
        copiedMenu[event.target.name] = event.target.value

        this.setState({ menu: copiedMenu })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        axios.put(`/api/v1/menus/${this.props.match.params.id}/`, this.state.menu)
            .then((res) => {
                this.setState({
                    menu: res.data,
                    isEditFormDisplayed: false
                })
                .then(() => {
                    this.getSingleMenuItem()
                })
            })
            .catch((err) => {
                console.log(err.res)
            })   
    }

    handleDelete = () => {
        axios.delete(`/api/v1/menus/${this.state.menu.id}/`)
            .then(() => {
                this.setState({
                    redirectToMenuItems: true
                })
                .then(() => {
                    this.getSingleUser()
                })
            })
            .catch((err) => {
                console.log(err.res)
            })   
    }

    render() {

        if (this.state.redirectToMenuItems) {
			return <Redirect to='/menus' />;
        }

        return this.state.isEditFormDisplayed ? (
			<form onSubmit={this.handleSubmit}>
				<div>
					<label htmlFor='menu-menu_type'>TYPE</label>
					<input
						type='text'
						name='menu_type'
						id='menu-menu_type'
						onChange={this.handleChange}
						value={this.state.menu.menu_type}
					/>
				</div>

				<div>
					<label htmlFor='menu-name'>NAME</label>
					<input
						type='text'
						name='name'
						id='menu-name'
						onChange={this.handleChange}
						value={this.state.menu.name}
					/>
				</div>

				<div>
					<label htmlFor='menu-price'>PRICE</label>
					<input
						type='text'
						name='price'
						id='menu-price'
						onChange={this.handleChange}
						value={this.state.menu.price}
					/>
				</div>

				<input type='submit' value='Submit' />
			</form>
		) : (
            <div>
                <p>Type: {this.state.menu.menu_type}</p>
                <p>Name: {this.state.menu.name}</p>
                <p>Price: ${this.state.menu.price}</p>
                <button
					className='toggleBtn'
					onClick={this.handleToggleEditForm}>
					Edit Menu Item
				</button>
                <button onClick={this.handleDelete}>DELETE</button>
            </div>
            
        )
    }
}