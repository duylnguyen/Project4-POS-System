import React, { Component } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

export default class MenuItemList extends Component {

    state = {
        menus: [],
        error: '',
        filteredMenus: []
    }

    componentDidMount() {
        this.getAllMenuItems()
    }

    getAllMenuItems = async () => {
        try {
            const res = await axios.get('/api/v1/menus/')
            this.setState({ menus: res.data })
        } catch(err) {
            console.log(err)
            this.setState({ error: err.message })
        }   
    }

    handleItemByType = (event) => {
        event.preventDefault()

        const target = event.target
        this.getAllMenuItems()
            if (event.target.id === "Drinks") {
                this.setState(state => {
                    return {filteredMenus: state.menus.filter(item => {
                        return item.menu_type === target.id
                    })}
                })
            } else if (event.target.id === "Appatizers") {
                this.setState(state => {
                    return {filteredMenus: state.menus.filter(item => {
                        return item.menu_type === target.id
                    })}
                })
            } else if (event.target.id === "Main Course") {
                this.setState(state => {
                    return {filteredMenus: state.menus.filter(item => {
                        return item.menu_type === target.id
                    })}
                })
            } else if (event.target.id === "Desserts") {
                this.setState(state => {
                    return {filteredMenus: state.menus.filter(item => {
                        return item.menu_type === target.id
                    })}
                })
            }
    }

    render() {

        if (this.state.error){
            return <div>{this.state.error}</div>
        }

        return (
            <div className='menuItem'>
                <div>
                    <button onClick={this.handleItemByType} id="Appatizers">Appatizers</button>
                    <button onClick={this.handleItemByType} id="Main Course">Main Course</button>
                    <button onClick={this.handleItemByType} id="Desserts">Desserts</button>
                    <button onClick={this.handleItemByType} id="Drinks">Drinks</button>
                </div>
                <div>
                {this.state.filteredMenus.map(item => (
                    <div>
                        <button onClick={this.props.handleMenuItem} name={item.id} value={item}>
                            {item.name}<br/>
                            ${item.price}<br/>
                        </button>
                    </div>
                ))}
                </div>
            </div>
        )
    }
}