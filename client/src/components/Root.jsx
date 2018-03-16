import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import CartBar from './CartBar'
import LandingPage from './LandingPage';
import Login from './Login';
import Signup from './Signup';
import MapPage from './MapPage'
import Navbar from './Navbar'
import TrendsPage from './TrendsPage'
import FavoritesPage from './FavoritesPage'
import RestaurantPage from './restaurant/RestaurantPage'
import RestaurantMenu from './restaurant/RestaurantMenu'
import RestaurantList from './restaurant/RestaurantList'
import Alert from 'react-s-alert';
import $ from 'jquery';
window.jQuery = window.$ = $;
import { fetchCurrentUser} from '../redux';

// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();

/* -----------------    COMPONENT     ------------------ */

class Root extends Component {
  constructor(props) {
    super(props);
  }
	componentDidMount() {
    this.props.fetchInitialData();
  }
	render () {
    const {currentUser, showCart, foundRestaurants} = this.props
		return (
	    <Router>
				<div id="main" className="container-fluid">
          {currentUser.id ?
             (
              <div className="logged-in">
                <Navbar/>
                {showCart ? <CartBar/> : ""}
                <div className="content-wrapper">
                { foundRestaurants[0] && <RestaurantList foundRestaurants={foundRestaurants}/>}
                  <Switch>
                    <Route path="/restaurants/:id/menu" component={RestaurantMenu} />
                    <Route path="/restaurants/:id" component={RestaurantPage} />
                    <Route exact path="/trends" component={TrendsPage} />
                    <Route exact path="/favorites" component={FavoritesPage} />
                  </Switch>
                  <Alert stack={{limit: 3}} />
                </div>
                <Route exact path="/" component={MapPage} />
              </div>) :
            (
              <div>
                <Route path="/login" component={Login} />
      			    <Route path="/signup" component={Signup} />
                <Route path="/" component={LandingPage} />

              </div>
            )
          }
			  </div>
		  </Router>
		)
	}
}

/* -----------------    CONTAINER     ------------------ */

const mapState = state => ({
    currentUser: state.currentUser,
    showCart: state.cart.showCart,
    foundRestaurants: state.restaurants.foundRestaurants
});

const mapDispatch = dispatch => ({
  fetchInitialData: () => {
    dispatch(fetchCurrentUser())},
});

export default connect(mapState, mapDispatch)(Root);
