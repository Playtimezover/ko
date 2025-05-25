// Instagram Feed Fallback Script
document.addEventListener('DOMContentLoaded', function() {
    console.log('Instagram fallback script loaded');
    
    const instagramGrid = document.querySelector('.instagram-grid');
    const loadingElement = document.getElementById('instagram-loading');
    
    // Check if we need to create placeholder images
    if (instagramGrid) {
        const instagramItems = instagramGrid.querySelectorAll('.instagram-item img');
        
        // If we need to create placeholder images (images don't exist)
        if (instagramItems && instagramItems.length > 0) {
            // Hide loading indicator after a delay
            setTimeout(function() {
                if (loadingElement) {
                    loadingElement.classList.add('hidden');
                }
            }, 500);
            
            // Generate placeholder images if they don't exist
            instagramItems.forEach((img, index) => {
                if (!imageExists(img.src)) {
                    // Use a placeholder image service
                    img.src = `https://via.placeholder.com/400x400/3498db/ffffff?text=Instagram+${index+1}`;
                    img.onerror = function() {
                        // If placeholder service fails, use a color
                        this.src = '';
                        this.parentElement.parentElement.style.backgroundColor = '#3498db';
                    };
                }
            });
        }
    }
    
    // Function to check if an image exists
    function imageExists(url) {
        // This is just a quick check - not 100% reliable
        return url && url.indexOf('placeholder.com') === -1 && url.indexOf('/instagram/insta') > -1;
    }
});
