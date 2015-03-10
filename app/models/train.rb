class Train
  include HTTParty
  base_uri "https://api.wmata.com"
  format :json
  
  WMATA_KEY = Figaro.env.WMATA_KEY

  def self.fetch_nearest_stations(params)
    # TODO Radius currently hardcoded as 400
    params["radius"] = 400 if params["radius"].nil?
    request = get("/Rail.svc/json/jStationEntrances?Lat=#{params["lat"]}&Lon=#{params["long"]}&Radius=#{params["radius"]}&api_key=#{WMATA_KEY}")
    stations = []
    request["Entrances"].each do |station|
      stations << station["StationCode1"] unless stations.include?(station)
    end
    stations.join(",")
  end

  def self.fetch_next_trains(stations)
    request = get("/StationPrediction.svc/json/GetPrediction/#{stations}?api_key=#{WMATA_KEY}")
    trains = request["Trains"]
    destinations = []
    next_trains = []
    trains.each do |train|
      unless destinations.include?(train["Destination"]) || (train["Destination"] == "Train")
        destinations << train["Destination"]
        next_trains << train
      end
    end
    next_trains
  end

end