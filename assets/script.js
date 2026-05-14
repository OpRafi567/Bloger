const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-menu]");
const revealItems = document.querySelectorAll(".reveal");

const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 18);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menu?.classList.toggle("is-open", !isOpen);
  header?.classList.toggle("is-open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

menu?.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLAnchorElement)) return;
  menuToggle?.setAttribute("aria-expanded", "false");
  menu.classList.remove("is-open");
  header?.classList.remove("is-open");
  document.body.classList.remove("menu-open");
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

window.addEventListener("load", () => {
  revealItems.forEach((item, index) => {
    if (index < 5) item.classList.add("is-visible");
  });

  if (window.lucide) {
    window.lucide.createIcons({
      attrs: {
        "stroke-width": 2,
        "aria-hidden": "true"
      }
    });
  }
});
