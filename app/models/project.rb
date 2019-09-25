class Project < ApplicationRecord
    self.table_name='Project'

    before_create :initialize_project

    def initialize_project
        self.Position = 1 + Project.count
    end
end
