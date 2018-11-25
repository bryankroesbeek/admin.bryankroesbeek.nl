Rails.application.routes.draw do
  get '/', to: 'home#index'
  get '/api/:table/columns', to: 'api#get_columns'
  get '/api/database/tables', to: 'api#get_tables'

  get '/api/:table/all', to: 'api#get_model'
  post '/api/:table/create', to: 'api#create_model'
  put '/api/:table/:id/update', to: 'api#update_model'
  delete '/api/:table/:id', to: 'api#delete_model'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
