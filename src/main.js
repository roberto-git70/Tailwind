import './style.css';

// =====================================================
// DARK MODE - VERSIONE DEFINITIVA (senza duplicati)
// =====================================================

const darkToggle = document.getElementById("dark-toggle");

// Leggi il tema salvato
const savedTheme = localStorage.getItem("theme");

// Imposta il tema iniziale (default = dark)
if (savedTheme === "light") {
  document.documentElement.classList.remove("dark");
} else {
  document.documentElement.classList.add("dark"); // default
}


// Toggle dark/light
if (darkToggle) {
  darkToggle.addEventListener("click", () => {
    const html = document.documentElement;
    html.classList.toggle("dark");

    if (html.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
      darkToggle.textContent = "🌙"; // icona notte
    } else {
      localStorage.setItem("theme", "light");
      darkToggle.textContent = "☀️"; // icona sole
    }
  });
}

// =====================================================
// MOBILE MENU
// =====================================================
const mobileBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileBtn && mobileMenu) {
  mobileBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// =====================================================
// DROPDOWN MENU (solo desktop)
// =====================================================
document.querySelectorAll('.has-dropdown').forEach((wrapper) => {
  const button = wrapper.querySelector('button');
  const dropdown = wrapper.querySelector('.dropdown');

  if (!button || !dropdown) return;

  button.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('hidden');
  });

  document.addEventListener('click', () => {
    dropdown.classList.add('hidden');
  });
});

// =====================================================
// FADE-IN ON SCROLL
// =====================================================
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.fade-in').forEach((el) => {
  el.classList.add(
    'opacity-0',
    'translate-y-4',
    'transition',
    'duration-700',
    'ease-out'
  );
  observer.observe(el);
});

// =====================================================
// NAVBAR SHADOW ON SCROLL
// =====================================================
const navbar = document.getElementById('navbar');

if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
      navbar.classList.add('shadow-lg');
    } else {
      navbar.classList.remove('shadow-lg');
    }
  });
}

// --- FAQ accordion ---
document.querySelectorAll(".faq-item").forEach(item => {
  item.addEventListener("click", () => {
    const answer = item.querySelector(".faq-answer");
    const icon = item.querySelector("[data-lucide='chevron-down']");

    const isOpen = !answer.classList.contains("hidden");

    // Chiudi tutte le altre FAQ
    document.querySelectorAll(".faq-answer").forEach(a => a.classList.add("hidden"));
    document.querySelectorAll("[data-lucide='chevron-down']").forEach(i => i.classList.remove("rotate-180"));

    // Se non era aperta → apri
    if (!isOpen) {
      answer.classList.remove("hidden");
      icon.classList.add("rotate-180");
    }
  });
});


