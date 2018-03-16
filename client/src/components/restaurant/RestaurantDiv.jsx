import React from 'react';
import { connect } from 'react-redux';

export default function RestaurantDiv(props) {
  const restaurant = props.restaurant
  const image_style= {backgroundImage: 'url(' + props.restaurant.featured_image + ')'}
  return(
    <li>
      <div className="restaurant-div-info">
        <div className="image-icon" style={image_style}>
        </div>
          <div className="text">{restaurant.name}</div>
      </div>
    </li>
  )
}
