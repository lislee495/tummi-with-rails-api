class UpdateTransactionsForRestaurants < ActiveRecord::Migration[5.1]
  def change
    change_column :restaurants, :transactions, :text, array: true, default: [], using: "(string_to_array(transactions, ','))"
  end
end
