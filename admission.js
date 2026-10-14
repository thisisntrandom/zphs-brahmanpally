// ===========================================
// ZPHS Brahmanpally Admission Portal
// admission.js
// ===========================================

// Replace with your Google Apps Script URL in Part 2
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycby9zs8F8V2zpsdGkapB0BZSigl1SdPB37uLmimwVwhTg7gD9k6HknmNVcxi85PzJVuoXw/exec";
// Validate Aadhaar
function validateAadhaar(aadhaar) {
    return /^\d{12}$/.test(aadhaar);
}

// Validate Mobile
function validateMobile(number) {
    return /^[6-9]\d{9}$/.test(number);
}

// Show Alert
function showMessage(message, type = "success") {

    const old = document.getElementById("messageBox");
    if (old) old.remove();

    const div = document.createElement("div");

    div.id = "messageBox";

    div.className =
        "alert alert-" + type + " mt-3";

    div.innerHTML = message;

    document.querySelector(".card-body").prepend(div);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

document.addEventListener("DOMContentLoaded", function () {
    const today = new Date().toISOString().split("T")[0];
    document.querySelector('input[name="admissionDate"]').value = today;
});

// Form Submit
document.getElementById("admissionForm")
.addEventListener("submit", function (e) {

    e.preventDefault();

    const form = this;

    const studentName =
        form.studentName.value.trim();

    const studentClass =
        form.class.value;

    const aadhaar =
        form.aadhaar.value.trim();

    const fatherMobile =
        form.fatherMobile.value.trim();

    if (studentName === "") {

        showMessage(
            "Student Name is required.",
            "danger"
        );

        return;

    }

    if (studentClass === "") {

        showMessage(
            "Please select class.",
            "danger"
        );

        return;

    }

    if (aadhaar !== "" && !validateAadhaar(aadhaar)) {

        showMessage(
            "Aadhaar Number must contain exactly 12 digits.",
            "danger"
        );

        return;

    }

    if (fatherMobile !== "" && !validateMobile(fatherMobile)) {

        showMessage(
            "Enter a valid Mobile Number.",
            "danger"
        );

        return;

    }

    // Collect Data

    const data = {

    admissionID: "",

    admissionDate: form.admissionDate.value,

    studentName: form.studentName.value,

    class: form.class.value,

    medium: form.medium.value,

    dob: form.dob.value,

    gender: form.gender.value,

    aadhaar: form.aadhaar.value,

    bloodGroup: form.blood.value,

    motherTongue: form.motherTongue.value,

    religion: form.religion.value,

    caste: form.caste.value,

    category: form.category.value,

    mole1: form.mole1.value,

    mole2: form.mole2.value,

    father: form.father.value,

    fatherOccupation: form.fatherOccupation.value,

    fatherMobile: form.fatherMobile.value,

    mother: form.mother.value,

    motherOccupation: form.motherOccupation.value,

    motherMobile: form.motherMobile.value,

    previousSchool: form.previousSchool.value,

    previousMedium: form.previousMedium.value,

    tcNumber: form.tcNumber.value,

    tcDate: form.tcDate.value

};

    console.log(data);

    // If backend is not connected yet

    if (SCRIPT_URL === "") {

        showMessage(
        `<strong>Admission Submitted Successfully.</strong><br>
        Your application has been submitted successfully.<br>
        Admission ID will be allotted by the Headmaster after verification.`,
        "success"
        );

        form.reset();

        document.querySelector('input[name="admissionDate"]').value =
        new Date().toISOString().split("T")[0];

        return;

    }

    // Send Data to Google Apps Script

    fetch(SCRIPT_URL, {

        method: "POST",

        body: JSON.stringify(data)

    })

    .then(res => res.text())

    .then(result => {

        showMessage(
            `<strong>Admission Form Validated Successfully!</strong><br><br>
            Google Sheets is not connected yet.`,
            "success"
        );

        form.reset();

        document.querySelector('input[name="admissionDate"]').value =
        new Date().toISOString().split("T")[0];

    })

    .catch(error => {

        showMessage(
            "Server Error. Please try again.",
            "danger"
        );

        console.error(error);

    });

});