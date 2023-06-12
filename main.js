import { Car } from "./modules/car.js";
import { form } from "./modules/form.js";
// let car1 = new Car(234, 10, 2023, 32, "petrol", 24, "Premium", 423, "Rzeszow");
// car1.insertInfo(car1.details);
// car1.element.addEventListener("click", () => {
//   car1.activateForm();
//   car1.insertInfo(form.formInfo);
// });

// let car2 = new Car(23543, 123, 2137, 12, "lpg", 100, "Basic", 2, "Kostrzyn");
// car2.insertInfo(car2.details);
// car2.element.addEventListener("click", () => {
//   car2.activateForm();
//   car2.insertInfo(form.formInfo);
// });
// let car3 = new Car(234, 10, 2023, 32, 'diesel', 8, "Standard", 423, "Rzeszow");
// car3.insertInfo(car3.details);
// car3.element.addEventListener("click", () => {
//   car3.activateForm();
//   car3.insertInfo(form.formInfo);
// });
const main = async () => {
  const data = await fetch("./cars.json");
  const dataTxt = await data.text();
  const { cars } = JSON.parse(dataTxt);
  cars.forEach((car) => {
    console.log(car);
    const carEl = new Car(
      car.price,
      car.power,
      car.yearOfProduction,
      car.mileage,
      car.fuel,
      car.fuelUsage,
      car.tier,
      car.available,
      car.location,
      car.name
    );
    carEl.insertInfo(carEl.details);
    carEl.element.addEventListener("click", () => {
      carEl.activateForm();
      carEl.insertInfo(form.formInfo);
    });
  });
};
main();
