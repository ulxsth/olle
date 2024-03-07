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
    const flagHeader = `第${flagsLength}通過地点`;
    const addFlag = `
        <div class="flag">
            <div class="flag__header">
                <h3 class="flag__checkpoint">${flagHeader}</h3>
                <button class="flag__delete-btn" id="delete-btn-${count}" >削除</button>
            </div>
            <p class="flag__name">${inputValue}</p>
        </div>
    `;

    count++;

    const flagsWrap = document.querySelector(".flags-wrap");
    flagsWrap.innerHTML += addFlag;
    document.getElementById("pac-input").value = "";

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
