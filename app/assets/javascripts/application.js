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

	//getLocation(callbackFun);
	hideAll();
	templatesRender();
	loadButton();
	startTime();
	selectFavorites();

})




var templates = {};

var sample_data = {
	status: "good",
	location: "close",
	bikes: "14",
	empty: "13"
};

var currentLocation = {

};

var data = {

};

var timouts = {

};

var deleteButtonString = "<button class='btn btn-default remove-button' onclick='myFun()' type='submit'>Remove</button>";
var favoriteButtonString = "<button class='btn btn-default fav-button' onclick='myFun()' type='submit'>Fav</button>";

var removedItems = [];
var favItems = [];
var onFav = false;


var templatesRender = function(){

	//Each items
	var busTemplate = $(".bus-template").html();
	templates.bus = Handlebars.compile(busTemplate);
	var railTemplate = $(".rail-template").html();
	templates.rail = Handlebars.compile(railTemplate);
	var zipcarTemplate = $('.zipcar-template').html();
	templates.zipcar = Handlebars.compile(zipcarTemplate)
	var uberTemplate = $('.uber-template').html();
	templates.uber = Handlebars.compile(uberTemplate);
	var bikeshareTemplate = $('.capital-bikeshare-template').html();
	templates.bikeshare = Handlebars.compile(bikeshareTemplate);
	//Headers
	var uberHeaderTemplate = $('.uber-header-template').html()
	templates.uberHeader = Handlebars.compile(uberHeaderTemplate);
	var bikeshareHeaderTemplate = $('.bikeshare-header-template').html();
	templates.bikeshareHeader = Handlebars.compile(bikeshareHeaderTemplate);
	var zipcarHeaderTemplate = $('.zipcar-header-template').html();
	templates.zipcarHeader = Handlebars.compile(zipcarHeaderTemplate);
	var railHeaderTemplate = $('.metro-rail-header-template').html();
	templates.railHeader = Handlebars.compile(railHeaderTemplate);
	var busHeaderTemplate = $('.metro-bus-header-template').html();
	templates.busHeader = Handlebars.compile(busHeaderTemplate);
	//Images and Logos
	var logoTemplate = $('.logo-template').html();
	templates.logo = Handlebars.compile(logoTemplate);

}


var updateAll = function(){

	getBikeshare(currentLocation);
	getUber(currentLocation);
	getMetroRail(currentLocation);
	getMetroBus(currentLocation);

	// $('.metro-bus-table').append(templates.bus(sample_data));
	// $('.metro-rail-table').append(templates.rail(sample_data));
	// $('.bikeshare-table').append(templates.bikeshare(sample_data));
	// $('.uber-table').append(templatens.uber(sample_data));
	// $('.zipcar-table').append(templates.zipcar(sample_data));

	clearTimeout(timouts.update);
	timouts.update = setTimeout(function(){updateAll()}, 60000);

	$('.')

}


var callbackFun = function(data){

	currentLocation.lat = data.coords.latitude;
	currentLocation.long = data.coords.longitude;

	updateAll();


}

var getLocation = function(callback){

	navigator.geolocation.getCurrentPosition(callbackFun);

}

var resetRemoved = function(){
	removedItems = [];
}

var resetFav = function(){
	favItems = [];
}

var selectFavorites = function(){

	$('#nearest-button').on('click', function(){
		$('#nearest-button').removeClass('inactive');
		$('#nearest-button').removeClass('btn-default');
		$('#nearest-button').addClass('active')
		$('#nearest-button').addClass('btn-primary');
		$('#favorite-button').removeClass('active');
		$('#favorite-button').removeClass('btn-primary');
		$('#favorite-button').addClass('inactive')
		$('#favorite-button').addClass('btn-default');
		onFav = false;
	})

	$('#favorite-button').on('click',function(){
		$('#nearest-button').removeClass('active');
		$('#nearest-button').removeClass('btn-primary');
		$('#nearest-button').addClass('inactive')
		$('#nearest-button').addClass('btn-default');
		$('#favorite-button').removeClass('inactive');
		$('#favorite-button').removeClass('btn-default');
		$('#favorite-button').addClass('active')
		$('#favorite-button').addClass('btn-primary');
		onFav = true;
	})

}

var removeFun = function(id){
	console.log(id);

	var $id = $(document.getElementById(id));
	
	$id.parent().parent().remove();
	
	if( _.indexOf(removedItems, id) === -1 ){
		removedItems.push(id)
	}

}

var checkRemoved = function(item){
	if(_.indexOf(removedItems, item) === -1){
		return false;
	}
	return true;
}

var favFun = function(id){
	console.log(id)

	if( _.indexOf(favItems, id) === -1 ){
		favItems.push(id)
	}
}

var loadButton = function(){

	$('#load-content').click(function(){
		getLocation();
	})

}


var hideAll = function(){
	$('.bikeshare').hide();
	$('.metro-bus').hide();
	$('.metro-rail').hide();
	$('.uber').hide();
	$('.zipcar').hide();
}



//hopefully this is what we need
var getMetroBus = function(location){

	$.ajax({
		type: "GET",
		url: "/buses",
		data: location,
		success: function(result){
			// console.log(result)
			data.metroBus = result;
			listMetroBus();
		}
	})

}

var listMetroBus = function(){

	var metroBusLogo = {
		className: "metro-bus-logo",
		src: "assets/bus_logo.gif"
	}

	$('.metro-bus').html("")

	if(_.keys(data.metroBus).length > 0){
		$('.metro-bus').show()
		$('.metro-bus').append(templates.logo(metroBusLogo));
	}
	else{
		$('.metro-bus').hide();
	}

	_.each(_.keys(data.metroBus), function(key){
		var tempObj = {LocationName: key};
		$('.metro-bus').append(templates.busHeader(tempObj));
		for(var i = 0 ; i < data.metroBus[key].length; i++){
			$('.metro-bus-table:last-child').append(templates.bus(data.metroBus[key][i]));
			//console.log(data.metroBus[key][i])
		}
	})

}

// var getZipcar = function(location){

// 	$.ajax({
// 		type: "GET",
// 		url: "/zipcars",
// 		data: location,
// 		success: function(result){
// 			// console.log(result)
// 			data.zipcar = result;
// 			listZipcar();
// 		}
// 	})

// }

// var listZipcar = function(){

// 	$('.zipcar').html("");

// 	if(data.zipcar.length > 0){
// 		$('.zipcar').show();
// 		$('.zipcar').append(templates.zipcarHeader);
// 	}
// 	else {
// 		$('.zipcar').hide();
// 	}

// 	for(var i = 0 ; i < data.metrobus.length ; i++){
// 		$('.zipcar-table').append(templates.zipcar(data.zipcar[i]));
// 	}


// }

var getMetroRail = function(location){

	$.ajax({
		type: "GET",
		url: "/trains",
		data: location,
		success: function(result){
			data.metroRail = result;
			//console.log(result);
			listMetroRail();
		}
	})

}

var listMetroRail = function(){

	$('.metro-rail').html('');

	var locations = [];

	for( var i = 0 ; i < data.metroRail.length ; i ++ ){
		var isNewLocation = true;
		for( var j = 0 ; j < locations.length ; j++ ){
			if( locations[j] === data.metroRail[i].LocationName){
				isNewLocation = false;
			}
		}
		if(isNewLocation){
			locations.push(data.metroRail[i].LocationName);
		}
	}

	//console.log("locations:", locations)

	var metroRailLogo = {
		className: "metro-rail-logo",
		src: "/assets/metro_logo.png"
	}

	if(locations.length > 0){
		$('.metro-rail').show();
		$('.metro-rail').append(templates.logo(metroRailLogo))
	}
	else{
		$('.metro-rail').hide();
	}

	for( var i = 0 ; i < locations.length ; i++){
		var locationObj = {
			LocationName: locations[i]
		}
		//console.log("locationObj:", locationObj)
		$('.metro-rail').append(templates.railHeader(locationObj));

		_.each(_.filter(data.metroRail, function(station){
			return (station.LocationName === locations[i])
		}),function(station){
			$('.metro-rail-table:last-child').append(templates.rail(station));
		})

		
	}


}

var getUber = function(location){

	$.ajax({
		type: "GET",
		url: "/ubers",
		data: location,
		success: function(result){
			data.uber = result;
			// console.log(result);
			listUber();
		}
	})

}

var listUber = function(){

	$('.uber').html("");

	if(data.uber.length > 0){
		$('.uber').show();
		$('.uber').append(templates.uberHeader({}));
	}
	else{
		$('.uber').hide();
	}

	for(var i = 0 ; i < data.uber.length ; i++){
		if(!(checkRemoved(data.uber[i].display_name))){
			$('.uber-table').append(templates.uber(data.uber[i]));
		}
	}

}

var getBikeshare = function(location){

	$.ajax({
		type: "GET",
		url: "/bikeshares",
		data: location,
		success: function(result){
			data.bikeshare = result;
			// console.log(result);
			listBikeshare();
		}
	})

}

var listBikeshare = function(){

	var bikeshareLogoObj = {
		className: "bikeshare-logo",
		src: "/assets/cb_logo.jpg"
	}

	$('.bikeshare').html("");

	if(data.bikeshare.length > 0){
		$('.bikeshare').show();
		$('.bikeshare').append(templates.logo(bikeshareLogoObj));
		$('.bikeshare').append(templates.bikeshareHeader({}));
	}
	else{
		$('.bikeshare').hide();
	}

	for(var i = 0 ; i < data.bikeshare.length ; i++){
		if(!(checkRemoved(data.bikeshare[i].name))){
			$('.bikeshare-table').append(templates.bikeshare(data.bikeshare[i]));
		}	
	}

}





var startTime = function() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    $('.time').html(h+":"+m+":"+s);
    timouts.clock = setTimeout(function(){startTime()},500);
}

var checkTime = function(i) {
    if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

var getWeather = function(location){

	$.ajax({
		url: "/weather",
		type: "GET",
		data: location,

		success: function(result){
			console.log(result)
			data.weather = result;
		}
	})
}

var postWeather = function(){
	//do stuff with weather
}


/*
make calls to these, pass longitude and latitude
bikeshare: GET /bikeshare
bus: GET /metro-Bus
rail: GET /metro-Rail
zipcar: GET /zipcars
uber: GET /uber
*/

