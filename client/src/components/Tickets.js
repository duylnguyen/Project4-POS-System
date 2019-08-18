import React, { Component } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

export default class Tickets extends Component {

    state = {
        tickets: [],
        user: {},
        error: ''
    
    }

    componentDidMount() {
        this.getAllTickets()
    }

    getAllTickets = async () => {
        try {
            const res = await axios.get('/api/v1/tickets/')
            this.setState({ tickets: res.data })
        } catch(err) {
            console.log(err)
            this.setState({ error: err.message })
        }   
    }

    render() {
        if (this.state.error){
            return <div>{this.state.error}</div>
        }
        return (
            <div>
                <div>
                    <h1>All Tickets</h1>
                    {this.state.tickets.map(ticket => (
                        <div key={ticket.id}>
                            <Link to={`/tickets/${ticket.id}`} >
                                <p>Ticket #: {ticket.id}  Open: {ticket.open_time}</p>
                                <p>Server Id: {ticket.user}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
