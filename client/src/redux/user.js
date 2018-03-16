import axios from 'axios'
import config from '../config'
import Promise from 'bluebird'
import { browserHistory } from 'react-router'



// /* -----------------    ACTION TYPES    ------------------ */

const RESET_PREF = "RESET_PREF"
const ADD_LIKE = "ADD_LIKE"
const ADD_DISLIKE = "ADD_DISLIKE"
const DELETE_DISLIKE = "DELETE_DISLIKE"
const DELETE_LIKE = "DELETE_LIKE"
const SET_FAVORITES = "SET_FAVORITES"
const SET_ORDERS = "SET_ORDERS"




// /* ------------     ACTION CREATORS      ------------------ */

export const addLike = like => ({type: ADD_LIKE, like})
export const deleteLike = likeInd => ({type: DELETE_LIKE, likeInd})
export const deleteDislike = dislikeInd => ({type: DELETE_DISLIKE, dislikeInd})
export const addDislike = dislike => ({type: ADD_DISLIKE, dislike})
export const resetPref = () => ({type: RESET_PREF})
export const setFavoriteDishes = favorites => ({type: SET_FAVORITES, favorites})
export const setOrders = orders => ({type: SET_ORDERS, orders})


// /* ------------          REDUCER         ------------------ */

export default function reducer (user_pref = {
  like: [],
  dislike: [],
  favoriteDishes: [],
  orders: {
    dishArray: [],
    dishIds: [],
    orders: []
  }
}, action) {
  switch (action.type) {
    case ADD_LIKE:
      return Object.assign({}, user_pref, {like: [...user_pref.like, {id: user_pref.like.length + 1, text: action.like}]})
    case ADD_DISLIKE:
      return Object.assign({}, user_pref, {dislike: [...user_pref.dislike, {id: user_pref.dislike.length + 1, text: action.dislike}]})
    case DELETE_LIKE:
      return Object.assign({}, user_pref, {like: [...user_pref.like].splice(action.likeInd, 1)})
    case DELETE_DISLIKE:
      return Object.assign({}, user_pref, {dislike:  [...user_pref.dislike].splice(action.dislikeInd, 1)})
    case RESET_PREF:
      return Object.assign({}, user_pref, {like: [], dislike: []})
    case SET_FAVORITES:
      return Object.assign({}, user_pref, {favoriteDishes: [...action.favorites]})
    case SET_ORDERS: 
      return Object.assign({}, user_pref, {orders: action.orders})
    default:
      return user_pref;
  }
}

// /* ------------       THUNK CREATORS     ------------------ */


export const fetchFavoriteDishes = currentUser => dispatch => {
  axios.get(`/api/users/${currentUser.id}/favorites`)
  .then(favorites => [...favorites.data].map(ele => ele.dish_id))
  .then(dishIds => Promise.map(dishIds, (dishId)=> {
    return axios.get(`/api/dishes/${dishId}`)
  })).then(result => result.map(ele => ele.data))
  .then(dishes => dispatch(setFavoriteDishes(dishes)))
}

export const fetchOrders =  currentUser => dispatch => {
  let order = {}
  axios.get(`/api/users/${currentUser.id}/orders`)
  .then(orders => order.orders = orders.data)
  .then(orderInfo => 
    Promise.map(order.orders.map(ele => ele.dish_id), (dishId)=> {
        return axios.get(`/api/dishes/${dishId}`)}
      ))
  .then(result => {
    order.dishArray = result.map(dish => dish.data)
    return Promise.map(order.orders.map(ele => ele.restaurant_id), (restaurantId)=> {
      return axios.get(`/api/restaurants/${restaurantId}`)
    })  
  }).then(restaurantArr => {
    order.restaurantArray = restaurantArr.map(rest => rest.data).filter((thing, index, self) => 
    self.findIndex(t => t.id === thing.id && t.name === thing.name) === index)
    dispatch(setOrders(order))
  })
}