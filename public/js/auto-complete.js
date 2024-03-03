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

  infowindow.setContent(infowindowContent);

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (place.geometry.location) {
      document.getElementById("pac-lat").value = place.geometry.location.lat();
      document.getElementById("pac-lng").value = place.geometry.location.lng();
      return;
    }
  });
}

