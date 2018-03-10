class Favorite < ApplicationRecord
    belongs_to :user 
    belongs_to :restaurant 
    belongs_to :dish
#     user_id: Sequelize.INTEGER,
#     dish_id: Sequelize.INTEGER,
#     restaurant_id: Sequelize.INTEGER
#   })
end
