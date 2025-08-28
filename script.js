// Global Variables
let currentUser = null;
let isLoggedIn = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    checkLoginStatus();
});

// Initialize application
function initializeApp() {
    // Add fade-in animation to elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe all major sections
    document.querySelectorAll('.feature-card, .access-card, .facility-card, .pricing-card, .testimonial-card, .contact-card').forEach(el => {
        observer.observe(el);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Navigation smooth scrolling
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Modal event listeners
    setupModalListeners();
    
    // Form event listeners
    setupFormListeners();
}

// Modal functionality
function setupModalListeners() {
    // Close modal when clicking on X
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', closeAllModals);
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeAllModals();
        }
    });
}

// Form event listeners
function setupFormListeners() {
    // Student login form
    const studentLoginForm = document.getElementById('studentLoginForm');
    if (studentLoginForm) {
        studentLoginForm.addEventListener('submit', handleStudentLogin);
    }

    // Admin login form
    const adminLoginForm = document.getElementById('adminLoginForm');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', handleAdminLogin);
    }
}

// Navigation Functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const offsetTop = element.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Modal Functions
function showLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

function showStudentLogin() {
    closeAllModals();
    document.getElementById('studentLoginModal').style.display = 'block';
}

function showAdminLogin() {
    closeAllModals();
    document.getElementById('adminLoginModal').style.display = 'block';
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

// Authentication Functions
function handleStudentLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('studentEmail').value;
    const password = document.getElementById('studentPassword').value;
    
    // Basic validation
    if (!email || !password) {
        showAlert('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showAlert('Please enter a valid email address', 'error');
        return;
    }
    
    // Check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Login successful
        currentUser = user;
        isLoggedIn = true;
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('isLoggedIn', 'true');
        
        showAlert('Login successful! Redirecting to dashboard...', 'success');
        
        setTimeout(() => {
            window.location.href = 'student-dashboard.html';
        }, 1500);
    } else {
        showAlert('Invalid email or password', 'error');
    }
    
    closeAllModals();
}

function handleAdminLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    
    // Basic validation
    if (!username || !password) {
        showAlert('Please fill in all fields', 'error');
        return;
    }
    
    // Check admin credentials (hardcoded for demo)
    if (username === 'admin' && password === 'admin123') {
        // Login successful
        currentUser = { username: 'admin', role: 'admin' };
        isLoggedIn = true;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.setItem('isLoggedIn', 'true');
        
        showAlert('Admin login successful! Redirecting to admin panel...', 'success');
        
        setTimeout(() => {
            window.location.href = 'admin.html';
        }, 1500);
    } else {
        showAlert('Invalid admin credentials', 'error');
    }
    
    closeAllModals();
}

function checkLoginStatus() {
    const savedUser = localStorage.getItem('currentUser');
    const savedLoginStatus = localStorage.getItem('isLoggedIn');
    
    if (savedUser && savedLoginStatus === 'true') {
        currentUser = JSON.parse(savedUser);
        isLoggedIn = true;
        updateUIForLoggedInUser();
    }
}

function updateUIForLoggedInUser() {
    const loginBtn = document.querySelector('.btn[onclick="showLoginModal()"]');
    if (loginBtn && currentUser) {
        loginBtn.textContent = currentUser.name || currentUser.username || 'Profile';
        loginBtn.onclick = () => {
            if (currentUser.role === 'admin') {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'student-dashboard.html';
            }
        };
    }
}

function logout() {
    currentUser = null;
    isLoggedIn = false;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
}

// Payment Functions
// Payment Functions
async function makePayment(planType, amount) {
    try {
        // Fetch plan details from the backend
        console.log('Fetching plans for:', planType, amount);
        const response = await fetch('http://localhost:5000/api/plans');
        const data = await response.json();
        console.log('Available plans:', data.plans);
        
        const selectedPlan = data.plans.find(plan => 
            plan.name.toLowerCase() === planType.toLowerCase() && 
            plan.price === Number(amount)
        );
        
        console.log('Selected plan:', selectedPlan);
        
        if (!selectedPlan) {
            showAlert('Plan not found', 'error');
            return;
        }

        // Redirect to Razorpay payment link
        if (selectedPlan.paymentLink) {
            showAlert('Redirecting to payment gateway...', 'info');
            window.open(selectedPlan.paymentLink, '_blank');
        } else {
            showAlert('Payment link not available', 'error');
        }
    } catch (error) {
        showAlert('Error processing payment', 'error');
        console.error('Payment error:', error);
    }
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showAlert(message, type = 'info') {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <span>${message}</span>
        <button class="alert-close" onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Add alert styles
    alert.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'error' ? '#ff4444' : type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 3000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add close button styles
    const closeBtn = alert.querySelector('.alert-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        line-height: 1;
    `;
    
    // Add to document
    document.body.appendChild(alert);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alert.parentElement) {
            alert.remove();
        }
    }, 5000);
}

// Contact Functions
function openMaps() {
    // Open Google Maps for the library location
    const address = "Near Pepper's Pizza, Main Commercial Complex";
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
}

// Registration page functions (will be used in registration.html)
function validateRegistrationForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    if (!isValidEmail(formData.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!formData.phone || formData.phone.length < 10) {
        errors.push('Please enter a valid phone number');
    }
    
    if (!formData.password || formData.password.length < 6) {
        errors.push('Password must be at least 6 characters long');
    }
    
    if (formData.password !== formData.confirmPassword) {
        errors.push('Passwords do not match');
    }
    
    if (!formData.aadhaar || formData.aadhaar.length !== 12) {
        errors.push('Please enter a valid 12-digit Aadhaar number');
    }
    
    return errors;
}

function saveUserRegistration(userData) {
    const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    
    // Check if email already exists
    if (users.find(u => u.email === userData.email)) {
        throw new Error('Email already registered');
    }
    
    // Add unique ID and timestamp
    userData.id = Date.now().toString();
    userData.registeredAt = new Date().toISOString();
    userData.status = 'active';
    
    users.push(userData);
    localStorage.setItem('registeredUsers', JSON.stringify(users));
    
    return userData;
}

// Add CSS for alerts
const alertStyles = `
@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

.alert {
    animation: slideIn 0.3s ease-out;
}
`;

// Inject alert styles
const styleSheet = document.createElement('style');
styleSheet.textContent = alertStyles;
document.head.appendChild(styleSheet);

// Hamburger menu functionality for mobile
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            // Toggle mobile menu
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.background = 'rgba(0, 0, 0, 0.95)';
            navMenu.style.padding = '1rem';
            navMenu.style.borderRadius = '0 0 10px 10px';
        });
        
        // Close menu when clicking on links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navMenu.style.display = 'none';
                }
            });
        });
    }
});

// Smooth scroll polyfill for older browsers
if (!window.CSS || !CSS.supports('scroll-behavior', 'smooth')) {
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

// Performance optimization: Lazy load images if any are added later
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);
