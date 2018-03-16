import React from 'react';
import { NavLink } from 'react-router-dom';

export default function RestaurantDetail(props){
  const restaurant = props.currentRestaurant
  return (
    <div className="restaurant-detail">
      <div className="restaurant-detail-container">
        <h4>{restaurant.name}</h4>
        <p>Price: {Array(restaurant.price_range + 1).join("$")}</p>
        <p>Address: {restaurant.location.address}</p>
        <p><button><NavLink to="/restaurant" activeClassName="active">See More</NavLink></button></p>
      </div>
    </div>
  );
}
