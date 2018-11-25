class ApplicationController < ActionController::Base
    def convert_keys(model_data, option = :downcase)
        return unless model_data.present?

        data = [model_data].flatten

        colnames = data.first.keys if data.first.kind_of? Hash
        colnames = data.first.attributes.keys if data.first.kind_of? ActiveRecord::Base

        data = data.map do |row|
            obj = {}
            colnames.each do |col|
                obj[col.underscore] = row[col] if option == :downcase
                obj[col.camelize] = row[col] if option == :camelcase
            end
            obj
        end

        return data if data.length > 1
        return data.first
    end
end
