module ApplicationHelper
  # Returns the full title on a per-page basis.
  def full_title(page_title = '')
    base_title = "RouteMe"
    if page_title.empty?
      base_title
    else
      "#{page_title} | #{base_title}"
    end
  end

  def flash_class(level)
    case level
      when "success" then "alert alert-success"
      when "notice" then "alert alert-info"
      when "error" then "alert alert-warning"
      when "alert" then "alert alert-danger"
    end
  end
end