class Project < ApplicationRecord
    self.table_name='Project'

    before_update :boolean_to_binary_string
    after_find :binary_string_to_boolean
    before_create :initialize_project
    after_create :binary_string_to_boolean

    def boolean_to_binary_string
        self.Visible = self.Visible ? "\x01" : "\x00"
    end

    def binary_string_to_boolean 
        self.Visible = self.Visible.b == "\x01".b
    end

    def initialize_project
        self.Visible = "\x00"
        self.Position = 1 + Project.count
    end
end
