class Uber < ActiveRecord::Base
  include HTTParty
  base_uri "https://api.uber.com/v1"
  format :json
  
  UBER_SERVER_KEY = Figaro.env.UBER_SERVER_KEY

  def self.fetch_uber_product_list(params)
    # FIXME hardcoded params
    params = { 
      "lat"   =>  38.85342, 
      "long"  =>  -77.04952
    }
    request = get("/products?latitude=#{params["lat"]}&longitude=#{params["long"]}",
       headers: {"Authorization" => "Token #{UBER_SERVER_KEY}"}
    )
    products = request["products"]
    product_id = products.first["product_id"]
    uber_products = []
    products.each do |p|
      product = []
      product << p["display_name"]
      product << p["product_id"]
      uber_products << product
    end
    uber_products
  end

  def self.fetch_ubers_around_me(params, product_id)
    # FIXME hardcoded params
    params = { 
      "lat"   =>  38.85342, 
      "long"  =>  -77.04952
    }
    request = get("/estimates/time?start_latitude=#{params["lat"]}&start_longitude=#{params["long"]}&product_id=#{product_id}",
       headers: {"Authorization" => "Token #{UBER_SERVER_KEY}"}
    )
    ubers = request["times"]
  end

end