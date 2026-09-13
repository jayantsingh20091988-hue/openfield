/* ========================================
   1. READING PROGRESS BAR
======================================== */

const progressBar = document.getElementById("progressBar");

window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        (scrollTop / documentHeight) * 100;

    progressBar.style.width = progress + "%";
});


/* ========================================
   2. BACK TO TOP BUTTON
======================================== */

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* ========================================
   3. DARK / LIGHT MODE
======================================== */

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    if (document.body.classList.contains("light")) {

        themeBtn.textContent = "🌙 Dark Mode";

    } else {

        themeBtn.textContent = "☀️ Light Mode";

    }

});


/* ========================================
   4. SCROLL REVEAL
======================================== */

const sections = document.querySelectorAll(
    "main section"
);

sections.forEach(section => {

    section.classList.add("reveal");

});

const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },
    {
        threshold: 0.12
    }
);

sections.forEach(section => {

    observer.observe(section);

});


/* ========================================
   5. SEARCH
======================================== */

const searchInput =
    document.getElementById("searchInput");

const searchableElements =
    document.querySelectorAll(
        "main section, main article"
    );

searchInput.addEventListener("input", () => {

    const query =
        searchInput.value
            .toLowerCase()
            .trim();

    searchableElements.forEach(element => {

        const text =
            element.textContent.toLowerCase();

        if (query === "") {

            element.style.display = "";

            element.classList.remove(
                "search-match"
            );

        }

        else if (text.includes(query)) {

            element.style.display = "";

            element.classList.add(
                "search-match"
            );

        }

        else {

            element.style.display = "none";

            element.classList.remove(
                "search-match"
            );

        }

    });

});


/* ========================================
   6. CTRL + K SEARCH SHORTCUT
======================================== */

document.addEventListener("keydown", event => {

    if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
    ) {

        event.preventDefault();

        searchInput.focus();

    }

});


/* ========================================
   7. SMOOTH ANCHOR SCROLL
======================================== */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(link => {

    link.addEventListener("click", event => {

        const target =
            document.querySelector(
                link.getAttribute("href")
            );

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});