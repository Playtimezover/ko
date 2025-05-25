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

// Initialize Instagram feed with RSS App
document.addEventListener('DOMContentLoaded', function() {
    console.log('Instagram feed script loaded');
    
    // Get the loading indicator and error message elements
    const loadingElement = document.getElementById('instagram-loading');
    const errorElement = document.getElementById('instagram-error');
    const rssWallElement = document.querySelector('rssapp-wall');
    
    // Function to check if RSS App is loaded
    function checkRssAppLoaded() {
        console.log('Checking if RSS App is loaded...');
        
        // If rssapp is not defined, wait and try again (up to 10 attempts)
        if (typeof rssapp === 'undefined') {
            if (window.rssAppAttempts > 10) {
                console.error('RSS App failed to load after multiple attempts');
                showError();
                return;
            }
            
            window.rssAppAttempts = (window.rssAppAttempts || 0) + 1;
            console.log('RSS App not loaded yet, retrying... (attempt ' + window.rssAppAttempts + ')');
            setTimeout(checkRssAppLoaded, 1000);
            return;
        }
        
        console.log('RSS App loaded successfully!');
        
        try {
            // Add mobile-optimized attribute to RSS Wall if on mobile
            if (rssWallElement && window.innerWidth <= 768) {
                rssWallElement.setAttribute('data-mobile-optimized', 'true');
                
                // Add event listener for window resize
                window.addEventListener('resize', function() {
                    if (window.innerWidth <= 480) {
                        rssWallElement.setAttribute('data-layout', 'list');
                    } else {
                        rssWallElement.setAttribute('data-layout', 'grid');
                    }
                });
                
                // Set initial layout based on screen size
                if (window.innerWidth <= 480) {
                    rssWallElement.setAttribute('data-layout', 'list');
                }
            }
            
            // Hide loading indicator
            if (loadingElement) {
                loadingElement.classList.add('hidden');
            }
            
            // Hide error message
            if (errorElement) {
                errorElement.classList.add('hidden');
            }
        } catch (error) {
            console.error('Error initializing Instagram feed:', error);
            showError();
        }
    }
    
    // Function to show error message
    function showError() {
        if (loadingElement) {
            loadingElement.classList.add('hidden');
        }
        
        if (errorElement) {
            errorElement.classList.remove('hidden');
        }
    }
    
    // Check if RSS App script is loaded
    checkRssAppLoaded();
});
