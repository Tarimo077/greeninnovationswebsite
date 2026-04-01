// Contact form validation and submission

const contactForm = document.getElementById('contactForm');
const successModal = document.getElementById('successModal');
const errorModal = document.getElementById('errorModal');
const closeSuccessModal = document.getElementById('closeSuccessModal');
const closeErrorModal = document.getElementById('closeErrorModal');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Get all focusable elements in a container
function getFocusableElements(container) {
  return container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
}

// Focus trap handler for modals
function handleModalFocusTrap(modal) {
  return function(e) {
    if (!modal || !modal.classList.contains('active')) return;
    
    const focusableElements = getFocusableElements(modal);
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  };
}

// Create trap handlers for each modal
const successTrapHandler = handleModalFocusTrap(successModal);
const errorTrapHandler = handleModalFocusTrap(errorModal);

// Store the element that triggered the modal
let modalTriggerElement = null;

// Form validation
function validateForm() {
  let isValid = true;
  const formGroups = contactForm.querySelectorAll('.form-group');
  
  formGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    const value = input.value.trim();
    
    // Remove previous error state
    group.classList.remove('error');
    
    // Check if field is empty
    if (!value) {
      group.classList.add('error');
      isValid = false;
      return;
    }
    
    // Email validation
    if (input.type === 'email' && !emailRegex.test(value)) {
      group.classList.add('error');
      isValid = false;
      return;
    }
    
    // Minimum length validation for message
    if (input.id === 'message' && value.length < 10) {
      group.classList.add('error');
      const errorMessage = group.querySelector('.error-message');
      errorMessage.textContent = 'Message must be at least 10 characters';
      isValid = false;
      return;
    }
  });
  
  return isValid;
}

// Form submission
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Store the submit button (or active element) for focus return
    modalTriggerElement = document.activeElement;
    
    if (validateForm()) {
      // Show success modal
      successModal.classList.add('active');
      successModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      
      // Add focus trap
      document.addEventListener('keydown', successTrapHandler);
      
      // Focus the close button
      setTimeout(() => closeSuccessModal.focus(), 100);
      
      // Reset form
      contactForm.reset();
      
      // Remove any error states
      const formGroups = contactForm.querySelectorAll('.form-group');
      formGroups.forEach(group => group.classList.remove('error'));
      
      // Auto-close success modal after 3 seconds
      setTimeout(() => {
        if (successModal.classList.contains('active')) {
          closeSuccessModalHandler();
        }
      }, 3000);
    } else {
      // Show error modal
      errorModal.classList.add('active');
      errorModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      
      // Add focus trap
      document.addEventListener('keydown', errorTrapHandler);
      
      // Focus the close button
      setTimeout(() => closeErrorModal.focus(), 100);
      
      // Auto-close error modal after 2 seconds
      setTimeout(() => {
        if (errorModal.classList.contains('active')) {
          closeErrorModalHandler();
        }
      }, 2000);
    }
  });
}

// Real-time validation on input
const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
formInputs.forEach(input => {
  input.addEventListener('blur', () => {
    const formGroup = input.closest('.form-group');
    const value = input.value.trim();
    
    formGroup.classList.remove('error');
    
    if (!value) {
      formGroup.classList.add('error');
    } else if (input.type === 'email' && !emailRegex.test(value)) {
      formGroup.classList.add('error');
    } else if (input.id === 'message' && value.length < 10) {
      formGroup.classList.add('error');
      const errorMessage = formGroup.querySelector('.error-message');
      errorMessage.textContent = 'Message must be at least 10 characters';
    }
  });
  
  input.addEventListener('input', () => {
    const formGroup = input.closest('.form-group');
    if (formGroup.classList.contains('error') && input.value.trim()) {
      formGroup.classList.remove('error');
    }
  });
});

// Close success modal
function closeSuccessModalHandler() {
  successModal.classList.remove('active');
  successModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  
  // Remove focus trap
  document.removeEventListener('keydown', successTrapHandler);
  
  // Return focus to the element that triggered the modal
  if (modalTriggerElement) {
    modalTriggerElement.focus();
    modalTriggerElement = null;
  }
}

// Close error modal
function closeErrorModalHandler() {
  errorModal.classList.remove('active');
  errorModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  
  // Remove focus trap
  document.removeEventListener('keydown', errorTrapHandler);
  
  // Return focus to the element that triggered the modal
  if (modalTriggerElement) {
    modalTriggerElement.focus();
    modalTriggerElement = null;
  }
}

if (closeSuccessModal) {
  closeSuccessModal.addEventListener('click', closeSuccessModalHandler);
}

if (closeErrorModal) {
  closeErrorModal.addEventListener('click', closeErrorModalHandler);
}

// Close modals when clicking outside
if (successModal) {
  successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
      closeSuccessModalHandler();
    }
  });
}

if (errorModal) {
  errorModal.addEventListener('click', (e) => {
    if (e.target === errorModal) {
      closeErrorModalHandler();
    }
  });
}

// Close modals on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (successModal && successModal.classList.contains('active')) {
      closeSuccessModalHandler();
    } else if (errorModal && errorModal.classList.contains('active')) {
      closeErrorModalHandler();
    }
  }
});
