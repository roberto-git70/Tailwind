
import './style.css';
import { createIcons, Moon, Sun, User, Facebook, Instagram, Linkedin, SquareX,
         Palette, MonitorSmartphone, ShoppingCart, Rocket,
         ChevronDown, Check, ArrowRight, ArrowUp, Mail, Phone, Zap,
         Layout, Figma, MousePointerClick, Users, Layers, Smartphone,
         Code, Gauge, Globe, Package, CreditCard, TrendingUp,
         Sparkles, Minimize, FileCode, Code2, Braces, Wind, Grid3x3,
         LayoutTemplate, GitBranch, CheckCircle2, X, AlertCircle, CheckCircle, Send, MapPin, Shield } from 'https://unpkg.com/lucide@latest/dist/esm/lucide.js';

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
  initContactForm();
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
      LayoutTemplate, GitBranch, CheckCircle2, X, AlertCircle, CheckCircle, Send, MapPin, Shield
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
        LayoutTemplate, GitBranch, CheckCircle2, X, AlertCircle, CheckCircle, Send, MapPin, Shield
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

/* =====================================================
   CONTACT FORM - Validazione e invio
   ===================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const messageDiv = document.getElementById('formMessage');

  if (!form || !messageDiv) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Raccogli i dati del form
    const formData = {
      nome: document.getElementById('nome').value.trim(),
      cognome: document.getElementById('cognome').value.trim(),
      email: document.getElementById('email').value.trim(),
      telefono: document.getElementById('telefono').value.trim(),
      servizio: document.getElementById('servizio').value,
      messaggio: document.getElementById('messaggio').value.trim(),
      privacy: document.getElementById('privacy').checked
    };

    // Validazione campi
    if (!formData.nome || !formData.cognome || !formData.email || !formData.messaggio) {
      showMessage('error', 'Compila tutti i campi obbligatori');
      return;
    }

    // Validazione email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showMessage('error', 'Inserisci un indirizzo email valido');
      return;
    }

    // Validazione privacy
    if (!formData.privacy) {
      showMessage('error', 'Devi accettare la privacy policy per continuare');
      return;
    }

    // Mostra stato di caricamento
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.querySelector('span').textContent;
    submitBtn.disabled = true;
    submitBtn.querySelector('span').textContent = 'Invio in corso...';
    submitBtn.classList.add('opacity-75', 'cursor-not-allowed');

    try {
      // Ottieni token reCAPTCHA v3
      const recaptchaToken = await getRecaptchaToken();

      // Invia a Web3Forms
      await sendToWeb3Forms(formData, recaptchaToken);

      // Successo
      showMessage('success', 'Messaggio inviato con successo! Ti risponderemo il prima possibile.');
      form.reset();

    } catch (error) {
      // Errore
      console.error('Errore invio form:', error);
      showMessage('error', error.message || 'Si è verificato un errore. Riprova più tardi o contattaci via email.');

    } finally {
      // Ripristina il pulsante
      submitBtn.disabled = false;
      submitBtn.querySelector('span').textContent = originalBtnText;
      submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
    }
  });

  // Funzione per mostrare messaggi
  function showMessage(type, text) {
    messageDiv.className = 'mb-6 p-4 rounded-lg flex items-start gap-3 animate-in slide-in-from-top duration-300';

    if (type === 'success') {
      messageDiv.classList.add('bg-green-50', 'dark:bg-green-900/20', 'border', 'border-green-200', 'dark:border-green-800', 'text-green-800', 'dark:text-green-200');
      messageDiv.innerHTML = `
        <i data-lucide="check-circle" class="w-5 h-5 flex-shrink-0 mt-0.5"></i>
        <span class="text-sm font-medium">${text}</span>
      `;
    } else {
      messageDiv.classList.add('bg-red-50', 'dark:bg-red-900/20', 'border', 'border-red-200', 'dark:border-red-800', 'text-red-800', 'dark:text-red-200');
      messageDiv.innerHTML = `
        <i data-lucide="alert-circle" class="w-5 h-5 flex-shrink-0 mt-0.5"></i>
        <span class="text-sm font-medium">${text}</span>
      `;
    }

    // Ricrea le icone Lucide nel messaggio
    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Scroll al messaggio
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Auto-nascondi dopo 5 secondi (solo per successo)
    if (type === 'success') {
      setTimeout(() => {
        messageDiv.classList.add('hidden');
      }, 5000);
    }
  }

  // Ottieni token reCAPTCHA v3
  async function getRecaptchaToken() {
    return new Promise((resolve, reject) => {
      if (typeof grecaptcha === 'undefined') {
        reject(new Error('reCAPTCHA non caricato'));
        return;
      }

      grecaptcha.ready(() => {
        grecaptcha.execute('6LfF4zYeAAAAAFIENRpyuSsUn2iRZuDP7sTv8u24', { action: 'submit' })
          .then(token => resolve(token))
          .catch(err => reject(err));
      });
    });
  }

  // Invia dati a Web3Forms
  async function sendToWeb3Forms(data, recaptchaToken) {
    // IMPORTANTE: Registrati su https://web3forms.com per ottenere la tua Access Key
    // Sostituisci 'YOUR_ACCESS_KEY_HERE' con la tua chiave reale
    const accessKey = 'YOUR_ACCESS_KEY_HERE';

    if (accessKey === 'YOUR_ACCESS_KEY_HERE') {
      throw new Error('Configura la tua Access Key di Web3Forms in main.js');
    }

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: `${data.nome} ${data.cognome}`,
        email: data.email,
        phone: data.telefono || 'Non fornito',
        service: data.servizio || 'Non specificato',
        message: data.messaggio,
        'h-captcha-response': recaptchaToken, // Web3Forms accetta anche reCAPTCHA
        from_name: `${data.nome} ${data.cognome}`,
        subject: `Nuovo messaggio da ${data.nome} ${data.cognome}`
      })
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Errore durante l\'invio');
    }

    return result;
  }
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
