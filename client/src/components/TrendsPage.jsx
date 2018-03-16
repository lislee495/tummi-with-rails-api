import React from 'react';
import { connect } from 'react-redux';
import TagCloud from 'react-tag-cloud';
import randomColor from 'randomcolor';
import {fetchFavoriteDishes, fetchOrders, foundRestaurants} from '../redux/'

class TrendsPage extends React.Component {
    constructor(){
        super()
        this.state = {
            words: "",
            compromisedWords: []
        }
        this.compileWords = this.compileWords.bind(this)
    }

    componentDidMount(){
        this.props.fetchInitialData(this.props.currentUser)
        setInterval(() => {
            this.forceUpdate();
          }, 3000);
    }

    compileWords(favoriteDishes, orderDishes){
        let favoritesText = favoriteDishes.map(dish => dish.name + " " + dish.category.join(" ")).join(", ")
        let ordersText = orderDishes.map(dish => dish.name + " " + dish.category.join(" ")).join(", ")
        return ordersText + " " + favoritesText
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.orders.dishArray.length > 0) {
            let words = this.compileWords(nextProps.favorites, nextProps.orders.dishArray)
            let compromisedWords = nlp(words).ngrams({size: 1}).data()
            this.setState({words: words, compromisedWords: compromisedWords.slice(0, 15)})
        }
    }
    
    render() {
        console.log(this.state.compromisedWords.length)
        return (
            <div className="trends-page">
                <div className='app-outer'>
                    <div className='app-inner'>
                    <h3>Trends</h3>
                    <TagCloud 
                        className='tag-cloud'
                        style={{
                        fontFamily: 'sans-serif',
                        fontSize: 30,
                        color: () => randomColor({
                            hue: 'blue'
                        }),
                        padding: 5,
                        }}>
                        
                        {this.state.compromisedWords.length > 0 && this.state.compromisedWords.map(
                            ele => {
                            return (
                            <div style={{fontSize: ele.count * 10}} key={ele.normal}>
                                {ele.normal}
                            </div>)
                            })}
                        </TagCloud>
                    </div>
                </div>
            </div>
                
                
                
        )
    }
}

const mapStateToProps = function (state) {
  return {
    currentUser: state.currentUser,
    favorites: state.user_pref.favoriteDishes,
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
export default connect(mapStateToProps, mapDispatchToProps)(TrendsPage);


                