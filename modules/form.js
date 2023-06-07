export const form = {
    parentElement: document.querySelector("form"),
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
    init: ()=>{
        this.formBtns.submit.addEventListener("click", ()=>{
            
        });
    },
    cancel(){
        this.formElement.classList.remove("active");
    }
}