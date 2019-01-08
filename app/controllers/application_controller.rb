class ApplicationController < ActionController::Base
    before_action :validate_user_token

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

        return data
    end

    def validate_user_token
        if session[:user_token].present?
            return if session[:expires_at] > Time.now
        end

        return head :unauthorized if request.path.starts_with?("/api")

        return if request.path == "/login"
        return redirect_to "/login" if request.path != "/login"

        return head :unauthorized
    end
end
