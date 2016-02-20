$("#heading").click(function() {
	// alert("Clicked!");
	$("#instructions").slideToggle("slow");
});

var map = L.map('map').setView([40.7127, -72.0059], 7);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'rouxpz.0hdfyhpd',
    accessToken: 'pk.eyJ1Ijoicm91eHB6IiwiYSI6ImNpa3FnNzdpODAxcGx1eGt0ZjRpc200b3oifQ.KjjoT2U4IXUvMQFVRjrRWA'
}).addTo(map);

var nyc = L.latLng(40.7127, -74.0059);
var philly = L.latLng(39.9500, -75.1667);
var baltimore = L.latLng(39.2833, -76.6167);
var boston = L.latLng(42.3601, -71.0589);

L.marker(nyc).addTo(map);
L.marker(baltimore).addTo(map);
L.marker(philly).addTo(map);
L.marker(boston).addTo(map);

var latlngs = [[nyc, philly], [nyc, boston], [nyc, baltimore]];

for (var i = 0; i < latlngs.length; i++) {
	var polyline = L.polyline(latlngs[i], {color: '#60d4ac'}).addTo(map);
}