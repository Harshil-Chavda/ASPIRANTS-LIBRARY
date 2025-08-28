document.addEventListener('DOMContentLoaded', function() {
    const loginModal = document.getElementById('loginModal');
    const studentLoginModal = document.getElementById('studentLoginModal');
    const adminLoginModal = document.getElementById('adminLoginModal');
    const closeButtons = document.querySelectorAll('.close');

    // Show login modal
    function showLoginModal() {
        loginModal.style.display = 'block';
    }

    // Show student login modal
    function showStudentLogin() {
        studentLoginModal.style.display = 'block';
        loginModal.style.display = 'none';
    }

    // Show admin login modal
    function showAdminLogin() {
        adminLoginModal.style.display = 'block';
        loginModal.style.display = 'none';
    }

    // Close modals
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            loginModal.style.display = 'none';
            studentLoginModal.style.display = 'none';
            adminLoginModal.style.display = 'none';
        });
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === loginModal || event.target === studentLoginModal || event.target === adminLoginModal) {
            loginModal.style.display = 'none';
            studentLoginModal.style.display = 'none';
            adminLoginModal.style.display = 'none';
        }
    });

    // Scroll to section
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Payment function (stub)
    window.makePayment = function(plan, amount) {
        alert(`Payment of ₹${amount} for ${plan} plan initiated.`);
        // Here you would typically call your backend API to process the payment
    };

    // Initialize any other scripts or functions as needed
});