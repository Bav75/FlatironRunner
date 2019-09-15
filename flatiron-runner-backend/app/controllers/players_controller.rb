class PlayersController < ApplicationController

    def create
        # binding.pry

        username = params[:username]

        player = Player.find_or_create_by(username: username)
        if player.id == nil
            player.save
        end

        render json: PlayerSerializer.new(player) 

        # binding.pry
    end

end
