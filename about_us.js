const highlightableElements = document.querySelectorAll('.highlightable');

highlightableElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.classList.add('highlighted');
    });

    element.addEventListener('mouseleave', () => {
        element.classList.remove('highlighted');
    });
});
