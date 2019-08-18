import React, { Component } from 'react'
import MenuItemList from "./MenuItemList"
import { Redirect } from "react-router-dom"
import axios from "axios"

export default class NewTicketForm extends Component {

    state = {
        newTicket: {
            table_number: 0,
            open: '',
            close: '',
            open_ticket: false,
            menu_items: [],
            user: this.props.match.params.id
        },
        selectedItems: [],
        redirectToUserTickets: false
    }
    
    handleMenuItem = (event) => {
        const target = event.target.name
        console.log(target)
        if (this.state.selectedItems.find(item => {
            return target === item
        })) {
            this.setState(state => {
                return {selectedItems: state.selectedItems.filter(item => {
                    return target !== item
                })}
            })
            } else {
            this.setState(state => {
                return {selectedItems: state.selectedItems.concat(target)
                }
            })
        }
        this.setState(state => {
            return {newTicket: {
                table_number: state.newTicket.table_number,
                open: state.newTicket.open,
                close: state.newTicket.close,
                open_ticket: state.newTicket.open_ticket,
                menu_items: state.selectedItems.map(item => {
                    return item
                }),
                user: state.newTicket.user
            }}
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`/api/v1/tickets/`, this.state.newTicket)
            .then(() => {
                this.setState({redirectToUserTickets: true})
            })
    }

    render() {
        // if (this.state.redirectToUserTickets) {
		// 	return <Redirect to={`/users/${this.props.match.user.id}/tickets`} />;
		// }
        return (
            <div>
                <MenuItemList handleMenuItem={this.handleMenuItem} />
                <button onClick={this.handleSubmit}>Add</button>
            </div>
        )
    }
}
