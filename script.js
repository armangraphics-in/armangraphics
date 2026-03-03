/* ============================================
   ARMAN GRAPHICS - JavaScript Functionality
   Lead Generation & Interactive Features
   ============================================ */

// ========== CONFIGURATION ==========
// Replace this with the actual WhatsApp number (with country code, no + sign)
const WHATSAPP_NUMBER = '916388025941'; // Example: 91 + mobile number

// ========== WHATSAPP AUTO MESSAGE FUNCTION ==========
/**
 * Opens WhatsApp with a pre-filled message
 * @param {string} serviceName - The service the customer is interested in
 */
function openWhatsApp(serviceName) {
  // Create the pre-filled message
  const message = encodeURIComponent(
    `Hello Arman Graphics, I want to know price for ${serviceName}`
  );
  // Build the WhatsApp URL
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  // Open in a new tab
  window.open(url, '_blank');
}

// ========== COUNTDOWN TIMER ==========
/**
 * Sets up a countdown timer that resets every 24 hours
 * This creates urgency for the offer
 */
function initCountdown() {
  // Get or set the countdown end time in localStorage
  let endTime = localStorage.getItem('armanOfferEnd');

  // If no end time or it has passed, set a new one (24 hours from now)
  if (!endTime || new Date(endTime) <= new Date()) {
    const tomorrow = new Date();
    tomorrow.setHours(tomorrow.getHours() + 23);
    tomorrow.setMinutes(tomorrow.getMinutes() + 59);
    endTime = tomorrow.toISOString();
    localStorage.setItem('armanOfferEnd', endTime);
  }

  // Update the countdown every second
  function updateCountdown() {
    const now = new Date();
    const end = new Date(endTime);
    const diff = end - now;

    // If countdown is over, reset it
    if (diff <= 0) {
      localStorage.removeItem('armanOfferEnd');
      initCountdown();
      return;
    }

    // Calculate hours, minutes, seconds
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Update the DOM elements
    const hoursEl = document.getElementById('countdown-hours');
    const minutesEl = document.getElementById('countdown-minutes');
    const secondsEl = document.getElementById('countdown-seconds');

    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  // Run immediately and then every second
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ========== MOBILE NAVIGATION TOGGLE ==========
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      // Toggle the active class on both elements
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }
}

// ========== SMOOTH SCROLL ==========
/**
 * Handles smooth scrolling for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetEl = document.querySelector(targetId);

      if (targetEl) {
        // Calculate offset for fixed navbar
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetEl.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ========== FORM VALIDATION ==========
function initFormValidation() {
  const form = document.getElementById('leadForm');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('formName');
    const mobile = document.getElementById('formMobile');
    const service = document.getElementById('formService');

    let isValid = true;

    // Validate Name (minimum 2 characters)
    if (name.value.trim().length < 2) {
      showError(name, 'nameError');
      isValid = false;
    } else {
      hideError(name, 'nameError');
    }

    // Validate Mobile (10-digit Indian number)
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobile.value.trim())) {
      showError(mobile, 'mobileError');
      isValid = false;
    } else {
      hideError(mobile, 'mobileError');
    }

    // Validate Service Selection
    if (service.value === '') {
      showError(service, 'serviceError');
      isValid = false;
    } else {
      hideError(service, 'serviceError');
    }

    // If all validations pass
    if (isValid) {
      // Build WhatsApp message with form data
      const message = encodeURIComponent(
        `Hello Arman Graphics!\n\nName: ${name.value.trim()}\nMobile: ${mobile.value.trim()}\nService: ${service.options[service.selectedIndex].text}\n\nI want to know the price and details. Please contact me.`
      );

      // Show success message
      form.style.display = 'none';
      document.getElementById('formSuccess').style.display = 'block';

      // Open WhatsApp with form data
      setTimeout(function () {
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
        window.open(url, '_blank');
      }, 1000);
    }
  });
}

/**
 * Shows error state on a form field
 */
function showError(input, errorId) {
  input.classList.add('error');
  const errorEl = document.getElementById(errorId);
  if (errorEl) errorEl.classList.add('show');
}

/**
 * Hides error state on a form field
 */
function hideError(input, errorId) {
  input.classList.remove('error');
  const errorEl = document.getElementById(errorId);
  if (errorEl) errorEl.classList.remove('show');
}

// ========== SCROLL REVEAL ANIMATION ==========
/**
 * Reveals elements as they scroll into view
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  function checkReveal() {
    const windowHeight = window.innerHeight;

    revealElements.forEach(function (el) {
      const elementTop = el.getBoundingClientRect().top;
      // Reveal when element is 85% visible
      if (elementTop < windowHeight * 0.88) {
        el.classList.add('visible');
      }
    });
  }

  // Check on scroll and on initial load
  window.addEventListener('scroll', checkReveal);
  checkReveal();
}

// ========== NAVBAR SCROLL EFFECT ==========
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.2)';
    } else {
      navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
    }
  });
}

// ========== INITIALIZE EVERYTHING ON PAGE LOAD ==========
document.addEventListener('DOMContentLoaded', function () {
  initCountdown();
  initMobileNav();
  initSmoothScroll();
  initFormValidation();
  initScrollReveal();
  initNavbarScroll();

  // Log a welcome message
  console.log('🎨 Arman Graphics Website Loaded Successfully!');
  console.log('📞 Ready to generate leads!');
});
