// Update copyright year
document.addEventListener('DOMContentLoaded', function() {
    // Update copyright year
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
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

    // Show booking form with smooth animation when clicking the booking link
    if (bookingLink) {
        bookingLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Hide success message if it's visible
            if (formSuccess) {
                formSuccess.classList.add('hidden');
            }
            
            // Show the form
            if (bookingForm) {
                bookingForm.classList.remove('hidden');
                bookingForm.style.display = 'block';
                bookingForm.style.opacity = '0';
                bookingForm.style.transform = 'translateY(20px)';
                
                // Scroll to the form
                bookingForm.scrollIntoView({ behavior: 'smooth' });
                
                // Animate form entrance
                setTimeout(function() {
                    bookingForm.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    bookingForm.style.opacity = '1';
                    bookingForm.style.transform = 'translateY(0)';
                }, 50);
            }
        });
    }

    // Hide booking form when clicking cancel
    if (cancelButton) {
        cancelButton.addEventListener('click', function() {
            if (bookingForm) {
                bookingForm.style.opacity = '0';
                bookingForm.style.transform = 'translateY(20px)';
                
                setTimeout(function() {
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
        closeSuccessBtn.addEventListener('click', function() {
            if (formSuccess) {
                formSuccess.style.opacity = '0';
                formSuccess.style.transform = 'scale(0.95)';
                
                setTimeout(function() {
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

    // Simple form validation
    function validateForm() {
        if (!consultationForm) return false;
        
        let isValid = true;
        const requiredFields = consultationForm.querySelectorAll('[required]');
        
        requiredFields.forEach(function(field) {
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
    }

    // Handle form submission validation only - actual submission is handled by FormSubmit.co
    if (consultationForm) {
        consultationForm.addEventListener('submit', function(e) {
            if (!validateForm()) {
                e.preventDefault(); // Only prevent default if validation fails
                // Scroll to first error
                const firstError = consultationForm.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                return;
            }
            
            // Form is valid, show loading state on button
            const submitBtn = consultationForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
            }
            
            // Let the form submit naturally to FormSubmit.co
            // The form will redirect to thank-you.html after submission
        });
    }
});
