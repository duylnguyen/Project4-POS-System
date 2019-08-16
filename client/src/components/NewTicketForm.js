import React, { Component } from 'react'
import MenuItems from "./MenuItems"

export default class NewTicketForm extends Component {

    state = {
        ticket: {
            open: '',
            close: '',
            openTicket: false,
            menuItems: [],
            user: this.props.match.params.id
        }
    }

    render() {
        return (
            <div>
                <MenuItems />
            </div>
        )
    }
}
