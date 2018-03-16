import React from 'react';
import { connect } from 'react-redux';
import {checkoutCart, clearCart, removeItem} from '../redux/cart'
import CartDish from './CartDish'

class CartBar extends React.Component {
  // constructor(){
  //   super()
  //   this.state = {
  //     newCart: {
  //     }
  //   }
  // }
  // componentWillReceiveProps(nextProps){
  //   if (this.props.cart.dishes.length !== nextProps.cart.dishes.length) {
  //     console.log("check")
  //     this.setState({newCart: nextProps.cart})
  //   }
  // }
  render(){
    const {currentUser, cartRestaurant, removeItem, cart} = this.props
    const dishes = this.props.cart.dishes
    return (
      <div className="cart-bar shadow">
        <ul className="cart">
        <h3>My Cart</h3>
          <li><a className="subheader">{cartRestaurant.name}</a></li>
          <br/>
        {dishes[0] ? 
          (  <div>
              <div className="cart-content left-align">
              {dishes.map(ele => <CartDish ele={ele} key={ele.dish.id} removeItem={removeItem}/>)}
              </div>
              <div className="h_line" style={{color:'white'}}></div>
              <li> Total: $ {cart.total.toFixed(2)} </li>
              <br/>
              <div className="divider"></div>
              <br/>
              <span> 
              <button className="gen-btn" onClick={()=>this.props.handleClear()}>Clear Cart</button>
              <button className="gen-btn" onClick={()=>this.props.handleCheckout({dishes, currentUser, cartRestaurant})}>Checkout Cart</button>
              </span>
            </div>
          ) : (<li>No items to show!</li>)
          }
        </ul>
      </div>
    );
  }
  }


/* -----------------    CONTAINER     ------------------ */
const mapStateToProps = function (state, ownProps) {
  return {
    cart: state.cart,
    currentUser: state.currentUser,
    cartRestaurant: state.cart.restaurant
  };
};
const mapDispatchToProps = (dispatch)=> ({
  removeItem: (dish) => dispatch(removeItem(dish)),
  handleCheckout: (terms)=>dispatch(checkoutCart(terms)),
  handleClear: ()=>dispatch(clearCart())
})
export default connect(mapStateToProps, mapDispatchToProps)(CartBar);
