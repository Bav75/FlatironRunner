Rails.application.routes.draw do
  resources :games, only: [:show, :update]
  resources :players, only: [:create, :update]

  # post "/players", to: "players#create"

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
