class CreateGames < ActiveRecord::Migration[5.2]
  def change
    create_table :games do |t|
      t.text :levels, array: true, default: [].to_yaml

      t.timestamps
    end
  end
end
