var directionsService;
var directionsRenderer;
var distanceMatrixService;
var map;

const start = { lat: document.getElementById("user-lat").value, lng: document.getElementById("user-lng").value };
const end = { lat: document.getElementById("onsen-lat").value, lng: document.getElementById("onsen-lng").value };

function initMap() {
  // APIインスタンスを生成
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  distanceMatrixService = new google.maps.DistanceMatrixService();

  // マップの初期表示を設定
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: start
  });

  // レンダラーをマップに設定
  directionsRenderer.setMap(map);

  // 上で設定したオプションを適用
  directionsRenderer.setOptions({ suppressMarkers: true });

  // ルートの取得
  setLocation(end.lat, end.lng);
}

function setLocation(lat, lng) {
  // 所要時間の取得
  distanceMatrixService.getDistanceMatrix(
    {
      origins: [start],
      destinations: [end],
      travelMode: 'DRIVING',
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
    }, timeRequired);

  // ルートの取得
  directionsService.route(
    {
      origin: start,                              // 出発地
      destination: { lat: lat, lng: lng },        // 目的地
      travelMode: 'DRIVING',                      // 交通手段
    })
    .then((response) => {
      directionsRenderer.setDirections(response);
      map.panTo(new google.maps.LatLng(lat, lng));
    })
    .catch((e) => window.alert('Directions request failed due to ' + e));
}


function timeRequired(response, status) {
  if (status !== 'OK') {
    window.alert('Error was: ' + status);
    return;
  }
  const duration = response.rows[0].elements[0].duration.text;
  document.getElementById('duration').textContent = duration;
}
