/**
 * Melanie Munoz - Personlig Portfolio
 * Interaktiv logik för mobilnavigering, citatkarusell, projektmodaler och kontaktformulär.
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // 1. Mobilmeny
  // -------------------------------------------------------------------------
  const navToggle = document.getElementById('mobileNavToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      navToggle.setAttribute('aria-label', isOpen ? 'Stäng meny' : 'Öppna meny');
    });

    // Stäng mobilmenyn vid klick på en länk
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // -------------------------------------------------------------------------
  // 2. Citat- och visionskarusell
  // -------------------------------------------------------------------------
  const slides = document.querySelectorAll('.quote-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');

  let currentSlide = 0;
  const totalSlides = slides.length;
  let autoSlideTimer = null;

  function showSlide(index) {
    if (totalSlides === 0) return;
    
    // Slå runt index
    if (index >= totalSlides) index = 0;
    if (index < 0) index = totalSlides - 1;
    currentSlide = index;

    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === currentSlide);
    });

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentSlide);
    });
  }

  function startAutoSlide() {
    stopAutoSlide();
    autoSlideTimer = setInterval(() => {
      showSlide(currentSlide + 1);
    }, 6500);
  }

  function stopAutoSlide() {
    if (autoSlideTimer) {
      clearInterval(autoSlideTimer);
      autoSlideTimer = null;
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      showSlide(currentSlide - 1);
      startAutoSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      showSlide(currentSlide + 1);
      startAutoSlide();
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const targetIdx = parseInt(e.target.getAttribute('data-index'), 10);
      showSlide(targetIdx);
      startAutoSlide();
    });
  });

  if (totalSlides > 0) {
    startAutoSlide();
  }

  // -------------------------------------------------------------------------
  // 3. Projektmodaler (Fördjupningar)
  // -------------------------------------------------------------------------
  const modalOverlay = document.getElementById('caseModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTag = document.getElementById('modalTag');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');

  const caseDetails = {
    case1: {
      tag: 'PROJEKT 1 • INFLUENCER MARKETING',
      title: 'Strategiska Influencer-partnerskap & Kampanjer',
      content: `
        <p>I denna fördjupning fokuseras på hur moderna varumärken kan bygga autentiskt förtroende och nå nya målgrupper genom noggrant utvalda ambassadörer och innehållsskapare.</p>
        <h4>Nyckelinsatser</h4>
        <ul>
          <li><strong>Målgruppsanalys & Matchning:</strong> Identifiera profiler vars värderingar och engagemang matchar varumärkets kärnbudskap.</li>
          <li><strong>Koncept & Briefing:</strong> Skapa kreativa ramverk som ger kreatören konstnärlig frihet samtidigt som varumärkets affärsmål uppfylls.</li>
          <li><strong>Mätning & ROI:</strong> Analys av räckvidd, klickfrekvens, engagemangsgrad och konverteringar.</li>
        </ul>
        <h4>Verktyg & Metoder</h4>
        <p>Google Analytics, Meta Business Suite, datadriven räckviddsanalys och kvalitativ tonalitetsgranskning.</p>
      `
    },
    case2: {
      tag: 'PROJEKT 2 • AI & TECH I MARKNADSFÖRING',
      title: 'AI-Drivna Strategier & Digital Automation',
      content: `
        <p>Undersökning och tillämpning av AI-teknologi och smarta automatiseringsflöden inom digital marknadsföring och kundresor.</p>
        <h4>Nyckelinsatser</h4>
        <ul>
          <li><strong>Prediktiv Analys & Segmentering:</strong> Använda AI-verktyg för att förstå kundbeteenden och förutse konsumtionstrender.</li>
          <li><strong>Skalbart Innehållsskapande:</strong> Effektivisera produktionen av copy, visuellt material och kampanjvarianter med bibehållen hög kvalitet.</li>
          <li><strong>Arbetsflöden & Automation:</strong> Automatisering av digitala nyhetsbrev och leadsgenerering.</li>
        </ul>
        <h4>Verktyg & Metoder</h4>
        <p>Generativa AI-modeller, prompt engineering, automatiserade marknadsföringsflöden och datavisualisering.</p>
      `
    },
    case3: {
      tag: 'PROJEKT 3 • SPORTMEDIA & KAMPANJER',
      title: 'Sportmedia, Storytelling & Målgruppsaktivering',
      content: `
        <p>Kombinationen av sportvärldens passion och puls med avancerad digital marknadsföringsstrategi för att bygga långsiktig publiklojalitet.</p>
        <h4>Nyckelinsatser</h4>
        <ul>
          <li><strong>Kanalöverskridande Storytelling:</strong> Skapa innehåll i realtid som fångar ögonblicken och engagerar fans före, under och efter matcher.</li>
          <li><strong>Digitala Samarbetsaktiveringar:</strong> Skapa mervärde för sponsorer och partners genom kreativa sociala medie-format.</li>
          <li><strong>Community-byggande:</strong> Interaktiva format som omröstningar, backstage-innehåll och exklusiva digitala upplevelser.</li>
        </ul>
        <h4>Verktyg & Metoder</h4>
        <p>Sociala medier-strategi (TikTok, Instagram, LinkedIn), videokoncept, live-bevakning och målgruppsdialog.</p>
      `
    }
  };

  document.querySelectorAll('.case-card').forEach(card => {
    card.addEventListener('click', () => {
      const caseKey = card.getAttribute('data-case');
      const data = caseDetails[caseKey];

      if (data && modalOverlay) {
        modalTag.textContent = data.tag;
        modalTitle.textContent = data.title;
        modalBody.innerHTML = data.content;
        modalOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });

    // Tillgänglighet: öppna med tangentbord (Enter eller Mellanslag)
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });

  // -------------------------------------------------------------------------
  // 4. Kontaktformulärshantering (Skickas till melanie.munoz0207@gmail.com)
  // -------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccessMessage');
  const formError = document.getElementById('formErrorMessage');
  const submitBtn = document.getElementById('contactSubmitBtn') || (contactForm ? contactForm.querySelector('button[type="submit"]') : null);

  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Dölj tidigare meddelanden
      if (formSuccess) formSuccess.style.display = 'none';
      if (formError) formError.style.display = 'none';

      // Honeypot för spamskydd (om en bot fyller i det dolda fältet)
      const honeyInput = document.getElementById('formHoney');
      if (honeyInput && honeyInput.value) {
        contactForm.reset();
        return;
      }

      const nameInput = document.getElementById('contactName');
      const emailInput = document.getElementById('contactEmail');
      const subjectInput = document.getElementById('contactSubject');
      const messageInput = document.getElementById('contactMessage');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const subject = subjectInput ? subjectInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      // Validera obligatoriska fält
      if (!name || !email || !message) {
        if (formError) {
          formError.textContent = 'Vänligen fyll i ditt namn, din e-postadress och ditt meddelande.';
          formError.style.display = 'block';
        }
        if (!name && nameInput) nameInput.focus();
        else if (!email && emailInput) emailInput.focus();
        else if (!message && messageInput) messageInput.focus();
        return;
      }

      // Validera e-postformat
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        if (formError) {
          formError.textContent = 'Vänligen ange en giltig e-postadress (t.ex. namn@foretag.se).';
          formError.style.display = 'block';
        }
        if (emailInput) emailInput.focus();
        return;
      }

      // Sätt laddningsläge på knappen
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 0.8s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10"></path>
        </svg>
        Skickar...
      `;
      submitBtn.disabled = true;

      try {
        const response = await fetch('https://formsubmit.co/ajax/melanie.munoz0207@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: name,
            email: email,
            _subject: subject ? `[Portfolio] ${subject}` : `Nytt meddelande från ${name} (Portfolio)`,
            _replyto: email,
            _template: 'table',
            _captcha: 'false',
            message: message
          })
        });

        const data = await response.json().catch(() => ({}));

        if (response.ok && (data.success === 'true' || data.success === true || !data.error)) {
          contactForm.reset();
          if (formSuccess) {
            formSuccess.style.display = 'block';
            setTimeout(() => {
              formSuccess.style.display = 'none';
            }, 8000);
          }
        } else {
          throw new Error((data && data.message) || 'Kunde inte skicka meddelandet.');
        }
      } catch (err) {
        console.error('Fel vid formulärinskickning:', err);
        if (formError) {
          formError.innerHTML = 'Något gick fel när meddelandet skulle skickas. Vänligen försök igen eller mejla direkt till <a href="mailto:melanie.munoz0207@gmail.com" style="color: inherit; text-decoration: underline;">melanie.munoz0207@gmail.com</a>.';
          formError.style.display = 'block';
        }
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  // -------------------------------------------------------------------------
  // 5. Till toppen-knapp
  // -------------------------------------------------------------------------
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // -------------------------------------------------------------------------
  // 6. Aktiv länk i menyn vid scrollning
  // -------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navItem = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

      if (navItem) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      }
    });
  });
});
