class UpdateOrdersColumn < ActiveRecord::Migration[5.1]
  def change
    rename_column :users, :orders, :order_num 
  end
end
