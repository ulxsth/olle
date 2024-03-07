const addButton = document.getElementById("add-flag");
let deleteButtons = [];
const nextButton = document.getElementById("next-button");
const firstLat = document.getElementById("pac-lat").value;
const firstLng = document.getElementById("pac-lng").value;

let count = 1;

addButton.addEventListener("click", (event) => {
    event.preventDefault();
    const flagsLength = document.querySelectorAll(".flag").length;
    if (flagsLength > 9) {
        alert("通過地点は９つまでしか選べません");
        return;
    }
    let inputValue = document.getElementById("pac-input").value;
    if (inputValue === "") {
        alert("通過地点を入力してください");
        return;
    }

    geocodeAddress(inputValue).then((location) => {
        const latInputId = `pac-lat-${count}`;
        const lngInputId = `pac-lng-${count}`;
        
        const latInput = location.lat();
        const lngInput = location.lng();

        const addFlag = `
            <div class="flag">
                <div class="flag__header">
                    <h3 class="flag__checkpoint">到着地点</h3>
                    <button class="flag__delete-btn" id="delete-btn-${count}" >削除</button>
                </div>
                <p class="flag__name">${inputValue}</p>
                <div class="place-wrap">
                    <input type="hidden" name="pac-lat" id="${latInputId}" value=${latInput}>
                    <input type="hidden" name="pac-lng" id="${lngInputId}" value=${lngInput}>
                </div>
            </div>
        `;

        count++;

        const flagsWrap = document.querySelector(".flags-wrap");
        flagsWrap.innerHTML += addFlag;
        document.getElementById("pac-input").value = "";

        const flags = document.querySelectorAll(".flag");
        flags.forEach((flag, index) => {
            const checkpoint = flag.querySelector(".flag__checkpoint");
            if (index === 0) {
                checkpoint.textContent = "出発地点";
            } else if (index < flags.length - 1) {
                checkpoint.textContent = `第${index}通過地点`;
            } else {
                checkpoint.textContent = "到着地点";
            }
        });

        deleteButtons = document.querySelectorAll(".flag__delete-btn");

        deleteButtons.forEach((button) => {
            button.addEventListener("click", (event) => {
                event.preventDefault();
                const deleteButton = event.target;
                const flagElement = deleteButton.closest(".flag");
                if (flagElement) {
                    flagElement.remove();
                }
            });
        });
    }).catch((error) => {
        alert(error.message);
    });
});

nextButton.addEventListener("click", (event) => {
    localStorage.clear();
    const places = document.querySelectorAll(".place-wrap");
    let arrayPlaces = Array.from(places).map((place) => {
        const lat = place.querySelector('input[name="pac-lat"]').value;
        const lng = place.querySelector('input[name="pac-lng"]').value;
        return [lat, lng];
    });
    arrayPlaces = [[firstLat, firstLng], ...arrayPlaces];
    if (window.localStorage) {
        let json = JSON.stringify(arrayPlaces, undefined, 1);
        localStorage.setItem('location', json);
    }
});

function geocodeAddress(address) {
    return new Promise((resolve, reject) => {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address: address }, (results, status) => {
            if (status === "OK") {
                const location = results[0].geometry.location;
                const lat = location.lat();
                const lng = location.lng();
                // auto-complete.jsの範囲内かどうかチェック
                if (lat >= 32.934236 && lat <= 33.517534 && lng >= 129.928003 && lng <= 130.484793) {
                    resolve(location);
                } else {
                    reject(new Error("検索範囲外です"));
                }
            } else {
                reject(new Error("住所が見つかりませんでした"));
            }
        });
    });
}

