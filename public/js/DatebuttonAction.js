document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("nav-submit");
    const nextButton = document.getElementById("next-button");
    const errorDisplay = document.getElementById("error-display");
    const date = document.getElementById("date");

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    nextButton.addEventListener("click", (event) => {
        event.preventDefault();
        const selectedDate = new Date(date.value); 
        if (!date.value) {
          errorDisplay.textContent = "※日付を入力してください";
          return;
        } else if(selectedDate.getTime() < currentDate.getTime()) {
          errorDisplay.textContent = "※本日以降の日付を入力してください";
          return;
        } else {
          errorDisplay.textContent = "";
          form.submit();
        }
      });
});
