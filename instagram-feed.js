// Instagram feed initialization - simpler approach
document.addEventListener('DOMContentLoaded', function() {
    console.log('Instagram feed script loaded');
    
    // Hide the loading indicator
    const loadingElement = document.getElementById('instagram-loading');
    if (loadingElement) {
        // Wait a moment before hiding to avoid flickering
        setTimeout(function() {
            loadingElement.classList.add('hidden');
        }, 500);
    }
    
    // Create the Instagram embed directly
    const feedContainer = document.querySelector('.instagram-feed');
    if (feedContainer && !document.querySelector('.instagram-grid')) {
        // Create a basic Instagram embed that doesn't rely on external scripts
        const embedHtml = `
            <div class="instagram-embed">
                <iframe 
                    src="https://www.instagram.com/k.o._savant/embed" 
                    width="100%" 
                    height="400" 
                    frameborder="0" 
                    scrolling="no" 
                    allowtransparency="true">
                </iframe>
            </div>
        `;
        
        // Add the embed HTML before any other content in the feed container
        const firstChild = feedContainer.firstChild;
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = embedHtml;
        
        // Insert the embed
        if (firstChild) {
            feedContainer.insertBefore(tempDiv.firstElementChild, firstChild);
        } else {
            feedContainer.appendChild(tempDiv.firstElementChild);
        }
        
        // Hide the error message if it exists
        const errorElement = document.getElementById('instagram-error');
        if (errorElement) {
            errorElement.classList.add('hidden');
        }
    }
});
