class User < ApplicationRecord
  has_many :orders
  has_many :favorites 
  has_many :dishes, through: :orders 
  #   email: {type: Sequelize.STRING,
  #   allowNull: false,
  #   unique: true},
  # password: Sequelize.STRING,
  # googleId: Sequelize.STRING,
  # orders: {type: Sequelize.INTEGER, defaultValue: 0}
end
