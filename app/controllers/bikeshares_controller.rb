class BikesharesController < ApplicationController

  def index (lat, long)
    render json: Bikeshare.bikes_nearby(lat: params[lat], long: params[:long])
  end

end
