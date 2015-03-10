class TrainsController < ApplicationController
  def index
    # TODO Train radius hardcoded
    radius = 400 if radius.nil?
    @stations = Train.fetch_nearest_stations(params, radius)
    render json: Train.fetch_next_trains(@stations)
  end
end