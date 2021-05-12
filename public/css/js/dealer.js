const saveCar = (carData) =>
  fetch("/dealer/newcar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(carData),
  });
