class CreatePlayers < ActiveRecord::Migration[5.2]
  def change
    create_table :players do |t|
      t.string :username
      t.text :progress, array: true, default: [].to_yaml
      t.string :character

      t.belongs_to :game

      t.timestamps
    end
  end
end
