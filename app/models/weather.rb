class Weather
  include HTTParty
  base_uri "api.openweathermap.org/data/2.5"
  format :json

  def self.fetch_weather(params)
    weather = {}
    request = get("/weather?lat=#{params["lat"]}&lon=#{params["long"]}")
    weather["name"] = request["name"]
    weather["temperature"] = (((request["main"]["temp"] - 273.15) * 1.8) + 32)
    weather["description"] = request["weather"].try(:first)["main"]
    weather["image"] = "http://openweathermap.org/img/w/#{request["weather"].try(:first)["icon"]}.png"
    weather
  end

end