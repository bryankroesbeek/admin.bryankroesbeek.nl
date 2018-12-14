class Project < ApplicationRecord
    self.table_name='Project'

    before_update :boolean_to_binary_string
    after_find :binary_string_to_boolean

    def boolean_to_binary_string
        self.Visible = self.Visible ? "\x01" : "\x00"
    end

    def binary_string_to_boolean 
        self.Visible = self.Visible == "\x01"
    end
end
