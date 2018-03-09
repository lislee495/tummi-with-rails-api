class AddDefaultValToUser < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :order_id, default: 0
    add_column :orders, :orderNum, default: 0
  end
end
