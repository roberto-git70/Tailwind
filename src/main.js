
import './style.css';
import { createIcons, Moon, Sun, User, Facebook, Instagram, Linkedin, SquareX,
         Palette, MonitorSmartphone, ShoppingCart, Rocket,
         ChevronDown, Check, ArrowRight, ArrowUp, Mail, Phone, Zap,
         Layout, Figma, MousePointerClick, Users, Layers, Smartphone,
         Code, Gauge, Globe, Package, CreditCard, TrendingUp,
         Sparkles, Minimize, FileCode, Code2, Braces, Wind, Grid3x3,
         LayoutTemplate, GitBranch, CheckCircle2, X, AlertCircle, CheckCircle } from 'https://unpkg.com/lucide@latest/dist/esm/lucide.js';

/* =====================================================
   INIT APP
   ===================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initLucideIcons();
  initDarkMode();
  initMobileMenu();
  initDropdownMenus();
  initFadeInOnScroll();
  initNavbarShadow();
  initFAQAccordion();
  initScrollToTop();
});

/* =====================================================
   LUCIDE ICONS
   ===================================================== */
function initLucideIcons() {
  createIcons({
    icons: {
      Moon, Sun, User, Facebook, Instagram, Linkedin, SquareX,
      Palette, MonitorSmartphone, ShoppingCart, Rocket,
      ChevronDown, Check, ArrowRight, ArrowUp, Mail, Phone, Zap,
      Layout, Figma, MousePointerClick, Users, Layers, Smartphone,
      Code, Gauge, Globe, Package, CreditCard, TrendingUp,
      Sparkles, Minimize, FileCode, Code2, Braces, Wind, Grid3x3,
      LayoutTemplate, GitBranch, CheckCircle2, X, AlertCircle, CheckCircle
    }
  });

  // Esponi createIcons globalmente per compatibilità
  window.lucide = {
    createIcons: () => createIcons({
      icons: {
        Moon, Sun, User, Facebook, Instagram, Linkedin, SquareX,
        Palette, MonitorSmartphone, ShoppingCart, Rocket,
        ChevronDown, Check, ArrowRight, ArrowUp, Mail, Phone, Zap,
        Layout, Figma, MousePointerClick, Users, Layers, Smartphone,
        Code, Gauge, Globe, Package, CreditCard, TrendingUp,
        Sparkles, Minimize, FileCode, Code2, Braces, Wind, Grid3x3,
        LayoutTemplate, GitBranch, CheckCircle2, X, AlertCircle, CheckCircle
      }
    })
  };
}

/* =====================================================
   DARK MODE (tema scuro/chiaro)
   ===================================================== */
function initDarkMode() {
  const darkToggle = document.getElementById("dark-toggle");
  const html = document.documentElement;
  const savedTheme = localStorage.getItem("theme");

  // Imposta il tema salvato o usa dark come default
  if (savedTheme === "light") {
    html.classList.remove("dark");
  } else if (savedTheme === "dark") {
    html.classList.add("dark");
  } else {
    // Se non c'è tema salvato, usa la preferenza del sistema
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }

  if (darkToggle) {
    // Funzione per aggiornare le icone Lucide
    const updateIcons = () => {
      if (window.lucide) {
        setTimeout(() => {
          window.lucide.createIcons();
        }, 10);
      }
    };

    // Aggiorna icone all'avvio
    updateIcons();

    darkToggle.addEventListener("click", () => {
      html.classList.toggle("dark");

      const isDark = html.classList.contains("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");

      // Aggiorna le icone Lucide dopo il toggle
      updateIcons();
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
   SCROLL TO TOP BUTTON
   ===================================================== */
function initScrollToTop() {
  const btn = document.getElementById('scrollToTop');
  if (!btn) return;

  // Mostra/nascondi in base allo scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.remove('opacity-0', 'pointer-events-none');
      btn.classList.add('opacity-100');
    } else {
      btn.classList.add('opacity-0', 'pointer-events-none');
      btn.classList.remove('opacity-100');
    }
  });

  // Click per tornare su
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('#oturTrack');
  const prevBtn = document.querySelector('#oturPrev');
  const nextBtn = document.querySelector('#oturNext');

  const cards = track.querySelectorAll('article');
  if (!cards.length) return;

  const cardWidth = cards[0].getBoundingClientRect().width + 24;

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: cardWidth, behavior: 'smooth' });
  });
});
