'use strict';

var client_ID = "AI0UWYY2U4G1QCQ50FRSGZRUZG0RIJUE0BLWBZWXCSHNTA2J";
var client_secret = "4DPTTZWE2TQNVEX524RWJNHTIIAZXLJ5D4O52SSLGUNDKANQ";
var radius = 1000;
var longitude = '';
var latitude = '';
var version = "20171114"

var render = document.getElementById('view');

function start() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setCoordinate);
    }

}

function onchange_action() {
    var e = document.getElementById('category_id');
    var section = e.options[e.selectedIndex].value;
    return section;
}

document.getElementById('category_id').onchange = function () {
    var section = onchange_action();
    latitude = initApp.navigator.geolocation.latitude;
    longitude = initApp.navigator.geolocation.longitude;
    getEndPoint(latitude, longitude, section);
}

function setCoordinate(position) {

    this_latitude = position.coords.latitude;
    this_longitude = position.coords.longitude;

    document.getElementById('category_id').onchange = function () {
        var section = onchange_action();

        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                load_info(request.responseText);
            }
        }
        request.open('get', getFoursquareExploreEndpoint(this_latitude, this_longitude, section));
        request.send();
    }
}

function category_conversion(category) {
    var categories = '';
    for (var i = 0; i < category.length; i++) {
        categories += category[i].name;
    }
    return categories;
}
function getEndPoint(lat, long, section) {
    return "https://api.foursquare.com/v2/venues/explore?ll=" + lat + "," + long + "&section=" + section + "&radius=" + radius + "&client_id=" + client_ID + "&client_secret=" + client_secret + "&v=" + version;
}
