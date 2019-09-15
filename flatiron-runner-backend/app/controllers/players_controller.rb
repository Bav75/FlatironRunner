class PlayersController < ApplicationController

    def create
        # binding.pry

        game = Game.first

        username = params[:username]

        # game.players.each do |player|
        #     if player.username == username
        #         player = Player.find_by(username: username)
        #     end 
        # end

        if game.players.any? {|p| p.username == username}
            player = Player.find_by(username: username)
        else
            player = game.players.create(username: username, character: "test", score: 0)
        end

        # if player.id == nil
        #     player.save
        # end

        render json: PlayerSerializer.new(player) 

        # binding.pry
    end

end
