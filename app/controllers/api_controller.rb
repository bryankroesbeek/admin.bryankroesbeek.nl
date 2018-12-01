class ApiController < ApplicationController
    protect_from_forgery with: :exception

    before_action :set_model

    def get_tables
        render :json => get_table_names
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
        render :json => convert_keys(@model.all) || []
    end

    def create_model
        new_model = @model.new
        new_model.save
        render :json => convert_keys(new_model).first
    end

    def create_from_data 
        data = [JSON.parse(params[:_json])].flatten

        data.each do |d|
            @model.create(d)
        end

        render plain: "OK"
    end

    def update_model
        new_data = JSON.parse(params[:_json])
        @model.find(params[:id]).update(convert_keys(new_data, :camelcase).first)

        render :json => new_data
    end

    def delete_model
        @model.find(params[:id]).delete
    end

    def set_model
        return unless params[:table].present?

        table_name = params[:table].singularize.camelize
        unless get_table_names.include?(table_name)
            head 400 and return false
        end

        @model = table_name.constantize
    end

    def get_table_names
        ActiveRecord::Base.connection.tables.select do |table| 
            table != "AuthToken" && table != "__EFMigrationsHistory"
        end
    end
end
