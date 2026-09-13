/* =========================================
   PHYSICS PAGE JAVASCRIPT
   ========================================= */


document.addEventListener("DOMContentLoaded", () => {


  /* =========================================
     READING PROGRESS
     ========================================= */

  const progressBar = document.getElementById("progressBar");

  function updateProgress() {

    const scrollTop =
      window.scrollY ||
      document.documentElement.scrollTop;

    const documentHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const progress =
      documentHeight > 0
        ? (scrollTop / documentHeight) * 100
        : 0;

    progressBar.style.width = `${progress}%`;
  }

  window.addEventListener("scroll", updateProgress);

  updateProgress();


  /* =========================================
     BACK TO TOP
     ========================================= */

  const topBtn = document.getElementById("topBtn");

  window.addEventListener("scroll", () => {

    if (window.scrollY > 600) {
      topBtn.classList.add("show");
    } else {
      topBtn.classList.remove("show");
    }

  });

  topBtn.addEventListener("click", () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });


  /* =========================================
     THEME TOGGLE
     ========================================= */

  const themeBtn = document.getElementById("themeBtn");

  const savedTheme =
    localStorage.getItem("physics-theme");

  if (savedTheme === "light") {
    document.body.classList.add("light");
    themeBtn.textContent = "🌙";
  }

  themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const isLight =
      document.body.classList.contains("light");

    localStorage.setItem(
      "physics-theme",
      isLight ? "light" : "dark"
    );

    themeBtn.textContent =
      isLight ? "🌙" : "☀️";

  });


  /* =========================================
     SEARCH
     ========================================= */

  const searchBtn =
    document.getElementById("searchBtn");

  const searchOverlay =
    document.getElementById("searchOverlay");

  const closeSearch =
    document.getElementById("closeSearch");

  const searchInput =
    document.getElementById("searchInput");


  function openSearch() {

    searchOverlay.classList.add("active");

    setTimeout(() => {
      searchInput.focus();
    }, 100);

  }


  function closeSearchBox() {

    searchOverlay.classList.remove("active");

    searchInput.value = "";

    clearHighlights();

  }


  searchBtn.addEventListener(
    "click",
    openSearch
  );

  closeSearch.addEventListener(
    "click",
    closeSearchBox
  );


  searchOverlay.addEventListener("click", (event) => {

    if (event.target === searchOverlay) {
      closeSearchBox();
    }

  });


  /* =========================================
     SEARCH CONTENT
     ========================================= */

  const searchableElements =
    document.querySelectorAll(
      "main h1, main h2, main h3, main h4, main p, main li, main td, main span"
    );


  searchInput.addEventListener("input", () => {

    const query =
      searchInput.value
        .trim()
        .toLowerCase();

    clearHighlights();

    if (query.length < 2) {
      return;
    }

    let firstMatch = null;

    searchableElements.forEach((element) => {

      const text =
        element.textContent.toLowerCase();

      if (text.includes(query)) {

        element.classList.add("search-match");

        if (!firstMatch) {
          firstMatch = element;
        }

      }

    });

    if (firstMatch) {

      firstMatch.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

    }

  });


  function clearHighlights() {

    document
      .querySelectorAll(".search-match")
      .forEach((element) => {
        element.classList.remove("search-match");
      });

  }


  /* =========================================
     KEYBOARD SHORTCUTS
     ========================================= */

  document.addEventListener("keydown", (event) => {

    if (
      (event.ctrlKey || event.metaKey) &&
      event.key.toLowerCase() === "k"
    ) {

      event.preventDefault();

      openSearch();

    }

    if (event.key === "Escape") {
      closeSearchBox();
    }

  });


  /* =========================================
     FAQ
     ========================================= */

  const faqItems =
    document.querySelectorAll(".faq-item");


  faqItems.forEach((item) => {

    const question =
      item.querySelector(".faq-question");

    const answer =
      item.querySelector(".faq-answer");


    question.addEventListener("click", () => {

      const isOpen =
        item.classList.contains("active");


      faqItems.forEach((otherItem) => {

        otherItem.classList.remove("active");

        const otherAnswer =
          otherItem.querySelector(".faq-answer");

        otherAnswer.style.maxHeight = null;

      });


      if (!isOpen) {

        item.classList.add("active");

        answer.style.maxHeight =
          answer.scrollHeight + "px";

      }

    });

  });


  /* =========================================
     SCROLL REVEAL
     ========================================= */

  const revealElements =
    document.querySelectorAll(
      ".info-card, .application-grid article, .person, .concept, .featured-tool, .project-card, .hardware-card, .career-grid div, .fact, .first-project, .alternative-grid div, .choice-grid div, .related-grid a, .roadmap-item"
    );


  revealElements.forEach((element) => {
    element.classList.add("reveal");
  });


  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.08
      }
    );


  revealElements.forEach((element) => {

    revealObserver.observe(element);

  });


  /* =========================================
     MOBILE MENU
     ========================================= */

  const menuBtn =
    document.getElementById("menuBtn");

  const navLinks =
    document.querySelector(".nav-links");


  menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("mobile-open");

  });


  navLinks.querySelectorAll("a").forEach((link) => {

    link.addEventListener("click", () => {

      navLinks.classList.remove("mobile-open");

    });

  });


  /* =========================================
     SEARCH MATCH STYLE
     ========================================= */

  const style =
    document.createElement("style");

  style.textContent = `
    .search-match {
      outline: 2px solid rgba(168, 85, 247, 0.65);
      outline-offset: 4px;
      border-radius: 6px;
    }

    @media (max-width: 700px) {
      .nav-links.mobile-open {
        display: flex;
        position: absolute;
        top: 72px;
        left: 0;
        right: 0;
        padding: 20px 24px;
        flex-direction: column;
        gap: 15px;
        background: rgba(7, 7, 12, 0.97);
        border-bottom: 1px solid rgba(255,255,255,0.1);
      }

      body.light .nav-links.mobile-open {
        background: rgba(245,247,251,0.98);
      }
    }
  `;

  document.head.appendChild(style);


  /* =========================================
     CLOSE SEARCH ON LINK CLICK
     ========================================= */

  document
    .querySelectorAll(".search-overlay a")
    .forEach((link) => {

      link.addEventListener(
        "click",
        closeSearchBox
      );

    });


});