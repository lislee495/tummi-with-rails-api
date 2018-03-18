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
            cat = restaurant.category[0]
            @dishes = Dish.where("'#{cat}' = ANY (category)").limit(10)
            @menu = Menu.create(restaurant_id: restaurant.id)
            @dishes.each {|dish| @menu.dishes << dish}
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
        params.require(:restaurant).permit(:name, :id, :location, :yelp_url, :address, :latitude, :longitude,
        :price_range, :url, :featured_image, :user_rating, :votes, :phone_numbers,  :searchCat, :searchLoc, 
        category: [], transactions: [])
    end
end



