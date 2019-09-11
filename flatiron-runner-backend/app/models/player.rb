class Player < ApplicationRecord
    serialize :progress, Array

    belongs_to :game 
end
