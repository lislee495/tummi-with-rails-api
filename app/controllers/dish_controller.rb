class DishController < ApplicationController
    def create 
        categoryArray = ["spicy", "gluten-free", "vegan", "dairy-free", "vegetarian", "nut-free"]
        random = Math.floor(Math.random()*(categoryArray.length + 3))
        info = {
            name: request.body.dish.title,
            price: (Math.random() * (5.00 - 17.00) + 17.00).toFixed(2),
            category: (random < categoryArray.length) ? (request.body.category + categoryArray[random]) : request.body.category
        }
        @dish = Dish.find_by(name: request.body.dish.title)
        if @dish
            render(status: 201, json: @dish)
        else 
            render(status: 201, json: Dish.create(info))
        end 
    end

    def show 
        id = params[:id]
        render(status: 201, json: Dish.find(id))
    end 
end


