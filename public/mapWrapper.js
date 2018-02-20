const MapWrapper = function (container, coords, zoom) {
  this.googleMap = new google.maps.Map(container, {
    center: coords,
    zoom: zoom
  });
  this.markers = []
}

MapWrapper.prototype.addMarker = function (coords, message) {
  const infoWindowInfo = new google.maps.InfoWindow({
    content: `${message} You are currently at latitude: ${coords.lat} and longitude ${coords.lng} `
  });

const marker = new google.maps.Marker({
    position: coords,
    map: this.googleMap,
    infoWindow: infoWindowInfo
  });

  google.maps.event.addListener(marker, 'click', function(){
    this.infoWindow.open(this.googleMap, this);
  });
  this.markers.push(marker)
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
