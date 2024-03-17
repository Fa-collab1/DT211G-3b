'use strict';
var mymap = L.map('myMap').setView([60.6864461, 13.7145867], 11); // Koordinater för Malung och zoomnivå

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
}).addTo(mymap);

var marker = L.marker([60.6864461, 13.7145867]).addTo(mymap); // Lägger till en markör vid Malungs koordinater
