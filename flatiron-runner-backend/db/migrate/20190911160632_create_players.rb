class CreatePlayers < ActiveRecord::Migration[5.2]
  def change
    create_table :players do |t|
      t.string :username
      t.text :progress, array: true, default: [].to_yaml
      t.string :character

      t.timestamps
    end
  end
end
