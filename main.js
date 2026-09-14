/**
 * J.S Pharmacy - Core Website Functionality & Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNavigation();
  initFormValidation();
  setActiveNavLink();
});

/**
 * Mobile Navigation Menu Toggle with ARIA state handling
 */
function initMobileNavigation() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('is-open');
  });

  // Close mobile menu on clicking a link
  const navLinks = navMenu.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('is-open')) {
        navMenu.classList.remove('is-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

/**
 * Ensures current active page link is highlighted correctly
 */
function setActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath) {
      link.classList.add('active');
    } else if (currentPath === '' && linkPath === 'index.html') {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Form Validation & Client-side submission handling
 */
function initFormValidation() {
  const contactForm = document.getElementById('contact-form');
  const feedbackEl = document.getElementById('form-feedback');

  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Clear existing error messages
    clearErrors();

    const nameInput = document.getElementById('contact-name');
    const phoneInput = document.getElementById('contact-phone');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');

    let isValid = true;

    if (!nameInput.value.trim()) {
      showFieldError('name-error', 'Name is required');
      isValid = false;
    }

    if (!phoneInput.value.trim()) {
      showFieldError('phone-error', 'Phone number is required');
      isValid = false;
    }

    if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
      showFieldError('email-error', 'Valid email address is required');
      isValid = false;
    }

    if (!messageInput.value.trim()) {
      showFieldError('message-error', 'Message is required');
      isValid = false;
    }

    if (isValid) {
      // Show informative feedback per static website requirements
      feedbackEl.className = 'form-feedback success';
      feedbackEl.textContent = 'Thank you. Your enquiry has been prepared. Please use the contact details above to reach J.S Pharmacy directly.';
      contactForm.reset();
    }
  });
}

function showFieldError(elementId, text) {
  const el = document.getElementById(elementId);
  if (el) el.textContent = text;
}

function clearErrors() {
  const errors = document.querySelectorAll('.error-msg');
  errors.forEach(el => el.textContent = '');
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
