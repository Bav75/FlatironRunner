class GamesController < ApplicationController

    def index
        game = Game.first

        render json: GameSerializer.new(game) 
    end

    def update
        allTimeScore = params[:score]

        game = Game.first

        game.update(score: allTimeScore)
    end

end
