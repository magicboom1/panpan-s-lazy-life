// DOM Elements
const menuIcon = document.querySelector('.menu-icon');
const menuContent = document.querySelector('.menu-content');
const workItems = document.querySelectorAll('.work-item');
const fadeElements = document.querySelectorAll('.fade-in');

// Menu interaction
menuIcon.addEventListener('click', () => {
    menuContent.classList.toggle('visible');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuIcon.contains(e.target) && !menuContent.contains(e.target)) {
        menuContent.classList.remove('visible');
    }
});

// Scroll animation
function checkFade() {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', checkFade);

// Initial check
checkFade();

// Work item click handling
workItems.forEach(item => {
    item.addEventListener('click', () => {
        const workId = item.dataset.id;
        if (workId) {
            window.open(`work${workId}.html`, '_blank');
        }
    });
});