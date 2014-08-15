// http://leafletjs.com/examples/quick-start.html

var map = {
  _map: null,

  init: function _initMap(pos) {
    // create a map in the "map" div, set the view to a given place and zoom
    this._map = L.map('map').setView([51.505, -0.09], 13);

    // add an OpenStreetMap tile layer
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this._map);

    this.marker([51.5, -0.09], 'OSMaps');
  },

  marker: function _setMarker(coords, message) {
    L.marker(coords).addTo(this._map)
        .bindPopup(message)
        .openPopup();
  },

  gotoHere: function _locationMap() {
    this._map.locate({setView: true, maxZoom: 16});
    map.on('locationerror', onLocationError);
    map.on('locationfound', onLocationFound);

    function onLocationFound(e) {
        var radius = e.accuracy / 2;

        L.marker(e.latlng).addTo(map)
            .bindPopup("You are within " + radius + " meters from this point").openPopup();

        L.circle(e.latlng, radius).addTo(map);
    }
    function onLocationError(e) {
        alert(e.message);
    }
  }
};
window.onload = function() {
  map.init();
};
