class Game < ApplicationRecord
    serialize :levels, Array

    has_many :players
end
