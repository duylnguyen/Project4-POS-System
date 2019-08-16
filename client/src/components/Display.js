import React, { Component } from 'react'
import MenuItems from "./MenuItems"

export default class Display extends Component {

    state = {
        displayItem: []
    }

    render() {
            if (this.state.displayItem.length === 0) {
                return (
                    <div>
                        <h1>Ticket </h1>
                        
                    </div>
                )
            } else {
                return (
                    <div>
                        <h1>Ticket</h1>
                        {this.state.menuItems.name}
                        {this.state.menuItems.price}
                    </div>
                )
            
        }
    }
}
