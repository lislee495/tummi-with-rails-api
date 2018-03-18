Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  scope '/api' do
    resources :dish
    resources :user
    resources :restaurant
    get "/restaurant/:id/menu", to: "restaurant#menu"
    get "/user/:id/favorites", to: "favorite#index"
    post "/user/:id/favorites", to: "favorite#create"
    get "/user/:id/orders", to: "order#index"
    post "/user/:id/orders", to: "order#create"
    post "/login", to: "sessions#create"
    get "/current_user", to: "sessions#curr_user"
    post "/signup", to: "user#new"
    delete "/logout", to: "sessions#destroy"
    post "/restaurant/yelp", to: "restaurant#yelp"
  end
end
