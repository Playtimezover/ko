document.addEventListener('DOMContentLoaded', function() {
    // Check if RSS App widget is loaded
    if (typeof rssapp !== 'undefined') {
        // Initialize the Instagram feed widget
        const feed = new rssapp.Wall('Ufg4OYRpC9uMbxjy', {
            layout: 'grid',
            width: '100%',
            height: 'auto',
            limit: 6,
            responsive: true
        });
        
        // Mount the feed to the container
        feed.mount(document.querySelector('rssapp-wall'));
    } else {
        // Show error message if RSS App is not loaded
        const feedContainer = document.querySelector('.instagram-feed');
        if (feedContainer) {
            feedContainer.innerHTML = `
                <div class="instagram-error">
                    <p>Unable to load Instagram feed. Please <a href="https://www.instagram.com/k.o._savant" target="_blank">visit our Instagram page</a> instead.</p>
                </div>
            `;
        }
    }
});
