const calculateButton = document.querySelector(".calculate-button");
const column2 = document.querySelector(".column2");
const calculateBtn = document.getElementById('calculate-btn');

calculateButton.addEventListener("click", () => {
  column2.classList.toggle("show");
});



