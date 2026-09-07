const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

const sections = [...document.querySelectorAll("main section[id]")];
const links = [...document.querySelectorAll(".nav-links > a")];

window.addEventListener("scroll", () => {
  let current = "home";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 130) current = section.id;
  });
  links.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${current}`));
});

const search = document.getElementById("serviceSearch");
const cards = [...document.querySelectorAll(".service-card")];
const noResults = document.getElementById("noResults");

search.addEventListener("input", e => {
  const term = e.target.value.trim().toLowerCase();
  let matches = 0;
  cards.forEach(card => {
    const match = !term || card.dataset.service.includes(term);
    card.style.display = match ? "" : "none";
    if (match) matches++;
  });
  noResults.style.display = matches ? "none" : "block";
});

const modal = document.getElementById("quoteModal");
const openModal = () => {
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};
const closeModal = () => {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

document.querySelectorAll(".btn-primary").forEach(btn => {
  if (btn.textContent.includes("Quote")) btn.addEventListener("click", e => {
    e.preventDefault();
    openModal();
  });
});
document.getElementById("contactBtn").addEventListener("click", openModal);
document.getElementById("modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

document.getElementById("quoteForm").addEventListener("submit", e => {
  e.preventDefault();
  e.currentTarget.style.display = "none";
  document.getElementById("formSuccess").style.display = "block";
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
