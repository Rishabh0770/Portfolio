/*
 * index.js - Custom JS for Portfolio Website
 * Author: Rishav Kumar
 * Last Updated: October 24, 2025
 * Features: Theme toggle, AOS, tech slider loop, scroll reveal
 */

// ======================================================
// INDEX.JS | Main Script for Theme, Slider & AOS
// ======================================================

document.addEventListener("DOMContentLoaded", function () {
  
  // ===============================
  // Initialize Theme from LocalStorage
  // ===============================
  initializeTheme();

  // ===============================
  // Tech Slider: Seamless infinite scroll
  // ===============================
  const track = document.querySelector('.tech-slider-track');
  if (track) {
    // Duplicate slider content to make it loop smoothly
    track.innerHTML += track.innerHTML;
  }

  // ===============================
  // Theme Toggle Logic
  // ===============================
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');

  themeToggle.addEventListener('click', function () {
    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    // Update <html> theme attribute
    document.documentElement.setAttribute('data-bs-theme', newTheme);

    // Change icon based on theme
    themeIcon.className = newTheme === 'light' ? 'bi bi-moon-fill' : 'bi bi-sun-fill';

    // Save preference to localStorage
    localStorage.setItem('theme', newTheme);
  });

});


// ===============================
// Function: Apply saved theme from localStorage
// ===============================
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  const themeIcon = document.getElementById('themeIcon');

  // Apply the saved theme
  document.documentElement.setAttribute('data-bs-theme', savedTheme);

  // Set the correct icon for saved theme
  themeIcon.className = savedTheme === 'light' ? 'bi bi-moon-fill' : 'bi bi-sun-fill';
}

// ===============================
// AOS (Animate On Scroll) Initialization
// ===============================
AOS.init({
  duration: 1000, // Animation duration in milliseconds
  // once: true // Uncomment if you want animation only once
});

// ================================
// Scroll Reveal Animation
// ================================
const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  const revealPoint = 150;

  revealElements.forEach(el => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight - revealPoint) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
}

// Attach scroll listener
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);


// ================================
// Active Navigation Scroll Spy
// ================================
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  
  let currentSection = '';
  const scrollPosition = window.scrollY + 100; // Offset for fixed navbar
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });
  
  // Remove active class from all nav links
  navLinks.forEach(link => {
    link.classList.remove('active');
  });
  
  // Add active class to current section nav link
  if (currentSection) {
    const activeLink = document.querySelector(`.nav-link[href="#${currentSection}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }
}

// Attach scroll listener for nav spy
window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// ================================
// Smooth Scrolling for Nav Links
// ================================
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        const headerHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

// ================================
// View More Projects Toggle
// ================================
document.addEventListener("DOMContentLoaded", () => {
  const viewMoreBtn = document.getElementById("viewMoreBtn");
  const extraProjects = document.querySelectorAll(".extra-project");

  viewMoreBtn.addEventListener("click", () => {
    extraProjects.forEach(card => card.classList.toggle("d-none"));

    // Check if first extra project is visible
    if (extraProjects[0] && !extraProjects[0].classList.contains("d-none")) {
      viewMoreBtn.textContent = "Show Less Projects";
    } else {
      viewMoreBtn.textContent = "View More Projects";
    }
  });
});