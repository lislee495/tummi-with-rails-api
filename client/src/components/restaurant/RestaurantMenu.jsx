import React from 'react';
import { connect } from 'react-redux';
import {changeRestaurant, fetchMenu, addLike, addDislike, deleteDislike, deleteLike} from '../../redux'
import Menu from './Menu'
import {ReactSelectize, SimpleSelect, MultiSelect} from 'react-selectize';
import { WithContext as ReactTags } from 'react-tag-input';


class RestaurantMenu extends React.Component {
  constructor(){
    super()
    this.state = {
      filteredMenu: []
    }
  }
  componentDidMount() {
    this.props.changeRestaurant(this.props.restaurantId),
    this.props.fetchMenu(this.props.restaurantId)
    this.filterOut = this.filterOut.bind(this)
    this.filterIn = this.filterIn.bind(this)
  }
  filterOut(startArr, mustNotHave) {
    let newArr = []
    let newFilter = mustNotHave.map(ele => ele.text.toLowerCase())
    for (var i =0; i< startArr.length; i ++) {
      let curCat = startArr[i].category.join() + " " + startArr[i].name.toLowerCase()
      if (newFilter.every(ele => curCat.indexOf(ele) === -1)) {
        newArr.push(startArr[i])
      }
    }
    return newArr;
  }
  
  filterIn(startArr, mustHave){
    for (var i =0; i< startArr.length; i ++) {
      startArr[i].hasTrait = 0
      let newFilter = mustHave.map(ele => ele.text.toLowerCase())
      let currentInfo = startArr[i].category.join() + " " + startArr[i].name.toLowerCase()
      newFilter.forEach(ele => {
        if (currentInfo.includes(ele)) {
          startArr[i].hasTrait++
        }
      })
    }
    return startArr.sort(function (a, b) {
    return b.hasTrait - a.hasTrait;
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.dislikes.length !== nextProps.dislikes.length) {
      let filteredMenu =  this.filterIn(this.filterOut(nextProps.menu, nextProps.dislikes), nextProps.likes)
      this.setState({filteredMenu: filteredMenu})
    } else if (this.props.likes.length !== nextProps.likes.length) {
      let filteredMenu =  this.filterIn(this.filterOut(nextProps.menu, nextProps.dislikes), nextProps.likes)
      this.setState({filteredMenu: filteredMenu})
    } else if (this.props.currentRestaurant.id !== nextProps.currentRestaurant.id) {
        this.props.fetchMenu(nextProps.currentRestaurant.id)
    }
  }
  render() {
    const {currentRestaurant, menu, restaurantId, addLike, addDislike, deleteDislike, deleteLike} = this.props;
    const {filteredMenu} = this.state
    return (
      <div className="menu-page">
        <h4>{currentRestaurant.name}</h4>
        <hr/>
        <div className="filter-inputs">
        <ReactTags 
          tags={this.props.likes}
          suggestions={["spicy", "vegetarian", "gluten-free", "dairy"]}
          handleDelete={deleteLike}
          handleAddition={addLike}
          placeholder={"Likes"}
          />
        <ReactTags 
        tags={this.props.dislikes}
        suggestions={["spicy", "vegetarian", "nut", "dairy"]}
        handleDelete={deleteDislike}
        handleAddition={addDislike}
        placeholder={"Dislikes"}
        />
        </div>
        <h5>Menu</h5>
        {filteredMenu[0] ? <Menu menu={filteredMenu} restaurant={currentRestaurant}/> : 
      <Menu menu={menu} restaurant={currentRestaurant}/>}
      
      </div>)
  }
}
const mapStateToProps = function (state, ownProps) {
  const restaurantId = Number(ownProps.match.params.id);
  return {
    restaurantId,
    currentRestaurant: state.restaurants.currentRestaurant,
    menu: state.restaurants.menu,
    likes: state.user_pref.like,
    dislikes: state.user_pref.dislike
  };
};
const mapDispatchToProps = (dispatch, ownProps)=> ({
  changeRestaurant: (id) => dispatch(changeRestaurant(id)),
  fetchMenu: (id) => dispatch(fetchMenu(id)),
  addLike: (value) => dispatch(addLike(value)),
  addDislike: (value) => dispatch(addDislike(value)),
  deleteLike: (like_ind) => dispatch(deleteLike(like_ind)),
  deleteDislike: (dislike_ind) => dispatch(deleteDislike(dislike_ind))
})
export default connect(mapStateToProps, mapDispatchToProps)(RestaurantMenu);