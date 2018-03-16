import React from 'react';
import { connect } from 'react-redux';
import randomColor from 'randomcolor';
import {fetchFavoriteDishes, fetchOrders, foundRestaurants} from '../redux/'
import FavoritesDiv from './FavoritesDiv'
import PastOrdersDiv from './PastOrdersDiv'

class FavoritesPage extends React.Component {
    constructor (){
        super()
        this.state = {groupedOrders: []}
        this.groupOrders = this.groupOrders.bind(this)
    }
    componentDidMount(){
        this.props.fetchInitialData(this.props.currentUser)
    }

    groupOrders = function(arr, prop) {
        return arr.reduce(function(groups, item) {
          const val = item[prop]
          groups[val] = groups[val] || []
          groups[val].push(item)
          return groups
        }, [])
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.orders.orders.length !== nextProps.orders.orders.length) {
            let orders = this.groupOrders(nextProps.orders.orders, 'orderNum').slice(1)
            this.setState({ groupedOrders: orders})
        }
    }
    render() {
        const {favoriteDishes, orders} = this.props
        return (
            <div className="favorites-page">
                <div className="favorites-content">
                    <h4>Favorites</h4>
                    <hr/>
                    <ul>
                    {favoriteDishes[0] && favoriteDishes.map(dish => 
                        <FavoritesDiv dish={dish} key={dish.id}/>
                    )}
                    </ul>
                    
                    <h4>Past Orders</h4>
                    <hr/>
                    <ul className="left-align">
                    {this.state.groupedOrders.length > 0 && this.state.groupedOrders.map(order => 
                        <PastOrdersDiv key={order[0].id} order={order} dishes={orders.dishArray} restaurants={orders.restaurantArray}/>)
                    }
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = function (state) {
  return {
    currentUser: state.currentUser,
    favoriteDishes: state.user_pref.favoriteDishes,
    orders: state.user_pref.orders
  };
};
const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchInitialData: (currentUser) => {
        dispatch(foundRestaurants([]))
        dispatch(fetchOrders(currentUser))
        dispatch(fetchFavoriteDishes(currentUser))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage);
