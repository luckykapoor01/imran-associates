document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     BACKGROUND SLIDESHOW
  ===================================================== */
  const slides = document.querySelectorAll(".bg");
  let current = 0;

  function changeBackground() {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  }

  /* Change image every 6 seconds */
  if (slides.length > 1) {
    setInterval(changeBackground, 6000);
  }

  /* =====================================================
     AUTO CAROUSEL (HOVER + TOUCH)
  ===================================================== */
  const carousel = document.getElementById("carousel");
  const track = document.getElementById("track");

  if (carousel && track) {
    let speed = 0.6;
    let position = 0;
    let paused = false;
    let startX = 0;
    let dragging = false;

    function animate() {
      if (!paused && !dragging) {
        position -= speed;
        if (Math.abs(position) >= track.scrollWidth / 2) {
          position = 0;
        }
        track.style.transform = `translateX(${position}px)`;
      }
      requestAnimationFrame(animate);
    }

    carousel.addEventListener("mouseenter", () => paused = true);
    carousel.addEventListener("mouseleave", () => paused = false);

    carousel.addEventListener("touchstart", e => {
      dragging = true;
      paused = true;
      startX = e.touches[0].clientX;
    });

    carousel.addEventListener("touchmove", e => {
      if (!dragging) return;
      const delta = e.touches[0].clientX - startX;
      track.style.transform = `translateX(${position + delta}px)`;
    });

    carousel.addEventListener("touchend", e => {
      const delta = e.changedTouches[0].clientX - startX;
      position += delta;
      dragging = false;
      paused = false;
    });

    animate();
  }

  /* =====================================================
     SCROLL TO TOP
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
     PROFESSIONAL HAMBURGER MENU ANIMATION
  ===================================================== */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const body = document.body;

  if (hamburger && navLinks) {

    const closeMenu = () => {
      hamburger.classList.remove("open");
      navLinks.classList.remove("active");
      body.classList.remove("no-scroll");
    };

    hamburger.addEventListener("click", (e) => {
      e.stopPropagation();
      hamburger.classList.toggle("open");
      navLinks.classList.toggle("active");
      body.classList.toggle("no-scroll");
    });

    /* Close menu when clicking a nav link */
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    /* Close menu on outside click */
    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) &&
          !navLinks.contains(e.target)) {
        closeMenu();
      }
    });

    /* Close menu on ESC key */
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    });
  }

  /* =====================================================
     VISION / MISSION CARD SWITCH
  ===================================================== */
  const cards = document.querySelectorAll(".vm-card");
  let index = 0;

  if (cards.length > 1) {
    setInterval(() => {
      cards[index].classList.remove("active");
      index = (index + 1) % cards.length;
      cards[index].classList.add("active");
    }, 4000);
  }

});

/* =====================================================
   PRELOADER (SHOW ONLY ON FIRST VISIT PER SESSION)
===================================================== */
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  const content = document.getElementById("main-content");

  if (!preloader || !content) return;

  const preloaderShown = sessionStorage.getItem("preloaderShown");

  if (!preloaderShown) {
    // First visit → show loader
    sessionStorage.setItem("preloaderShown", "true");

    setTimeout(() => {
      preloader.style.opacity = "0";

      setTimeout(() => {
        preloader.style.display = "none";
        content.style.display = "block";
      }, 800);

    }, 3500);

  } else {
    // Returning visit → skip loader
    preloader.style.display = "none";
    content.style.display = "block";
  }
});
