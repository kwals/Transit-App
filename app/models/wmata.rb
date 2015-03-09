class WMATA 

  def get_bus_stops
    # This should send
    # latitude, longitude, and radius
    # And will receive
    # Bus stops within radius
  end

  def next_bus
    # This should send the STOPID to wmata
    # And receive a Direction, #, Route, and Minutes
  end

  def metro_station_entrances
    # This should send a latitude, longitude, and radius
    # This should recieve a station code

  end

  def next_train
    # This should send a station code to wmata
    # This should receive the next trains - color, destination, minutes
  end

end