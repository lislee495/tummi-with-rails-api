class CreateRestaurants < ActiveRecord::Migration[5.1]
  def change
    create_table :restaurants do |t|
      t.string :name, null: false
      t.text :category
      t.string :address
      t.float :latitude
      t.float :longitude
      t.string :price_range
      t.string :yelp_url
      t.string :url
      t.string :featured_image
      t.string :user_rating
      t.string :votes 
      t.string :phone_numbers
      t.string :transactions 
      t.timestamps
    end
  end
end
