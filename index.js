//***********************1. Шаблони проєктування********************************//
class Transport {
  ride() {
    throw new Error("method ride not implemented");
  }
  stop() {
    throw new Error("method stop not implemented");
  }
}
const styles = "padding: 8px; background-color: darkblue; color: white";

class Car extends Transport {
  constructor() {
    super();
    this.type = "car";
  }
  ride() {
    console.log("%cThe Car is being driven", styles);
  }
  stop() {
    console.log("%cThe Car has stopped", styles);
  }
}

class Bike extends Transport {
  constructor() {
    super();
    this.type = "bike";
  }
  ride() {
    console.log("%cThe Bike is being ridden", styles);
  }
  stop() {
    console.log("%cThe Bike has stopped", styles);
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
