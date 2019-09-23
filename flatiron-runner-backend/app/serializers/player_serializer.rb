class PlayerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :username, :score
end