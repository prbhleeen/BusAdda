
localStorage.removeItem('userName');

document.getElementById("login-form").addEventListener("submit", function (event) {
    event.preventDefault();

    if (this.checkValidity()) {
        const name = document.getElementById("employee_name").value;
        const employeeId = document.getElementById("employee_id").value;


        // Ensure we're storing the new name
        localStorage.setItem('userName', name);
        localStorage.setItem("employeeId", employeeId);

        // Check if localStorage is storing the new name
        console.log('Stored name:', localStorage.getItem('userName')); // Debugging line

        // Redirect to the dashboard
        window.location.href = "guard_dash.html";
    } else {
        this.reportValidity();
    }
});
