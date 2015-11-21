var lat;
var lon;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
function showPosition(position) {
	lat = position.coords.latitude;
	lon = position.coords.longitude;
    document.getElementById("latitude").value = lat;
    document.getElementById("longitude").value = lon;
}

function saveData() {
	console.log(document.getElementById("feeling").value);
    console.log(document.getElementById("latitude").value);
    console.log(document.getElementById("longitude").value);
}