import React, { Component } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

export default class MenuItemList extends Component {

    state = {
        menus: [],
        displayItem: [],
        error: ''
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

    render() {
        if (this.state.error){
            return <div>{this.state.error}</div>
        }
        return (
            <div className='menuItem'>
                
                    {this.state.menus.map(menu => (
                        <div key={menu.id} className='items' >
                            
                                <button onClick={this.props.handleMenuItem} name={menu.id} value={menu}>
                                {menu.menu_type}<br/>
                                {menu.name}<br/>
                                {menu.price}<br/>
                                </button>
                            
                         </div>
                    ))}
                
            </div>
        );
    }
}