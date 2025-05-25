// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Main application initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme from localStorage
    initTheme();
    
    // Setup theme toggle functionality
    setupThemeToggle();
    
    // Add scroll to top button
    addScrollToTopButton();
    const links = document.querySelectorAll('.link');
    
    links.forEach((link, index) => {
        // Set animation delay based on index
        link.style.animationDelay = `${(index + 1) * 0.1}s`;
    });

    // Initialize animations for page elements
    initializeAnimations();
    
    // Booking form functionality
    const bookingLink = document.getElementById('booking-link');
    const bookingForm = document.getElementById('booking-form');
    const cancelButton = document.getElementById('cancel-booking');
    const consultationForm = document.getElementById('consultation-form');
    const formSuccess = document.getElementById('form-success');
    const closeSuccessBtn = document.getElementById('close-success');
    
    // Set minimum date for date picker (today)
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    
    // Add form validation
    setupFormValidation();

    // Show booking form with smooth animation when clicking the booking link
    bookingLink.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Hide success message if it's visible
        formSuccess.classList.add('hidden');
        
        // Show the form
        bookingForm.classList.remove('hidden');
        bookingForm.style.opacity = '0';
        bookingForm.style.transform = 'translateY(20px)';
        
        // Scroll to the form
        bookingForm.scrollIntoView({ behavior: 'smooth' });
        
        // Animate form entrance
        setTimeout(() => {
            bookingForm.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            bookingForm.style.opacity = '1';
            bookingForm.style.transform = 'translateY(0)';
        }, 50);
    });

    // Hide booking form when clicking cancel
    cancelButton.addEventListener('click', () => {
        bookingForm.style.opacity = '0';
        bookingForm.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            bookingForm.classList.add('hidden');
            consultationForm.reset();
        }, 400);
    });
    
    // Close success message
    closeSuccessBtn.addEventListener('click', () => {
        formSuccess.style.opacity = '0';
        formSuccess.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            formSuccess.classList.add('hidden');
            bookingForm.classList.add('hidden');
            formSuccess.style.opacity = '1';
            formSuccess.style.transform = 'scale(1)';
        }, 300);
    });

    // Validate form fields
    const validateForm = () => {
        let isValid = true;
        const requiredFields = consultationForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                
                field.addEventListener('input', function() {
                    if (this.value.trim()) {
                        this.classList.remove('error');
                    }
                }, { once: true });
            }
        });
        
        return isValid;
    };

    // Handle form submission
    consultationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;
        
        // In a real application, you would send this data to a server
        // For demo purposes, we'll just show a success message
        
        // Show loading state
        const submitBtn = consultationForm.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Reset button
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            
            // Show success message
            formSuccess.classList.remove('hidden');
            formSuccess.style.opacity = '0';
            formSuccess.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                formSuccess.style.transition = 'all 0.3s ease';
                formSuccess.style.opacity = '1';
                formSuccess.style.transform = 'scale(1)';
            }, 10);
            
            // Reset form
            consultationForm.reset();
        }, 1500);
    });
});
