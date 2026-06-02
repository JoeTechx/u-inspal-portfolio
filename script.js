import { animate, stagger, inView } from "https://cdn.jsdelivr.net/npm/motion@11.11.13/+esm";

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  animateInitialLayout();
  setupScrollReveals();
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

// Initial subtle fade in for header and animated entry of Hero items
function animateInitialLayout() {
  // Fade in header
  animate("header", { opacity: [0, 1], y: [-20, 0] }, { duration: 0.8, ease: "easeOut" });
  
  // Fade in hero elements sequentially
  animate(".animate-item", 
    { opacity: [0, 1], y: [40, 0] }, 
    { 
      delay: stagger(0.15, { start: 0.3 }), 
      duration: 1, 
      ease: [0.16, 1, 0.3, 1] 
    }
  );

  // Fade in scroll indicator slowly
  animate(".scroll-indicator", { opacity: [0, 0.7] }, { delay: 1.2, duration: 1 });
}

// Scroll reveals using Motion's inView helper
function setupScrollReveals() {
  // Select all items with reveal-item class
  const revealItems = document.querySelectorAll(".reveal-item");
  
  // Initial inline styles for seamless fade-in
  revealItems.forEach(item => {
    item.style.opacity = "0";
    item.style.transform = "translateY(30px)";
  });

  // Dynamically trigger entrance animations
  inView(".reveal-item", ({ target }) => {
    animate(target, 
      { opacity: 1, translateY: 0 }, 
      { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    );
    
    // Stop observing once animated
    return () => {};
  });
}
