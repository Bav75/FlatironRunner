class GameSerializer
    include FastJsonapi::ObjectSerializer
    attributes :score
end