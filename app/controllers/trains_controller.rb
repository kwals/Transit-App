class TrainsController < ApplicationController
  def index
    @stations = Train.fetch_nearest_stations(params)
    render json: Train.fetch_next_trains(@stations)
  end
end