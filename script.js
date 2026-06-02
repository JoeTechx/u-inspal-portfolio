import { animate } from "https://cdn.jsdelivr.net/npm/motion@11.11.13/+esm";

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  animateInitialLayout();
});

// Mobile menu toggle logic
function setupNavigation() {
  const menuToggle = document.getElementById("menu-toggle");
  const navLinksList = document.getElementById("nav-links");
  const navLinks = document.querySelectorAll(".nav-link");

  if (menuToggle && navLinksList) {
    // Open/close menu on click
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      navLinksList.classList.toggle("active");
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        navLinksList.classList.remove("active");
        
        // Update active class
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
      });
    });
  }

  // Active state scroll tracking
  const sections = document.querySelectorAll("section");
  window.addEventListener("scroll", () => {
    let current = "";
    const scrollPosition = window.scrollY + 120; // offset for nav header height

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute("id") || "";
      }
    });

    if (current) {
      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

// Initial subtle fade in for header and placeholder content
function animateInitialLayout() {
  // Fade in header
  animate("header", { opacity: [0, 1], y: [-20, 0] }, { duration: 0.8, ease: "easeOut" });
  
  // Fade in placeholder
  animate(".hero-section-placeholder h1", { opacity: [0, 1], scale: [0.95, 1] }, { duration: 1, delay: 0.2 });
}
