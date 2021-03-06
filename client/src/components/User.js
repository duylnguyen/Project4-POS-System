import React, { Component } from "react"
import axios from "axios"
import { Redirect } from "react-router-dom"
import { Link } from "react-router-dom"

export default class User extends Component {

    state = {
        user: {
            first_name: '',
            last_name: '',
            phone: '',
            tickets: []
        },
        isEditFormDisplayed: false,
        redirectToUsers: false,
        error: ''
    }

    componentDidMount() {
        const userId = this.props.match.params.id
        this.getSingleUser(userId)
    }

    getSingleUser = async (userId) => {
        try {
            const res = await axios.get(`/api/v1/users/${userId}/`)
            this.setState({
                user: res.data,
                tickets: res.data.tickets
            })
        } catch(error) {
            this.setState({ error: error.message })
        }
    }

    handleToggleEditForm = () => {
        this.setState((state) => {
            return { isEditFormDisplayed: !state.isEditFormDisplayed }
        })
    }

    handleChange = (event) => {
        let copiedUser = {...this.state.user}
        copiedUser[event.target.name] = event.target.value

        this.setState({ user: copiedUser })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        axios.put(`/api/v1/users/${this.props.match.params.id}/`, this.state.user)
            .then((res) => {
                this.setState({
                    user: res.data,
                    isEditFormDisplayed: false
                })
                .then(() => {
                    this.getSingleUser()
                })
            })
            .catch((err) => {
                console.log(err.res)
            })   
    }

    handleDelete = () => {
        axios.delete(`/api/v1/users/${this.state.user.id}/`)
            .then(() => {
                this.setState({
                    redirectToUsers: true
                })
                .then(() => {
                    this.getSingleUser()
                })
            })
            .catch((err) => {
                console.log(err.res)
            })   
    }
 
    render() {

        if (this.state.redirectToUsers) {
			return <Redirect to='/users'/>;
        }
        
        let ticketList = this.state.user.tickets.map(ticket => {
			return (
                <div className="singleUserTickets">
					<Link to={`/users/${this.props.match.params.id}/tickets/${ticket.id}`}>
                        <button>TABLE {ticket.table_number}</button>
					</Link>
				</div>
			)
		})

        return this.state.isEditFormDisplayed ? (
			<form onSubmit={this.handleSubmit}>
				<div>
					<label htmlFor='user-first_name'>First Name</label>
					<input
						type='text'
						name='first_name'
						id='user-first_name'
						onChange={this.handleChange}
						value={this.state.user.first_name}
					/>
				</div>

				<div>
					<label htmlFor='user-last_name'>Last Name</label>
					<input
						type='text'
						name='last_name'
						id='user-last_name'
						onChange={this.handleChange}
						value={this.state.user.last_name}
					/>
				</div>

				<div>
					<label htmlFor='user-phone'>Phone</label>
					<input
						type='text'
						name='phone'
						id='user-phone'
						onChange={this.handleChange}
						value={this.state.user.phone}
					/>
				</div>

				<input type='submit' value='Submit' />
			</form>
		) : (
            <div>
                
                <h3>Server: {this.state.user.first_name} {this.state.user.last_name}</h3>
				<div>{ticketList}</div>
				<div>
					<Link to={`/users/${this.props.match.params.id}/tickets/new`}>
                        <button className="greenBtn">NEW TICKET</button>
			        </Link>
				</div>  
            </div>
        )
    }
}
