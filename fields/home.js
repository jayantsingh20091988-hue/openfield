/* =========================================================
   OPENFIELD — ADVANCED INTERACTIONS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       YEAR
    ===================================================== */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =====================================================
       READING PROGRESS
    ===================================================== */

    const progressBar =
        document.getElementById("progressBar");

    const updateProgress = () => {

        const scrollTop =
            window.scrollY;

        const pageHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const progress =
            pageHeight > 0
                ? (scrollTop / pageHeight) * 100
                : 0;

        if (progressBar) {
            progressBar.style.width =
                `${progress}%`;
        }

    };

    window.addEventListener(
        "scroll",
        updateProgress,
        { passive: true }
    );

    updateProgress();


    /* =====================================================
       REVEAL ANIMATIONS
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        element => revealObserver.observe(element)
    );


    /* =====================================================
       STAGGER CARD ANIMATIONS
    ===================================================== */

    document
        .querySelectorAll(
            ".fields-grid .field-card, .audience-grid .audience-card"
        )
        .forEach((card, index) => {

            card.style.transitionDelay =
                `${(index % 3) * 70}ms`;

        });


    /* =====================================================
       THEME SWITCH
    ===================================================== */

    const themeButton =
        document.getElementById("themeButton");

    const savedTheme =
        localStorage.getItem("openfield-theme");

    if (savedTheme === "light") {
        document.body.classList.add("light");
    }


    const updateThemeIcon = () => {

        if (!themeButton) return;

        themeButton.textContent =
            document.body.classList.contains("light")
                ? "☀"
                : "◐";

    };

    updateThemeIcon();


    themeButton?.addEventListener(
        "click",
        () => {

            document.body.classList.toggle("light");

            const isLight =
                document.body.classList.contains("light");

            localStorage.setItem(
                "openfield-theme",
                isLight
                    ? "light"
                    : "dark"
            );

            updateThemeIcon();

            showToast(
                isLight
                    ? "Light mode enabled"
                    : "Dark mode enabled"
            );

        }
    );


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuButton =
        document.getElementById("menuButton");

    const mobileMenu =
        document.getElementById("mobileMenu");


    menuButton?.addEventListener(
        "click",
        () => {

            mobileMenu?.classList.toggle(
                "active"
            );

        }
    );


    document
        .querySelectorAll(".mobile-menu a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    mobileMenu?.classList.remove(
                        "active"
                    );

                }
            );

        });


    /* =====================================================
       SEARCH OVERLAY
    ===================================================== */

    const searchButton =
        document.getElementById("searchButton");

    const searchOverlay =
        document.getElementById("searchOverlay");

    const searchClose =
        document.getElementById("searchClose");

    const siteSearch =
        document.getElementById("siteSearch");

    const searchResults =
        document.getElementById("searchResults");


    const searchData = [

        {
            title: "3D, VFX & Digital Creation",
            type: "FIELD",
            description: "3D, animation, VFX and Blender",
            link: "vfx.html"
        },

        {
            title: "Game Development & Interactive Simulation",
            type: "FIELD",
            description: "Games and interactive simulations with Godot",
            link: "godot.html"
        },

        {
            title: "Local AI",
            type: "FIELD",
            description: "Run AI models locally with Ollama",
            link: "ollama.html"
        },

        {
            title: "Electronics & PCB Design",
            type: "FIELD",
            description: "Circuit and PCB design with KiCad",
            link: "kicad.html"
        },

        {
            title: "Multimedia Creation & Editing",
            type: "FIELD",
            description: "Image, video and audio editing",
            link: "editing.html"
        },

        {
            title: "Physics & Simulation",
            type: "FIELD",
            description: "Physics, simulation and computational science",
            link: "physics.html"
        },

        {
            title: "Student Learning Hub",
            type: "RESOURCE",
            description: "Learning channels and educational resources",
            link: "education.html"
        }

    ];


    const openSearch = () => {

        searchOverlay?.classList.add("active");

        setTimeout(
            () => siteSearch?.focus(),
            150
        );

    };


    const closeSearch = () => {

        searchOverlay?.classList.remove(
            "active"
        );

        if (siteSearch) {
            siteSearch.value = "";
        }

        renderSearchResults("");

    };


    searchButton?.addEventListener(
        "click",
        openSearch
    );


    searchClose?.addEventListener(
        "click",
        closeSearch
    );


    searchOverlay?.addEventListener(
        "click",
        event => {

            if (event.target === searchOverlay) {
                closeSearch();
            }

        }
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();

                openSearch();

            }


            if (event.key === "Escape") {
                closeSearch();
            }

        }
    );


    function renderSearchResults(query) {

        if (!searchResults) return;

        const cleanQuery =
            query.trim().toLowerCase();


        if (!cleanQuery) {

            searchResults.innerHTML =
                "<p>Start typing to search...</p>";

            return;

        }


        const matches =
            searchData.filter(item =>

                `${item.title} ${item.description} ${item.type}`
                    .toLowerCase()
                    .includes(cleanQuery)

            );


        if (!matches.length) {

            searchResults.innerHTML = `
                <p>
                    No results found. Try another keyword.
                </p>
            `;

            return;

        }


        searchResults.innerHTML =
            matches.map(item => `

                <a
                    href="${item.link}"
                    class="search-result"
                >

                    <small>
                        ${item.type}
                    </small>

                    <strong>
                        ${item.title}
                    </strong>

                    <span>
                        ${item.description}
                    </span>

                </a>

            `).join("");

    }


    siteSearch?.addEventListener(
        "input",
        event => {

            renderSearchResults(
                event.target.value
            );

        }
    );


    /* =====================================================
       FIELD SEARCH
    ===================================================== */

    const fieldSearch =
        document.getElementById("fieldSearch");

    const fields =
        document.querySelectorAll(".field-card");

    const visibleCount =
        document.getElementById("visibleCount");

    const noResults =
        document.getElementById("noResults");


    fieldSearch?.addEventListener(
        "input",
        event => {

            const query =
                event.target.value
                    .trim()
                    .toLowerCase();

            let count = 0;


            fields.forEach(card => {

                const searchable =
                    (
                        card.dataset.name ||
                        card.innerText
                    ).toLowerCase();


                const match =
                    searchable.includes(query);


                card.style.display =
                    match
                        ? ""
                        : "none";


                if (match) {
                    count++;
                }

            });


            if (visibleCount) {
                visibleCount.textContent = count;
            }


            if (noResults) {

                noResults.style.display =
                    count === 0
                        ? "block"
                        : "none";

            }

        }
    );


    /* =====================================================
       ANIMATED COUNTERS
    ===================================================== */

    const counters =
        document.querySelectorAll(".counter");


    const counterObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) return;

                    animateCounter(
                        entry.target
                    );

                    counterObserver.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: .6
            }
        );


    counters.forEach(
        counter =>
            counterObserver.observe(counter)
    );


    function animateCounter(element) {

        const target =
            Number(
                element.dataset.target
            );

        const suffix =
            element.dataset.suffix || "";


        const duration = 1200;

        const startTime =
            performance.now();


        const update = currentTime => {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );


            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    4
                );


            const value =
                Math.floor(
                    eased * target
                );


            element.textContent =
                value + suffix;


            if (progress < 1) {

                requestAnimationFrame(update);

            } else {

                element.textContent =
                    target + suffix;

            }

        };


        requestAnimationFrame(update);

    }


    /* =====================================================
       3D CARD TILT
    ===================================================== */

    const tiltCards =
        document.querySelectorAll(".tilt-card");


    tiltCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                if (
                    window.innerWidth < 900
                ) return;


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) / centerY) * -4;


                const rotateY =
                    ((x - centerX) / centerX) * 4;


                card.style.transform = `
                    perspective(900px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-4px)
                `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });


    /* =====================================================
       MAGNETIC BUTTONS
    ===================================================== */

    const magneticElements =
        document.querySelectorAll(".magnetic");


    magneticElements.forEach(element => {

        element.addEventListener(
            "mousemove",
            event => {

                if (
                    window.innerWidth < 800
                ) return;


                const rect =
                    element.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;


                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;


                element.style.transform =
                    `translate(${x * .12}px, ${y * .12}px)`;

            }
        );


        element.addEventListener(
            "mouseleave",
            () => {

                element.style.transform =
                    "";

            }
        );

    });


    /* =====================================================
       CURSOR SPOTLIGHT
    ===================================================== */

    const cursorGlow =
        document.querySelector(".cursor-glow");


    if (
        cursorGlow &&
        window.matchMedia("(pointer:fine)").matches
    ) {

        window.addEventListener(
            "pointermove",
            event => {

                cursorGlow.style.left =
                    `${event.clientX}px`;

                cursorGlow.style.top =
                    `${event.clientY}px`;

            },
            { passive: true }
        );

    }


    /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const id =
                        link.getAttribute("href");


                    if (
                        !id ||
                        id === "#"
                    ) return;


                    const target =
                        document.querySelector(id);


                    if (!target) return;


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        });


    /* =====================================================
       TOP BUTTON
    ===================================================== */

    const topButton =
        document.getElementById("topButton");


    topButton?.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    /* =====================================================
       FEEDBACK FORM
    ===================================================== */

    const feedbackForm =
        document.getElementById("feedbackForm");

    const formMessage =
        document.getElementById("formMessage");


    feedbackForm?.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const formData =
                new FormData(feedbackForm);


            const name =
                formData.get("name") ||
                "Anonymous visitor";


            const rating =
                formData.get("rating");


            const favorite =
                formData.get("favorite");


            const usefulness =
                formData.get("usefulness");


            const liked =
                formData.get("liked") ||
                "Not provided";


            const improve =
                formData.get("improve") ||
                "Not provided";


            const suggestion =
                formData.get("suggestion") ||
                "No tool suggested";


            const suggestionReason =
                formData.get("suggestionReason") ||
                "Not provided";


            const extra =
                formData.get("extra") ||
                "Not provided";


            const subject =
                encodeURIComponent(
                    "OpenField — Website Feedback"
                );


            const body = encodeURIComponent(

`Hello Navneet,

Here is my feedback for OpenField.

Name:
${name}

Overall Rating:
${rating}/5

Most Interesting Field:
${favorite}

Website Usefulness:
${usefulness}

What I liked:
${liked}

What should be improved:
${improve}

Suggested Free/Open-Source Tool:
${suggestion}

Why it should be added:
${suggestionReason}

Anything else:
${extra}


Sent through the OpenField website.`

            );


            const mailto =
                `mailto:jayantsingh20091988@gmail.com?subject=${subject}&body=${body}`;


            window.location.href =
                mailto;


            if (formMessage) {

                formMessage.style.display =
                    "block";

                formMessage.textContent =
                    "Your email app should now open with the feedback prepared.";

            }


            showToast(
                "Feedback prepared!"
            );

        }
    );


    /* =====================================================
       TOAST
    ===================================================== */

    window.showToast =
        showToast;


    function showToast(message) {

        const toast =
            document.getElementById("toast");

        const toastText =
            document.getElementById("toastText");


        if (!toast) return;


        if (toastText) {
            toastText.textContent =
                message;
        }


        toast.classList.add("active");


        clearTimeout(
            window.openFieldToast
        );


        window.openFieldToast =
            setTimeout(
                () => {

                    toast.classList.remove(
                        "active"
                    );

                },
                2500
            );

    }


    /* =====================================================
       IMAGELESS PARALLAX
    ===================================================== */

    const heroVisual =
        document.querySelector(".hero-visual");


    if (heroVisual) {

        window.addEventListener(
            "scroll",
            () => {

                const scroll =
                    window.scrollY;


                if (scroll < 900) {

                    heroVisual.style.transform =
                        `translateY(${scroll * .08}px)`;

                }

            },
            { passive: true }
        );

    }


    /* =====================================================
       DYNAMIC FIELD CARD GLOW
    ===================================================== */

    document
        .querySelectorAll(".field-card")
        .forEach(card => {

            card.addEventListener(
                "mouseenter",
                () => {

                    card.style.setProperty(
                        "--mouse-active",
                        "1"
                    );

                }
            );

            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.setProperty(
                        "--mouse-active",
                        "0"
                    );

                }
            );

        });


    /* =====================================================
       KEYBOARD SHORTCUT HELP
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "/" &&
                document.activeElement.tagName !== "INPUT" &&
                document.activeElement.tagName !== "TEXTAREA"
            ) {

                event.preventDefault();

                openSearch();

            }

        }
    );


});
// ================================
// FOUNDER SECTION INTERACTION
// ================================

const founderSection = document.querySelector(".founder-section");

if (founderSection) {

    // Reveal animation when section enters the screen
    const founderObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    founderSection.classList.add("founder-visible");
                }

            });

        },
        {
            threshold: 0.2
        }
    );

    founderObserver.observe(founderSection);


    // Subtle mouse movement effect
    founderSection.addEventListener("mousemove", (event) => {

        const rect = founderSection.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const moveX = (x / rect.width - 0.5) * 8;
        const moveY = (y / rect.height - 0.5) * 8;

        founderSection.style.transform =
            `translateY(-6px) rotateX(${-moveY}deg) rotateY(${moveX}deg)`;

    });


    founderSection.addEventListener("mouseleave", () => {

        founderSection.style.transform =
            "translateY(0) rotateX(0) rotateY(0)";

    });

}