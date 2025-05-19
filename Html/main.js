// Project Modal JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get all the "See project" buttons
    const seeProjectButtons = document.querySelectorAll('#see');
    const modal = document.getElementById('project-modal');
    const closeButton = document.querySelector('.close-button');
    
    // Function to open the modal with project details
    function openModal(projectData) {
        // Set modal content based on the clicked project
        document.getElementById('modal-title').textContent = projectData.title;
        document.getElementById('modal-company').textContent = projectData.company;
        document.getElementById('modal-role').textContent = projectData.role;
        document.getElementById('modal-year').textContent = projectData.year;
        document.getElementById('modal-img').src = projectData.image;
        document.getElementById('modal-para').textContent = projectData.description;
        
        // Show the modal
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    }
    
    // Add click event listeners to all "See project" buttons
    seeProjectButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // Get the parent container of the button (project card)
            const projectCard = button.closest('#Container2');
            
            // Extract project data from the card
            const projectData = {
                title: projectCard.querySelector('#Tonic').textContent,
                company: projectCard.querySelector('#info').textContent,
                role: projectCard.querySelector('#info2').textContent,
                year: projectCard.querySelector('#info3').textContent,
                image: projectCard.querySelector('#He')?.src || '/Resource/he.png',
                description: projectCard.querySelector('#para').textContent
            };
            
            openModal(projectData);
        });
    });
    
    // Close modal when clicking the close button
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    });
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    });

    // Skills Dropdown JavaScript
    // Get all skill headers
    const skillHeaders = document.querySelectorAll('.skill-header');
    
    // Add click event listeners to each header
    skillHeaders.forEach(header => {
        header.addEventListener('click', () => {
            // Toggle active class on the header
            header.classList.toggle('active');
            
            // Get the next sibling element (skill list)
            const skillList = header.nextElementSibling;
            
            // Toggle the collapsed class
            skillList.classList.toggle('collapsed');
        });
    });
    
    // Initialize the first category as open (Languages)
    const firstHeader = document.querySelector('.skill-header');
    if (firstHeader) {
        firstHeader.classList.add('active');
        // The first skill list is already open by default in the HTML
    }
    
    // Form Validation
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('text');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('write');
    const submitButton = document.getElementById('but');
    const formStatus = document.getElementById('form-status');
    
    // Error message elements
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    
    // Validation functions
    const isValidName = (name) => name.trim().length >= 2;
    
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email) && email === email.toLowerCase();
    };
    
    const isValidMessage = (message) => message.trim().length >= 10;
    
    // Show error message and mark field as invalid
    const showError = (input, errorElement, message) => {
        input.classList.add('invalid');
        input.classList.remove('valid');
        errorElement.textContent = message;
    };
    
    // Clear error and mark field as valid
    const clearError = (input, errorElement) => {
        input.classList.remove('invalid');
        input.classList.add('valid');
        errorElement.textContent = '';
    };
    
    // Validate name field
    nameInput.addEventListener('input', () => {
        if (isValidName(nameInput.value)) {
            clearError(nameInput, nameError);
        } else {
            showError(nameInput, nameError, 'Name must be at least 2 characters');
        }
    });
    
    // Validate email field
    emailInput.addEventListener('input', () => {
        if (isValidEmail(emailInput.value)) {
            clearError(emailInput, emailError);
        } else {
            showError(emailInput, emailError, 'Please enter a valid lowercase email address');
        }
    });
    
    // Validate message field
    messageInput.addEventListener('input', () => {
        if (isValidMessage(messageInput.value)) {
            clearError(messageInput, messageError);
        } else {
            showError(messageInput, messageError, 'Message must be at least 10 characters');
        }
    });
    
    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;
        
        // Validate all fields
        if (!isValidName(nameInput.value)) {
            showError(nameInput, nameError, 'Name must be at least 2 characters');
            isValid = false;
        }
        
        if (!isValidEmail(emailInput.value)) {
            showError(emailInput, emailError, 'Please enter a valid lowercase email address');
            isValid = false;
        }
        
        if (!isValidMessage(messageInput.value)) {
            showError(messageInput, messageError, 'Message must be at least 10 characters');
            isValid = false;
        }
        
        // If form is valid, submit it
        if (isValid) {
            formStatus.textContent = 'Message sent successfully!';
            formStatus.className = 'form-status success';
            
            // Reset form after successful submission
            setTimeout(() => {
                contactForm.reset();
                formStatus.style.display = 'none';
                nameInput.classList.remove('valid');
                emailInput.classList.remove('valid');
                messageInput.classList.remove('valid');
            }, 3000);
        } else {
            formStatus.textContent = 'Please fix the errors in the form.';
            formStatus.className = 'form-status error';
        }
    });
    
    // Handle the submit button outside the form
    submitButton.addEventListener('click', () => {
        // This will trigger the form's submit event
        const submitEvent = new Event('submit', { cancelable: true });
        contactForm.dispatchEvent(submitEvent);
    });
});
