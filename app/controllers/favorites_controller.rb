class FavoritesController < ApplicationController
  before_action :authenticate_user!
  
  def create
    f = current_user.favorites.new(favorite_params)
    f.save
    render json: "You added #{f.name} as a favorite place."
  end

  def index
  end

private
  def favorite_params
    params.permit(:name, :lat, :long)
  end
  
end

