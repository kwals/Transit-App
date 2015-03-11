class FavoritesController < ApplicationController
  before_action :authenticate_user!
  
  def index
    h = {}
    h["favorites"] = []
    current_user.favorites.each do |favs|
      f = {}
      f["name"] = favs.name
      f["lat"] = favs.lat
      f["long"] = favs.long
      h["favorites"] << f
    end
    @favorites = h
    render json: @favorites
  end

  def create
    f = current_user.favorites.new(favorite_params)
    f.save
    render json: "You added #{f.name} as a favorite place."
  end

private
  def favorite_params
    params.permit(:name, :lat, :long)
  end
  
end

