class Train
  include HTTParty
  base_uri "https://api.wmata.com"
  format :json
  
  WMATA_KEY = Figaro.env.WMATA_KEY

  def self.fetch_nearest_stations(params)
    # FIXME hardcoded params
    params = {
      "lat"   =>  38.89874, 
      "long"  =>  -77.02146
    }
    # TODO Radius currently hardcoded as 500
    request = get("/Rail.svc/json/jStationEntrances?Lat=#{params["lat"]}&Lon=#{params["long"]}&Radius=500&api_key=#{WMATA_KEY}")
    stations = []
    request["Entrances"].each do |station|
      stations << station["StationCode1"] unless stations.include?(station)
    end
    stations.join(",")
  end

  def self.fetch_next_trains(stations)
    request = get("/StationPrediction.svc/json/GetPrediction/#{stations}?api_key=#{WMATA_KEY}")
    next_trains = request["Trains"]
  end

end