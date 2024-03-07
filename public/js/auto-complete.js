function initMap() {
  const input = document.getElementById("pac-input");
  const options = {
    fields: ["formatted_address", "geometry", "name"],
    strictBounds: false,
  };

  const autocomplete = new google.maps.places.Autocomplete(
    input,
    options
  );

  const infowindow = new google.maps.InfoWindow();
  const infowindowContent = document.getElementById("infowindow-content");
  const errordisplay = document.getElementById("error-display");
  const date = document.getElementById("date");
  const latInput = document.getElementById("pac-lat");
  const lngInput = document.getElementById("pac-lng");
  infowindow.setContent(infowindowContent);

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (!place.geometry || !place.geometry.location) {
      errordisplay.textContent = "※有効な住所を入力してください。";
      return;
    }else{
      errordisplay.textContent = "";
    }
    latInput.value = place.geometry.location.lat();
    lngInput.value = place.geometry.location.lng();
  });


function checkDate() {
    const currentDate = new Date();
    const selectedDate = new Date(date.value);
    currentDate.setHours(0, 0, 0, 0);
    if (!date.value || selectedDate.getTime() < currentDate.getTime()) {
      errordisplay.textContent = "※本日以降の日付を入力してください";
    } else {
      errordisplay.textContent = "";
    }
  }
  date.addEventListener("change", checkDate);
}

