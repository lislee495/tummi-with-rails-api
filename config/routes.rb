Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  scope '/api' do
    resources :dishes
    resources :users
    resources :restaurants 
    get "/restaurants/:id/menu", to: "restaurants#menu"
    post "/login", to: "sessions#create"
    get "/current_user", to: "sessions#show"
    post "/signup", to: "users#new"
    delete "/logout", to: "sessions#destroy"
  end
end
