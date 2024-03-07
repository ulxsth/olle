const addButton = document.getElementById("add-flag");
let deleteButtons = [];

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
    const addFlag = `
        <div class="flag">
            <div class="flag__header">
                <h3 class="flag__checkpoint">到着地点</h3>
                <button class="flag__delete-btn" id="delete-btn-${count}" >削除</button>
            </div>
            <p class="flag__name">${inputValue}</p>
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
});
