// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.classList.add('mobile-menu-button');
    mobileMenuButton.setAttribute('aria-label', 'Toggle navigation menu');
    mobileMenuButton.innerHTML = '☰';
    
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    if (window.innerWidth <= 600) {
        nav.insertBefore(mobileMenuButton, navLinks);
        navLinks.style.display = 'none';
    }
    
    mobileMenuButton.addEventListener('click', function() {
        const isExpanded = navLinks.style.display === 'flex';
        navLinks.style.display = isExpanded ? 'none' : 'flex';
        mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
    });
    
    // Dropdown menu accessibility
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        const content = dropdown.querySelector('.dropdown-content');
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const isExpanded = link.getAttribute('aria-expanded') === 'true';
            link.setAttribute('aria-expanded', !isExpanded);
            content.style.display = isExpanded ? 'none' : 'block';
        });
    });
});

// Enhanced Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
        // Hide success message initially
        if (formSuccess) {
            formSuccess.style.display = 'none';
        }
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset all errors
            clearAllErrors();
            
            // Get form fields
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            const privacy = document.getElementById('privacy');
            
            // Validate fields
            let isValid = true;
            
            // Name validation
            if (!name || !name.value.trim()) {
                showError(name, 'nameError', 'Name is required');
                isValid = false;
            } else if (name.value.trim().length < 2) {
                showError(name, 'nameError', 'Name must be at least 2 characters');
                isValid = false;
            }
            
            // Email validation
            if (!email || !email.value.trim()) {
                showError(email, 'emailError', 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'emailError', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Subject validation
            if (!subject || !subject.value.trim()) {
                showError(subject, 'subjectError', 'Subject is required');
                isValid = false;
            }
            
            // Message validation
            if (!message || !message.value.trim()) {
                showError(message, 'messageError', 'Message is required');
                isValid = false;
            } else if (message.value.trim().length < 10) {
                showError(message, 'messageError', 'Message must be at least 10 characters');
                isValid = false;
            }
            
            // Privacy checkbox validation
            if (privacy && !privacy.checked) {
                showError(privacy, 'privacyError', 'You must agree to the privacy policy');
                isValid = false;
            }
            
            // If form is valid, show success message and reset form
            if (isValid) {
                // Simulate form submission (would be replaced with actual AJAX submission)
                contactForm.reset();
                
                // Show success message with animation
                if (formSuccess) {
                    formSuccess.style.display = 'block';
                    formSuccess.style.opacity = '0';
                    formSuccess.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        formSuccess.style.opacity = '1';
                        formSuccess.style.transform = 'translateY(0)';
                    }, 10);
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        formSuccess.style.opacity = '0';
                        formSuccess.style.transform = 'translateY(-20px)';
                        
                        setTimeout(() => {
                            formSuccess.style.display = 'none';
                        }, 500);
                    }, 5000);
                }
            }
        });
        
        // Add input event listeners to clear errors when user types
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                const errorId = this.id + 'Error';
                clearError(errorId);
                this.classList.remove('error');
            });
        });
    }
    
    // Helper functions
    function showError(inputElement, errorId, errorMessage) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
        }
        if (inputElement) {
            inputElement.classList.add('error');
        }
    }
    
    function clearError(errorId) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }
    
    function clearAllErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(error => {
            error.textContent = '';
            error.style.display = 'none';
        });
        
        const errorInputs = document.querySelectorAll('.error');
        errorInputs.forEach(input => {
            input.classList.remove('error');
        });
    }
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});

// Dropdown Menu
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        const content = dropdown.querySelector('.dropdown-content');
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const isExpanded = link.getAttribute('aria-expanded') === 'true';
            link.setAttribute('aria-expanded', !isExpanded);
            content.style.display = isExpanded ? 'none' : 'block';
        });
    });
});

// Back to Top Button
document.addEventListener('DOMContentLoaded', function() {
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Lightbox for Gallery
document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (lightbox && galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').src;
                const caption = this.querySelector('h3').textContent;
                
                lightboxImg.src = imgSrc;
                lightboxCaption.textContent = caption;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close lightbox
        function closeLightboxHandler() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        closeLightbox.addEventListener('click', closeLightboxHandler);
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightboxHandler();
            }
        });
        
        // Close with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightboxHandler();
            }
        });
    }
});

// Gallery Filter
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length && galleryItems.length) {
        // Show all items initially
        galleryItems.forEach(item => {
            item.style.display = 'block';
        });
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    // Show all items if "all" filter selected
                    if (filter === 'all') {
                        item.style.display = 'block';
                        // Add a staggered animation delay for a nicer effect
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50 * Array.from(galleryItems).indexOf(item));
                    } else {
                        // Check if item has the selected category
                        const categories = item.getAttribute('data-category').split(' ');
                        
                        if (categories.includes(filter)) {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'scale(1)';
                            }, 50 * Array.from(galleryItems).indexOf(item));
                        } else {
                            item.style.opacity = '0';
                            item.style.transform = 'scale(0.8)';
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 300);
                        }
                    }
                });
            });
        });
    }
}); 