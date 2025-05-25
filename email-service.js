// Email Service for KO Savant website
// Uses EmailJS to send form submissions to contact@kosavant.com

// Initialize EmailJS with the user ID
document.addEventListener('DOMContentLoaded', function() {
    // Initialize with your EmailJS User ID
    emailjs.init('nOl9RTXY9KPHkOyLyTyH3');
});

// Function to send email when booking is made
function sendBookingEmail(formData) {
    // Create template parameters
    const templateParams = {
        name: formData.name || '',
        email: formData.email || '',
        date: formData.date || '',
        time: formData.time || '',
        service: formData.service || '',
        message: formData.message || 'No additional message',
        to_email: 'contact@kosavant.com'
    };
    
    // Use the simpler send method with just service ID and template ID
    return emailjs.send('service_5dku7y9', 'template_0xdvlwm', templateParams);
}

// Function to format form data for email
function formatBookingData(form) {
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Format date and time for better readability
    if (data.date) {
        const dateObj = new Date(data.date);
        data.dateFormatted = dateObj.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    return data;
}
