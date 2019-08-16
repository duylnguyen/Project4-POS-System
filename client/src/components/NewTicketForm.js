import React, { Component } from 'react'
import MenuItemList from "./MenuItemList"
import axios from "axios"

export default class NewTicketForm extends Component {

    state = {
        newTicket: {
            table: '',
            open: '',
            close: '',
            openTicket: false,
            menuItems: [],
            user: this.props.match.params.id
        },
        selectedItems: []
    }

    handleChange = event => {
		const copiedNewTicket = { ...this.state.newTicket };
		copiedNewTicket[event.target.name] = event.target.value;
		this.setState({ newTicket: copiedNewTicket });
	};

	handleSubmit = (event) => {
		event.preventDefault();
        axios.post(`/api/v1/tickets/`, this.state.newTicket)
            .then(() => {
			this.setState({
				newTicket: {
                    table: '',
                    open: new Date,
                    close: '',
                    openTicket: true,
                    menuItems: [],
                    user: this.props.match.params.id
                },
                redirectToAllUsers: true
			});
		});
    };
    
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
                table: state.newTicket.table,
                open: state.newTicket.open,
                close: state.newTicket.close,
                openTicket: state.newTicket.openTicket,
                menuItems: state.selectedItems,
                user: state.newTicket.user
            }}
        })
    }

    render() {
        return (
            <div>
                <MenuItemList handleMenuItem={this.handleMenuItem} />
            </div>
        )
    }
}
