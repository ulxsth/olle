document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("nav-submit");
    const nextButton = document.getElementById("next-button");
    const prevButton = document.getElementById("prev-button");
    const errorDisplay = document.getElementById("error-display");
    const date = document.getElementById("date");
    
    const currentDate = new Date();
    const selectedDate = new Date(date.value);
    
    nextButton.addEventListener("click", (event) => {
        event.preventDefault();
        if (!date.value) {
          errorDisplay.textContent = "※日付を入力してください";
          return;
        } else {
          errorDisplay.textContent = "";
          form.submit();
        }
      });
      
  
    prevButton.addEventListener("click", (event) => {
      event.preventDefault();
      window.history.back();
    });
  });
  