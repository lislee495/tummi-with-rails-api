import React from 'react';
import MenuDiv from './MenuDiv'

export default class Menu extends React.Component {
  render() {
    const menu=[...this.props.menu]
    const restaurant=this.props.restaurant
    return (
      <div className="menu">
        <ul className="menu-ul menu-items">
        { menu.map((dish) => {
          return <MenuDiv dish={dish} key={dish.id} restaurant={restaurant}/>
        }) }
        </ul>
      </div>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */
