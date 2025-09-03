// -------------- Navbar scroll --------------
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});

// -------------- Mobile menu --------------
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");
if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// -------------- Fade-in cards using IntersectionObserver --------------
const cards = document.querySelectorAll(".card");
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.2 }
);
cards.forEach(c => observer.observe(c));

// -------------- Toggle places/details lists --------------
document.querySelectorAll(".toggle-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".card");
    card.classList.toggle("active");
    // change label depending on type
    const isDestination = card.classList.contains("destination") || card.classList.contains("package");
    btn.textContent = card.classList.contains("active")
      ? (isDestination ? "Hide Places" : "Hide Details")
      : (isDestination ? "View Places" : "View Details");
  });
});

// -------------- Back to Top --------------
const backToTop = document.getElementById("backToTop");
if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// -------------- Search filter for destinations --------------
const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const q = searchInput.value.toLowerCase().trim();
    document.querySelectorAll(".destination").forEach(dest => {
      const title = dest.querySelector("h3").textContent.toLowerCase();
      dest.style.display = title.includes(q) ? "" : "none";
    });
  });
}

// -------------- Booking modal (pre-fill destination) --------------
const bookingModal = document.getElementById("bookingModal");
const bookingForm = document.getElementById("bookingForm");
const modalClose = document.getElementById("modalClose");
const bfDestination = document.getElementById("bf-destination");

// If modal elements don't exist (older file versions), fetch by selectors
const modal = document.getElementById("bookingModal");
const closeBtn = document.querySelector(".modal .close");

// open modal and prefill destination
document.querySelectorAll(".book-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    // try to get data-destination attr; fallback to nearest h3
    const packageName = btn.getAttribute("data-destination") ||
      (btn.closest(".card") && btn.closest(".card").querySelector("h3")?.textContent) || "";
    const destField = document.getElementById("bf-destination");
    if (destField) destField.value = packageName;
    const modalEl = document.getElementById("bookingModal");
    if (modalEl) {
      modalEl.classList.add("open");
      modalEl.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
  });
});

// close modal
function closeBookingModal() {
  const modalEl = document.getElementById("bookingModal");
  if (!modalEl) return;
  modalEl.classList.remove("open");
  modalEl.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
const modalCloseBtn = document.getElementById("modalClose") || document.querySelector(".modal .close");
if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeBookingModal);

// click outside to close
const modalEl = document.getElementById("bookingModal");
if (modalEl) {
  modalEl.addEventListener("click", (ev) => {
    if (ev.target === modalEl) closeBookingModal();
  });
  // escape key
  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape" && modalEl.classList.contains("open")) closeBookingModal();
  });
}

// booking form submission (demo: just show an alert)
const form = document.getElementById("bookingForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("bf-name").value.trim();
    const email = document.getElementById("bf-email").value.trim();
    const phone = document.getElementById("bf-phone").value.trim();
    const destination = document.getElementById("bf-destination").value.trim();
    const start = document.getElementById("bf-start").value;
    const travellers = document.getElementById("bf-travellers").value;

    if (!name || !email || !phone || !destination || !start || !travellers) {
      alert("Please fill all required fields.");
      return;
    }

    // For demo: show a confirmation (replace with real backend call)
    alert(`✅ Booking request submitted!\n\nPackage: ${destination}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nStart: ${start}\nTravelers: ${travellers}\n\nOur team will reach out shortly.`);
    form.reset();
    closeBookingModal();
  });
}
