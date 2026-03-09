/* ============================================
   VISITING CARD PAGE - JavaScript
   Arman Graphics
   ============================================ */

// ========== CONFIGURATION ==========
// WhatsApp number (country code + number, no + sign)
var WHATSAPP_NUMBER = '919876543210';


// ========== WHATSAPP FUNCTION ==========
// Opens WhatsApp with a pre-filled message
function openWhatsApp(serviceName) {
  var message = encodeURIComponent(
    'Hello Arman Graphics, I want to know price for ' + serviceName
  );
  var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + message;
  window.open(url, '_blank');
}


// ========== MOBILE NAVIGATION TOGGLE ==========
function initMobileNav() {
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function () {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    var links = navLinks.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function () {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    }
  }
}


// ========== SCROLL REVEAL ANIMATION ==========
// Shows elements with fade-up animation when scrolled into view
function initScrollReveal() {
  var revealElements = document.querySelectorAll('.reveal');

  function checkReveal() {
    var windowHeight = window.innerHeight;

    for (var i = 0; i < revealElements.length; i++) {
      var elementTop = revealElements[i].getBoundingClientRect().top;

      // Reveal when element is 88% into viewport
      if (elementTop < windowHeight * 0.88) {
        revealElements[i].classList.add('visible');
      }
    }
  }

  // Check on scroll
  window.addEventListener('scroll', checkReveal);

  // Also check on page load (for elements already in view)
  checkReveal();
}


// ========== NAVBAR SHADOW ON SCROLL ==========
function initNavbarScroll() {
  var navbar = document.querySelector('.navbar');

  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.25)';
      } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
      }
    });
  }
}


// ========== VARIETY CARD TILT EFFECT ==========
// Adds a subtle 3D tilt on mouse move over cards
function initCardTilt() {
  var cards = document.querySelectorAll('.variety-card');

  for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener('mousemove', function (e) {
      var rect = this.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var centerX = rect.width / 2;
      var centerY = rect.height / 2;

      // Calculate tilt (max 3 degrees)
      var rotateX = ((y - centerY) / centerY) * -3;
      var rotateY = ((x - centerX) / centerX) * 3;

      this.style.transform = 'translateY(-10px) perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
    });

    cards[i].addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0) perspective(1000px) rotateX(0) rotateY(0)';
    });
  }
}


// ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
function initSmoothScroll() {
  var anchors = document.querySelectorAll('a[href^="#"]');

  for (var i = 0; i < anchors.length; i++) {
    anchors[i].addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');

      if (targetId && targetId !== '#') {
        var targetEl = document.querySelector(targetId);

        if (targetEl) {
          e.preventDefault();
          var navbarHeight = document.querySelector('.navbar') ? document.querySelector('.navbar').offsetHeight : 0;
          var targetPosition = targetEl.offsetTop - navbarHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  }
}


// ========== INITIALIZE EVERYTHING ==========
document.addEventListener('DOMContentLoaded', function () {
  initMobileNav();
  initScrollReveal();
  initNavbarScroll();
  initCardTilt();
  initSmoothScroll();

  // Log message
  console.log('🪪 Visiting Card Page - Loaded Successfully!');
});
