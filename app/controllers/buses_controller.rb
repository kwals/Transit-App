class BusesController < ApplicationController

  def index
    # TODO Bus Radius currently hardcoded
    radius = 250 if radius.nil?
    @stops = Bus.fetch_nearest_stops(params, radius)
    render json: Bus.fetch_next_buses(@stops)
  end
end