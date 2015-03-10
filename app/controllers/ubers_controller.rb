class UbersController < ApplicationController
  def index
    # FIXME Cannot get a list of just 1 type of uber???
    @uber_products = Uber.fetch_uber_product_list(params)
    render json: Uber.fetch_ubers_around_me(params, @uber_products[0][1])
  end
end