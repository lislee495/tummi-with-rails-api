Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  scope '/api' do
    resources :dishes
    resources :users
    resources :restaurants 
    get "/restaurants/:id/menu", to: "restaurants#menu"
    put "/login" to: "users#login"
    post "/signup" to: "users#signup"
  end
end
