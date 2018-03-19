import React from 'react';


export default class PastOrdersDiv extends React.Component {
    render(){
        const {order, dishes, restaurants} = this.props
        const date = new Date(Date.parse(order[0].created_at))
        return(
            <li>
                <div className="past-orders">
                    Restaurant: {restaurants.find(ele => ele.id === order[0].restaurant_id).name} <br/>
                    When: {date.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true})}, {date.toLocaleString('en-us', { month: "long" })} {date.getDate()}, {date.getFullYear()} <br/>
                    Dishes: <ul>{order.map(ele => 
                        <li key={ele.dish_id}>{dishes.find(item=>item.id === ele.dish_id).name}</li>
                    )}</ul>
                </div>
                <hr/>
            </li>
            
        )
    }
}