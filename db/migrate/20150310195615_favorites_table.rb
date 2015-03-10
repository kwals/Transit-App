class FavoritesTable < ActiveRecord::Migration
  def change
    create_table :favorites do |t|
      t.string :name , null: false
      t.string :lat , null: false
      t.string :long , null: false 

      t.belongs_to :user, index: true
    end
  end
end
