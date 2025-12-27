document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     LANGUAGE SWITCHER (FINAL VERSION – FULL PAGE)
  ===================================================== */

  const switcher = document.querySelector(".language-switcher");
  const btn = document.querySelector(".lang-btn");
  const menu = document.querySelector(".lang-menu");
  const flagImg = document.getElementById("currentFlag") 
               || document.getElementById("ls-current-flag");
  const langText = document.getElementById("currentLang") 
               || document.getElementById("ls-current-lang");

  /* ---------- SAFETY CHECK ---------- */
  if (!switcher || !btn || !menu) return;

  /* ---------- TRANSLATIONS (FULL PAGE) ---------- */
  const translations = {
    en: {
      company: "Tamimi Global Company Ltd.",
      desc: "If you are interested in our services, please contact us.",
      downloads: "Downloads",
      copyright: "© 2025 Tamimi Global Company Ltd."
    },

    ar: {
      company: "شركة التميمي العالمية المحدودة",
      desc: "إذا كنت مهتمًا بخدماتنا، يرجى التواصل معنا.",
      downloads: "التنزيلات",
      copyright: "© 2025 شركة التميمي العالمية"
    },

    hi: {
      company: "तमिमी ग्लोबल कंपनी लिमिटेड",
      desc: "यदि आप हमारी सेवाओं में रुचि रखते हैं तो संपर्क करें।",
      downloads: "डाउनलोड",
      copyright: "© 2025 तमिमी ग्लोबल कंपनी"
    },

    ur: {
      company: "تمیمی گلوبل کمپنی لمیٹڈ",
      desc: "اگر آپ ہماری خدمات میں دلچسپی رکھتے ہیں تو رابطہ کریں۔",
      downloads: "ڈاؤن لوڈز",
      copyright: "© 2025 تمیمی گلوبل کمپنی"
    },

    it: {
      company: "Tamimi Global Company Ltd.",
      desc: "Se sei interessato ai nostri servizi, contattaci.",
      downloads: "Download",
      copyright: "© 2025 Tamimi Global Company Ltd."
    }
  };

  /* =====================================================
     TOGGLE LANGUAGE MENU
  ===================================================== */
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    menu.classList.toggle("active");
    switcher.classList.toggle("open");
  });

  /* =====================================================
     APPLY LANGUAGE TO ENTIRE PAGE
  ===================================================== */
  function applyLanguage(lang) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    document.documentElement.dir =
      (lang === "ar" || lang === "ur") ? "rtl" : "ltr";

    localStorage.setItem("lang", lang);
  }

  /* =====================================================
     LANGUAGE SELECTION
  ===================================================== */
  menu.querySelectorAll("li").forEach(item => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();

      const lang = item.dataset.lang;
      const flag = item.dataset.flag;

      if (flagImg) {
        flagImg.src = `https://flagcdn.com/w20/${flag}.png`;
      }

      if (langText) {
        langText.textContent = lang.toUpperCase();
      }

      applyLanguage(lang);

      menu.classList.remove("active");
      switcher.classList.remove("open");
    });
  });

  /* =====================================================
     CLOSE MENU ON OUTSIDE CLICK
  ===================================================== */
  document.addEventListener("click", () => {
    menu.classList.remove("active");
    switcher.classList.remove("open");
  });

  /* =====================================================
     LOAD SAVED LANGUAGE
  ===================================================== */
  const savedLang = localStorage.getItem("lang") || "en";
  const savedItem = menu.querySelector(`[data-lang="${savedLang}"]`);
  if (savedItem) savedItem.click();


  /* =====================================================
     BACKGROUND IMAGE FADE SLIDER
  ===================================================== */
  const slides = document.querySelectorAll(".bg");
  let current = 0;

  if (slides.length > 0) {
    setInterval(() => {
      slides[current].classList.remove("active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("active");
    }, 3000);
  }


  /* =====================================================
     AUTO CAROUSEL (HOVER + TOUCH + SPEED)
  ===================================================== */
  const carousel = document.getElementById("carousel");
  const track = document.getElementById("track");

  if (carousel && track) {
    let speed = 0.6;
    let position = 0;
    let isPaused = false;
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    function animate() {
      if (!isPaused && !isDragging) {
        position -= speed;
        if (Math.abs(position) >= track.scrollWidth / 2) {
          position = 0;
        }
        track.style.transform = `translateX(${position}px)`;
      }
      requestAnimationFrame(animate);
    }

    carousel.addEventListener("mouseenter", () => isPaused = true);
    carousel.addEventListener("mouseleave", () => isPaused = false);

    carousel.addEventListener("touchstart", e => {
      isDragging = true;
      isPaused = true;
      startX = e.touches[0].clientX;
    });

    carousel.addEventListener("touchmove", e => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
      track.style.transform =
        `translateX(${position + (currentX - startX)}px)`;
    });

    carousel.addEventListener("touchend", () => {
      if (!isDragging) return;
      position += currentX - startX;
      isDragging = false;
      isPaused = false;
    });

    animate();
  }


  /* =====================================================
     SCROLL TO TOP BUTTON
  ===================================================== */
  const scrollBtn = document.getElementById("scrollTopBtn");

  if (scrollBtn) {
    window.addEventListener("scroll", () => {
      scrollBtn.style.display =
        window.scrollY > 300 ? "block" : "none";
    });

    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }


  /* =====================================================
     HAMBURGER MENU
  ===================================================== */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }


  /* =====================================================
     VISION / MISSION CARD SWITCH
  ===================================================== */
  const cards = document.querySelectorAll(".vm-card");
  let cardIndex = 0;

  if (cards.length > 0) {
    setInterval(() => {
      cards[cardIndex].classList.remove("active");
      cardIndex = (cardIndex + 1) % cards.length;
      cards[cardIndex].classList.add("active");
    }, 4000);
  }

});
