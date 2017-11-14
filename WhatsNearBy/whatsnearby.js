'use strict';

var client_ID = "AI0UWYY2U4G1QCQ50FRSGZRUZG0RIJUE0BLWBZWXCSHNTA2J";
var client_secret ="4DPTTZWE2TQNVEX524RWJNHTIIAZXLJ5D4O52SSLGUNDKANQ";
var radius = 1000;
var longitude = '';
var latitude = '';
var version = "20171114"

var render = document.getElementById('view');

function onchange_action(){
    var e = document.getElementById('category_id');
    var section = e.options[e.selectedIndex].value;
    return section;
}

document.getElementById('category_id').onchange = function(){
    var section = onchange_action();
    latitude = initApp.navigator.geolocation.latitude;
    longitude = initApp.navigator.geolocation.longitude;
    getEndPoint(latitude,longitude,section);
}

function getEndPoint(lat, long, section) {
    return "https://api.foursquare.com/v2/venues/explore?ll="+lat+","+long+"&section=" + section +"&radius="+ radius+"&client_id="+ client_ID+"&client_secret="+client_secret+"&v=" + version;
}
