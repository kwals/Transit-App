class StaticpagesController < ApplicationController
  before_action :authenticate_user!, except: [:home]

  def home
  end

  def myfavorites
  end
  
end
