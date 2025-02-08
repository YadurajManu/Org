// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const navHeight = document.querySelector('nav').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// Navigation background change on scroll
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
        nav.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        nav.style.boxShadow = 'none';
    }
});

// Project cards data
const projects = [
    {
        title: "Portfolio Website",
        description: "A modern, responsive portfolio website built with HTML, CSS, and JavaScript. Features smooth animations and clean design.",
        tags: ["HTML", "CSS", "JavaScript"],
        link: "#",
        image: "https://via.placeholder.com/300x200/1a1a1a/ffffff"
    },
    {
        title: "Tech Blog",
        description: "A technology blog platform where users can share and discuss the latest tech trends and innovations.",
        tags: ["React", "Node.js", "MongoDB"],
        link: "#",
        image: "https://via.placeholder.com/300x200/1a1a1a/ffffff"
    },
    {
        title: "Weather App",
        description: "Real-time weather application providing accurate forecasts and weather data visualization.",
        tags: ["Python", "Django", "APIs"],
        link: "#",
        image: "https://via.placeholder.com/300x200/1a1a1a/ffffff"
    }
];

// Dynamically load project cards with animation
function loadProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    
    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.2}s`;
        projectCard.style.opacity = '0';
        
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
                <div class="project-overlay">
                    <a href="${project.link}" class="project-link">View Project</a>
                </div>
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

// Form submission handling with validation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        if (name.length < 2) {
            showFormError('Please enter a valid name');
            return;
        }
        
        if (!isValidEmail(email)) {
            showFormError('Please enter a valid email address');
            return;
        }
        
        if (message.length < 10) {
            showFormError('Message must be at least 10 characters long');
            return;
        }
        
        // If validation passes, show success message
        showFormSuccess('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

// Email validation helper
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Form feedback messages
function showFormError(message) {
    const formFeedback = document.createElement('div');
    formFeedback.className = 'form-feedback error';
    formFeedback.textContent = message;
    
    const existingFeedback = document.querySelector('.form-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    contactForm.appendChild(formFeedback);
    setTimeout(() => formFeedback.remove(), 3000);
}

function showFormSuccess(message) {
    const formFeedback = document.createElement('div');
    formFeedback.className = 'form-feedback success';
    formFeedback.textContent = message;
    
    const existingFeedback = document.querySelector('.form-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    contactForm.appendChild(formFeedback);
    setTimeout(() => formFeedback.remove(), 3000);
}

// Scroll reveal animation
function reveal() {
    const reveals = document.querySelectorAll('.skill-card, .edu-item, .project-card');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Typing Animation
const roles = [
    "Student Developer 👨‍💻",
    "Tech Enthusiast 🚀",
    "Problem Solver 🧩",
    "Future Innovator 💡"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 200;
let erasingDelay = 100;
let newTextDelay = 2000;

function typeEffect() {
    const typedTextSpan = document.querySelector(".typed-text");
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typedTextSpan.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = erasingDelay;
    } else {
        typedTextSpan.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 200;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
        typingDelay = newTextDelay;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingDelay = 500;
    }
    
    setTimeout(typeEffect, typingDelay);
}

// Scroll-triggered animations
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            if (entry.target.classList.contains('edu-item')) {
                entry.target.style.transitionDelay = entry.target.dataset.delay;
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.edu-item, .trait, .skill-card').forEach((element, index) => {
    element.dataset.delay = `${index * 0.2}s`;
    observer.observe(element);
});

// Dynamic age calculation
function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    
    return age;
}

// Fun facts rotation
const funFacts = [
    "I debug code faster than I debug my life decisions 😄",
    "My code is like my coffee - strong and reliable ☕",
    "I speak multiple languages, including JavaScript, Python, and Sarcasm 😎",
    "404: Social life not found (Just kidding!) 🎮"
];

let currentFactIndex = 0;

function rotateFunFacts() {
    const funFactElement = document.querySelector('.fun-fact');
    if (funFactElement) {
        funFactElement.style.opacity = '0';
        
        setTimeout(() => {
            currentFactIndex = (currentFactIndex + 1) % funFacts.length;
            funFactElement.textContent = `> ${funFacts[currentFactIndex]}`;
            funFactElement.style.opacity = '1';
        }, 500);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Start typing animation
    setTimeout(typeEffect, 1000);
    
    // Start fun facts rotation
    setInterval(rotateFunFacts, 5000);
    
    // Initialize projects
    loadProjects();
    
    // Add scroll event listener for reveal animations
    window.addEventListener('scroll', reveal);
    
    // Trigger initial reveal
    reveal();
}); 