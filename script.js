// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Main application initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme from localStorage
    if (typeof initTheme === 'function') {
        initTheme();
    }
    
    // Setup theme toggle functionality
    if (typeof setupThemeToggle === 'function') {
        setupThemeToggle();
    }
    
    // Add scroll to top button
    if (typeof addScrollToTopButton === 'function') {
        addScrollToTopButton();
    }
    
    // Animate links
    const links = document.querySelectorAll('.link');
    links.forEach((link, index) => {
        link.style.animationDelay = `${(index + 1) * 0.1}s`;
    });

    // Initialize animations for page elements
    if (typeof initializeAnimations === 'function') {
        initializeAnimations();
    }
    
    // Booking form functionality
    const bookingLink = document.getElementById('booking-link');
    const bookingForm = document.getElementById('booking-form');
    const cancelButton = document.getElementById('cancel-booking');
    const consultationForm = document.getElementById('consultation-form');
    const formSuccess = document.getElementById('form-success');
    const closeSuccessBtn = document.getElementById('close-success');
    
    // Initialize date and time inputs if they exist
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');
    
    if (dateInput) {
        // Set minimum date for date picker (today)
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1); // Set minimum to tomorrow
        const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
        dateInput.setAttribute('min', tomorrowFormatted);
        
        // Set default time to next available hour
        if (timeInput) {
            const nextHour = today.getHours() + 1;
            const formattedHour = nextHour.toString().padStart(2, '0') + ':00';
            timeInput.min = '09:00';
            timeInput.max = '18:00';
            timeInput.value = formattedHour;
        }
    }
    
    // Add form validation if form exists
    if (consultationForm) {
        setupFormValidation();
    }

    // Show booking form with smooth animation when clicking the booking link
    if (bookingLink) {
        // Immediately check if the booking-link was clicked (for direct link access)
        if (window.location.hash === '#booking') {
            showBookingForm();
        }
        
        // Add click event listener
        bookingLink.addEventListener('click', (e) => {
            e.preventDefault();
            showBookingForm();
        });
    }
    
    // Function to show the booking form
    function showBookingForm() {
        console.log('Showing booking form...');
        
        // Hide success message if it's visible
        if (formSuccess) {
            formSuccess.classList.add('hidden');
        }
        
        // Show the form
        if (bookingForm) {
            console.log('Booking form found, removing hidden class');
            bookingForm.classList.remove('hidden');
            bookingForm.style.display = 'block';
            bookingForm.style.opacity = '0';
            bookingForm.style.transform = 'translateY(20px)';
            
            // Scroll to the form
            bookingForm.scrollIntoView({ behavior: 'smooth' });
            
            // Animate form entrance
            setTimeout(() => {
                console.log('Animating booking form');
                bookingForm.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                bookingForm.style.opacity = '1';
                bookingForm.style.transform = 'translateY(0)';
            }, 50);
        } else {
            console.error('Booking form element not found!');
        }
    }

    // Hide booking form when clicking cancel
    if (cancelButton) {
        cancelButton.addEventListener('click', () => {
            if (bookingForm) {
                bookingForm.style.opacity = '0';
                bookingForm.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    bookingForm.classList.add('hidden');
                    if (consultationForm) {
                        consultationForm.reset();
                    }
                }, 400);
            }
        });
    }
    
    // Close success message
    if (closeSuccessBtn) {
        closeSuccessBtn.addEventListener('click', () => {
            if (formSuccess) {
                formSuccess.style.opacity = '0';
                formSuccess.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    formSuccess.classList.add('hidden');
                    if (bookingForm) {
                        bookingForm.classList.add('hidden');
                    }
                    formSuccess.style.opacity = '1';
                    formSuccess.style.transform = 'scale(1)';
                }, 300);
            }
        });
    }

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
    if (consultationForm) {
        consultationForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Validate form
            if (!validateForm()) {
                // Scroll to first error if validation fails
                const firstError = consultationForm.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstError.focus();
                }
                return;
            }
            
            const submitBtn = consultationForm.querySelector('.submit-btn');
            if (!submitBtn) return;
            
            const originalBtnText = submitBtn.innerHTML;
            
            try {
                // Show loading state
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                
                // Get form data
                const formData = new FormData(consultationForm);
                const formProps = Object.fromEntries(formData);
                
                // Simulate API call (replace with actual API call)
                const response = await new Promise((resolve) => {
                    setTimeout(() => {
                        console.log('Form submitted:', formProps);
                        resolve({ success: true, message: 'Booking request received' });
                    }, 1500);
                });
                
                if (response.success) {
                    // Hide form and show success message
                    if (consultationForm) {
                        consultationForm.reset();
                    }
                    
                    if (bookingForm) {
                        bookingForm.style.display = 'none';
                    }
                    
                    if (formSuccess) {
                        formSuccess.classList.remove('hidden');
                        formSuccess.style.display = 'block';
                        formSuccess.style.opacity = '0';
                        formSuccess.style.transform = 'scale(0.95)';
                        
                        // Trigger reflow
                        void formSuccess.offsetWidth;
                        
                        // Animate success message
                        setTimeout(() => {
                            formSuccess.style.opacity = '1';
                            formSuccess.style.transform = 'scale(1)';
                        }, 50);
                        
                        // Scroll to success message
                        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                } else {
                    throw new Error('Failed to submit form');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                alert('There was an error submitting your booking. Please try again.');
            } finally {
                // Reset button state
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }
            }
        });
    }
});

// Simulate API call (replace with actual API call)
function simulateApiCall(formData) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Form submitted:', formData);
            resolve({ success: true, message: 'Booking request received' });
        }, 1500);
    });
}
