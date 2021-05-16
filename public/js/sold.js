let soldButton = document.getElementById("sold-button");

const soldCar = (id) =>
  fetch(`/dealer/${id} `, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
  }).then((data) => {
    console.log(data);
  });

soldButton.addEventListener("click", function (event) {
  const data = event.target;
  const id = data.getAttribute("data-id");
  console.log("this is the ID" + id);
  soldCar(id);
});
