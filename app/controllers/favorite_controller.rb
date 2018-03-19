class FavoriteController < ApplicationController
    def index 
        id = params[:id]
        favorites = Favorite.where(user_id: id).all
        render(status: 201, json: favorites)
    end

    def create
        id = params[:id]
        favorite = Favorite.create(user_id: id, restaurant_id: favorite_params[:restaurant_id],
        dish_id: favorite_params[:dish_id])
        render(status: 201, json: favorite)
    end 

    private 

    def favorite_params
        params.require(:favorite).permit(:restaurant_id, :user_id, :dish_id)
    end 

end