//***********************1. Шаблони проєктування********************************//
class Transport {
  ride() {
    throw new Error("method ride not implemented");
  }
  stop() {
    throw new Error("method stop not implemented");
  }
}

class Car extends Transport {
  constructor() {
    super();
    this.type = "car";
  }
  ride() {
    console.log("The Car is being driven");
  }
  stop() {
    console.log("The Car has stopped");
  }
}

class Bike extends Transport {
  constructor() {
    super();
    this.type = "bike";
  }
  ride() {
    console.log("The Bike is being ridden");
  }
  stop() {
    console.log("The Bike has stopped");
  }
}

class TransportFactory {
  static createTransportFactory(type) {
    switch (type) {
      case "Car":
        return new Car();
      case "Bike":
        return new Bike();
      default:
        throw new Error("Invalid transport type");
    }
  }
}

const factory = TransportFactory;
const car = factory.createTransportFactory("Car");
car.ride();
car.stop();

const bike = factory.createTransportFactory("Bike");
bike.ride();
bike.stop();

// ///////////////////////////////////////////////////////////////////////////////////////////////////////// //
//****************************/ 2. Робота з DOM**************************************************************//

const charactersList = document.getElementById("characters");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageNumber = document.getElementById("pageNumber");

let currentPage = 1;

function showCharacters(page) {
  charactersList.innerHTML = "Loading...";

  const response = fetch(
    `https://rickandmortyapi.com/api/character?page=${page}`
  );

  const parsedData = response
    .then((data) => {
      if (data.status !== 200) {
        alert("error");
        return;
      }
      console.log(data);
      return data.json();
    })
    .catch((error) => {
      console.log("Error:", error);
    })
    .finally(() => {
      console.log("Finally");
    });

  parsedData.then((data) => {
    updatePagination(data.info);

    charactersList.innerHTML = "";

    data.results.forEach((item) => {
      const characterCard = document.createElement("div");
      characterCard.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <p>${item.name}</p>
        <p>${item.status}</p>`;

      charactersList.appendChild(characterCard);
    });
  });
}

function updatePagination(info) {
  pageNumber.textContent = `${currentPage}`;

  prevBtn.disabled = !info.prev;
  nextBtn.disabled = !info.next;
}

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    showCharacters(currentPage);
  }
});

nextBtn.addEventListener("click", () => {
  currentPage++;
  showCharacters(currentPage);
});

showCharacters(currentPage);
