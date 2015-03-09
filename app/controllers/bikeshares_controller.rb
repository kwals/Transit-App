class BikesharesController < ApplicationController

  def index 
    render json: Bikeshare.bikes_nearby(lat: params[:lat], long: params[:long])
  end

end
