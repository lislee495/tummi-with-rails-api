import React from 'react';
import { connect } from 'react-redux';
import {addDishToCart, addRestaurantToCart, favoriteDish, fetchFavorites} from '../../redux'
import Alert from 'react-s-alert';
class MenuDiv extends React.Component {
  componentDidMount(){
    this.props.fetchFavorites(this.props.currentUser)
  }
  render() {
  const {dish, handleClick, restaurant, currentUser, handleFavorite, favoriteDishes} = this.props
    return(
      <li>
        <div className="dish-div shadow" style={{cursor: "pointer"}} onClick={(event)=>{
          Alert.info('Added dish', {
            timeout: 2000,
            position: 'top-right',
            effect: 'flip',
            beep: false,
            offset: 100
        });
          handleClick(dish, restaurant)}}>
          <h6>{dish.name}</h6><br/>
          <em>{dish.category.join(", ")}</em><br/>
          ${dish.price} 
          {favoriteDishes.find(item => item.dish_id === dish.id) ? "Favorited" : 
         <button className="gen-btn" 
         onClick={(event)=>{
           event.stopPropagation();
           handleFavorite(dish, restaurant, currentUser)}}>Favorite</button>}
        </div>
      </li>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.currentUser,
  favoriteDishes: state.restaurants.favorites.filter(ele => ele.restaurant_id === ownProps.restaurant.id)
})
const mapDispatchToProps = (dispatch)=> ({
  handleClick: (dish, restaurant) => {
    dispatch(addDishToCart(dish))
    dispatch(addRestaurantToCart(restaurant))},
  handleFavorite: (dish, restaurant, currentUser) => dispatch(favoriteDish({dish, restaurant, currentUser})),
  fetchFavorites: (currentUser) => dispatch(fetchFavorites(currentUser))
})
export default connect(mapStateToProps, mapDispatchToProps)(MenuDiv);
