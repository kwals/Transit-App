class BikeShareController < ApplicationController

  def index (lat, long)
    render json: BikeShare.bikes_nearby(lat: params[:lat], long: params[:long])
  end

end
