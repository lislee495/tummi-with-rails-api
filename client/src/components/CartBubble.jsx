import React from 'react';

export default function CartBubble(props) {
  return(
    <div className="cart-badge">
        {props.cart.length}
    </div>
  )
}