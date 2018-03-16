import React from 'react';
import mapboxgl from 'mapbox-gl';
import config from '../config';
import 'mapbox-gl/dist/mapbox-gl.css';
import {connect} from 'react-redux';
mapboxgl.accessToken = config.MAPBOX_KEY

class Map extends React.Component {
  constructor() {
    super()
    this.state = {
      lat: 41.928074,
      lng: -87.654666,
      zoom: 15,
      map: {}
    }
  }
  componentDidMount() {
    const {lat, lng, zoom} = this.state;
    var map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v10",
      center: [
        lng, lat
      ],
      zoom: zoom
    })
    this.setState({map: map})
    this.state.map.style && this.state.map.on('move', () => {
      const {lng, lat} = this.state.map.getCenter();
      this.setState({lng: lng.toFixed(4), lat: lat.toFixed(4), zoom: this.state.map.getZoom().toFixed(2)});
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.showRestaurants[0] !== nextProps.showRestaurants[0]) {
      var restaurantLocation = nextProps.showRestaurants[0];
      this.state.map.flyTo({
        center: [
          parseFloat(restaurantLocation.longitude),
          parseFloat(restaurantLocation.latitude)
        ]
      })
      const geojson = {
        "type": "FeatureCollection",
        "features": nextProps.showRestaurants.map(ele => {
          return {
            "type": "Feature",
            "properties": {
              "message": ele.name,
              "iconSize": [10, 10]
            },
            "geometry": {
              "type": "Point",
              "coordinates": [
                parseFloat(ele.longitude),
                parseFloat(ele.latitude)
              ]
            }
          }
        })
      }

      geojson.features.forEach((marker) => {
        // create a HTML element for each feature
        var el = document.createElement('div');
        el.className = 'marker';

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el).setLngLat(marker.geometry.coordinates).setPopup(new mapboxgl.Popup({offset: 25}). // add popups
            setHTML('<h7>' + marker.properties.message + '</h7>')).addTo(this.state.map);
      })
    } else if (this.props.currentRestaurant !== nextProps.currentRestaurant) {
      var restaurantLocation = nextProps.currentRestaurant;
      this.state.map.flyTo({
        center: [
          parseFloat(restaurantLocation.longitude),
          parseFloat(restaurantLocation.latitude)
        ]
      })
    }
  };

  render() {
    const {lat, lng, zoom} = this.state;
    return (
    <div>
      <div ref={el => this.mapContainer = el}/>
    </div>)
  }
}
const mapStateToProps = (state) => ({
  foundRestaurants: state.restaurants.foundRestaurants,
  showRestaurants: state.restaurants.showRestaurants,
  currentRestaurant: state.restaurants.currentRestaurant || {}
})
export default connect(mapStateToProps)(Map);
