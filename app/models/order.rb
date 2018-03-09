class Order < ApplicationRecord
    user_id: Sequelize.INTEGER,
  dish_id: Sequelize.INTEGER,
  restaurant_id: Sequelize.INTEGER,
  status: Sequelize.STRING,
  createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  quantity: Sequelize.INTEGER,
  orderNum: {type: Sequelize.INTEGER, defaultValue:0 }
end
