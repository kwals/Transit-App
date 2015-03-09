class Bikeshare
require 'HTTParty'

  
  @radius_number = 0.0025

  def self.scrape
    info = HTTParty.get("http://www.capitalbikeshare.com/data/stations/bikeStations.xml")
    stations_array = info["stations"]["station"]
  end 

  
  def self.bikes_nearby(lat, long) 
    stations_array = self.scrape
    lat_max = lat.to_f + @radius_number.to_f
    lat_min = lat.to_f - @radius_number.to_f
    long_max = long.to_f + @radius_number.to_f
    long_min = long.to_f - @radius_number.to_f
    nearby_stations = []
    # Each station will be given as a hash

    stations_array.each do |s|
      this_lat = s["lat"].to_f
      this_long = s["long"].to_f
      if (lat_min < this_lat) && (this_lat < lat_max)
        if (long_min < this_long) && (this_long < long_max)
        place_hash = {
          id: s["id"],
          name: s["name"],
          bikes: s["nbBikes"],
          empty: s["nbEmptyDocks"],
          dock_lat: s["lat"],
          dock_long: s["long"]
        }
        nearby_stations.push(place_hash)
        end
      end
      nearby_stations
    end
    nearby_stations
  end

  def bike_station_info id_number
    stations_array = self.scrape
    stations_array.each do |s|
      if s["id"].to_i == id_number.to_i
        place_hash = {
          id: s["id"],
          name: s["name"],
          bikes: s["nbBikes"],
          empty: s["nbEmptyDocks"],
          dock_lat: s["lat"],
          dock_long: s["long"]
        }
        place_hash
        end
      place_hash
    end
    place_hash
  end


end
