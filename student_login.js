document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();

    if (this.checkValidity()) {
        // Get student information
        const studentName = document.getElementById("student_name").value;
        const rollNo = document.getElementById("roll_no").value;
        const routeNo = document.getElementById("route_no").value;
        const state = document.getElementById("state").value;

        // Store student name in localStorage
        localStorage.setItem('studentName', studentName);
        localStorage.setItem('rollNo', rollNo);
        localStorage.setItem('routeNo', routeNo);
        localStorage.setItem('state', state);

        // Redirect to the student dashboard
        window.location.href = "student_dash.html";
    } else {
        this.reportValidity();
    }
});
