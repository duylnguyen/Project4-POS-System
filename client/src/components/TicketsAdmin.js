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
            this.setState({ error: err.message })
        }   
    }

    render() {
        if (this.state.error){
            return <div>{this.state.error}</div>
        }
        return (
            <div className="allTickets">
                {this.state.tickets.map(ticket => (
                    <div key={ticket.id} className="singleTicket">
                        <Link to={`/ticketsAdmin/${ticket.id}`}>
                            <button>TABLE {ticket.table_number}</button>
                        </Link>
                    </div>
                ))}
            </div>
        );
    }
}