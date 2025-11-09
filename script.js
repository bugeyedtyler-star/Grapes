});

// Scroll to top when clicked
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effect to job/project items
document.querySelectorAll('.job, .education-item').forEach(item => {
    item.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(10px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});

// Print friendly button (optional - uncomment if needed)
// const printButton = document.createElement('button');
// printButton.textContent = 'Print Resume';
// printButton.className = 'print-button';
// printButton.addEventListener('click', () => window.print());
// document.querySelector('header').appendChild(printButton);

// Console message for developers
console.log('%c👋 Hello! Thanks for checking out my portfolio.', 'color: #667eea; font-size: 16px; font-weight: bold;');
console.log('%cInterested in the code? Check out my GitHub!', 'color: #764ba2; font-size: 14px;');