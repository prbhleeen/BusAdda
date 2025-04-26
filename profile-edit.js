document.addEventListener("DOMContentLoaded", () => {
    const userName = localStorage.getItem("userName") || "Guest";
    const userAvatar = localStorage.getItem("userAvatar") || "static/guard.png";
    const employeeId = localStorage.getItem("employeeId") || "Unknown"; // Fetch employeeId from localStorage

    function updateUIWithUserData() {
        document.getElementById("welcome-message").textContent = `Welcome, ${userName}!`;

        const guardInfo = document.getElementById("guard-info");
        guardInfo.innerHTML = `<img src="${userAvatar}" alt="Guard Avatar" class="guard-avatar"><span class="guard-name">${userName}</span>`;

        document.getElementById("employee-name").textContent = userName;
        document.getElementById("avatar-image").src = userAvatar;
        document.getElementById("employee-id").textContent = `Employee ID: ${employeeId}`; // Update employee ID in the UI
    }

    updateUIWithUserData();

    document.querySelector(".arrival-btn").addEventListener("click", () => {
        window.location.href = `arrival.html?name=${encodeURIComponent(userName)}`;
    });

    document.querySelector(".departure-btn").addEventListener("click", () => {
        window.location.href = `departure.html?name=${encodeURIComponent(userName)}`;
    });

    const guardInfo = document.getElementById("guard-info");
    const modal = document.getElementById("employee-modal");
    const closeButton = document.querySelector(".close-button");

    guardInfo.addEventListener("click", () => {
        const employeeId = localStorage.getItem("employeeId") || "Unknown";

        document.getElementById("employee-id").textContent = `Employee ID: ${employeeId}`;

        modal.style.display = "flex";
    });

    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
        hideEditForm();
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
            hideEditForm();
        }
    });

    const editProfileLink = document.getElementById("edit-profile-link");
    const editForm = document.getElementById("edit-profile-form");
    const profileDisplay = document.getElementById("profile-display");
    const avatarInput = document.getElementById("avatar-input");
    const nameInput = document.getElementById("name-input");
    const saveBtn = document.getElementById("save-profile-btn");
    const cancelBtn = document.getElementById("cancel-profile-btn");

    editProfileLink.addEventListener("click", (e) => {
        e.preventDefault();
        profileDisplay.style.display = "none";
        editForm.style.display = "block";
        nameInput.value = userName;
    });

    cancelBtn.addEventListener("click", () => {
        hideEditForm();
    });

    saveBtn.addEventListener("click", () => {
        const newName = nameInput.value.trim();
        if (newName) {
            localStorage.setItem("userName", newName);
        }

        if (avatarInput.files && avatarInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const base64Avatar = e.target.result;
                localStorage.setItem("userAvatar", base64Avatar);
                updateUIWithUserData();
                hideEditForm();
            };
            reader.readAsDataURL(avatarInput.files[0]);
        } else {
            updateUIWithUserData();
            hideEditForm();
        }
    });

    function hideEditForm() {
        editForm.style.display = "none";
        profileDisplay.style.display = "block";
        avatarInput.value = "";
    }
});
