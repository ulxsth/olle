const addButton = getElementById("add-flag");
const nextButton = document.getElementById("next-button");
const Startlat = document.getElementById("start-lat");
const Startlng = document.getElementById("start-lng");
const cnt = 1;
let waypoints = [9];

waypoints[0] = Startlat,Startlng;
function localPush(){
    if (window.localStorage) {
        let json = JSON.stringify(waypoints, undefined, 1);
        localStorage.setItem('location', json);
    }
}

addButton.addEventListener("click", (event) => {
    event.preventDefault();
    const latInput = document.getElementById("pac-lat");
    const lngInput = document.getElementById("pac-lng");
    
    waypoints[cnt] = latInput,lngInput;
    cnt++;
});

nextButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (!latInput.value || !lngInput.value) {
      return;
    }
    localPush();
});


