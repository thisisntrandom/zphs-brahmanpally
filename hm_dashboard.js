if(localStorage.getItem("role")!="HM"){

window.location="login.html";

}

const SCRIPT_URL="https://script.google.com/macros/s/AKfycby9zs8F8V2zpsdGkapB0BZSigl1SdPB37uLmimwVwhTg7gD9k6HknmNVcxi85PzJVuoXw/exec";
function loadStudents() {

  fetch(
    SCRIPT_URL +
    "?action=getStudents"
  )

  .then(res => res.json())

  .then(data => {

    let html = "";

    let total = data.length;

    let pending = 0;
    let approved = 0;
    let rejected = 0;

    data.forEach(student => {

    if (student.status == "Pending") pending++;
    if (student.status == "Approved") approved++;
    if (student.status == "Rejected") rejected++;

    html += `
        <tr>

            <td>
                ${student.admissionID || "Not Assigned"}
            </td>

            <td>
                ${student.studentName || ""}
            </td>

            <td>
                ${student.class || ""}
            </td>

            <td>
                ${student.father || ""}
            </td>

            <td>
                ${student.status || "Pending"}
            </td>

            <td>

                <button
                    class="btn btn-primary btn-sm"
                    onclick="viewStudent(${student.row})">
                    👁 View
                </button>

                <button
                    class="btn btn-success btn-sm"
                    onclick="approve(${student.row})">
                    Approve
                </button>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="reject(${student.row})">
                    Reject
                </button>

            </td>

        </tr>
    `;
});

    document.getElementById("studentTable").innerHTML = html;

    document.getElementById("totalStudents").innerHTML = total;

    document.getElementById("pendingStudents").innerHTML = pending;

    document.getElementById("approvedStudents").innerHTML = approved;

    document.getElementById("rejectedStudents").innerHTML = rejected;

  })

  .catch(error => {

    console.error(error);

    alert("Unable to load students.");

  });

}

loadStudents();

document.getElementById("searchBox").addEventListener("keyup",function(){

let value=this.value.toLowerCase();

let rows=document.querySelectorAll("#studentTable tr");

rows.forEach(r=>{

r.style.display=r.innerText.toLowerCase().includes(value)?"":"none";

});

});

function approve(row) {

  fetch(
    SCRIPT_URL +
    "?action=updateStatus&row=" +
    encodeURIComponent(row) +
    "&status=Approved"
  )

  .then(res => res.json())

  .then(data => {

    if (data.success) {

      alert("Student Approved");

      loadStudents();

    } else {

      alert("Error: " + data.message);

    }

  })

  .catch(error => {

    console.error(error);

    alert("Failed to update status.");

  });

}

function reject(row) {

  fetch(
    SCRIPT_URL +
    "?action=updateStatus&row=" +
    encodeURIComponent(row) +
    "&status=Rejected"
  )

  .then(res => res.json())

  .then(data => {

    if (data.success) {

      alert("Student Rejected");

      loadStudents();

    } else {

      alert("Error: " + data.message);

    }

  })

  .catch(error => {

    console.error(error);

    alert("Failed to update status.");

  });

}

function viewStudent(row) {

  window.location =
    "view_student.html?row=" +
    encodeURIComponent(row);

}