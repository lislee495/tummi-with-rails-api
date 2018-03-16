import React from 'react';


export default class PastOrdersDiv extends React.Component {
    render(){
        const {order, dishes, restaurants} = this.props
        const date = new Date(Date.parse(order[0].createdAt))
        return(
            <li>
                <div className="past-orders">
                    Restaurant: {restaurants.find(ele => ele.id === order[0].restaurant_id).name} <br/>
                    When: {date.getHours()}:{date.getMinutes()}, {date.toLocaleString('en-us', { month: "long" })} {date.getDate()}, {date.getFullYear()} <br/>
                    Dishes: <ul>{order.map(ele => 
                        <li key={ele.dish_id}>{dishes.find(item=>item.id === ele.dish_id).name}</li>
                    )}</ul>
                </div>
                <hr/>
            </li>
            
        )
    }
}