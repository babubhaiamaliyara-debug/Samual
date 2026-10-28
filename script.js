const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const currentYear = document.getElementById("current-year");

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    siteNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

currentYear.textContent = new Date().getFullYear();
