import React, { Component } from 'react'
import axios from "axios"
import {Redirect} from 'react-router-dom'
import MenuItemAdmin from "./MenuItemAdmin"

export default class Home extends Component {

    state = {
        menu: {
            menu_type: '',
            name: '',
            price: '',
            tickets: []
        }
    }

    // componentDidMount() {
    //     const menuId = this.props.match.params.id
    //     this.getSingleMenuItem(menuId)
    // }

    // getSingleMenuItem = async (menuId) => {
    //     try {
    //         const res = await axios.get(`/api/v1/menus/${menuId}/`)
    //         this.setState({
    //             menu: res.data,
    //         })
    //     } catch(error) {
    //         this.setState({ error: error.message })
    //     }
    // }

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
                    redirectToTickets: true
                })
                .then(() => {
                    this.getSingleMenuItem()
                })
            })
            .catch((err) => {
                console.log(err.res)
            })   
    }

    // handleMenuItem = (event) => {
    //     const target = event.target.name
    //     console.log(target)
    //     if (this.state.selectedItems.find(item => {
    //         return target === item
    //     })) {
    //         this.setState(state => {
    //             return {selectedItems: state.selectedItems.filter(item => {
    //                 return target !== item
    //             })}
    //         })
    //         } else {
    //         this.setState(state => {
    //             return {selectedItems: state.selectedItems.concat(target)
    //             }
    //         })
    //     }
    //     this.setState(state => {
    //         return {newTicket: {
    //             table_number: state.newTicket.table_number,
    //             open: state.newTicket.open,
    //             close: state.newTicket.close,
    //             open_ticket: state.newTicket.open_ticket,
    //             menu_items: state.selectedItems.map(item => {
    //                 return item
    //             }),
    //             user: state.newTicket.user
    //         }}
    //     })
    // }

    // handleSubmit = (event) => {
    //     event.preventDefault();
    //     axios.post(`/api/v1/tickets/`, this.state.newTicket)
    //         .then(() => {
    //             this.setState({redirectToTickets: true})
    //         })
    // }

    // handleTableSelect = (event) => {
    //     const target = event.target
    //     this.setState(state => {
    //         return {newTicket: {
    //             table_number: target.value,
    //             open: state.newTicket.open,
    //             close: state.newTicket.close,
    //             open_ticket: state.newTicket.open_ticket,
    //             menu_items: state.newTicket.menu_items,
    //             user: state.newTicket.user
    //         }}
    //     })
    // }

    render() {
        // if (this.state.redirectToTickets) {
        //     return <Redirect to="/"
        // }
        return (
            <div>
                <MenuItemAdmin 
                    menu={this.state.menu}
                    handleDelete={this.handleDelete}
                />    
            </div>
        )
    }
}
