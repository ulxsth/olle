var directionsService;
var directionsRenderer;
var distanceMatrixService;
var map;
var waypoints = []; // waypointsをグローバルスコープに移動
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
    setLocation(end.lat, end.lng, travelMode, waypoints); // waypointsを引数として渡す
  });
});
function initMap() {
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  distanceMatrixService = new google.maps.DistanceMatrixService();
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: start
  });
  let locations = JSON.parse(localStorage.getItem('location'));
  let origin = locations.shift();
  let destination = locations.pop();
  new google.maps.Marker({
    position: new google.maps.LatLng(...origin),
    map: map,
    label: "Start"
  });
  waypoints = locations.map(location => {
      return { location: new google.maps.LatLng(...location) };
  });
  setLocation(end.lat, end.lng, "WALKING", waypoints);
  placeMarkers(waypoints); // 経由地点にピンを立てる
  new google.maps.Marker({
    position: new google.maps.LatLng(...destination),
    map: map,
    label: "End"
  });
  let request = {
      origin: new google.maps.LatLng(...origin),
      destination: new google.maps.LatLng(...destination),
      waypoints: waypoints
  };
  directionsRenderer.setMap(map);
  directionsRenderer.setOptions({ suppressMarkers: true });
  setLocation(end.lat, end.lng, "WALKING", waypoints);
}
function setLocation(lat, lng, travelMode = 'DRIVING', waypoints = []) {
  directionsService.route(
    {
      origin: start,
      destination: { lat: lat, lng: lng },
      waypoints: waypoints,
      travelMode: travelMode,
    })
    .then((response) => {
      directionsRenderer.setDirections(response);
      map.panTo(new google.maps.LatLng(lat, lng));
 
      // 経由地点を考慮した時間を取得
      const duration = response.routes[0].legs.reduce((total, leg) => total + leg.duration.value, 0);
      const hours = Math.floor(duration / 3600);
      const minutes = Math.floor((duration - hours * 3600) / 60);
      const durationText = hours > 0 ? `${hours}時間${minutes}分` : `${minutes}分`;
      document.getElementById('duration').textContent = durationText;
    })
    .catch((e) => {
      window.alert('ルートが存在しませんでした。別の移動方法をお試しください。');
    });
}
function placeMarkers(waypoints) {
  waypoints.forEach((waypoint, index) => {
    new google.maps.Marker({
      position: waypoint.location,
      label: `${index + 1}`,
      map: map
    });
  });
}