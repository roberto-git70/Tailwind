
import './style.css';

/* =====================================================
   INIT APP
   ===================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initDarkMode();
  initMobileMenu();
  initDropdownMenus();
  initFadeInOnScroll();
  initNavbarShadow();
  initFAQAccordion();
});

/* =====================================================
   DARK MODE (tema scuro/chiaro)
   ===================================================== */
function initDarkMode() {
  const darkToggle = document.getElementById("dark-toggle");
  const html = document.documentElement;
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    html.classList.remove("dark");
  } else {
    html.classList.add("dark");
  }

  if (darkToggle) {
    darkToggle.textContent = html.classList.contains("dark") ? "🌙" : "☀️";
    darkToggle.setAttribute("aria-label", html.classList.contains("dark") ? "Tema scuro attivo" : "Tema chiaro attivo");

    darkToggle.addEventListener("click", () => {
      html.classList.toggle("dark");

      const isDark = html.classList.contains("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      darkToggle.textContent = isDark ? "🌙" : "☀️";
      darkToggle.setAttribute("aria-label", isDark ? "Tema scuro attivo" : "Tema chiaro attivo");
    });
  }
}

/* =====================================================
   MENU MOBILE
   ===================================================== */
function initMobileMenu() {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden');
      mobileBtn.setAttribute('aria-expanded', !isOpen);
    });
  }
}

/* =====================================================
   DROPDOWN MENU (solo desktop)
   ===================================================== */
function initDropdownMenus() {
  const wrappers = document.querySelectorAll('.has-dropdown');

  wrappers.forEach(wrapper => {
    const button = wrapper.querySelector('button');
    const dropdown = wrapper.querySelector('.dropdown');

    if (!button || !dropdown) return;

    button.addEventListener('click', (e) => {
      e.stopPropagation();

      document.querySelectorAll('.dropdown').forEach(d => {
        if (d !== dropdown) d.classList.add('hidden');
      });

      dropdown.classList.toggle('hidden');
    });
  });

  document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown').forEach(d => d.classList.add('hidden'));
  });
}

/* =====================================================
   FADE-IN SU SCROLL
   ===================================================== */
function initFadeInOnScroll() {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll('.fade-in').forEach(el => {
    el.classList.add(
      'opacity-0',
      'translate-y-4',
      'transition',
      'duration-700',
      'ease-out'
    );
    observer.observe(el);
  });
}

/* =====================================================
   NAVBAR - OMBRA ALLO SCROLL
   ===================================================== */
function initNavbarShadow() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;

      window.requestAnimationFrame(() => {
        navbar.classList.toggle('shadow-lg', window.scrollY > 10);
        ticking = false;
      });
    }
  });
}

/* =====================================================
   FAQ - ACCORDION
   ===================================================== */
function initFAQAccordion() {
  document.querySelectorAll(".faq-item").forEach(item => {
    item.addEventListener("click", () => {
      const answer = item.querySelector(".faq-answer");
      const icon = item.querySelector("[data-lucide='chevron-down']");

      if (!answer || !icon) return;

      const isOpen = !answer.classList.contains("hidden");

      document.querySelectorAll(".faq-answer").forEach(a =>
        a.classList.add("hidden")
      );
      document.querySelectorAll("[data-lucide='chevron-down']").forEach(i =>
        i.classList.remove("rotate-180")
      );

      if (!isOpen) {
        answer.classList.remove("hidden");
        icon.classList.add("rotate-180");
      }
    });
  });
}
