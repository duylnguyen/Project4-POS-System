import React, { Component } from "react"
import axios from "axios"
import { Redirect } from "react-router-dom"
import { Link } from "react-router-dom"

export default class MenuItemAdmin extends Component {

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
            <div className="newForm">
			<form class="ui form" id="newMenuForm" onSubmit={this.handleSubmit}>
                <div class="field">
                    <label htmlFor='menu-menu_type'>TYPE</label>
                    <input  
                        type='text'
                        id='menu-menu_type'
                        name='menu_type'
                        onChange={this.handleChange}
                        value={this.state.menu.menu_type}
                    />
                </div>
                <div class="field">
                    <label htmlFor='menu-name'>ITEM NAME</label>
                    <input 
                        type='text'
                        id='menu-name'
                        name='name'
                        onChange={this.handleChange}
                        value={this.state.menu.name}
                    />
                </div>
                <div class="field">
                    <label htmlFor='menu-price'>PRICE</label>
                    <input
                        type='text'
                        id='menu-price'
                        name='price'
                        onChange={this.handleChange}
                        value={this.state.menu.price}
                    />
                </div>
                <button type="submit" class="ui button" id="newUserBtn">Submit</button>
            </form>
            </div>
		) : (
            <div>
                <div>
                    <table className="ui large table" id="scrollable">
                        <thead className="">
                            <tr className="">
                            <th className="">Type</th>
                            <th className="">Item</th>
                            <th className="">Price</th>
                            </tr>
                        </thead>
                        <tbody className="">
                                <tr className="">
                                <td className="">{this.state.menu.menu_type}</td>
                                <td className="">{this.state.menu.name}</td>
                                <td className="">${this.state.menu.price}</td>
                                </tr>
                        </tbody>
                    </table>
                </div>

                <button
					className="greenBtn"
					onClick={this.handleToggleEditForm}>
					EDIT
				</button>
                <button className="deleteBtn" onClick={this.handleDelete}>DELETE</button>
                
            </div>
            
        )
    }
}