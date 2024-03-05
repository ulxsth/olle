function initMap() {
  const input = document.getElementById("pac-input");
  const latInput = document.getElementById("pac-lat");
  const lngInput = document.getElementById("pac-lng");
  const errorDisplay = document.getElementById("error-display");

  const options = {
    fields: ["formatted_address", "geometry", "name"],
    strictBounds: false,
  };

  const autocomplete = new google.maps.places.Autocomplete(input, options);

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (!place.geometry || !place.geometry.location) {
      errorDisplay.textContent = "※有効な住所を入力してください。";
      return;
    }else{
      errorDisplay.textContent = "";
    }
    latInput.value = place.geometry.location.lat();
    lngInput.value = place.geometry.location.lng();
  });

  const form = document.getElementById("nav-submit");
  const nextButton = document.getElementById("next-button");
  const prevButton = document.getElementById("prev-button");

  nextButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (!latInput.value || !lngInput.value) {
      errorDisplay.textContent = "※有効な住所を入力してください。";
      return;
    }else{
      errorDisplay.textContent = "";
    }
    form.submit();
  });

  prevButton.addEventListener("click", (event) => {
    event.preventDefault();
    history.back();
  });
}
