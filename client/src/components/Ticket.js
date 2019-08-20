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
            total: 0,
            menuItems: [],
            user: this.props.match.params.id
        },
        ticketItems: [],
        isEditFormDisplayed: false,
        redirectToTickets: false,
        error: ''
    }

    componentDidMount() {
        console.log('componentDidMount')
        const ticketId = this.props.match.params.ticketId
        this.getSingleTicket(ticketId)
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.match.params.ticketId !== prevProps.match.params.ticketId) {
          this.getSingleTicket(this.props.match.params.ticketId);
        }
      }

    getSingleTicket = async (ticketId) => {
        try {
            const res = await axios.get(`/api/v1/tickets/${ticketId}/`)
            this.setState({
                ticket: res.data,
                ticketItems: []
            })
            res.data.menu_items.forEach((item) => {
                axios.get(`/api/v1/menus/${item}/`)
                    .then((item) => {
                        let ticketItems = [...this.state.ticketItems]
                        ticketItems.push(item.data)
                        this.setState({ticketItems: ticketItems })
                    })
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

        const totalTicket = this.state.ticketItems.reduce((acc, currValue) => {
            return acc + currValue.price
        }, 0)

        if (this.state.redirectToTickets) {
			return <Redirect to='/users' />;
        }

        console.log(this.props.match.params.ticketId)

        return (
            <div key={this.props.match.params.ticketId}>
                <p>Table: {this.state.ticket.table_number}</p>
                <p>Open: {this.state.ticket.open_time}</p>
                <p>Server ID: {this.state.ticket.user}</p>
                
                {this.state.ticketItems.map(item => (
                    <div>
                        <p>{item.name}  ${item.price}</p>
                    </div>    
                ))}

                <h3>Total : ${totalTicket}</h3>

                {/* <button
					className='toggleBtn'
					onClick={this.handleToggleEditForm}>
					Edit Ticket
				</button> */}
                {/* <button onClick={this.handleDelete}>Delete Ticket</button> */}
                
            </div>
        )
    }
}