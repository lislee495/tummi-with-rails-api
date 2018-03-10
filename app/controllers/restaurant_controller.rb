class RestaurantController < ApplicationController
    def show 
        id = params[:id]
        render(status: 201, json: Restaurant.find(id))
    end

    def create 
        category = restaurant_params.category
        location = restaurant_params.location 

    end 

    def menu 
        id = params[:id]
        @menu = Menu.find_by(restaurant_id: id)
        if @menu 
            render(status: 201, json: @menu)
        else 
            restaurant = Restaurant.find(id)
            dishes = Dishes.find(.where('keywords LIKE ?', '%crescent%').all)

    end 

    private 

    def restaurant_params 
        params.require(:restaurant).permit(:name, :location, :category, :yelp_url, :address, :latitude, :longitude,
        :price_range, :url, :featured_image, :user_rating, :votes, :phone_numbers, :transactions)
    end 
end

router.get('/:id/menu', function (req, res, next) {
  const id = req.params.id;
  Menu.findOrCreate({where: {
    owner_id: id
  }}).spread(async(menu, bool) => {
    if (bool) {
      const restaurant = await (Restaurant.findById(id))
      const dishes = await (Dish.findAll({where: {
        category: { $contains: [restaurant.category[0]] }
      },
      order: [
        sequelize.fn( 'RANDOM' ),
      ],
      limit: 10}))
      const newMenu = await(menu.addDishes(dishes))
      return menu
    } else {
      return menu
    }
  })
  .then(menu => menu.getDishes())
  .then(dishes => res.status(201).json(dishes))
  .catch(next)
})

router.post('/', (req, res, next)=> {
  axios.get(`https://api.yelp.com/v3/businesses/search?term=food+${category}&location=${newLoc}`, {
    headers: {"Authorization": "Bearer " + config.YELP_API_KEY}
  })
  .then(result => {
    return Promise.map(result.data.businesses, (restaurant) => {
      const info = {
        name: restaurant.name,
        category: [category.toLowerCase(), restaurant.categories[0].title],
        yelp_url: restaurant.id,
        address: `${restaurant.location.address1}, ${restaurant.location.city}, ${restaurant.location.state} ${restaurant.location.zip_code}` ,
        latitude: restaurant.coordinates.latitude,
        longitude: restaurant.coordinates.longitude,
        price_range: restaurant.price,
        url: restaurant.url,
        featured_image: restaurant.image_url,
        user_rating: restaurant.rating,
        votes: restaurant.review_count,
        phone_numbers: restaurant.display_phone,
        transactions: restaurant.transactions
      }
      return Restaurant.findOrCreate({
      where: {yelp_url: restaurant.id},
      defaults: info
    }).spread((result, bool) => result)
    })
  })
  .then(result => res.status(201).json(result))
  .catch(next)
})




