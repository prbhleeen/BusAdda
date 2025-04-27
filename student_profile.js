document.addEventListener("DOMContentLoaded", () => {
    const studentNameElement = document.getElementById('student-name');
    const rollNoElement = document.getElementById('student-roll-no');
    const routeNoElement = document.getElementById('student-route-no');
    const cityElement = document.getElementById('student-city');
    const feeStatusElement = document.getElementById('student-fee-status');
    const feesElement = document.getElementById('student-fees');
    const studentAvatar = document.getElementById('student-avatar');
    const genderElement = document.getElementById('edit-gender'); // Gender select element

    const editProfileBtn = document.getElementById('edit-profile-btn');
    const editProfileModal = document.getElementById('edit-profile-modal');
    const closeBtn = document.getElementById('close-btn');
    const editProfileForm = document.getElementById('edit-profile-form');
    const editNameInput = document.getElementById('edit-name');
    const editRollNoInput = document.getElementById('edit-rollno');
    const editRouteInput = document.getElementById('edit-route');
    const editCityInput = document.getElementById('edit-city');
    const editFeeStatusSelect = document.getElementById('edit-fee-status');
    const editFeesInput = document.getElementById('edit-fees');
    const editGenderSelect = document.getElementById('edit-gender');

    // Define the fees structure based on city (case insensitive)
    const cityFees = {
        "ambala": 45000,
        "patiala": 40000,
        "punchkula": 40000,
        "chandigarh": 40000,
        "rajpura": 20000,
        "mohali": 40000,
        // Add more cities and their fees as needed
    };

    // Function to get fees based on city (case-insensitive)
    function getFeesByCity(city) {
        const lowercaseCity = city.toLowerCase();
        return cityFees[lowercaseCity] || "Not Available";
    }

    // Function to load student data from localStorage
    function loadStudentData() {
        studentNameElement.textContent = localStorage.getItem('studentName') || "Student Name";
        rollNoElement.textContent = localStorage.getItem('rollNo') || "Not Available";
        routeNoElement.textContent = localStorage.getItem('routeNo') || "Not Available";
        const storedCity = localStorage.getItem('city');
        cityElement.textContent = storedCity || "Not Available";
        
        feeStatusElement.textContent = localStorage.getItem('feeStatus') || "Paid";
        
        // Get the fees based on the stored city or fallback to "Not Available"
        const fees = getFeesByCity(storedCity);
        feesElement.textContent = fees !== "Not Available" ? `₹${fees}` : "Not Available"; // Format the fee if available

        // Avatar handling: fallback if no avatar URL in localStorage
        const avatarUrl = localStorage.getItem('avatarUrl') || "assets/avatar.jpg"; // Default to 'assets/avatar.jpg'
        studentAvatar.src = avatarUrl;

        // Set the gender
        const gender = localStorage.getItem('gender') || "male"; // Default to "male"
        genderElement.value = gender;
    }

    loadStudentData(); // Load data on page load

    // Open the edit profile modal
    editProfileBtn.addEventListener('click', () => {
        const storedCity = localStorage.getItem('city') || "";
        const storedFees = localStorage.getItem('fees') || getFeesByCity(storedCity);
        
        editNameInput.value = localStorage.getItem('studentName') || "";
        editRollNoInput.value = localStorage.getItem('rollNo') || "";
        editRouteInput.value = localStorage.getItem('routeNo') || "";
        editCityInput.value = storedCity;
        editFeeStatusSelect.value = localStorage.getItem('feeStatus') || "Paid";
        
        // Set the fees based on the current city when the modal opens
        editFeesInput.value = storedFees;

        // Set gender based on localStorage
        editGenderSelect.value = localStorage.getItem('gender') || "male";

        editProfileModal.style.display = "block";
    });

    // Close the edit profile modal
    closeBtn.addEventListener('click', () => {
        editProfileModal.style.display = "none";
    });

    // Close the modal if the user clicks outside of it
    window.addEventListener('click', (event) => {
        if (event.target == editProfileModal) {
            editProfileModal.style.display = "none";
        }
    });

    // Update fees when the city input changes in the edit modal
    editCityInput.addEventListener('input', () => {
        const currentCity = editCityInput.value.trim();
        const fees = getFeesByCity(currentCity);
        editFeesInput.value = fees === "Not Available" ? "" : fees; // If "Not Available", clear the fees field
    });

    // Save changes from the edit profile form
    editProfileForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const newName = editNameInput.value.trim();
        const newRollNo = editRollNoInput.value.trim();
        const newRouteNo = editRouteInput.value.trim();
        const newCity = editCityInput.value.trim();
        const newFeeStatus = editFeeStatusSelect.value;
        const newFees = editFeesInput.value;
        const newGender = editGenderSelect.value;

        // Save all data to localStorage
        localStorage.setItem('studentName', newName);
        localStorage.setItem('rollNo', newRollNo);
        localStorage.setItem('routeNo', newRouteNo);
        localStorage.setItem('city', newCity.toLowerCase()); // Store city in lowercase
        localStorage.setItem('feeStatus', newFeeStatus);
        localStorage.setItem('fees', newFees);
        localStorage.setItem('gender', newGender); // Save gender

        loadStudentData();
        editProfileModal.style.display = "none";
    });
});
