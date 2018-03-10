class Dish < ApplicationRecord
    has_many :menu_dishes
    has_many :menus, through: :menu_dishes
    has_many :restaurants, through: :menus
    has_many :orders
    has_many :users, through: :orders
    has_many :favorites
#     name: {type: Sequelize.STRING,
#     allowNull: false},
#   description: Sequelize.TEXT,
#   price: Sequelize.FLOAT,
#   category: Sequelize.ARRAY(Sequelize.STRING)
end
