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
        let isValid = true;

        // Validate Name
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Please enter your name.';
            isValid = false;
        } else {
            nameError.textContent = '';
        }

        // Validate Employee ID
        if (employeeIdInput.value.trim() === '') {
            employeeIdError.textContent = 'Please enter your Employee ID.';
            isValid = false;
        } else if (!/^[0-9]+$/.test(employeeIdInput.value)) {
            employeeIdError.textContent = 'Please enter a valid Employee ID (e.g., 12345).';
            isValid = false;
        } else {
            employeeIdError.textContent = '';
        }

        // Validate Email
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address.';
            isValid = false;
        } else {
            emailError.textContent = '';
        }

        // Validate Message
        if (messageInput.value.trim() === '') {
            messageError.textContent = 'Please enter your message.';
            isValid = false;
        } else {
            messageError.textContent = '';
        }

        if (isValid) {
            // Allow the form to submit, Web3Forms should handle the redirect now
            submissionMessage.textContent = 'Your message has been sent. Redirecting...';
            submissionMessage.className = 'submission-message success';

            // Optionally reset the form before the redirect
            form.reset();
        } else {
            event.preventDefault(); // Stop form submission if validation fails
            submissionMessage.textContent = 'Please correct the errors in the form.';
            submissionMessage.className = 'submission-message error';
            setTimeout(() => {
                submissionMessage.textContent = '';
                submissionMessage.className = 'submission-message';
            }, 3000);
        }
    });
});
