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
  // 2. Citat- och visionskarusell (mjuk övergång utan layout-hopp)
  // -------------------------------------------------------------------------
  const slides = document.querySelectorAll('.quote-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const carouselContainer = document.getElementById('quoteCarousel') || document.querySelector('.quote-carousel');

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
      const isActive = idx === currentSlide;
      slide.classList.toggle('active', isActive);
      slide.setAttribute('aria-hidden', !isActive);
    });

    dots.forEach((dot, idx) => {
      const isActive = idx === currentSlide;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-current', isActive ? 'true' : 'false');
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
      const targetIdx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
      showSlide(targetIdx);
      startAutoSlide();
    });

    // Tillgänglighet: navigera med Enter/Mellanslag på prickar
    dot.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        dot.click();
      }
    });
  });

  // Pausa automatisk växling vid hover eller fokus så att texten inte byts mitt i läsningen
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', stopAutoSlide);
    carouselContainer.addEventListener('mouseleave', startAutoSlide);
    carouselContainer.addEventListener('focusin', stopAutoSlide);
    carouselContainer.addEventListener('focusout', startAutoSlide);

    // Tangentbordsnavigering med piltangenter (Vänster/Höger)
    carouselContainer.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        showSlide(currentSlide - 1);
        startAutoSlide();
      } else if (e.key === 'ArrowRight') {
        showSlide(currentSlide + 1);
        startAutoSlide();
      }
    });

    // Touch/swipe-stöd på mobila enheter
    let touchStartX = 0;
    let touchEndX = 0;

    carouselContainer.addEventListener('touchstart', (e) => {
      if (e.changedTouches && e.changedTouches[0]) {
        touchStartX = e.changedTouches[0].screenX;
      }
      stopAutoSlide();
    }, { passive: true });

    carouselContainer.addEventListener('touchend', (e) => {
      if (e.changedTouches && e.changedTouches[0]) {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 40) {
          if (diff < 0) {
            showSlide(currentSlide + 1); // Svep vänster -> nästa
          } else {
            showSlide(currentSlide - 1); // Svep höger -> föregående
          }
        }
      }
      startAutoSlide();
    }, { passive: true });
  }

  // Pausa när webbläsarfliken inte är aktiv
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoSlide();
    } else {
      startAutoSlide();
    }
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
      tag: 'PROJEKT 1 • VIDEOREDIGERING & TIKTOK',
      title: 'Mina Videor – Klippning, Musik & Berättande',
      content: `
        <p>Jag gillar att redigera videor och ge små ögonblick en egen känsla. På min TikTok delar jag mina videor – ett kreativt sätt att testa idéer och utveckla mitt sätt att berätta med rörlig bild.</p>
        <h4>Det jag gillar med redigeringen</h4>
        <ul>
          <li><strong>Klippning:</strong> Att välja ut ögonblick och sätta ihop dem i en ordning och ett tempo som gör videon intressant att följa.</li>
          <li><strong>Musik:</strong> Att hitta ljud och musik som passar känslan och låta klippen samspela med rytmen.</li>
          <li><strong>Berättande:</strong> Att fånga en stämning eller en liten historia, även i ett kort format.</li>
        </ul>
        <h4>Från intresse till digital marknadsföring</h4>
        <p>Videoredigeringen ger mig utrymme att utveckla min kreativitet och känsla för innehåll. Det vill jag ta med mig till utbildningen på IHM och framtida arbete med sociala medier, där bild, ljud och ett tydligt budskap behöver fungera tillsammans.</p>
        <p><a href="https://www.tiktok.com/@melaniiemunoz" target="_blank" rel="noopener noreferrer" class="btn-primary">Se mina videor på TikTok ↗</a></p>
      `
    },
    case2: {
      tag: 'PROJEKT 2 • MIN PERSONLIGA HEMSIDA',
      title: 'Min Portfolio – Från Första Intryck Till Kontakt',
      content: `
        <p>Min hemsida samlar vem jag är, vad jag studerar och vilka erfarenheter jag tar med mig in i digital marknadsföring. Målet är att ge potentiella praktikgivare, arbetsgivare och samarbetspartner en tydlig bild av mig och en enkel väg till kontakt.</p>
        <h4>Design – personlig och enhetlig</h4>
        <p>Jag valde varma beige- och espressotoner för ett lugnt och välkomnande intryck. Dekorativa rubriker kombineras med en enkel brödtext för att balansera personlighet och läsbarhet. Bilder på mig gör presentationen mer personlig, medan luft mellan avsnitten hjälper innehållet att komma fram.</p>
        <h4>Struktur – lätt att hitta rätt</h4>
        <p>Sidan börjar med en kort presentation och knappar till projekt och kontakt. Därefter följer information om mig, mina erfarenheter och min utbildning, följt av projekt och kontaktuppgifter. Menyn gör det enkelt att gå direkt till ett avsnitt, och layouten anpassas till både mobil och dator.</p>
        <h4>Innehåll – en bild av mig och min utveckling</h4>
        <p>Jag lyfter utbildningen till Digital Marketing Specialist på IHM och visar hur min bakgrund inom försäljning och service kan bli en styrka i framtida marknadsföringsarbete. Korta personliga texter om sport och videoredigering ger också en bild av mina intressen. Projekten samlar exempel på det jag vill visa och utveckla.</p>
        <h4>Kontakt – från intresse till samtal</h4>
        <p>En tydlig kontaktknapp i menyn och en knapp i introduktionen leder till kontaktavsnittet. Där går det att klicka på mejladressen för att skriva ett mejl och LinkedIn-loggan för att besöka min profil. Kontaktikonerna ger visuell respons när man pekar på dem, och större tryckytor gör dem enklare att använda på mobilen.</p>
        <h4>Vad jag tar med mig</h4>
        <p>Arbetet med hemsidan har gett mig möjlighet att koppla ihop målgrupp, budskap och visuell presentation. Jag tar med mig hur tydliga prioriteringar och enkla kontaktvägar kan göra en portfolio mer användbar – kunskaper jag vill utveckla vidare inom digital marknadsföring.</p>
      `
    },
    case3: {
      tag: 'PROJEKT 3 • FRAMTIDA PROJEKT INOM SPORTMEDIA',
      title: 'Drömprojekt – Bakom Kulisserna i Sportens Värld',
      content: `
        <p>Mitt drömprojekt är att följa ett lag under en säsong och skapa en videoserie som visar mer än bara resultaten. Jag vill fånga nervositeten före match, skratten på träningen och människorna bakom tröjnumren. Det här är en framtida idé som jag vill förverkliga när jag arbetar inom sport och media.</p>
        <h4>Idén – närmare laget</h4>
        <p>Serien skulle bestå av korta videor för TikTok och Instagram, där fansen får följa med bakom kulisserna. Målet är att skapa en personlig och rolig inblick i lagets vardag som både engagerade supportrar och nya följare kan uppskatta.</p>
        <ul>
          <li><strong>En dag med en spelare:</strong> Korta intervjuer, rutiner och personliga frågor som låter publiken lära känna personen bakom sporten.</li>
          <li><strong>Matchdagen:</strong> Förberedelser, stämningen på arenan och reaktionerna efter slutsignalen.</li>
          <li><strong>Fansens frågor:</strong> Följarnas frågor och önskemål får vara med och forma kommande avsnitt.</li>
        </ul>
        <h4>Min roll</h4>
        <p>Jag skulle vilja vara med från idé och planering till filmning, redigering och publicering. Här får jag kombinera mitt sportintresse med det jag gillar med video: klippning, musik och att hitta de små ögonblick som gör en berättelse levande.</p>
        <h4>Så vill jag ta mig dit</h4>
        <p>Ett första steg skulle kunna vara att kontakta en lokal förening och föreslå en liten pilotserie, i samarbete med laget och med tillstånd att filma och publicera. Kunskaperna från IHM kan hjälpa mig att välja målgrupp, planera innehåll och följa upp tittartid, kommentarer och delningar för att utveckla nästa video.</p>
        <h4>Vad jag vill uppnå</h4>
        <p>Jag vill skapa innehåll som får människor att känna sig närmare laget och vilja följa med till nästa match. Samtidigt skulle projektet ge mig praktisk erfarenhet av innehållsproduktion och ett konkret steg mot att arbeta med sportmedia.</p>
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
  // 6. Aktiv länk i menyn vid scrollning (optimerad med requestAnimationFrame)
  // -------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  let scrollTicking = false;

  function updateActiveNav() {
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
  }

  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        updateActiveNav();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });
});
