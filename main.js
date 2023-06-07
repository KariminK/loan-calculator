import { Car } from "./modules/car.js";
import { form } from "./modules/form.js";
let currentCar = {};
let car1 = new Car(234, 10, 2023, 32, 423, 24, "t", 423, "Rzeszow");
car1.insertInfo(car1.details);
car1.element.addEventListener("click", () => {
  car1.activateForm();
  car1.insertInfo(form.formInfo);
});
