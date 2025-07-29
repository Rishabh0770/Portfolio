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
// Drag & Drop for Hobbies
// ================================
const hobbiesBox = document.getElementById('hobbiesBox');
const hobbies = document.querySelectorAll('.hobby');

hobbiesBox.style.position = 'relative'; // So children can use absolute positioning

// Make each hobby draggable manually
hobbies.forEach(hobby => {
  hobby.style.position = 'absolute';
  hobby.addEventListener('mousedown', startDrag);
});

let activeHobby = null;
let offsetX = 0;
let offsetY = 0;

function startDrag(e) {
  activeHobby = e.target;
  const rect = activeHobby.getBoundingClientRect();
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;

  document.addEventListener('mousemove', dragMove);
  document.addEventListener('mouseup', endDrag);
}

function dragMove(e) {
  if (!activeHobby) return;

  const boxRect = hobbiesBox.getBoundingClientRect();
  const x = e.clientX - boxRect.left - offsetX;
  const y = e.clientY - boxRect.top - offsetY;

  activeHobby.style.left = `${x}px`;
  activeHobby.style.top = `${y}px`;
}

function endDrag() {
  document.removeEventListener('mousemove', dragMove);
  document.removeEventListener('mouseup', endDrag);
  activeHobby = null;
}


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
