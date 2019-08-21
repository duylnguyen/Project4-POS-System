import React, { Component } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

export default class MenuItemsAdmin extends Component {

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
            } else if (event.target.id === "Appetizers") {
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
                <div className="typeBtn">
                    <button onClick={this.handleItemByType} id="Appetizers">APPETIZERS</button>
                    <button onClick={this.handleItemByType} id="Main Course">MAIN COURSE</button>
                    <button onClick={this.handleItemByType} id="Desserts">DESSERTS</button>
                    <button onClick={this.handleItemByType} id="Drinks">DRINKS</button>
                </div>
                <div className="itemBtn">
                {this.state.filteredMenus.map(menu => (
                    <div className="singleItemBtn">
                        <Link to={`/menusAdmin/${menu.id}`}>
                            <button className="item">
                                {menu.name}<br/>
                                ${menu.price}<br/>
                            </button>
                        </Link>
                    </div>
                ))}
                </div>
                <div className="addItemBtn">
                    <Link className='new-menu-item-form' to='/menus/new'><button>ADD ITEM</button></Link>
                </div>
            </div>
        )
    }
}
