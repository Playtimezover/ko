// Email Service for KO Savant website
// Uses EmailJS to send form submissions to contact@kosavant.com

// Initialize EmailJS
(function() {
    // Public Key from EmailJS account
    emailjs.init("nOl9RTXY9KPHkOyLyTyH3");
})();

// Function to send email when booking is made
function sendBookingEmail(formData) {
    return emailjs.send(
        "service_5dku7y9", // Service ID from EmailJS
        "MZh0_bMAxSM6i3-Nx", // Template ID from EmailJS
        {
            name: formData.name,
            email: formData.email,
            date: formData.date,
            time: formData.time,
            service: formData.service,
            message: formData.message || "No additional message",
            to_email: "contact@kosavant.com"
        }
    );
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
