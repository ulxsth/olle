function initMap() {
  const input = document.getElementById("pac-input");
  const options = {
    fields: ["formatted_address", "geometry", "name"],
    strictBounds: true,
    bounds: {
      north: 33.322097,
      south: 33.019005,
      west: 130.092926,
      east: 130.698717,
    },
  };

  const autocomplete = new google.maps.places.Autocomplete(input, options);

  const infowindow = new google.maps.InfoWindow();
  const errordisplay = document.getElementById("error-display");
  const date = document.getElementById("date");
  const latInput = document.getElementById("pac-lat");
  const lngInput = document.getElementById("pac-lng");

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (!place.geometry || !place.geometry.location) {
      errordisplay.textContent = "※有効な住所を入力してください。";
      return;
    } else {
      errordisplay.textContent = "";
    }
    latInput.value = place.geometry.location.lat();
    lngInput.value = place.geometry.location.lng();
  });
}
