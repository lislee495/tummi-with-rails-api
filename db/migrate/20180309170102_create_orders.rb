class CreateOrders < ActiveRecord::Migration[5.1]
  def change
    create_table :orders do |t|
      t.integer :user_id
      t.integer :dish_id
      t.integer :restaurant_id
      t.integer :quantity
      t.integer :orderNum, default: 0
      t.timestamps
    end
  end
end
