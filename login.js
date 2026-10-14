function login() {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    // HM Login
    if (role === "hm") {
        if (username === "admin" && password === "Admin@123") {
            localStorage.setItem("role", "HM");
            localStorage.setItem("name", "Headmaster");
            window.location.href = "hm_dashboard.html";
            return;
        }
    }

    // Teacher Login
    if (role === "teacher") {
        if (username === "teacher" && password === "Teacher@123") {
            localStorage.setItem("role", "Teacher");
            localStorage.setItem("name", "Teacher");
            window.location.href = "teacher_dashboard.html";
            return;
        }
    }

    alert("Invalid Username or Password");
}