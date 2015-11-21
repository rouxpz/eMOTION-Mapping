// var x = document.getElementById("demo");
var lat;
var lon;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
	lat = position.coords.latitude;
	lon = position.coords.longitude;
    document.getElementById("latitude").value = lat;
    document.getElementById("longitude").value = lon;
    // console.log("Latitude: " + position.coords.latitude);
}

function saveData() {
	console.log(document.getElementById("feeling").value);
    console.log(document.getElementById("latitude").value);
    console.log(document.getElementById("longitude").value);
}