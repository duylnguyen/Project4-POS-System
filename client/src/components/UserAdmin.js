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
			return <Redirect to='/usersAdmin' />;
        }
        
        let ticketList = this.state.user.tickets.map(ticket => {
			return (
				<div className="userTicket">
					<Link to={`/usersAdmin/${this.props.match.params.id}/ticketsAdmin/${ticket.id}`}>
                        <button>TABLE {ticket.table_number}</button>
					</Link>
				</div>
			);
		});

        return this.state.isEditFormDisplayed ? (
			<div className="newForm">
				<form className="ui form" id="newUserForm" onSubmit={this.handleSubmit}>
					<div className="field">
						<label htmlFor='user-first_name'>FIRST NAME</label>
						<input 
							placeholder="First Name" 
							type='text'
							id='user-first_name'
							name='first_name'
							value={this.state.user.first_name}
							onChange={this.handleChange}
						/>
					</div>
					<div className="field">
						<label htmlFor='user-last_name'>LAST NAME</label>
						<input 
							placeholder="Last Name"
							type='text'
							id='user-last_name'
							name='last_name'
							value={this.state.user.last_name}
							onChange={this.handleChange}
						/>
					</div>
					<div className="field">
							<label htmlFor='user-phone'>PHONE</label>
							<input
								type='text'
								id='user-phone'
								name='phone'
								value={this.state.user.phone}
								onChange={this.handleChange}
							/>
					</div>
					<button type="submit" class="ui button" id="newUserBtn">SUBMIT</button>
				</form>
            </div>
		) : (
            <div className="userInfo">
                <h3>User ID: {this.state.user.id}</h3>
                <h3>First Name: {this.state.user.first_name}</h3>
                <h3>Last Name: {this.state.user.last_name}</h3>
                <h3>Phone: {this.state.user.phone}</h3>
            
                <div className="userTicket">
                    {ticketList}
                </div>
                <div>
                    <Link to={`/users/${this.props.match.params.id}/tickets/new`}>
                        <button className="greenBtn">NEW TICKET</button>
                    </Link>

                    <button
                        className="greenBtn"
                        onClick={this.handleToggleEditForm}>
                        EDIT
                    </button>
                    <button className="deleteBtn" onClick={this.handleDelete}>DELETE</button>
                </div>
                
            </div>
        )
    }
}