const MapWrapper = function (container, coords, zoom) {
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  });
  this.markers = []
}

MapWrapper.prototype.goToChicago = function(){
  const chicago = {lat: 41.8781, lng: -87.6298};
  this.googleMap.setCenter(chicago);
  this.addMarker(chicago, "hello");
}
MapWrapper.prototype.addMarker = function (coords, message) {
  const marker = new google.maps.Marker({
    position: coords,
    map: this.googleMap
  });
  const infowindow = new google.maps.InfoWindow({
    content: `${message} You are currently at latitude: ${coords.lat} and longitude ${coords.lng} `
  });

  marker.addListener('click', function() {
    infowindow.open(this.googleMap, marker);
  });
  this.markers.push(marker);
  return marker;
}

MapWrapper.prototype.addClickEvent = function () {
  this.googleMap.addListener('click', function (event) {
    const position = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    this.addMarker(position, "");

  }.bind(this));
}

MapWrapper.prototype.bounceMarkers = function () {
  this.markers.forEach(function (marker) {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  })
}

MapWrapper.prototype.findMe = function(){

    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      this.addMarker(pos, "You be here");
      this.googleMap.setCenter(pos);

    }.bind(this));
  }

// MapWrapper.prototype.addInfoWindow = function (marker) {
//         marker.addListener('click', function () {
//             var infoWindow = new google.maps.InfoWindow({
//                 content: `${message} You are currently at latitude: ${coords.lat} and longitude ${coords.lng} `
//             })
//             infoWindow.open(this.googleMap, marker);
//     });
// }
