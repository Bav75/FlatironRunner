class PlayerSerializer
    include FastJsonapi::ObjectSerializer
    attributes :username, :progress, :character
  end