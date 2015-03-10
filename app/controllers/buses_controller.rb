class BusesController < ApplicationController

  def index
    # TODO Radius currently hardcoded as 400
    radius = 250
    params = {
      "lat" => 38.878586,
      "long" =>-76.989626
    }
    @stops = Bus.fetch_nearest_stops(params, radius)
    render json: Bus.fetch_next_buses(@stops)
  end
end