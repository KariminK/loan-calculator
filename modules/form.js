export const form = {
  parentElement: document.querySelector("#mainForm"),
  formElement: document.querySelector(".form"),
  summaryElement: document.querySelector(".summary"),
  kmLabel: document.querySelector("#estimatedKmTxt"),
  multipler: 1,
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
    this.formInputs.estKM.addEventListener("input", () => {
      this.kmLabel.innerText = this.formInputs.estKM.value;
    });
    this.parentElement.classList.add("active");
    this.summaryElement.classList.add("hide");
    for (let input in this.formInputs) {
      this.formInputs[input].value = "";
    }
  },
  cancel() {
    form.parentElement.classList.remove("active");
  },
  submit() {
    let info = Array.from(form.formInfo);
    let tier = info.find((e) => e.id === "tier").innerText.toLowerCase();
    const startDateArr = form.formInputs.carRentStartDate.value.split("-");
    const endDateArr = form.formInputs.carRentEndDate.value.split("-");
    const startDate = new Date(startDateArr[0], startDateArr[1], startDateArr[2]);
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
    if (startDate > endDate) {
      console.log("invalid date");
    }
  },
};
