import React from 'react';
import { connect } from 'react-redux';
import RestaurantDiv from './RestaurantDiv'
import {setCurrentRestaurant, setFoundRestaurantIndex} from '../../redux/restaurants'

function RestaurantList(props) {

  const {foundRestaurants, selectRestaurant, foundRestaurantIndex, handleBack, handleNext} = props
  return(
    <div className='restaurant-list shadow'>
      <h5>Found {foundRestaurants.length} results:</h5>
      <div className="h_line" style={{color:'gray'}}></div>
      <ul>
      {foundRestaurants.slice(foundRestaurantIndex, foundRestaurantIndex+5).map(ele => {
        return(
          <div className="restaurant-div" onClick={() => selectRestaurant(ele)} key={ele.id}
          style={{cursor: "pointer"}}>
            <RestaurantDiv restaurant={ele}/>
          </div>
        )
        })}
      </ul>
      <span>
        {(foundRestaurantIndex >= 4) && <button className="gen-btn" onClick={()=>handleBack()}>Back</button>}
        {(foundRestaurantIndex <= 14) &&<button className="gen-btn" onClick={()=>handleNext()}>Next</button>}
      </span>
    </div>
  )
}

/* -----------------    CONTAINER     ------------------ */
const mapStateToProps = state => ({
  foundRestaurants: state.restaurants.foundRestaurants,
  foundRestaurantIndex: state.restaurants.foundRestaurantIndex,
  showRestaurants: state.restaurants.showRestaurants
})

const mapDispatchToProps = (dispatch) => ({
  selectRestaurant: restaurant => dispatch(setCurrentRestaurant(restaurant)),
  handleBack: ()=> dispatch(setFoundRestaurantIndex(-4)),
  handleNext: ()=> dispatch(setFoundRestaurantIndex(4))
})
export default connect(mapStateToProps, mapDispatchToProps)(RestaurantList)
// onClick={(restaurant)=> (selectRestaurant(restaurant))}
