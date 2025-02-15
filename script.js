// Custom Cursor
function initCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    // Variables for cursor smoothing
    let cursorPos = { x: 0, y: 0 };
    let cursorDotPos = { x: 0, y: 0 };
    let cursorOutlinePos = { x: 0, y: 0 };
    
    // Smoothing factor (0 = no smoothing, 1 = maximum smoothing)
    const smoothing = 0.15;
    
    // Update cursor position
    document.addEventListener('mousemove', (e) => {
        cursorPos.x = e.clientX;
        cursorPos.y = e.clientY;
    });
    
    // Smooth animation loop
    function animate() {
        // Smooth movement for cursor dot
        cursorDotPos.x += (cursorPos.x - cursorDotPos.x) * 0.5;
        cursorDotPos.y += (cursorPos.y - cursorDotPos.y) * 0.5;
        
        // Smooth movement for cursor outline
        cursorOutlinePos.x += (cursorPos.x - cursorOutlinePos.x) * smoothing;
        cursorOutlinePos.y += (cursorPos.y - cursorOutlinePos.y) * smoothing;
        
        // Update cursor positions
        cursorDot.style.transform = `translate(${cursorDotPos.x}px, ${cursorDotPos.y}px)`;
        cursorOutline.style.transform = `translate(${cursorOutlinePos.x}px, ${cursorOutlinePos.y}px)`;
        
        requestAnimationFrame(animate);
    }
    animate();
    
    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .skill-card, .project-card, .social-btn, input, textarea');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('cursor-hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('cursor-hover');
        });
    });
    
    // Hide cursor when leaving the window
    document.addEventListener('mouseout', (e) => {
        if (e.relatedTarget === null) {
            cursorDot.style.opacity = '0';
            cursorOutline.style.opacity = '0';
        }
    });
    
    document.addEventListener('mouseover', () => {
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
    });
}

// Initialize custom cursor when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
});

// Terminal Animation with Story Elements
const terminalCommands = [
    { text: "Initializing personal.profile...", type: "info" },
    { text: "Loading Chapter 1: Origin Story...", type: "info" },
    { text: "Location: Dehradun, India 📍", type: "success" },
    { text: "Scanning early memories...", type: "info" },
    { text: "Found: Passion for Technology ✨", type: "success" },
    { text: "Analyzing current mission...", type: "info" },
    { text: "MISSION OBJECTIVE: Making Technology More Human 🚀", type: "success" },
    { text: "Status: Active and Coding ⌨️", type: "info" },
    { text: "System ready for connection! 🌐", type: "success" }
];

function typeWriter(element, text, speed = 50) {
    return new Promise(resolve => {
        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                resolve();
            }
        }
        type();
    });
}

async function animateTerminal() {
    const terminalOutput = document.querySelector('.terminal-output');
    if (!terminalOutput) return;

    terminalOutput.innerHTML = ''; // Clear existing content

    const spinnerChars = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    let spinnerIndex = 0;

    for (const cmd of terminalCommands) {
        const line = document.createElement('div');
        line.classList.add(cmd.type);
        
        // Add loading animation
        const loadingSpan = document.createElement('span');
        loadingSpan.classList.add('loading');
        
        // Create spinner animation
        function updateSpinner() {
            loadingSpan.textContent = spinnerChars[spinnerIndex];
            spinnerIndex = (spinnerIndex + 1) % spinnerChars.length;
        }
        
        const spinnerInterval = setInterval(updateSpinner, 125);
        updateSpinner(); // Initial spinner character
        
        line.appendChild(loadingSpan);
        terminalOutput.appendChild(line);
        
        // Wait for a second with the spinner
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Clean up spinner
        clearInterval(spinnerInterval);
        line.removeChild(loadingSpan);
        
        // Type the actual text
        await typeWriter(line, cmd.text);
        
        // Add a new line after each command
        terminalOutput.appendChild(document.createElement('br'));
    }
}

// Add these new styles to your CSS
const terminalStyles = `
    .terminal-cursor {
        animation: blink 1s step-end infinite;
    }

    .loading {
        display: inline-block;
        margin-right: 0.5rem;
    }

    .emoji {
        display: inline-block;
        animation: popIn 0.5s cubic-bezier(0.19, 1, 0.22, 1);
    }

    @keyframes popIn {
        0% { transform: scale(0); opacity: 0; }
        70% { transform: scale(1.2); opacity: 0.7; }
        100% { transform: scale(1); opacity: 1; }
    }

    @keyframes glow {
        0% { text-shadow: none; }
        50% { text-shadow: 0 0 10px #00ff95; }
        100% { text-shadow: none; }
    }
`;

// Add styles to document
const styleSheet = document.createElement("style");
styleSheet.textContent = terminalStyles;
document.head.appendChild(styleSheet);

// Observe terminal section visibility
const terminalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateTerminal();
            terminalObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Start observing the terminal section
const terminalSection = document.querySelector('.terminal-section');
if (terminalSection) {
    terminalObserver.observe(terminalSection);
}

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
        title: "Exoplanet Detection System",
        description: "A sophisticated machine learning system that analyzes light curves from NASA's Kepler Space Telescope to identify potential exoplanets. Implements the transit method using deep learning to detect periodic dips in stellar brightness patterns.",
        tags: ["Python", "TensorFlow", "Keras", "NASA Kepler Data", "Scikit-learn", "Pandas"],
        link: "https://github.com/YadurajRao/ExoplanetDetection",
        image: "https://raw.githubusercontent.com/YadurajRao/ExoplanetDetection/main/preview.png",
        features: [
            "Convolutional Neural Network for time series analysis",
            "97.5% accuracy on NASA Kepler dataset",
            "Real-time light curve processing",
            "Interactive data visualization with Plotly",
            "Automated feature extraction pipeline",
            "GPU-accelerated model training"
        ]
    },
    {
        title: "3D Portfolio Showcase",
        description: "An immersive 3D portfolio built with Three.js and React Three Fiber. Features interactive 3D models, dynamic lighting systems, and physics-based animations. Implements advanced WebGL techniques for optimal performance.",
        tags: ["Three.js", "React Three Fiber", "WebGL", "GLSL Shaders", "React", "Framer Motion"],
        link: "https://github.com/YadurajRao/3D-Portfolio",
        image: "https://raw.githubusercontent.com/YadurajRao/3D-Portfolio/main/preview.png",
        features: [
            "Custom GLSL shaders for visual effects",
            "Physics-based particle systems",
            "Dynamic environment mapping",
            "Optimized 3D model loading",
            "Interactive camera controls",
            "Responsive 3D layouts"
        ]
    },
    {
        title: "AI GitHub Assistant",
        description: "A powerful AI-powered chat interface that integrates with GitHub repositories to provide intelligent code analysis and documentation assistance. Uses OpenAI's GPT models for natural language understanding and code comprehension.",
        tags: ["Node.js", "React", "OpenAI API", "GitHub API", "WebSocket", "MongoDB"],
        link: "https://github.com/YadurajRao/GitHubAssistant",
        image: "https://raw.githubusercontent.com/YadurajRao/GitHubAssistant/main/preview.png",
        features: [
            "Real-time code analysis and suggestions",
            "Natural language query processing",
            "Intelligent documentation generation",
            "Code review automation",
            "Context-aware responses",
            "Multi-repository support"
        ]
    },
    {
        title: "Smart Home Automation",
        description: "A comprehensive IoT solution for home automation using Raspberry Pi and Arduino. Features real-time monitoring, automated control systems, and a machine learning-powered prediction engine for optimal energy usage.",
        tags: ["Python", "IoT", "Raspberry Pi", "Arduino", "TensorFlow Lite", "MQTT"],
        link: "https://github.com/YadurajRao/SmartHome",
        image: "https://raw.githubusercontent.com/YadurajRao/SmartHome/main/preview.png",
        features: [
            "Real-time sensor data processing",
            "Energy usage optimization",
            "Custom PCB designs",
            "Mobile app control interface",
            "Automated scheduling system",
            "Voice command integration"
        ]
    }
];

// Enhanced project card loading with 3D hover effects
function loadProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    
    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.2}s`;
        projectCard.style.opacity = '0';
        
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}" onerror="this.src='https://via.placeholder.com/600x400?text=Project+Preview'">
                <div class="project-overlay">
                    <div class="project-features">
                        ${project.features.map(feature => `
                            <div class="feature">
                                <i class="fas fa-check-circle"></i>
                                <span>${feature}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.link}" class="project-link" target="_blank">
                            <i class="fab fa-github"></i> View Source
                        </a>
                        <a href="${project.link}/demo" class="project-link demo-link" target="_blank">
                            <i class="fas fa-external-link-alt"></i> Live Demo
                        </a>
                    </div>
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
        
        // Enhanced hover effects
        projectCard.addEventListener('mouseenter', (e) => {
            const rect = projectCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            projectCard.style.transform = `
                perspective(1000px)
                rotateX(${(y - rect.height/2) / 20}deg)
                rotateY(${-(x - rect.width/2) / 20}deg)
                translateZ(20px)
            `;
            
            projectCard.querySelector('.project-overlay').style.opacity = '1';
            projectCard.querySelector('.project-image img').style.transform = 'scale(1.1)';
        });
        
        projectCard.addEventListener('mousemove', (e) => {
            const rect = projectCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            projectCard.style.transform = `
                perspective(1000px)
                rotateX(${(y - rect.height/2) / 20}deg)
                rotateY(${-(x - rect.width/2) / 20}deg)
                translateZ(20px)
            `;
        });
        
        projectCard.addEventListener('mouseleave', () => {
            projectCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            projectCard.querySelector('.project-overlay').style.opacity = '0';
            projectCard.querySelector('.project-image img').style.transform = 'scale(1)';
        });
        
        projectsGrid.appendChild(projectCard);
    });
}

// Enhanced Contact Form Handling
function initEnhancedContactForm() {
    const form = document.getElementById('contact-form');
    const fileUpload = document.getElementById('file-upload');
    const fileList = document.querySelector('.file-list');
    const submitBtn = form.querySelector('.submit-btn');
    const localTimeElement = document.getElementById('local-time');
    
    // Update local time
    function updateLocalTime() {
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZoneName: 'short'
        };
        localTimeElement.textContent = new Date().toLocaleString('en-US', options);
    }
    
    setInterval(updateLocalTime, 1000);
    updateLocalTime();
    
    // File upload handling
    fileUpload.addEventListener('change', function(e) {
        const files = Array.from(e.target.files);
        updateFileList(files);
    });
    
    // Drag and drop handling
    const dropZone = document.querySelector('.file-upload-label');
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight(e) {
        dropZone.classList.add('highlight');
    }
    
    function unhighlight(e) {
        dropZone.classList.remove('highlight');
    }
    
    dropZone.addEventListener('drop', handleDrop, false);
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = Array.from(dt.files);
        updateFileList(files);
    }
    
    function updateFileList(files) {
        fileList.innerHTML = '';
        files.forEach(file => {
            const fileItem = document.createElement('div');
            fileItem.className = 'file-item';
            fileItem.innerHTML = `
                <span>${file.name}</span>
                <i class="fas fa-times remove-file"></i>
            `;
            fileList.appendChild(fileItem);
            
            fileItem.querySelector('.remove-file').addEventListener('click', () => {
                fileItem.remove();
            });
        });
    }
    
    // Form submission with EmailJS
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate reCAPTCHA
        const recaptchaResponse = grecaptcha.getResponse();
        if (!recaptchaResponse) {
            showFeedback('Please complete the reCAPTCHA verification', 'error');
            return;
        }
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Prepare form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            contactPreference: document.getElementById('contact-preference').value,
            preferredTime: document.getElementById('preferred-time').value,
            recaptchaResponse: recaptchaResponse
        };
        
        try {
            // Send email using EmailJS
            const response = await emailjs.send(
                'YOUR_SERVICE_ID',
                'YOUR_TEMPLATE_ID',
                formData
            );
            
            if (response.status === 200) {
                showFeedback('Message sent successfully! I will get back to you soon.', 'success');
                form.reset();
                grecaptcha.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            showFeedback('Oops! Something went wrong. Please try again.', 'error');
            console.error('EmailJS Error:', error);
        } finally {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
}

// Chat Widget Functionality with Gemini AI
function initChatWidget() {
    const GEMINI_API_KEY = 'AIzaSyCb_r1ACnT40Goh_f4WmmdU8r7WKj2dHm8';
    const chatToggle = document.querySelector('.chat-toggle');
    const chatContainer = document.querySelector('.chat-container');
    const chatInput = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.send-message');
    const chatMessages = document.querySelector('.chat-messages');
    const notificationBadge = document.querySelector('.notification-badge');
    
    // Initial welcome message with emojis
    const welcomeMessage = {
        text: "👋 Hi there! I'm Yaduraj's AI assistant. I can help you with:\n\n" +
              "🔍 Portfolio information\n" +
              "💼 Project details\n" +
              "📚 Skills and experience\n" +
              "📧 Contact information\n\n" +
              "How can I assist you today?",
        type: 'received',
        timestamp: new Date()
    };

    let conversationHistory = [];
    let isTyping = false;
    
    // Add emoji pop animation
    function addEmojiAnimation(element) {
        const emojis = element.textContent.match(/[\u{1F300}-\u{1F9FF}]|[\u{1F600}-\u{1F64F}]/gu);
        if (emojis) {
            emojis.forEach(emoji => {
                const span = document.createElement('span');
                span.className = 'emoji';
                span.textContent = emoji;
                element.innerHTML = element.innerHTML.replace(emoji, span.outerHTML);
            });
        }
    }
    
    // Enhanced message creation with animations
    function createMessageElement(message) {
        const messageElement = document.createElement('div');
        messageElement.className = `chat-message ${message.type}`;
        
        if (message.type === 'received' && message.isTyping) {
            messageElement.innerHTML = `
                <div class="typing-animation">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </div>
            `;
        } else {
            const formattedText = formatMessageText(message.text);
            messageElement.innerHTML = `
                <div class="message-content">${formattedText}</div>
                <div class="message-time">
                    <i class="far ${message.type === 'sent' ? 'fa-check-circle' : 'fa-clock'}"></i>
                    ${formatTime(message.timestamp)}
                </div>
            `;
            
            // Add emoji animations
            const content = messageElement.querySelector('.message-content');
            addEmojiAnimation(content);
        }
        
        return messageElement;
    }
    
    // Format message text with markdown-like syntax
    function formatMessageText(text) {
        // Convert URLs to clickable links
        text = text.replace(
            /(https?:\/\/[^\s]+)/g,
            '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
        );
        
        // Convert code blocks
        text = text.replace(
            /\`\`\`([\s\S]*?)\`\`\`/g,
            '<pre><code>$1</code></pre>'
        );
        
        // Convert inline code
        text = text.replace(
            /\`([^\`]+)\`/g,
            '<code>$1</code>'
        );
        
        // Convert line breaks to <br>
        text = text.replace(/\n/g, '<br>');
        
        return text;
    }
    
    function formatTime(date) {
        return new Date(date).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    
    // Smooth scroll to bottom of chat
    function scrollToBottom() {
        const scrollOptions = {
            top: chatMessages.scrollHeight,
            behavior: 'smooth'
        };
        chatMessages.scrollTo(scrollOptions);
    }
    
    // Add message with animation
    function addMessage(message) {
        const messageElement = createMessageElement(message);
        chatMessages.appendChild(messageElement);
        scrollToBottom();
        return messageElement;
    }
    
    // Enhanced send message function with animations and validation
    async function sendMessage() {
        const text = chatInput.value.trim();
        if (text && !isTyping) {
            // Disable input and show sending state
            chatInput.disabled = true;
            sendButton.classList.add('sending');
            
            // Add user message
            addMessage({
                text,
                type: 'sent',
                timestamp: new Date()
            });
            
            // Clear input and enable it
            chatInput.value = '';
            chatInput.disabled = false;
            chatInput.focus();
            
            // Add to conversation history
            conversationHistory.push({ role: 'user', content: text });
            
            // Show typing indicator
            isTyping = true;
            const typingIndicator = addMessage({
                type: 'received',
                isTyping: true,
                timestamp: new Date()
            });
            
            try {
                // Get AI response
                const aiResponse = await generateGeminiResponse(text);
                
                // Remove typing indicator
                typingIndicator.remove();
                
                // Add AI response
                addMessage({
                    text: aiResponse,
                    type: 'received',
                    timestamp: new Date()
                });
                
                // Add to conversation history
                conversationHistory.push({ role: 'assistant', content: aiResponse });
                
                // Limit conversation history
                if (conversationHistory.length > 10) {
                    conversationHistory = conversationHistory.slice(-10);
                }
            } catch (error) {
                // Remove typing indicator
                typingIndicator.remove();
                
                // Show error message
                addMessage({
                    text: "I apologize, but I'm having trouble connecting to my AI services. Please try again.",
                    type: 'received error',
                    timestamp: new Date()
                });
            } finally {
                isTyping = false;
                sendButton.classList.remove('sending');
            }
        }
    }
    
    // Enhanced chat toggle with animations
    chatToggle.addEventListener('click', () => {
        chatContainer.classList.toggle('active');
        notificationBadge.style.display = 'none';
        
        if (!chatContainer.dataset.initialized) {
            addMessage(welcomeMessage);
            chatContainer.dataset.initialized = 'true';
            chatInput.focus();
        }
    });
    
    // Input animations and validation
    chatInput.addEventListener('input', () => {
        if (chatInput.value.trim()) {
            sendButton.classList.add('active');
        } else {
            sendButton.classList.remove('active');
        }
    });
    
    // Send message event listeners
    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Close chat when clicking outside
    document.addEventListener('click', (e) => {
        if (!chatContainer.contains(e.target) && 
            !chatToggle.contains(e.target) && 
            chatContainer.classList.contains('active')) {
            chatContainer.classList.remove('active');
        }
    });
    
    // Prevent closing when clicking inside
    chatContainer.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    // Add drag functionality for mobile
    let isDragging = false;
    let startY = 0;
    let startHeight = 0;
    
    chatContainer.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        startY = touch.clientY;
        startHeight = chatContainer.offsetHeight;
        isDragging = true;
    });
    
    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        const touch = e.touches[0];
        const deltaY = startY - touch.clientY;
        const newHeight = startHeight + deltaY;
        
        if (newHeight >= 300 && newHeight <= window.innerHeight * 0.9) {
            chatContainer.style.height = `${newHeight}px`;
        }
    });
    
    document.addEventListener('touchend', () => {
        isDragging = false;
    });
}

// Initialize chat widget when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initChatWidget();
});

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

// Plot Thickens Section Animations
function initPlotThickens() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('timeline-item')) {
                    entry.target.style.animationDelay = `${entry.target.dataset.delay}s`;
                    entry.target.style.animationPlayState = 'running';
                } else if (entry.target.classList.contains('trait-card')) {
                    entry.target.style.animationDelay = `${entry.target.dataset.delay}s`;
                    entry.target.style.animationPlayState = 'running';
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    // Observe timeline items
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.dataset.delay = (index * 0.2).toString();
        item.style.animationPlayState = 'paused';
        observer.observe(item);
    });

    // Observe trait cards
    document.querySelectorAll('.trait-card').forEach((card, index) => {
        card.dataset.delay = (index * 0.2 + 0.5).toString();
        card.style.animationPlayState = 'paused';
        observer.observe(card);
    });
}

// Smooth scroll handling for navigation
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navigation Handling
function initNavigation() {
    const nav = document.querySelector('nav');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.querySelector('.nav-overlay');
    const navItems = document.querySelectorAll('.nav-links a');
    const navProgress = document.querySelector('.nav-progress');
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navOverlay.classList.toggle('active');
        mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
        mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
    });
    
    // Close mobile menu when clicking overlay
    navOverlay.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navOverlay.classList.remove('active');
        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
    });
    
    // Close mobile menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        });
    });
    
    // Scroll handling
    window.addEventListener('scroll', () => {
        // Add/remove scrolled class to nav
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        // Update progress bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        navProgress.style.width = scrolled + '%';
        
        // Update active nav item
        let current = '';
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initPlotThickens();
    initSmoothScroll();
    
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

// Add this function after the initChatWidget function
async function generateGeminiResponse(userMessage) {
    const GEMINI_API_KEY = 'AIzaSyCb_r1ACnT40Goh_f4WmmdU8r7WKj2dHm8';
    const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
    
    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `You are Yaduraj's AI assistant. Respond to: ${userMessage}`
                    }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                    maxOutputTokens: 1024,
                }
            })
        });

        if (!response.ok) {
            throw new Error('Failed to get response from Gemini API');
        }

        const data = await response.json();
        
        if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
            return data.candidates[0].content.parts[0].text;
        } else {
            throw new Error('Invalid response format from Gemini API');
        }
    } catch (error) {
        console.error('Gemini API Error:', error);
        throw new Error('Failed to generate response');
    }
} 