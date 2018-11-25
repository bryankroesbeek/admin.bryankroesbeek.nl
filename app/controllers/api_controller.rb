class ApiController < ApplicationController
    protect_from_forgery with: :exception

    before_action :set_model

    def get_tables
        render :json => ActiveRecord::Base.connection.tables.select{|table| 
            table != "AuthToken" && table != "__EFMigrationsHistory"
        }
    end

    def get_columns
        table = {
            :name => @model.name,
            :columns => @model.column_names.map{|name| {
                :name => name,
                :type => @model.columns_hash[name].sql_type
            }}
        }

        render :json => table
    end

    def get_model
        render :json => convert_keys(@model.all)
    end

    def create_model
        new_model = @model.new
        new_model.save
        render :json => convert_keys(new_model)
    end

    def update_model
        new_data = JSON.parse(params[:_json])
        Project.find(params[:id]).update(convert_keys(new_data, :camelcase))

        render :json => new_data
    end

    def delete_model
        @model.find(params[:id]).delete
    end

    def set_model
        return unless params[:table].present?
        @model = params[:table].singularize.camelize.constantize
    end
end
