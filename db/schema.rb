# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 0) do

  create_table "AuthToken", primary_key: "Id", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.string "Token"
    t.bigint "CreatedAt", null: false
    t.bigint "ExpiresAt", null: false
  end

  create_table "Project", primary_key: "Id", id: :integer, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.string "Name", limit: 100, default: "", null: false
    t.string "Link", default: "", null: false
    t.text "Description"
    t.integer "Position", default: 0, null: false
    t.binary "Visible", limit: 1, default: "b'0'", null: false
  end

  create_table "__EFMigrationsHistory", primary_key: "MigrationId", id: :string, limit: 95, options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.string "ProductVersion", limit: 32, null: false
  end

end
