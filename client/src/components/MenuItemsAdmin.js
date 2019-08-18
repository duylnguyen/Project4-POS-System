import React, { Component } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

export default class MenuItemsAdmin extends Component {

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

    // addToCart = (menuItem) => {
    //     const copiedItemToDisplay = [...this.state.displayItem]
    //     copiedItemToDisplay.push(this.state.displayItem[menuItem])
    //     this.setState({displayItem: copiedItemToDisplay})
    // }

    render() {
        if (this.state.error){
            return <div>{this.state.error}</div>
        }
        return (
            <div className='menuItem'>
                
                    {this.state.menus.map(menu => (
                        <div key={menu.id} className='items'>
                            <Link to={`/menusAdmin/${menu.id}`} >
                                <button>
                                <p>{menu.menu_type}</p>
                                <p>{menu.name}</p> 
                                <p>${menu.price}</p>
                                </button>
                            </Link>
                        </div>
                    ))}
                

                
                    <Link className='new-menu-form' to='/menus/new'><button>Add Item</button></Link>
                
            </div>
        );
    }
}