import React, { Component } from "react"
import { Redirect } from "react-router-dom"
import axios from "axios"
import Modal from "./Modal"

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
			return <Redirect to='/usersAdmin' />;
        }

        return (
            <div>
                <div className="ticketOpen">
                    <h2>Table: {this.state.ticket.table_number}</h2>
                    <h3>Open: {this.state.ticket.open_time}</h3>
                    <h3>Server ID: {this.state.ticket.user}</h3>
                </div>
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
                            {this.state.ticketItems.map(item => (
                                <tr className="">
                                <td className="">{item.menu_type}</td>
                                <td className="">{item.name}</td>
                                <td className="">${item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                        
                        <tfoot className="">
                            <tr className="">
                            <th className="total"><strong>TOTAL</strong></th>
                            <th className="total"></th>
                            <th className=""><strong>${totalTicket}</strong></th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <Modal />
                <button className="deleteBtn" onClick={this.handleDelete}>DELETE</button>
                
            </div>
        )
    }
}