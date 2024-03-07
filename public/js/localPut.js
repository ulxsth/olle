let waypoints = [];
const storedLat = localStorage.getItem("pac-lat");
const storedLng = localStorage.getItem("pac-lng");

waypoints.push([storedLat, storedLng]);

function localPush(){
    if (window.localStorage) {
        let json = JSON.stringify(waypoints, undefined, 1);
        localStorage.setItem('location', json);
    }
}

nextButton.addEventListener("click", (event) => {
    const latInputs = document.querySelectorAll(".pac-lat").value;
    const lngInputs = document.querySelectorAll(".pac-lng").value;
    console.log(latInputs);
    console.log(lngInputs);

    for (let i = 0; i < latInputs.length; i++) {
        waypoints.push([latInputs[i].value, lngInputs[i].value]);
    }

    console.log(waypoints);
    localPush();
});
