class BikeShareController < ApplicationController

  def index
    render json: BikeShare.bikes_nearby(lat: params[:lat], long: params[:long])
  end

end
