// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .




$(document).on("ready", function(){

	getLocation(callbackFun);
	templatesRender();
	updateAll();


})


var templates = {};

var sample_data = {
	status: "good",
	location: "close",
	bikes: "14",
	empty: "13"
};

var templatesRender = function(){

	var busTemplate = $(".bus-template").html();
	templates.bus = Handlebars.compile(busTemplate);
	var railTemplate = $(".rail-template").html();
	templates.zipcar = Handlebars.compile(railTemplate);
	var zipcarTemplate = $('.zipcar-template').html();
	templates.metro = Handlebars.compile(zipcarTemplate)
	var uberTemplate = $('.uber-template').html();
	templates.uber = Handlebars.compile(uberTemplate);
	var bikeshareTemplate = $('.capital-bikeshare-template').html();
	templates.bikeshare = Handlebars.compile(bikeshareTemplate);

}


var updateAll = function(){

	// $('.metro-bus-table').append(templates.bus(sample_data));
	// $('.metro-rail-table').append(templates.rail(sample_data));
	// $('.bikeshare-table').append(templates.bikeshare(sample_data));
	// $('.uber-table').append(templatens.uber(sample_data));
	// $('.zipcar-table').append(templates.zipcar(sample_data));

}

var currentLocation = {

}


var callbackFun = function(data){

	currentLocation.lat = data.coords.latitude;
	currentLocation.long = data.coords.longitude;

}

var getLocation = function(callback){

	navigator.geolocation.getCurrentPosition(callback);

}

var postLocation = function(){

	$.ajax({
	  type: "POST",
	  url: "/users/1/locate",
	  data: currentLocation
	});

}

//hopefully this is what we need
var getMetro = function(data){

	$.ajax({
		type: "GET",
		url: "/Metro-Bus",
		data: data
	})

}

var getBikeshare = function(data){

	$.ajax({
		type: "GET",
		url: "/bikeshare",
		data: data
	})

}

/*
make calls to these, pass longitude and latitude
bikeshare: GET /bikeshare
bus: GET /metro-Bus
rail: GET /metro-Rail
zipcar: GET /zipcars
uber: GET /uber
*/

