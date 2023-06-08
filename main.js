import { Car } from "./modules/car.js";
import { form } from "./modules/form.js";
let currentCar = {};
let car1 = new Car(234, 10, 2023, 32, 423, 24, "Premium", 423, "Rzeszow");
car1.insertInfo(car1.details);
car1.element.addEventListener("click", () => {
  car1.activateForm();
  car1.insertInfo(form.formInfo);
});

let car2 = new Car(23543, 123, 2137, 12, 420, 24, "Basic", 423, "Kostrzyn");
car2.insertInfo(car2.details);
car2.element.addEventListener("click", () => {
  car2.activateForm();
  car2.insertInfo(form.formInfo);
});
let car3 = new Car(234, 10, 2023, 32, 423, 24, "Standard", 423, "Rzeszow");
car3.insertInfo(car3.details);
car3.element.addEventListener("click", () => {
  car3.activateForm();
  car3.insertInfo(form.formInfo);
});