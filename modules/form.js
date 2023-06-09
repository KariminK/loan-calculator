export const form = {
  parentElement: document.querySelector("#mainForm"),
  formElement: document.querySelector(".form"),
  summaryElement: document.querySelector(".summary"),
  errorTxt: document.querySelector("#errorTxt"),
  kmLabel: document.querySelector("#estimatedKmTxt"),
  multipler: 1,
  basicPrice: 300,
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
    form.errorTxt.classList.remove("active");
    const data = form.validateData();
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
    switch (tier) {
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
    } else if (form.formInputs.yearOfObtainingDL.value < 1) {
      form.error("Invalid year of obtaining driving license");
    }else{
      return {
        startDate,
        endDate,
        yearOfObtainingDL: form.formInputs.yearOfObtainingDL.value,
      }
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
  calculatePrice(startDate, endDate, estKM, yearOfObtainingDL) {
    const time = new Date();
    const fuelCost = estKM / this.fuelUsage * this.fuelCost;
    const price = {
      netto: form.basicPrice*form.multipler+fuelCost,
      brutto: this.netto * 1.23,
    };
    if(time.getFullYear()-yearOfObtainingDL < 3 && form.carDetails.tier.toLowerCase() == "premium"){
      form.error("Sorry, you can't rent this car now");
    }
    else if (time.getFullYear()-yearOfObtainingDL < 5) {
      price.netto *= 1.20;
    }
    if(form.carDetails.available < 3){
      price.netto *=  1.15;
    }
  },
};
