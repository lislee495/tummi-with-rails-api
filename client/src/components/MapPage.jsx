import React from 'react';
import { connect } from 'react-redux';
import Map from './Map'
import RestaurantDetail from './restaurant/RestaurantDetail'

function MapPage(props) {
  const {currentRestaurant} = props;
  return (
    <div>
      <div className="top-items">
        { currentRestaurant.name && <RestaurantDetail currentRestaurant={currentRestaurant}/>}
      </div>
      <Map/>
    </div>)
}
const mapStateToProps = function (state) {
  return {
    currentRestaurant: state.restaurants.currentRestaurant
  };
};
export default connect(mapStateToProps)(MapPage)
