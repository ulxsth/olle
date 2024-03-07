function getStartlocation(){
    console.log("aaaaaa");
    const Startlat = document.getElementById("start-lat");
    const Startlng = document.getElementById("start-lng");
    const Startlocation = document.getElementById("startlocation");

    console.log(Startlat);
    console.log(Startlng);
    console.log(Startlocation);

    const storedStart = localStorage.getItem("start");
    const storedLat = localStorage.getItem("pac-lat");
    const storedLng = localStorage.getItem("pac-lng");

    console.log(storedLat);
    console.log(storedLng);
    console.log(storedStart);

    if (storedStart) {
        Startlocation.textContent = storedStart;
    }

    if (storedLat) {
        Startlat.value = storedLat;s
    }

    if (storedLng) {
        Startlng.value = storedLng;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    getStartlocation();
});