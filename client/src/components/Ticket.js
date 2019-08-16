import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import axios from "axios"

export default class User extends Component {

    state = {
        ticket: {
            table_number: '',
            open_time: '',
            close_time: '',
            open_ticket: false,
            menuItems: [],
            user: this.props.match.params.id
        },
        isEditFormDisplayed: false,
        redirectToTickets: false,
        error: ''
    }

    componentDidMount() {
        const ticketId = this.props.match.params.id
        this.getSingleTicket(ticketId)
    }

    getSingleTicket = async (ticketId) => {
        try {
            const res = await axios.get(`/api/v1/tickets/${ticketId}/`)
            this.setState({
                ticket: res.data,
                menuItems: res.data.menuItems
            })
        } catch(error) {
            this.setState({ error: error.message })
        }
    }

    handleDelete = () => {
        axios.delete(`/api/v1/tickets/${this.state.ticket.id}/`)
            .then(() => {
                this.setState({
                    redirectToTickets: true
                })
                .then(() => {
                    this.getSingleTicket()
                })
            })
            .catch((err) => {
                console.log(err.res)
            })   
    }
 
    render() {

        if (this.state.redirectToTickets) {
			return <Redirect to='/tickets' />;
        }

        return (
            <div>
                <p>Table: {this.state.ticket.table_number}</p>
                <p>Open: {this.state.ticket.open_time}</p>
                <p>Server ID: {this.state.ticket.user}</p>

                <button
					className='toggleBtn'
					onClick={this.handleToggleEditForm}>
					Edit Ticket
				</button>
                <button onClick={this.handleDelete}>Delete Ticket</button>
                
            </div>
        )
    }
}