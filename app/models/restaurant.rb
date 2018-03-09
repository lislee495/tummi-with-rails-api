class Restaurant < ApplicationRecord
  has_one :menu
    name: {type: Sequelize.STRING,
    allowNull: false},
  category: Sequelize.ARRAY(Sequelize.STRING),
  address: Sequelize.STRING,
  latitude: Sequelize.STRING,
  longitude: Sequelize.STRING,
  price_range: Sequelize.STRING,
  yelp_url: Sequelize.STRING,
  url: Sequelize.STRING,
  featured_image: Sequelize.STRING,
  user_rating: Sequelize.STRING,
  votes: Sequelize.STRING,
  phone_numbers: Sequelize.STRING,
  transactions: Sequelize.ARRAY(Sequelize.STRING)
end
