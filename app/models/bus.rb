class Bus
  include HTTParty
  base_uri "https://api.wmata.com"
  format :json

  WMATA_KEY = Figaro.env.WMATA_KEY


  def self.fetch_nearest_stops(params, radius)
    request = get("/Bus.svc/json/jStops?Lat=#{params["lat"]}&Lon=#{params["long"]}&Radius=#{radius}&api_key=#{WMATA_KEY}")
    stops = []
    request["Stops"].each do |stop|
      stops << stop["StopID"] unless stops.include?(stop["StopID"])
    end
    stops
  end

  def self.fetch_next_buses(stops)
    predictions = []
    binding.pry
    stops.each do |stop|
      request = get("/NextBusService.svc/json/jPredictions?StopID=#{stop}&api_key=#{WMATA_KEY}")
      predictions << request["Predictions"].try(:first)
      binding.pry
    end
    binding.pry
  end

end