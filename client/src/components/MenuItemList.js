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
            if (event.target.id === "DRINKS") {
                this.setState(state => {
                    return {filteredMenus: state.menus.filter(item => {
                        return item.menu_type === target.id
                    })}
                })
            } else if (event.target.id === "APPATIZERS") {
                this.setState(state => {
                    return {filteredMenus: state.menus.filter(item => {
                        return item.menu_type === target.id
                    })}
                })
            } else if (event.target.id === "MAIN COURSE") {
                this.setState(state => {
                    return {filteredMenus: state.menus.filter(item => {
                        return item.menu_type === target.id
                    })}
                })
            } else if (event.target.id === "DESSERTS") {
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
            <div className="menuItem">
                <div className="typeBtn">
                    <button onClick={this.handleItemByType} id="Appatizers">APPATIZERS</button>
                    <button onClick={this.handleItemByType} id="Main Course">MAIN COURSE</button>
                    <button onClick={this.handleItemByType} id="Desserts">DESSERTS</button>
                    <button onClick={this.handleItemByType} id="Drinks">DRINKS</button>
                </div>
                <div className="itemBtn">
                {this.state.filteredMenus.map(item => (
                    <div className="singleItemBtn">
                        <button className="item" onClick={this.props.handleMenuItem} name={item.id} value={item}>
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