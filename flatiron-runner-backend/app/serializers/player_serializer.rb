class PlayerSerializer
    include FastJsonapi::ObjectSerializer
    attributes :username, :progress, :character, :score
  end