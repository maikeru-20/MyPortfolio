// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
});

// Loading screen
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }, 1500);
});

// Custom cursor
const cursor = document.querySelector(".cursor");
const cursorFollower = document.querySelector(".cursor-follower");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

  setTimeout(() => {
    cursorFollower.style.left = e.clientX + "px";
    cursorFollower.style.top = e.clientY + "px";
  }, 100);
});

// Mobile menu toggle
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Active nav link
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Back to top button
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("visible");
  } else {
    backToTop.classList.remove("visible");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Typing animation
const typingText = document.querySelector(".typing-text");
const texts = [
  "Software Engineer",
  "Web Developer",
  "Full Stack Developer",
  "Tech Enthusiast",
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeText() {
  const currentText = texts[textIndex];

  if (isDeleting) {
    typingText.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentText.length) {
    setTimeout(() => {
      isDeleting = true;
    }, 1500);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
  }

  const typingSpeed = isDeleting ? 50 : 100;
  setTimeout(typeText, typingSpeed);
}

// Start typing animation
setTimeout(typeText, 1000);

// Contact form
const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Add form submission logic here
  alert("Thank you for your message! I'll get back to you soon.");
  contactForm.reset();
});

// Skill card hover effects
const skillCards = document.querySelectorAll(".skill-card");
skillCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
  });
});

// Theme Toggle Functionality
function initializeTheme() {
  const savedTheme = localStorage.getItem("theme") || "dark";
  const body = document.body;
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  // Apply saved theme
  body.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme, themeIcon);

  // Theme toggle event listener
  themeToggle.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme, themeIcon);
  });
}

function updateThemeIcon(theme, iconElement) {
  if (theme === "dark") {
    iconElement.className = "fas fa-sun";
  } else {
    iconElement.className = "fas fa-moon";
  }
}

// Editable About Section Functionality
function initializeEditableSection() {
  const editBtn = document.getElementById("edit-about-btn");
  const aboutTextContainer = document.querySelector(".about-text");
  const confirmationMsg = document.getElementById("save-confirmation");

  let isEditing = false;

  editBtn.addEventListener("click", () => {
    if (!isEditing) {
      // Enter edit mode
      aboutTextContainer.setAttribute("contenteditable", "true");
      aboutTextContainer.classList.add("editing");
      editBtn.textContent = "Save";
      editBtn.classList.add("save-mode");
      isEditing = true;

      // Focus on the editable area
      aboutTextContainer.focus();
    } else {
      // Save and exit edit mode
      aboutTextContainer.setAttribute("contenteditable", "false");
      aboutTextContainer.classList.remove("editing");
      editBtn.textContent = "Edit";
      editBtn.classList.remove("save-mode");
      isEditing = false;

      // Show confirmation message
      showConfirmation(confirmationMsg);
    }
  });

  // Handle ESC key to cancel editing
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isEditing) {
      aboutTextContainer.setAttribute("contenteditable", "false");
      aboutTextContainer.classList.remove("editing");
      editBtn.textContent = "Edit";
      editBtn.classList.remove("save-mode");
      isEditing = false;
    }
  });
}

function showConfirmation(element) {
  element.style.display = "block";
  element.style.opacity = "1";

  setTimeout(() => {
    element.style.opacity = "0";
    setTimeout(() => {
      element.style.display = "none";
    }, 300);
  }, 2000);
}

// Initialize all functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeTheme();
  initializeEditableSection();
});


