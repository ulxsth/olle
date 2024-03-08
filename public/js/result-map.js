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
var globalresponse;
var currentLocationMarker;
var travelModeRadioButtons = document.getElementsByName('travel-mode');
travelModeRadioButtons.forEach((radioButton) => {
  radioButton.addEventListener('change', (e) => {
    const travelMode = e.target.value;
    setLocation(end.lat, end.lng, travelMode, waypoints); // waypointsを引数として渡す
  });
});
var currentLocationMarker;
function trackCurrentLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
          (position) => {
              const currentLat = position.coords.latitude;
              const currentLng = position.coords.longitude;
              if (currentLocationMarker) {
                  currentLocationMarker.setMap(null);
              }
              currentLocationMarker = new google.maps.Marker({
                  position: { lat: currentLat, lng: currentLng },
                  map: map,
                  icon: {
                      url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                  }
              });
              // map.panTo(new google.maps.LatLng(currentLat, currentLng));
          },
          (error) => {
              console.error("位置情報を取得できません: ", error);
          },
          {
              enableHighAccuracy: true,
              maximumAge: 0
          }
      );
  } else {
      console.error("Geolocation は利用できません");
  }
}
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
  setLocation(end.lat, end.lng, "WALKING", waypoints); // WALKINGルートを表示
  trackCurrentLocation();
}

function startRouteNavigation() {
  setLocation(end.lat, end.lng, "DRIVING", waypoints); // DRIVINGルートを表示
}

function setLocation(lat, lng, travelMode = 'DRIVING', waypoints = []) {
  directionsService.route({
    origin: start,
    destination: { lat: lat, lng: lng },
    waypoints: waypoints,
    travelMode: travelMode,
  }).then((response) => {
    directionsRenderer.setDirections(response);
    map.panTo(new google.maps.LatLng(lat, lng));
    globalresponse = response.routes;
    // 経由地点を考慮した時間を取得
    const duration = response.routes[0].legs.reduce((total, leg) => total + leg.duration.value, 0);
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration - hours * 3600) / 60);
    const durationText = hours > 0 ? `${hours}時間${minutes}分` : `${minutes}分`;
    document.getElementById('duration').textContent = durationText;
  }).catch((e) => {
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

function setInitialRouteInstructions(response) {
  const instructionDiv = document.getElementById('route-instructions');
  instructionDiv.style.display = 'block'; // テキストを表示
  instructionDiv.innerHTML = ''; // 以前の内容をクリア

  globalresponse = response.routes;

  const routeSteps = document.getElementById('route-steps');
  routeSteps.innerHTML = ''; // ルート指示リストをクリア

  // 各ステップのドロップダウンリストを作成
  globalresponse.forEach(route => {
    route.legs.forEach(leg => {
      leg.steps.forEach((step, index) => {
        const stepOption = document.createElement('option');
        stepOption.value = index;
        stepOption.textContent = `ステップ ${index + 1}`;
        routeSteps.appendChild(stepOption);
      });
    });
  });

  const firstStep = response.routes[0].legs[0].steps[0]; // 最初のステップを取得

  const instruction = document.createElement('div'); // <div>要素を作成
  instruction.classList.add('step'); // ステップを区別するためにクラスを追加

  const instructionText = document.createElement('span'); // テキスト部分を囲む<span>要素を作成
  instructionText.textContent = `Step 1: `;

  const instructionContent = document.createElement('span'); // 指示部分を囲む<span>要素を作成
  instructionContent.textContent = removeHTMLTags(firstStep.instructions); // HTMLタグを除去してテキストを設定

  instruction.appendChild(instructionText); // テキスト部分を追加
  instruction.appendChild(instructionContent); // 指示部分を追加

  if (firstStep.maneuver) {
    const maneuver = document.createElement('span'); // マヌーバーを表示する<span>要素を作成
    maneuver.textContent = ` (${firstStep.maneuver})`;
    instruction.appendChild(maneuver); // マヌーバーを追加
  }

  instructionDiv.appendChild(instruction); // ステップを表示する<div>要素を追加
}

function showStepDropdownList() {
  console.log('globalresponse:', globalresponse); // globalresponseの値をログに出力

  const routeList = document.getElementById('route-list');

  if (routeList.style.display === 'none') {
    routeList.style.display = 'block'; // ルートリストを表示

    const routeSteps = document.getElementById('route-steps');
    routeSteps.innerHTML = ''; // ルート指示リストをクリア

    // 各ルートのステップをプルダウン形式で表示する
    globalresponse.forEach((route, routeIndex) => {
      const routeGroup = document.createElement('optgroup');
      routeGroup.label = "道順";

      route.legs.forEach(leg => {
        leg.steps.forEach((step, stepIndex) => {
          const stepOption = document.createElement('option');
          stepOption.value = stepIndex;
          stepOption.textContent = removeHTMLTags(step.instructions);
          routeGroup.appendChild(stepOption);
        });
      });

      routeSteps.appendChild(routeGroup);
    });
  } else {
    routeList.style.display = 'none'; // ルートリストを非表示
  }
}

function removeHTMLTags(text) {
    return text.replace(/<[^>]+>/g, '');
}

window.onload = function() {
  document.getElementById('route-instructions').style.display = 'none';
  document.getElementById('toggle-list-button').addEventListener('click', showStepDropdownList); // イベントリスナーを修正
};

travelModeRadioButtons.forEach((radioButton) => {
  radioButton.addEventListener('change', (e) => {
    const travelMode = e.target.value;
    setLocation(end.lat, end.lng, travelMode, waypoints); // 選択された移動手段に基づいてルートを表示
    updateRouteList(travelMode); // ルート一覧を更新
  });
});

function updateRouteList(travelMode) {
  // ルート一覧の要素を取得
  const routeList = document.getElementById('route-list');
  const routeSteps = document.getElementById('route-steps');

  // ルート一覧をクリア
  routeSteps.innerHTML = '';

  // 各ルートのステップをプルダウン形式で表示する
  globalresponse.forEach((route, routeIndex) => {
    // 移動手段が一致する場合のみ追加する
    if (route.travelMode === travelMode) {
      const routeGroup = document.createElement('optgroup');
      routeGroup.label = `ルート ${routeIndex + 1}`;

      route.legs.forEach(leg => {
        leg.steps.forEach((step, stepIndex) => {
          const stepOption = document.createElement('option');
          stepOption.value = stepIndex;
          stepOption.textContent = step.instructions;
          routeGroup.appendChild(stepOption);
        });
      });

      routeSteps.appendChild(routeGroup);
    }
  });
}

window.onload = function() {
  document.getElementById('route-instructions').style.display = 'none';
};


document.getElementById('toggle-list-button').addEventListener('click', function() {
  showStepDropdownList();
});
