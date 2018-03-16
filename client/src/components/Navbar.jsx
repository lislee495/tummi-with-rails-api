import React from 'react';
import { NavLink, withRouter, browserHistory } from 'react-router-dom';
import Searchbar from './Searchbar'
import CartBubble from './CartBubble'
import { connect } from 'react-redux';
import {logout} from '../redux/auth';
import {showCart} from '../redux/cart'
class Navbar extends React.Component {
  render() {
    const {cart} = this.props
    const handleCartClick = this.props.handleCartClick
    return(
      
        <div className="nav-wrap shadow">
          
            <ul className="left nav-items">
            <div className="left-nav-bar">
              <li><NavLink to="/" activeClassName="active">Home</NavLink></li></div>
            <div className="left-nav-bar">
              <li><NavLink to="/favorites" activeClassName="active">Favorites</NavLink></li></div>
            <div className="left-nav-bar">
              <li><NavLink to="/trends" activeClassName="active">Trends</NavLink></li></div>
            <div className="left-nav-bar">
              <li><NavLink to="/logout" activeClassName="active" onClick={this.props.logout}>Logout</NavLink></li>
            </div>
            </ul>
            <div className="brand-logo center">Tummi</div>
            <ul className="right nav-items position">
             <li><Searchbar history={this.props.history}/></li>
              <li><button className="cart-btn position" onClick={()=>handleCartClick()}>
              <i className="material-icons">shopping_cart</i></button></li>
              {cart.length > 0 ? <CartBubble cart={cart}/> : ""}
            </ul>
          </div>
        
    )
  }
}
const mapState = (state) => ({ 
  currentUser: state.currentUser, 
  cart: state.cart.dishes
});

const mapDispatch = (dispatch, ownProps) => ({
  logout: () => dispatch(logout(ownProps.history)),
  handleCartClick: () => {
    dispatch(showCart());
  }
});
export default withRouter(connect(mapState, mapDispatch)(Navbar));
