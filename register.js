document.getElementById("register-form").addEventListener("submit", function(event) {
    event.preventDefault(); 

    if (this.checkValidity()) {
        const name = document.getElementById("employee_name").value;
        localStorage.removeItem('userName');
        localStorage.setItem('userName', name);

        // Check if localStorage is storing the new name
        console.log('Stored name:', localStorage.getItem('userName')); // Debugging line

        // Redirect to the dashboard
        window.location.href = "dashboard.html";
    } else {
        this.reportValidity();
    }
});