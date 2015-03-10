class Uber 
  include HTTParty
  base_uri 'https://api.uber.com/v1'
  default_params latitude: '38.85795', longitude: '77.04895'

  format :json
  
  UBER_SERVER_KEY = Figaro.env.UBER_SERVER_KEY
  # FIXME hardcoded coordinates
  COORDINATES = "latitude=38.85795&longitude=-77.04895" # Crystal Dr coordinates

  def self.fetch_uber_status
    request = HTTParty.get("https://api.uber.com/v1/products?#{COORDINATES}",
       headers: {"Authorization" => "Token #{UBER_SERVER_KEY}"}
    )
    ubers = request["products"]
  end

end