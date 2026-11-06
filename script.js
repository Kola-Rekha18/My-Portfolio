// MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.innerHTML = isOpen
    ? '<i class="fa-solid fa-xmark"></i>'
    : '<i class="fa-solid fa-bars"></i>';
});

// CLOSE MOBILE MENU AFTER CLICKING A LINK

document.querySelectorAll(".nav-link").forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  });
});

// TYPING ANIMATION

const typingText = document.getElementById("typingText");

const words = [
  "Software Developer",
  "Frontend Developer",
  "Web Developer"
];

let wordIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeEffect() {
  const currentWord = words[wordIndex];

  if (!deleting) {
    typingText.textContent = currentWord.substring(0, characterIndex + 1);
    characterIndex++;

    if (characterIndex === currentWord.length) {
      deleting = true;
      setTimeout(typeEffect, 1400);
      return;
    }
  } else {
    typingText.textContent = currentWord.substring(0, characterIndex - 1);
    characterIndex--;

    if (characterIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(typeEffect, deleting ? 45 : 90);
}

typeEffect();

// PROJECT FILTERS

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach(function (item) {
      item.classList.remove("active");
    });

    button.classList.add("active");

    projectCards.forEach(function (card) {
      const category = card.dataset.category;

      if (selectedFilter === "all" || category === selectedFilter) {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

// NAVIGATION ACTIVE SECTION

const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-link");

function updateActiveLink() {
  let currentSection = "home";

  sections.forEach(function (section) {
    const sectionTop = section.offsetTop - 150;

    if (window.scrollY >= sectionTop) {
      currentSection = section.id;
    }
  });

  navigationLinks.forEach(function (link) {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === "#" + currentSection
    );
  });
}

window.addEventListener("scroll", updateActiveLink);
updateActiveLink();

// SCROLL REVEAL ANIMATION

const revealItems = document.querySelectorAll(
  ".hero-content, .hero-art, .quick-facts, .section-heading, " +
  ".about-art, .about-copy, .skill-card, .project-card, " +
  ".education-item, .contact-box"
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach(function (item) {
    item.classList.add("reveal");
    observer.observe(item);
  });
}

// CONTACT FORM

const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("visitorName").value.trim();
  const email = document.getElementById("visitorEmail").value.trim();
  const message = document.getElementById("visitorMessage").value.trim();

  if (!name || !email || !message) {
    formNote.textContent = "Please fill in all fields.";
    return;
  }

  // Replace this with your own email address.
  const yourEmail = "yourmail@example.com";

  const subject = encodeURIComponent("Portfolio Contact from " + name);

  const body = encodeURIComponent(
    "Name: " + name +
    "\nEmail: " + email +
    "\n\nMessage:\n" + message
  );

  window.location.href =
    "mailto:" + yourEmail + "?subject=" + subject + "&body=" + body;

  formNote.textContent = "Your email application should open now.";
});

// AUTOMATIC FOOTER YEAR

document.getElementById("year").textContent =
  new Date().getFullYear();