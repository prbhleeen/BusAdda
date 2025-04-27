document.getElementById("signup-form").addEventListener("submit", function (event) {
    event.preventDefault();

    if (this.checkValidity()) {
        const studentName = document.getElementById("student_name").value;
        const rollNo = document.getElementById("roll_no").value;
        const routeNo = document.getElementById("route_no").value;
        const state = document.getElementById("state").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm_password").value;
        const passwordError = document.getElementById("password-error");

        if (password !== confirmPassword) {
            passwordError.textContent = "Passwords do not match.";
            return;
        } else {
            passwordError.textContent = ""; // Clear any previous error
        }

        const gender = document.querySelector('input[name="gender"]:checked').value;

        let avatarUrl = "";
        if (gender.toLowerCase() === "male") {
            avatarUrl = "https://github.com/Sunaina-04/BusAdda/blob/main/assets/male_avatar.png?raw=true";
        } else if (gender.toLowerCase() === "female") {
            avatarUrl = "https://github.com/Sunaina-04/BusAdda/blob/main/assets/avatar.jpg?raw=true";
        } else {
            avatarUrl = "images/default_avatar.png"; // Ensure this path is correct
        }

        let feeStatus = "Not Available";
        let feeAmount = "Not Available";
        const stateFeeMap = {
            "chandigarh": 45000,
            "patiala": 40000,
            "kharad": 35000,
            "rajpura": 37500,
            "ambala": 45000,
            "mohali": 38000,
            "ludhiana": 46000,
            "jalandhar": 44000,
            "bathinda": 42000
        };

        const lowercaseState = state.toLowerCase();
        if (stateFeeMap[lowercaseState]) {
            feeAmount = stateFeeMap[lowercaseState];
            feeStatus = `Paid ${feeAmount}`;
        }

        localStorage.setItem('studentName', studentName);
        localStorage.setItem('rollNo', rollNo);
        localStorage.setItem('routeNo', routeNo);
        localStorage.setItem('city', lowercaseState);
        localStorage.setItem('state', state);
        localStorage.setItem('gender', gender);
        localStorage.setItem('feeStatus', feeStatus);
        localStorage.setItem('fees', feeAmount);
        localStorage.setItem('avatarUrl', avatarUrl);
        localStorage.setItem('password', password); // Still insecure for production

        window.location.href = "student_dash.html";
    } else {
        this.reportValidity();
    }
});