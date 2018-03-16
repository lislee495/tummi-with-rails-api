import React from 'react';

export default function FavoriteDiv(props) {
    const {dish} = props
    return(
        <li>
            <div className="favorite-div">
                <h6>{dish.name}</h6> | <h7>{dish.price}</h7> | {dish.category.join(", ")}
            </div>
        </li>
    )
}