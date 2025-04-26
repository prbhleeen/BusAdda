// const highlightableElements = document.querySelectorAll('.highlightable');

// highlightableElements.forEach(element => {
//     element.addEventListener('mouseenter', () => {
//         element.classList.add('highlighted');
//     });

//     element.addEventListener('mouseleave', () => {
//         element.classList.remove('highlighted');
//     });
// });

// Select all elements with the class 'highlightable'
const highlightableElements = document.querySelectorAll('.highlightable');

// Loop through each selected element
highlightableElements.forEach(element => {
    // Add an event listener for when the mouse enters the element
    element.addEventListener('mouseenter', () => {
        // Add the 'highlighted' class to the element
        element.classList.add('highlighted');
    });

    // Add an event listener for when the mouse leaves the element
    element.addEventListener('mouseleave', () => {
        // Remove the 'highlighted' class from the element
        element.classList.remove('highlighted');
    });
});
