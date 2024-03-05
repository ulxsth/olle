var directionsService;
var directionsRenderer;
var distanceMatrixService;
var map;

const ryokanLat = parseFloat(document.getElementById("ryokan-lat").value);
const ryokanLng = parseFloat(document.getElementById("ryokan-lng").value);
const onsenLat = parseFloat(document.getElementById("onsen-lat").value);
const onsenLng = parseFloat(document.getElementById("onsen-lng").value);

const start = { lat: ryokanLat, lng: ryokanLng };
const end = { lat: onsenLat, lng: onsenLng };

var travelModeRadioButtons = document.getElementsByName('travel-mode');
travelModeRadioButtons.forEach((radioButton) => {
  radioButton.addEventListener('change', (e) => {
    const travelMode = e.target.value;
    setLocation(end.lat, end.lng, travelMode);
  });
});

/**
 * マップのレンダリングを行うコールバック関数。
 * Google Maps APIの読み込みが完了すると呼び出される。
 * @param {void}
 * @return {void}
 */
function initMap() {
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  distanceMatrixService = new google.maps.DistanceMatrixService();

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: start
  });
  directionsRenderer.setMap(map);
  directionsRenderer.setOptions({ suppressMarkers: true });
  setLocation(end.lat, end.lng);
}

/**
 * 緯度経度を指定し、所要時間を計算する。
 * @param {float} lat 地点の緯度
 * @param {float} lng 地点の経度
 */
function setLocation(lat, lng, travelMode = 'DRIVING') {
  // 所要時間の取得
  distanceMatrixService.getDistanceMatrix(
    {
      origins: [start],
      destinations: [end],
      travelMode: travelMode,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
    }, calcDuration);

  // ルートの取得
  directionsService.route(
    {
      origin: start,
      destination: { lat: lat, lng: lng },
      travelMode: travelMode,
    })
    .then((response) => {
      directionsRenderer.setDirections(response);
      map.panTo(new google.maps.LatLng(lat, lng));
    })
    .catch((e) => window.alert('Directions request failed due to ' + e));
}

function calcDuration(response, status) {
  if (status !== 'OK') {
    window.alert('Error was: ' + status);
    return;
  }
  const duration = response.rows[0].elements[0].duration.text;
  document.getElementById('duration').textContent = duration;
}
