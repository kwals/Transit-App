class BikeShare
# We are going to need to use Nokogiri to parse the XML
# use the slop method to make it into a hash.
# require 'open-uri'
# doc = Nokogiri::HTML(open("http://www.capitalbikeshare.com/data/stations/bikeStations.xml"))
  
  def radius
    # This should calculate a range for latitude
    # Then calculate a range for longitude 
  end

  def get_bike_stations
    # This should parse the XML and return stations
    # that are within BOTH the lat AND long range
  end

  def bike_station_info
    # THis should search for a station with a station ID
    # And return location, number of bikes, number of empty slots
  end

end