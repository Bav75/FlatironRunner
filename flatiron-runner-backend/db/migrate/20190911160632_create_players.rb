class CreatePlayers < ActiveRecord::Migration[5.2]
  def change
    create_table :players do |t|
      t.string :username
      # store player progress in an array and run checks against it
      t.text :progress, array: true, default: [].to_yaml
      t.string :character
      t.integer :score

      t.belongs_to :game

      t.timestamps
    end
  end
end
