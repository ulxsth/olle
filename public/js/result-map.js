var directionsService;
var directionsRenderer;
var distanceMatrixService;
var map;

const startLat = parseFloat(document.getElementById("start-lat").value);
const startLng = parseFloat(document.getElementById("start-lng").value);
const flagLat = parseFloat(document.getElementById("flag-lat").value);
const flagLng = parseFloat(document.getElementById("flag-lng").value);

const start = { lat: startLat, lng: startLng };
const end = { lat: flagLat, lng: flagLng };

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
  setLocation(end.lat, end.lng, "WALKING");
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
    .catch((e) => {
      window.alert('ルートが存在しませんでした。別の移動方法をお試しください。');
    });
}

function calcDuration(response, status) {
  if (status !== 'OK') {
    window.alert('Error was: ' + status);
    return;
  }
  const duration = response.rows[0].elements[0].duration.text;
  document.getElementById('duration').textContent = duration;
}
