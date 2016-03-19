$("#heading").click(function() {
	$("#instructions").slideToggle("slow");
    $("#selection").fadeToggle("slow");
});

var map = L.map('map').setView([40.7127, -72.0059], 7);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'rouxpz.0hdfyhpd',
    accessToken: 'pk.eyJ1Ijoicm91eHB6IiwiYSI6ImNpa3FnNzdpODAxcGx1eGt0ZjRpc200b3oifQ.KjjoT2U4IXUvMQFVRjrRWA'
}).addTo(map);


var greenIcon = L.icon({
    iconUrl: 'static/js/leaflet/images/beginMarker-2x.png',
    iconSize:     [25, 41],
    iconAnchor:   [12, 41],
    popupAnchor:  [12, 0]
});

var redIcon = L.icon({
    iconUrl: 'static/js/leaflet/images/endMarker-2x.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [12, 0]
});

var nyc = L.latLng(40.7127, -74.0059);
var philly = L.latLng(39.9500, -75.1667);
var baltimore = L.latLng(39.2833, -76.6167);
var boston = L.latLng(42.3601, -71.0589);

L.marker(nyc, {icon: greenIcon}).addTo(map);
L.marker(boston, {icon: redIcon}).addTo(map);
L.marker(philly, {icon: redIcon}).addTo(map);
L.marker(baltimore, {icon: redIcon}).addTo(map);

var latlngs = [[nyc, philly], [nyc, boston], [nyc, baltimore]];

// for (var i = 0; i < latlngs.length; i++) {
// 	var polyline = L.polyline(latlngs[i], {color: '#60d4ac'}).addTo(map);
// }


for (var i = 0; i < totalEmotions.length; i++) {
    var destID = totalEmotions[i][4];
    if (isNaN(totalEmotions[i][1]) === false) {
    	var loc = L.latLng(totalEmotions[i][1], totalEmotions[i][2]);
        // console.log(loc);
    	var popupContent = totalEmotions[i][0];
    	var m = L.circle(loc,
    			5000, 
    			{color: totalEmotions[i][3], 
    			fillColor: totalEmotions[i][3],
                fillOpacity: 0.5,
                className: '' + destID + ' emotionMarker'}
    		).addTo(map);
    	m.bindPopup(popupContent, {minWidth: '300', className: 'custom'});
    }
}

function showHide(destination) {
    var eMarkers = document.getElementsByClassName('emotionMarker');
    for (var i = 0; i < eMarkers.length; i++) {

        if (eMarkers[i].classList.contains(destination)) {
            console.log("found a match!");
            eMarkers[i].style.display = "block";
        } else {
            console.log("no match");
            eMarkers[i].style.display = "none";
        }
    }
}

function showAll() {
    var eMarkers = document.getElementsByClassName('emotionMarker');
    for (var i = 0; i < eMarkers.length; i++) {
        eMarkers[i].style.display = "block";
    }
}