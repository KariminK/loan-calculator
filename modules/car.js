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
    location,
    name,
    src,
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
    this.name = name;
    this.src = src;
    this.template = document.querySelector(".carTemp").content.cloneNode(true);
    this.element = this.template.querySelector(".car");
    this.details = this.template.querySelectorAll(".detail");
    this.img = this.template.querySelector(".carImg");
    this.img.src = this.src;
    this.nameElement = this.template.querySelector("#carName");
    this.nameElement.innerText = this.name;
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
    for (let detail in form.carDetails) {
      switch (detail) {
        case "price":
          form.carDetails[detail] = this.price + "$";
          break;
        case "power":
          form.carDetails[detail] = this.power;
          break;
        case "YoP":
          form.carDetails[detail] = this.yearOfProduction;
          break;
        case "mileage":
          form.carDetails[detail] = this.mileage;
          break;
        case "fuel":
          form.carDetails[detail] = this.fuel;
          break;
        case "fuelUsage":
          form.carDetails[detail] = this.fuelUsage;
          break;
        case "tier":
          form.carDetails[detail] = this.tier;
          break;
        case "available":
          form.carDetails[detail] = this.available;
          break;
        case "location":
          form.carDetails[detail] = this.location;
          break;
      }
    }
  }
  activateForm() {
    form.init();
    this.insertInfo(form.formInfo);
  }
  
}
