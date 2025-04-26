document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const employeeIdInput = document.getElementById('employeeId');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const employeeIdError = document.getElementById('employeeIdError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const submissionMessage = document.getElementById('submissionMessage');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Always prevent default

        let isValid = true;

        // Reset errors
        nameError.textContent = '';
        employeeIdError.textContent = '';
        emailError.textContent = '';
        messageError.textContent = '';
        submissionMessage.textContent = '';

        // Validate fields
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Please enter your name.';
            isValid = false;
        }

        if (employeeIdInput.value.trim() === '') {
            employeeIdError.textContent = 'Please enter your Employee ID.';
            isValid = false;
        } else if (!/^[0-9]+$/.test(employeeIdInput.value)) {
            employeeIdError.textContent = 'Please enter a valid Employee ID (e.g., 12345).';
            isValid = false;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address.';
            isValid = false;
        }

        if (messageInput.value.trim() === '') {
            messageError.textContent = 'Please enter your message.';
            isValid = false;
        }

        if (!isValid) {
            submissionMessage.textContent = 'Please correct the errors in the form.';
            submissionMessage.className = 'submission-message error';
            return;
        }

        // Send form data to Web3Forms
        const formData = new FormData(form);
        formData.append('access_key', '35ce68cd-9b96-4256-8769-d0f67156453f');

        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                submissionMessage.textContent = 'Form submitted successfully!';
                submissionMessage.className = 'submission-message success';

                form.reset(); // ✅ Reset the form

                // Optional: Redirect after 2 seconds
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 2000);
            } else {
                submissionMessage.textContent = 'Form submission failed. Please try again.';
                submissionMessage.className = 'submission-message error';
            }
        })
        .catch(error => {
            console.error('Submission error:', error);
            submissionMessage.textContent = 'Error submitting the form. Try again later.';
            submissionMessage.className = 'submission-message error';
        });
    });
});
