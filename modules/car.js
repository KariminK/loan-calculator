const cars = document.querySelector(".cars");
import { form } from "./form.js";
export class Car {
  constructor(
    price,
    power,
    yearOfProduction,
    mileage,
    fuel,
    fuelUsage,
    tier,
    available,
    location
  ) {
    this.price = price;
    this.power = power;
    this.yearOfProduction = yearOfProduction;
    this.mileage = mileage;
    this.fuel = fuel;
    this.fuelUsage = fuelUsage;
    this.tier = tier;
    this.available = available;
    this.location = location;
    this.template = document.querySelector(".carTemp").content.cloneNode(true);
    this.element = this.template.querySelector(".car");
    this.details = this.template.querySelectorAll(".detail");
    cars.appendChild(this.element);
  }
  insertInfo(details) {
    details.forEach((detail) => {
      switch (detail.id) {
        case "price":
          detail.innerText = this.price + "$";
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
        case "location":
          detail.innerText = this.location;
          break;
      }
    });
  }
  activateForm() {
    form.init();
    this.insertInfo(form.formInfo);
  }
  calculatePrice(estKM, yearOfObtainingDL, termOfCarRent, fuelCost) {
    const price = {
      netto: 0,
      brutto: this.netto * 1.23,
    };
  }
}
