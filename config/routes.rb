Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  scope '/api' do
    resources :dish
    resources :user
    resources :restaurant
    get "/restaurants/:id/menu", to: "restaurant#menu"
    get "/users/:id/favorites", to: "favorite#index"
    post "/users/:id/favorites", to: "favorite#create"
    get "/users/:id/orders", to: "order#index"
    post "/users/:id/orders", to: "order#create"
    post "/login", to: "sessions#create"
    get "/current_user", to: "sessions#curr_user"
    post "/signup", to: "user#new"
    delete "/logout", to: "sessions#destroy"
  end
end
