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
            player = game.players.create(username: username, score: 0)
        end

        # if player.id == nil
        #     player.save
        # end

        render json: PlayerSerializer.new(player) 

        # binding.pry
    end

    def update      
        
        # binding.pry
        username = params[:username]

        player = Player.find_by(username: username)

        player.update(score: params[:score])

        # render json: PlayerSerializer.new(player) 
    end

    # def player_params
    #     params.require(:player).permit(:username, :score)
    # end

end
