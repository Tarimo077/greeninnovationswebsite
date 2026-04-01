// Modal functionality for news articles

const modal = document.getElementById('articleModal');
const modalClose = document.getElementById('modalClose');
const modalBody = document.getElementById('modalBody');
const modalImage = document.getElementById('modalImage');

// Store the element that triggered the modal
let modalTrigger = null;

// Get all focusable elements in modal
function getFocusableElements(container) {
  return container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
}

// Focus trap handler
function handleFocusTrap(e) {
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
}

// Function to open modal with article content
function openModal(article) {
  // Store the trigger element for focus return
  modalTrigger = document.activeElement;
  
  // Set modal image - use custom image if available, otherwise emoji
  if (article.image) {
    modalImage.innerHTML = `<img src="${article.image}" alt="${article.imageAlt || article.title}" style="width:100%;height:100%;object-fit:cover;">`;
  } else {
    modalImage.textContent = article.icon || '📰';
  }
  
  modalBody.innerHTML = `
    <h2>${article.title}</h2>
    <div class="article-meta">
      <span class="article-category">${article.category}</span>
      <span><i class="far fa-calendar"></i> ${article.date}</span>
    </div>
    <p>${article.content}</p>
  `;
  
  // Show modal
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  
  // Add focus trap
  document.addEventListener('keydown', handleFocusTrap);
  
  // Focus the close button for accessibility
  setTimeout(() => modalClose.focus(), 100);
}

// Function to close modal
function closeModal() {
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  
  // Remove focus trap
  document.removeEventListener('keydown', handleFocusTrap);
  
  // Return focus to the trigger element
  if (modalTrigger) {
    modalTrigger.focus();
    modalTrigger = null;
  }
}

// Event listeners
if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

if (modal) {
  // Close when clicking outside modal content
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
    closeModal();
  }
});
