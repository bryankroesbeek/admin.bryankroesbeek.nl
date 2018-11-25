class ApplicationController < ActionController::Base
    def downcase_keys(model_data)
        return unless model_data.present?

        data = [model_data].flatten

        colnames = data.first.class.column_names
        data = data.map do |row|
            obj = {}
            colnames.each do |col|
                obj[col.underscore] = row[col]
            end
            obj
        end

        return data if data.length > 1
        return data.first
    end
end
