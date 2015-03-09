class BikesharesController < ApplicationController

  def index 
    render json: Bikeshare.bikes_nearby(params)
  end

end
