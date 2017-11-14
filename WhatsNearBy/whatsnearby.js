'use strict';

var client_ID = "AI0UWYY2U4G1QCQ50FRSGZRUZG0RIJUE0BLWBZWXCSHNTA2J";
var client_secret = "4DPTTZWE2TQNVEX524RWJNHTIIAZXLJ5D4O52SSLGUNDKANQ";
var radius = 1000;
var longitude = '';
var latitude = '';
var version = "20171114"

var render = document.getElementById('view');

window.onload = start();

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
    latitude = navigator.geolocation.coords.latitude;
    longitude = navigator.geolocation.coords.longitude;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            load_info(request.responseText);
        }
    }
    request.open('get', getEndPoint(latitude, longitude, section));
    request.send();
}

function getEndPoint(lat, long, section) {
    return "https://api.foursquare.com/v2/venues/explore?ll=" + lat + "," + long + "&section=" + section + "&radius=" + radius + "&client_id=" + client_ID + "&client_secret=" + client_secret + "&v=" + version;
}

function setCoordinate(position) {

    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    document.getElementById('category_id').onchange = function () {
        var section = onchange_action();

        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                load_info(request.responseText);
            }
        }
        request.open('get', getEndPoint(latitude, longitude, section));
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

function load_info(response) {
    var obj = JSON.parse(response);
    var view = '<div class="panel panel-default"><div class="panel-body">';

    view += '<p>Looking for :<Strong> ' + onchange_action() + '</Strong></p>';
    view += '<p>Your current location :<strong>  ' + obj.response.headerFullLocation + '</strong></p>';
    view += '<p>Within : <strong>  ' + radius / 1000 + 'km</strong></p>';
    view += '<hr />';

    for (var i = 0; i < obj.response.groups.length; i++) {
        var items = obj.response.groups[i].items;

        for (var j = 0; j < items.length; j++) {
            var venue = items[j].venue;

            var name = venue.name;
            var contact = venue.contact.formattedPhone;
            var location = venue.location.formattedAddress;
            var categories = category_conversion(venue.categories);
            var rating = venue.rating;

            view +=
                '<p><img src="icons/house16.png"/><Strong> Name: </Strong>' + name + '</p>'     
                + '<p><img src="icons/phone16.png"/><Strong> Contact: </Strong>' + contact + '</p>'
                + '<p><img src="icons/16.png"/><Strong> Address: </Strong>' + '</p>'
                + '<p>&emsp;' + location + '</p>'
                + '<p><img src="icons/cart16.png"/><Strong> Categories: </Strong>' + categories + '</p>'
                + '<p><img src="icons/star16.png"/><Strong> Rating: </Strong>' + rating + '</p>'
                + '<hr />';
        }
    }

    view += '</div></div>';
    render.innerHTML = view;
}
