document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("nav-submit");
    const nextButton = document.getElementById("next-button");
    const errordisplay = document.getElementById("error-display");
    const latInput = document.getElementById("pac-lat");
    const lngInput = document.getElementById("pac-lng");
  
    nextButton.addEventListener("click", (event) => {
      event.preventDefault();
      if (!latInput.value || !lngInput.value) {
        errordisplay.textContent = "※有効な住所を入力してください。";
        return;
      } else {
        errordisplay.textContent = "";
      }
      form.submit();
    });
  });