class Dish < ApplicationRecord
    has_many :menus
    has_many :restaurants, through: :menus
    
#     name: {type: Sequelize.STRING,
#     allowNull: false},
#   description: Sequelize.TEXT,
#   price: Sequelize.FLOAT,
#   category: Sequelize.ARRAY(Sequelize.STRING)
end
