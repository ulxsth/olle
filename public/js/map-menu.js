function mediaQueriesWin() {
    var elements = document.querySelectorAll(".has-child > a");
    elements.forEach(function (element) {
        element.removeEventListener("click", handleClick);
        element.addEventListener("click", handleClick);
    });

    function handleClick(event) {
        var parentElem = this.parentNode;
        parentElem.classList.toggle("active");
        var childUl = parentElem.querySelector("ul");
        if (childUl.style.display === "none" || childUl.style.display === "") {
            childUl.style.display = "block";
        } else {
            childUl.style.display = "none";
        }
        event.preventDefault();
    }
}

window.addEventListener("load", mediaQueriesWin);
