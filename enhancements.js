// KO Savant Website Enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme from localStorage
    initTheme();
    
    // Setup theme toggle functionality
    setupThemeToggle();
    
    // Add scroll to top button
    addScrollToTopButton();
    
    // Initialize animations for page elements
    initializeAnimations();
    
    // Setup form validation with better UX
    setupFormValidation();
    
    // Initialize Instagram feed (would connect to real API in production)
    setupInstagramFeed();
});

// Theme functionality
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        const themeToggle = document.getElementById('theme-toggle-btn');
        if (themeToggle) {
            themeToggle.classList.add('dark-mode');
        }
    }
}

function setupThemeToggle() {
    // Direct implementation to ensure it works reliably
    const themeToggle = document.getElementById('theme-toggle-btn');
    if (!themeToggle) {
        console.error('Theme toggle button not found');
        return;
    }
    
    console.log('Setting up theme toggle button');
    
    // Handle click on the theme toggle button
    themeToggle.addEventListener('click', function() {
        console.log('Theme toggle clicked');
        
        // Check current theme
        if (document.body.hasAttribute('data-theme')) {
            // Currently dark, switch to light
            document.body.removeAttribute('data-theme');
            themeToggle.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
            console.log('Switched to light mode');
        } else {
            // Currently light, switch to dark
            document.body.setAttribute('data-theme', 'dark');
            themeToggle.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
            console.log('Switched to dark mode');
        }
    });
}

// Add scroll to top button functionality
function addScrollToTopButton() {
    // Create button element
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-top-btn hidden';
    document.body.appendChild(scrollBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.remove('hidden');
        } else {
            scrollBtn.classList.add('hidden');
        }
    });
    
    // Scroll to top when clicked
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Animation functionality
function initializeAnimations() {
    // Elements to animate
    const animatedElements = document.querySelectorAll(
        '.profile, .stats, .links > a, .spotlight, .testimonial, .personal-showcase, .instagram-section'
    );
    
    // Use Intersection Observer for scroll-based animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class when element comes into view
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    // Setup elements for animation
    animatedElements.forEach((element, index) => {
        // Add pre-animation class
        element.classList.add('pre-animation');
        
        // Add staggered delay for elements that should animate sequentially
        if (element.classList.contains('links') || element.classList.contains('instagram-post')) {
            element.style.transitionDelay = `${index * 0.1}s`;
        }
        
        // Observe element
        observer.observe(element);
    });
}

// Enhanced form validation
function setupFormValidation() {
    const form = document.getElementById('consultation-form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea, select');
    
    // Add validation styles and feedback
    inputs.forEach(input => {
        // Skip submit button
        if (input.type === 'submit') return;
        
        // Create validation message element if it doesn't exist
        if (!input.parentNode.querySelector('.validation-message')) {
            const validationMessage = document.createElement('div');
            validationMessage.className = 'validation-message';
            input.parentNode.appendChild(validationMessage);
        }
        
        // Add real-time validation
        input.addEventListener('input', () => validateInput(input));
        input.addEventListener('blur', () => validateInput(input));
    });
    
    // Enhance form submission
    form.addEventListener('submit', (e) => {
        let isValid = true;
        
        // Validate all inputs before submission
        inputs.forEach(input => {
            if (input.type !== 'submit' && !validateInput(input)) {
                isValid = false;
            }
        });
        
        // Prevent submission if form is invalid
        if (!isValid) {
            e.preventDefault();
            
            // Scroll to first invalid field
            const firstInvalid = form.querySelector('.invalid');
            if (firstInvalid) {
                firstInvalid.focus();
                firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
}

function validateInput(input) {
    const validationMessage = input.parentNode.querySelector('.validation-message');
    let isValid = true;
    let message = '';
    
    // Clear previous validation state
    input.classList.remove('valid', 'invalid');
    
    // Check if required field is empty
    if (input.hasAttribute('required') && !input.value.trim()) {
        isValid = false;
        message = 'This field is required';
    } 
    // Validate email format
    else if (input.type === 'email' && input.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(input.value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        }
    }
    // Validate date (must be current or future date)
    else if (input.type === 'date' && input.value) {
        const selectedDate = new Date(input.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            isValid = false;
            message = 'Please select a current or future date';
        }
    }
    
    // Add appropriate class and message
    if (input.value.trim()) {
        input.classList.add(isValid ? 'valid' : 'invalid');
    }
    
    if (validationMessage) {
        validationMessage.textContent = message;
        validationMessage.style.display = message ? 'block' : 'none';
    }
    
    return isValid;
}

// Setup Instagram Feed with real data from k.o._savant account
function setupInstagramFeed() {
    const instagramFeed = document.getElementById('instagram-feed');
    if (!instagramFeed) return;
    
    // Clear existing placeholder content
    instagramFeed.innerHTML = '';
    
    // Display loading state
    const loadingElement = document.createElement('div');
    loadingElement.className = 'instagram-loading';
    loadingElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading posts...';
    instagramFeed.appendChild(loadingElement);
    
    // In production, this would use the Instagram Basic Display API or Graph API
    // For this implementation, we'll use a public feed proxy service
    // Note: This requires additional setup with Meta's developer portal to work fully
    
    // Fetch Instagram posts (this is a simulated fetch since we don't have API credentials)
    fetchInstagramPosts('k.o._savant')
        .then(posts => {
            // Remove loading indicator
            loadingElement.remove();
            
            // Display posts
            if (posts && posts.length) {
                posts.forEach(post => {
                    instagramFeed.appendChild(createPostElement(post));
                });
            } else {
                // Handle empty or error state
                instagramFeed.innerHTML = '<div class="instagram-error">Follow on Instagram to see the latest posts</div>';
            }
        })
        .catch(error => {
            console.error('Error fetching Instagram posts:', error);
            loadingElement.remove();
            instagramFeed.innerHTML = '<div class="instagram-error">Could not load Instagram posts. <br>Please check out <a href="https://www.instagram.com/k.o._savant" target="_blank">@k.o._savant</a> on Instagram.</div>';
        });
}

// This is a simulated fetch function (for demo purposes)
async function fetchInstagramPosts(username) {
    // In a real implementation, this would make an API call to Instagram
    // You would need to register an app, get credentials, and implement OAuth
    
    // Since we can't make real API calls in this demo, we'll return simulated posts
    // In production, replace this with actual API integration
    
    // For demonstration, simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulated post data based on a fashion-focused account
    return [
        {
            id: 'post1',
            imageUrl: 'https://picsum.photos/seed/insta1/500/500',
            caption: 'Latest PlayTimezOver drop! #fashion #streetwear',
            likes: 234,
            comments: 18,
            url: 'https://www.instagram.com/p/12345/' // Would be real post URL
        },
        {
            id: 'post2',
            imageUrl: 'https://picsum.photos/seed/insta2/500/500',
            caption: 'Behind the scenes at our latest photoshoot',
            likes: 456,
            comments: 32,
            url: 'https://www.instagram.com/p/23456/'
        },
        {
            id: 'post3',
            imageUrl: 'https://picsum.photos/seed/insta3/500/500',
            caption: 'Business consultation session today',
            likes: 789,
            comments: 64,
            url: 'https://www.instagram.com/p/34567/'
        },
        {
            id: 'post4',
            imageUrl: 'https://picsum.photos/seed/insta4/500/500',
            caption: 'New collection inspiration',
            likes: 123,
            comments: 9,
            url: 'https://www.instagram.com/p/45678/'
        }
    ];
}

// Create Instagram post element
function createPostElement(post) {
    const postElement = document.createElement('div');
    postElement.className = 'instagram-post';
    postElement.innerHTML = `
        <a href="${post.url}" target="_blank" rel="noopener noreferrer">
            <img src="${post.imageUrl}" alt="${post.caption}">
            <div class="instagram-overlay">
                <span><i class="fas fa-heart"></i> ${post.likes}</span>
                <span><i class="fas fa-comment"></i> ${post.comments}</span>
            </div>
        </a>
    `;
    
    // Add hover animation
    postElement.addEventListener('mouseenter', () => {
        const overlay = postElement.querySelector('.instagram-overlay');
        if (overlay) overlay.style.opacity = '1';
    });
    
    postElement.addEventListener('mouseleave', () => {
        const overlay = postElement.querySelector('.instagram-overlay');
        if (overlay) overlay.style.opacity = '0';
    });
    
    return postElement;
}

// Cookie consent banner
function addCookieConsent() {
    // Check if user has already consented
    if (localStorage.getItem('cookieConsent') === 'true') return;
    
    // Create cookie consent banner
    const cookieBanner = document.createElement('div');
    cookieBanner.className = 'cookie-consent';
    cookieBanner.innerHTML = `
        <div class="cookie-text">
            <p>This website uses cookies to ensure you get the best experience. 
            <a href="privacy-policy.html">Learn more</a></p>
        </div>
        <div class="cookie-buttons">
            <button class="cookie-accept">Accept</button>
            <button class="cookie-decline">Decline</button>
        </div>
    `;
    
    // Add banner to page
    document.body.appendChild(cookieBanner);
    
    // Show banner with animation
    setTimeout(() => {
        cookieBanner.classList.add('show');
    }, 1000);
    
    // Handle accept button
    const acceptBtn = cookieBanner.querySelector('.cookie-accept');
    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'true');
            cookieBanner.classList.remove('show');
            setTimeout(() => {
                cookieBanner.remove();
            }, 500);
        });
    }
    
    // Handle decline button
    const declineBtn = cookieBanner.querySelector('.cookie-decline');
    if (declineBtn) {
        declineBtn.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'false');
            cookieBanner.classList.remove('show');
            setTimeout(() => {
                cookieBanner.remove();
            }, 500);
        });
    }
}

// Call cookie consent function after a short delay
setTimeout(addCookieConsent, 2000);
