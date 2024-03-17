'use strict';

// lägger till en eventlistener för att kunna söka på platsen om man trycker enter i sökfältet
/*document.getElementById('searchInput').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        goToPlace();
    }
});
// Add an event listener to the button element
document.getElementById('searchButton').addEventListener('click', goToPlace);
*/


// Startar Leaflet map, börjar med en tom karta (eller rättare sagt en full världskarta)
var map = L.map('map').setView([0, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
}).addTo(map);

// Funktion för att söka på platsen
function goToPlace() {
    var searchTerm = document.getElementById('searchInput').value;

    // Geocoding mha Nominatim API
    fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + searchTerm)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                var result = data[0]; // väljer första träffen
                var lat = result.lat;
                var lon = result.lon;
                var placeName = result.display_name; // får ut namnet på platsen
                document.getElementById('placeName').textContent = placeName; // skriver ut namnet på platsen
                // Flytta kartan till platsen och lägg till en markör
                map.setView([lat, lon], 10);
                L.marker([lat, lon]).addTo(map);
            } else {
                document.getElementById('placeName').textContent = 'Ingen plats hittades';
            }
        })
        .catch(error => {
            console.error('Error fetching search results:', error);
            document.getElementById('placeName').textContent = 'Ett fel uppstod vid sökning av platsen';
        });
}






