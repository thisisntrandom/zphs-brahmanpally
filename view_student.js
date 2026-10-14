const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycby9zs8F8V2zpsdGkapB0BZSigl1SdPB37uLmimwVwhTg7gD9k6HknmNVcxi85PzJVuoXw/exec";


const params = new URLSearchParams(
    window.location.search
);

const row = params.get("row");


if (!row) {

    alert("Student record not found.");

    history.back();

}


fetch(
    SCRIPT_URL +
    "?action=getStudent&row=" +
    encodeURIComponent(row)
)

.then(res => res.json())

.then(student => {

    if (student.success === false) {

        alert(
            student.message ||
            "Student not found."
        );

        history.back();

        return;

    }


    document.getElementById("admissionID").textContent =
        student.admissionID || "Not Assigned";


    document.getElementById("admissionDate").textContent =
        student.admissionDate || "";


    document.getElementById("status").textContent =
        student.status || "Pending";


    document.getElementById("studentName").textContent =
        student.studentName || "";


    document.getElementById("studentClass").textContent =
        student.class || "";


    document.getElementById("medium").textContent =
        student.medium || "";


    document.getElementById("dob").textContent =
        student.dob || "";


    document.getElementById("gender").textContent =
        student.gender || "";


    document.getElementById("aadhaar").textContent =
        student.aadhaar || "";


    document.getElementById("bloodGroup").textContent =
        student.bloodGroup || "";


    document.getElementById("motherTongue").textContent =
        student.motherTongue || "";


    document.getElementById("religion").textContent =
        student.religion || "";


    document.getElementById("caste").textContent =
        student.caste || "";


    document.getElementById("category").textContent =
        student.category || "";


    document.getElementById("mole1").textContent =
        student.mole1 || "";


    document.getElementById("mole2").textContent =
        student.mole2 || "";


    document.getElementById("father").textContent =
        student.father || "";


    document.getElementById("fatherOccupation").textContent =
        student.fatherOccupation || "";


    document.getElementById("fatherMobile").textContent =
        student.fatherMobile || "";


    document.getElementById("mother").textContent =
        student.mother || "";


    document.getElementById("motherOccupation").textContent =
        student.motherOccupation || "";


    document.getElementById("motherMobile").textContent =
        student.motherMobile || "";


    document.getElementById("previousSchool").textContent =
        student.previousSchool || "";


    document.getElementById("previousMedium").textContent =
        student.previousMedium || "";


    document.getElementById("tcNumber").textContent =
        student.tcNumber || "";


    document.getElementById("tcDate").textContent =
        student.tcDate || "";

})

.catch(error => {

    console.error(error);

    alert(
        "Unable to load student details."
    );

});