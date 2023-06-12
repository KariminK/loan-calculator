export const form = {
  parentElement: document.querySelector("#mainForm"),
  formElement: document.querySelector(".form"),
  summaryElement: document.querySelector(".summary"),
  finishBtn: document.querySelector(".finishBtn"),
  errorTxt: document.querySelector("#errorTxt"),
  kmLabel: document.querySelector("#estimatedKmTxt"),
  multipler: 1,
  basicPrice: 300,
  fuelPrice: {
    diesel: 2.5,
    petrol: 2.9,
    lpg: 1.5,
  },
  formInputs: {
    estKM: document.querySelector("#estimatedKm"),
    yearOfObtainingDL: document.querySelector("#drivingLicenseYear"),
    carRentStartDate: document.querySelector("#startDate"),
    carRentEndDate: document.querySelector("#endDate"),
  },
  formBtns: {
    submit: document.querySelector("#submitBtn"),
    cancel: document.querySelector("#cancelBtn"),
  },
  nettoPrice: document.querySelector("#netto span"),
  bruttoPrice: document.querySelector("#brutto span"),
  priceComponents: document.querySelectorAll(".priceComponent .priceNumber"),
  carDetails: {
    price: 0,
    power: 0,
    YoP: 1900,
    mileage: 0,
    fuel: "",
    fuelUsage: 32,
    tier: "",
    available: 0,
    location: "",
  },
  formInfo: document.querySelectorAll(".advancedInfoItem .detail"),
  init() {
    this.kmLabel.innerText = this.formInputs.estKM.value;
    this.parentElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this.formBtns.submit.addEventListener("click", this.submit);
    this.formBtns.cancel.addEventListener("click", this.cancel);
    this.formInputs.estKM.addEventListener("input", () => {
      this.kmLabel.innerText = this.formInputs.estKM.value;
    });
    this.parentElement.classList.add("active");
    this.summaryElement.classList.add("hide");
    this.errorTxt.classList.remove("active");
    for (let input in this.formInputs) {
      this.formInputs[input].value = "";
    }
  },
  cancel() {
    form.parentElement.classList.remove("active");
  },
  submit() {
    console.log(form.priceComponents);
    form.errorTxt.classList.remove("active");
    const data = form.validateData();
    if (data != undefined) {
      const price = form.calculatePrice(
        data.estKM,
        data.yearOfObtainingDL,
        data.dayDiff
      );
      form.showSummary(price.netto, price.brutto);
      form.insertSummaryInfo(data.dayDiff, price.fuelCost, price.additionalParts);
    }
  },
  validateData() {
    const startDateArr = form.formInputs.carRentStartDate.value.split("-");
    const endDateArr = form.formInputs.carRentEndDate.value.split("-");
    const startDate = new Date(
      startDateArr[0],
      startDateArr[1],
      startDateArr[2]
    );
    const endDate = new Date(endDateArr[0], endDateArr[1], endDateArr[2]);
    switch (this.carDetails.tier.toLowerCase()) {
      case "basic":
        form.multipler = 1;
        break;
      case "standard":
        form.multipler = 1.3;
        break;
      case "medium":
        form.multipler = 1.6;
        break;
      case "premium":
        form.multipler = 2;
        break;
    }
    if (
      startDate > endDate ||
      startDateArr.length < 3 ||
      endDateArr.length < 3
    ) {
      form.error("Invalid Date");
    } else if (
      parseInt(form.formInputs.yearOfObtainingDL.value) < 1920 ||
      parseInt(form.formInputs.yearOfObtainingDL.value) > 2023 ||
      isNaN(parseInt(form.formInputs.yearOfObtainingDL.value))
    ) {
      form.error("Invalid year of obtaining driving license");
    } else {
      const difference = startDate - endDate;
      const dayDiff = Math.floor((difference / (1000 * 3600 * 24)) * -1);
      return {
        startDate,
        endDate,
        dayDiff,
        yearOfObtainingDL: parseInt(form.formInputs.yearOfObtainingDL.value),
        estKM: parseInt(form.formInputs.estKM.value),
      };
    }
  },
  error(text) {
    if (!form.errorTxt.classList.contains("active")) {
      form.errorTxt.classList.add("active");
      form.errorTxt.innerText = "Error: " + text;
      for (let input in form.formInputs) {
        form.formInputs[input].value = "";
      }
    }
  },
  calculatePrice(estKM, yearOfObtainingDL, dayDiff) {
    const time = new Date();
    let fuelLiterPrice = 0;
    switch (form.carDetails.fuel) {
      case "diesel":
        fuelLiterPrice = form.fuelPrice.diesel;
        break;
      case "petrol":
        fuelLiterPrice = form.fuelPrice.petrol;
        break;
      case "lpg":
        fuelLiterPrice = form.fuelPrice.lpg;
        break;
    }
    const fuelCost = estKM * (form.carDetails.fuelUsage / 100) * fuelLiterPrice;
    const price = {
      netto: form.basicPrice * dayDiff * form.multipler + fuelCost,
      brutto: 0,
      fuelCost,
      additionalParts: [],
    };
    if (
      time.getFullYear() - yearOfObtainingDL < 3 &&
      form.carDetails.tier.toLowerCase() == "premium"
    ) {
      form.error("Sorry, you can't rent this car now");
    } else if (time.getFullYear() - yearOfObtainingDL < 5) {
      price.netto *= 1.2;
      price.additionalParts.push("You have driving license for less than 5 years (+20%)");
    }
    if (form.carDetails.available < 3) {
      price.netto *= 1.15;
      price.additionalParts.push("Less than 3 cars available (+15%)");
    }
    price.netto = Math.floor(price.netto);
    price.brutto = Math.floor(price.netto * 1.23);
    return price;
  },
  showSummary(netto, brutto) {
    this.formElement.classList.add("hide");
    this.summaryElement.classList.remove("hide");
    this.nettoPrice.innerText = netto + "$";
    this.bruttoPrice.innerText = brutto + "$";
    this.finishBtn.addEventListener("click", ()=>{
      form.parentElement.classList.remove("active");
      form.formElement.classList.remove("hide");
      form.summaryElement.classList.add("hide");
    })
  },
  insertSummaryInfo(dayamount, fuelcost, addParts) {
    this.priceComponents.forEach((component) => {
      switch (component.id) {
        case "dayAmount":
          component.innerText = dayamount;
          break;
        case "multipler":
          component.innerText = form.multipler;
          break;
        case "summaryFuelCost":
          component.innerText = fuelcost + "$";
          break;
        case "additionalPartsOfPrice":
          component.innerText = addParts.toString();
      }
    });
  },
};
