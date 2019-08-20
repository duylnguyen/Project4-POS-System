import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import axios from "axios"

export default class Ticket extends Component {

    state = {
        ticket: {
            table_number: '',
            open_time: '',
            close_time: '',
            open_ticket: false,
            menuItems: [],
            user: this.props.match.params.id
        },
        ticketItems: [],
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
            res.data.menu_items.forEach((item) => {
                axios.get(`/api/v1/menus/${item}/`)
                    .then((item) => {
                        let ticketItems = [...this.state.ticketItems]
                        ticketItems.push(item.data)
                        this.setState({ticketItems: ticketItems })
                    })
            })
            this.setState({
                ticket: res.data
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
			return <Redirect to='/users' />;
        }

        return (
            <div>
                <p>Table: {this.state.ticket.table_number}</p>
                <p>Open: {this.state.ticket.open_time}</p>
                <p>Server ID: {this.state.ticket.user}</p>
                {this.state.ticketItems.map(item => (
                    <div>
                        <p>{item.name}  ${item.price}</p>
                    </div>    
                ))}

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