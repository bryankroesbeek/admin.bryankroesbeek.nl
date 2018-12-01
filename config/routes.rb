Rails.application.routes.draw do
  get '/api/:table/columns', to: 'api#get_columns'
  get '/api/database/tables', to: 'api#get_tables'
  
  get '/api/:table/all', to: 'api#get_model'
  post '/api/:table/create', to: 'api#create_model'
  post '/api/:table/create_data', to: 'api#create_from_data'
  put '/api/:table/:id/update', to: 'api#update_model'
  delete '/api/:table/:id', to: 'api#delete_model'

  post 'api/authentication/login', to: 'session#login'
  post 'api/authentication.logout', to: 'session#logout'
  
  get '/', to: 'home#index'
  get '/*path', to: 'home#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
