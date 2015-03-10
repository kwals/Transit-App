class BusesController < ApplicationController

  def index
    @stops = Bus.fetch_nearest_stops(params)
    render json: Bus.fetch_next_buses(@stops)
  end
end