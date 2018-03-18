class RestaurantController < ApplicationController
    def show 
        id = params[:id]
        render(status: 201, json: Restaurant.find(id))
    end

    def create
        if Restaurant.find_by(yelp_url: restaurant_params[:yelp_url])
            render(status: 201, json: Restaurant.find_by(yelp_url: restaurant_params[:yelp_url]))
        else 
            @restaurant = Restaurant.create(restaurant_params)
            render(status: 201, json: @restaurant)
        end 
    end 

    def menu 
        id = params[:id]
        @menu = Menu.find_by(restaurant_id: id)
        if @menu 
            render(status: 201, json: @menu)
        else 
            restaurant = Restaurant.find(id)
            category = restaurant_params.category[0]
            @dishes = Dishes.where("'#{category}' = ANY (category)").limit(10)
            @menu = dishes.map {|dish| Menu.create(dish: dish, restaurant_id: restaurant.id)}
            render(status: 201, json: @dishes)
        end 
    end 


    def yelp 
        category = restaurant_params[:searchCat]
        location = restaurant_params[:searchLoc]
        new_loc = location.split(" ").join("+")
        conn = Faraday.new
        response = conn.get do |req|
            req.url("https://api.yelp.com/v3/businesses/search?term=food+#{category}&location=#{new_loc}")
            req.headers['Authorization'] = "Bearer " + Rails.application.secrets[:yelp_key]
        end
        @data = JSON.parse(response.body)
        render(status: 201, json: @data)
    end

    private 

    def restaurant_params 
        params.require(:restaurant).permit(:name, :location, :category, :yelp_url, :address, :latitude, :longitude,
        :price_range, :url, :featured_image, :user_rating, :votes, :phone_numbers, :transactions, :searchCat, :searchLoc)
    end
end

# router.get('/:id/menu', function (req, res, next) {
#   const id = req.params.id;
#   Menu.findOrCreate({where: {
#     owner_id: id
#   }}).spread(async(menu, bool) => {
#     if (bool) {
#       const restaurant = await (Restaurant.findById(id))
#       const dishes = await (Dish.findAll({where: {
#         category: { $contains: [restaurant.category[0]] }
#       },
#       order: [
#         sequelize.fn( 'RANDOM' ),
#       ],
#       limit: 10}))
#       const newMenu = await(menu.addDishes(dishes))
#       return menu
#     } else {
#       return menu
#     }
#   })
#   .then(menu => menu.getDishes())
#   .then(dishes => res.status(201).json(dishes))
#   .catch(next)
# })

# router.post('/', (req, res, next)=> {
#   axios.get(`https://api.yelp.com/v3/businesses/search?term=food+${category}&location=${newLoc}`, {
#     headers: {"Authorization": "Bearer " + config.YELP_API_KEY}
#   })
#   .then(result => {
#     return Promise.map(result.data.businesses, (restaurant) => {
#       const info = {
#         name: restaurant.name,
#         category: [category.toLowerCase(), restaurant.categories[0].title],
#         yelp_url: restaurant.id,
#         address: `${restaurant.location.address1}, ${restaurant.location.city}, ${restaurant.location.state} ${restaurant.location.zip_code}` ,
#         latitude: restaurant.coordinates.latitude,
#         longitude: restaurant.coordinates.longitude,
#         price_range: restaurant.price,
#         url: restaurant.url,
#         featured_image: restaurant.image_url,
#         user_rating: restaurant.rating,
#         votes: restaurant.review_count,
#         phone_numbers: restaurant.display_phone,
#         transactions: restaurant.transactions
#       }
#       return Restaurant.findOrCreate({
#       where: {yelp_url: restaurant.id},
#       defaults: info
#     }).spread((result, bool) => result)
#     })
#   })
#   .then(result => res.status(201).json(result))
#   .catch(next)
# })




