

"use strict";


const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {
  function closeMenu() {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  }

  menuToggle.addEventListener("click", () => {
    const isOpen =
      menuToggle.getAttribute("aria-expanded") === "true";

    nav.classList.toggle("open", !isOpen);

    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Open navigation" : "Close navigation"
    );
  });

  // Close after choosing a navigation link.
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close the menu with Escape.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("open")) {
      closeMenu();
      menuToggle.focus();
    }
  });

  // Close the menu if the user clicks outside it.
  document.addEventListener("click", (event) => {
    if (
      nav.classList.contains("open") &&
      !nav.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  // Close mobile navigation when switching to desktop layout.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 640) {
      closeMenu();
    }
  });
}

// ----------------------------------
// DYNAMIC COPYRIGHT YEAR
// ----------------------------------

const yearElement = document.querySelector("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// ----------------------------------
// SCROLL REVEAL ANIMATIONS
// ----------------------------------

const revealElements = document.querySelectorAll(
  [
    ".two-column",
    ".facts",
    ".skill-card",
    ".project",
    ".hack-card",
    ".timeline-item",
    ".learning-card",
    ".contact-grid"
  ].join(",")
);

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  revealElements.forEach((element) => {
    element.classList.add("reveal");
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
}

// ----------------------------------
// PLACEHOLDER PROJECT LINKS
// ----------------------------------

const toast = document.querySelector(".toast");
let toastTimeout;

document.querySelectorAll(".placeholder-link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    if (!toast) {
      window.alert(
        "."
      );
      return;
    }

    toast.textContent =
      "";

    toast.classList.add("show");

    window.clearTimeout(toastTimeout);

    toastTimeout = window.setTimeout(() => {
      toast.classList.remove("show");
    }, 3500);
  });
});

// ----------------------------------
// PHOTO FALLBACK
// ----------------------------------

const profilePhoto = document.querySelector(".profile-photo");

if (profilePhoto) {
  profilePhoto.addEventListener("error", () => {
    profilePhoto.alt =
      "Add your portrait at images/profile.png to display your photo.";

    profilePhoto.classList.add("photo-missing");
  });
}

