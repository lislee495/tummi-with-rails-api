import React from 'react';

export default function CartDish(props) {
  const quantity = props.ele.quantity
  const dish = props.ele.dish
  const removeItem = props.removeItem
  return(
    <li>
      <span>
        {quantity} {dish.name} | {dish.price * quantity}
        <button className="cart-btn" onClick={()=> removeItem(dish)}>
        <img src="/images/x.png" className="x-btn" alt="Delete Item"/>
        </button>
      </span>
    </li>
  )
}
