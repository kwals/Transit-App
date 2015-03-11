class WeatherController < ApplicationController
  def index
    params = { "lat" => 38.85795, "long" => -77.04895 } if params.nil?
    @weather = Weather.fetch_weather(params)
    render json: @weather
  end
end
