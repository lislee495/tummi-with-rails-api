class Menu < ApplicationRecord
    belongs_to :restaurant
    has_many :menu_dishes
    has_many :dishes, through: :menu_dishes
end
