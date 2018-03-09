class Favorite < ApplicationRecord
    belongs_to :user 
    has_one :restaurant 
    has_one :dish
#     user_id: Sequelize.INTEGER,
#     dish_id: Sequelize.INTEGER,
#     restaurant_id: Sequelize.INTEGER
#   })
end
