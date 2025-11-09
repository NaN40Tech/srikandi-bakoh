// === MOBILE MENU TOGGLE ===
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}

// === SLIDER HANDLER ===
// Generic function for sliders (Why Choose Us & Products)
function initSlider(trackSelector, leftBtnSelector, rightBtnSelector) {
  const track = document.querySelector(trackSelector);
  const btnLeft = document.querySelector(leftBtnSelector);
  const btnRight = document.querySelector(rightBtnSelector);

  if (!track || !btnLeft || !btnRight) return;

  function updateArrows() {
    const maxScroll = track.scrollWidth - track.clientWidth;
    btnLeft.style.display = track.scrollLeft <= 0 ? "none" : "block";
    btnRight.style.display =
      track.scrollLeft >= maxScroll - 1 ? "none" : "block";
  }

  btnLeft.addEventListener("click", () => {
    track.scrollBy({ left: -300, behavior: "smooth" });
  });

  btnRight.addEventListener("click", () => {
    track.scrollBy({ left: 300, behavior: "smooth" });
  });

  // Update arrows on scroll
  track.addEventListener("scroll", updateArrows);
  window.addEventListener("resize", updateArrows);

  // Initial state
  updateArrows();
}

// === Scroll Animation ===
const animatedElements = document.querySelectorAll(".animate");

function animateOnScroll() {
  animatedElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add("show");
    }
  });
}
window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", animateOnScroll);

// === CONTACT FORM PREFILL ===
document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const product = params.get("product");

  if (product) {
    const textarea = document.querySelector('textarea[name="message"]');
    if (textarea) {
      textarea.value = `Dear Sales Team,

I am interested in requesting a quotation for your product: ${product}. 
Could you kindly provide the pricing details, packaging options, and shipping information?

Thank you in advance for your assistance.

Best regards,
[Your Name]`;
    }
  }
});

// === INIT SLIDERS ===
initSlider(".why-track", ".why-slider .arrow.left", ".why-slider .arrow.right");
initSlider(".product-track", ".product-slider .arrow.left", ".product-slider .arrow.right");
