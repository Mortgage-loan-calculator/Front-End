const calculateButton = document.querySelector(".calculate-button");
const columns = document.querySelectorAll(".column");

calculateButton.addEventListener("click", () => {
  columns.forEach((column) => column.classList.toggle("scale"));
});
