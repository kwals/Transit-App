json.array! @ubers do |uber|
  json.capacity       uber["capacity"]
  json.image          uber["image"]
  json.display_name   uber["display_name"]
  json.product_id     uber["product_id"]
  json.description    uber["description"]
end
