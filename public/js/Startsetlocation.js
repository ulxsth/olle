document.addEventListener("DOMContentLoaded", function () {
    localStorage.clear();

    const form = document.getElementById("nav-submit");
    const nextButton = document.getElementById("next-button");
    nextButton.addEventListener("click", (event) => {
        event.preventDefault();
        const startInput = document.getElementById("pac-input");
        const startValue = startInput.value;
        const latInput = document.getElementById("pac-lat");
        const latValue = latInput.value;
        const lngInput = document.getElementById("pac-lng");
        const lngValue = lngInput.value;

        if(startValue != null && latValue != null && lngValue != null){
            localStorage.setItem("start", startValue);
            localStorage.setItem("pac-lat", latValue);
            localStorage.setItem("pac-lng", lngValue);
        }
        event.preventDefault();
    });
});
