class DishController < ApplicationController
    def create 
        categoryArray = ["spicy", "gluten-free", "vegan", "dairy-free", "vegetarian", "nut-free"]
        random = rand(categoryArray.length + 3)
        info = {
            name: dish_params[:name],
            price: rand(5.00..17.00),
            category: random < categoryArray.length ? dish_params[:category].push(categoryArray[random]) : dish_params[:category]
        }
        @dish = Dish.find_by(name: dish_params[:name])
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

    private 

    def dish_params 
        params.require(:dish).permit(:name, :price, category:[])
    end
end


