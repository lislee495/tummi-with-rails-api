import { combineReducers } from 'redux';
import currentUser from './auth';
import restaurants from './restaurants'
import cart from './cart'
import user_pref from './user'

export default combineReducers({ currentUser, restaurants, cart, user_pref });

export * from './auth';
export * from './restaurants'
export * from './cart'
export * from './user'
