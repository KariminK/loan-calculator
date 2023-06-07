const cars = document.querySelector(".cars");
const form = document.querySelector("form");
const formDiv = document.querySelector(".form");
const summary = document.querySelector(".summary");
export class Car {
  constructor(
    price,
    power,
    yearOfProduction,
    mileage,
    fuel,
    fuelUsage,
    tier,
    available
  ) {
    this.price = price;
    this.power = power;
    this.yearOfProduction = yearOfProduction;
    this.mileage = mileage;
    this.fuel = fuel;
    this.fuelUsage = fuelUsage;
    this.tier = tier;
    this.available = available;
    this.template = document.querySelector(".carTemp").content.cloneNode(true);
    this.element = this.template.querySelector(".car");
    this.element.addEventListener("click", this.activateForm);
    cars.appendChild(this.element);
  }
  insertInfo() {
    const details = document.querySelectorAll(".detail");
    details.forEach((detail) => {
      switch (detail.id) {
        case "price":
          detail.innerText = this.price;
          break;
        case "power":
          detail.innerText = this.power;
          break;
        case "YoP":
          detail.innerText = this.yearOfProduction;
          break;
        case "mileage":
          detail.innerText = this.mileage;
          break;
        case "fuel":
          detail.innerText = this.fuel;
          break;
        case "fuelUsage":
          detail.innerText = this.fuelUsage;
          break;
        case "tier":
          detail.innerText = this.tier;
          break;
        case "available":
          detail.innerText = this.available;
          break;
      }
    });
  }
  activateForm() {
    if (!form.classList.contains("active")) {
      form.classList.add("active");
      formDiv.classList.remove("hide");
      summary.classList.add("hide");
    }
  }
  calculatePrice(estKM, yearOfObtainingDL, termOfCarRent, fuelCost) {
    const price = {
      netto: 0,
      brutto: this.netto * 1.23,
    };
  }
}
