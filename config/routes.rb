Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  scope '/api' do
    resources :dish
    resources :user
    resources :restaurant
    get "/restaurants/:id/menu", to: "restaurant#menu"
    post "/login", to: "sessions#create"
    get "/current_user", to: "sessions#show"
    post "/signup", to: "user#new"
    delete "/logout", to: "sessions#destroy"
  end
end
