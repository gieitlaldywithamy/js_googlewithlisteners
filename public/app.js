
var initialize = function(){
  const mapDiv = document.getElementById('main-map');

  const center = { lat: 40.712784, lng: -74.005941 };

  const mainMap = new MapWrapper(mapDiv, center, 10);
  mainMap.addMarker(center);
  mainMap.addClickEvent();

  const bounceButton = document.querySelector('#button-bounce-markers')
  bounceButton.addEventListener('click', mainMap.bounceMarkers.bind(mainMap))
}

window.addEventListener('load', initialize);
