function getStartlocation(){
    const Startlat = document.getElementById("start-lat");
    const Startlng = document.getElementById("start-lng");
    const Startlocation = document.getElementById("startlocation");

    const storedStart = localStorage.getItem("start");
    const storedLat = localStorage.getItem("pac-lat");
    const storedLng = localStorage.getItem("pac-lng");

    if (storedStart) {
        Startlocation.textContent = storedStart;
    }

    if (storedLat) {
        Startlat.value = storedLat;
    }

    if (storedLng) {
        Startlng.value = storedLng;
    }
    
}

document.addEventListener("DOMContentLoaded", function() {
    getStartlocation();
});