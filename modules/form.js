export const form = {
  parentElement: document.querySelector("#mainForm"),
  formElement: document.querySelector(".form"),
  summaryElement: document.querySelector(".summary"),
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
  formInfo: document.querySelectorAll(".advancedInfoItem .detail"),
  init() {
    this.parentElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this.formBtns.submit.addEventListener("click", this.submit);
    this.formBtns.cancel.addEventListener("click", this.cancel);
    this.parentElement.classList.add("active");
    this.summaryElement.classList.add("hide");
    for (let input in this.formInputs) {
      this.formInputs[input].value = "";
    }
  },
  cancel() {
    console.log("dziala");
    if (this.parentElement.classList.contains("active")) console.log("ok");
  },
  submit() {},
};
