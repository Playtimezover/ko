// Booking form functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Booking.js loaded');
    
    // Get DOM elements
    const bookingLink = document.getElementById('booking-link');
    const bookingForm = document.getElementById('booking-form');
    const cancelButton = document.getElementById('cancel-booking');
    const consultationForm = document.getElementById('consultation-form');
    const formSuccess = document.getElementById('form-success');
    const closeSuccessBtn = document.getElementById('close-success');
    
    console.log('Booking link found:', !!bookingLink);
    console.log('Booking form found:', !!bookingForm);
    
    // Initialize booking functionality if elements exist
    if (bookingLink && bookingForm) {
        // Show form when booking link is clicked
        bookingLink.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Booking link clicked');
            
            // Show form
            bookingForm.classList.remove('hidden');
            bookingForm.style.display = 'block';
            
            // Scroll to form
            setTimeout(function() {
                bookingForm.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        });
        
        // Hide form when cancel button is clicked
        if (cancelButton) {
            cancelButton.addEventListener('click', function() {
                bookingForm.classList.add('hidden');
                if (consultationForm) {
                    consultationForm.reset();
                }
            });
        }
        
        // Handle form submission
        if (consultationForm) {
            consultationForm.addEventListener('submit', function(e) {
                e.preventDefault();
                console.log('Form submitted');
                
                // Basic validation
                const requiredFields = consultationForm.querySelectorAll('[required]');
                let isValid = true;
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('error');
                    } else {
                        field.classList.remove('error');
                    }
                });
                
                if (!isValid) {
                    console.log('Form validation failed');
                    return;
                }
                
                // Show success message
                const submitBtn = consultationForm.querySelector('.submit-btn');
                if (submitBtn) {
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                    submitBtn.disabled = true;
                }
                
                // Simulate form submission
                setTimeout(function() {
                    if (consultationForm) consultationForm.reset();
                    if (formSuccess) {
                        formSuccess.classList.remove('hidden');
                        formSuccess.style.display = 'block';
                        formSuccess.scrollIntoView({ behavior: 'smooth' });
                    }
                    if (bookingForm) bookingForm.classList.add('hidden');
                    if (submitBtn) {
                        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Request';
                        submitBtn.disabled = false;
                    }
                }, 1500);
            });
        }
        
        // Close success message
        if (closeSuccessBtn && formSuccess) {
            closeSuccessBtn.addEventListener('click', function() {
                formSuccess.classList.add('hidden');
            });
        }
        
        // Check URL hash for direct booking link
        if (window.location.hash === '#booking') {
            bookingLink.click();
        }
    }
});
