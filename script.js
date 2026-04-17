// DOM Elements
const menuIcon = document.querySelector('.menu-icon');
const menuContent = document.querySelector('.menu-content');
const workItems = document.querySelectorAll('.work-item');
const fadeElements = document.querySelectorAll('.fade-in');

// Create mouse follower
const mouseFollower = document.createElement('div');
mouseFollower.classList.add('mouse-follower');
document.body.appendChild(mouseFollower);

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

// Mouse move effect
function handleMouseMove(e) {
    // Update mouse follower position
    mouseFollower.style.left = e.clientX + 'px';
    mouseFollower.style.top = e.clientY + 'px';
    
    // Add parallax effect to work items
    workItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        const itemCenterX = rect.left + rect.width / 2;
        const itemCenterY = rect.top + rect.height / 2;
        
        const distanceX = e.clientX - itemCenterX;
        const distanceY = e.clientY - itemCenterY;
        
        const moveX = (distanceX / 100) * 2;
        const moveY = (distanceY / 100) * 2;
        
        item.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
}

// Click ripple effect
function createRipple(e) {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    
    const rect = e.target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    e.target.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Work item click handling
workItems.forEach(item => {
    item.addEventListener('click', (e) => {
        createRipple(e);
        const workId = item.dataset.id;
        if (workId) {
            setTimeout(() => {
                window.open(`work${workId}.html`, '_blank');
            }, 300);
        }
    });
    
    // Add hover effect
    item.addEventListener('mouseenter', () => {
        mouseFollower.classList.add('hover');
    });
    
    item.addEventListener('mouseleave', () => {
        mouseFollower.classList.remove('hover');
    });
});

// Add click ripple to all clickable elements
const clickableElements = document.querySelectorAll('a, button, .menu-icon');
clickableElements.forEach(element => {
    element.addEventListener('click', createRipple);
});

// Event listeners
window.addEventListener('scroll', checkFade);
window.addEventListener('mousemove', handleMouseMove);

// Initial check
checkFade();