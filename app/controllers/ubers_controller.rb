class UbersController < ApplicationController
  def index
    @ubers = Uber.fetch_uber_status
  end
end