const inventoryTable = document.getElementById("inventory-table");

const saveCar = (carData) =>
  fetch("/dealer/newcar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(carData),
  });

//marking car as sold
const soldCar = (carData) =>
  fetch(`/dealer/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(carData),
  });

inventoryTable.addEventListener("click", function (event) {
  console.log(event.target);
});
