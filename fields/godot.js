/* =====================================
   READING PROGRESS
===================================== */

const progressBar =
    document.getElementById("progressBar");

window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const pageHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const percentage =
        (scrollTop / pageHeight) * 100;

    progressBar.style.width =
        percentage + "%";

});


/* =====================================
   BACK TO TOP
===================================== */

const topBtn =
    document.getElementById("topBtn");

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


/* =====================================
   DARK / LIGHT MODE
===================================== */

const themeBtn =
    document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const light =
        document.body.classList.contains("light");

    if (light) {

        themeBtn.textContent =
            "🌙 Dark Mode";

    } else {

        themeBtn.textContent =
            "☀️ Light Mode";

    }

});


/* =====================================
   SCROLL REVEAL
===================================== */

const sections =
    document.querySelectorAll(".reveal");

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(
                        entry.target
                    );

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


/* =====================================
   SEARCH
===================================== */

const searchInput =
    document.getElementById("searchInput");

const searchable =
    document.querySelectorAll(
        "main section"
    );


searchInput.addEventListener(
    "input",
    () => {

        const query =
            searchInput.value
                .toLowerCase()
                .trim();


        searchable.forEach(section => {

            const text =
                section.textContent
                    .toLowerCase();


            if (query === "") {

                section.style.display = "";

                section.classList.remove(
                    "search-match"
                );

            }

            else if (
                text.includes(query)
            ) {

                section.style.display = "";

                section.classList.add(
                    "search-match"
                );

            }

            else {

                section.style.display =
                    "none";

                section.classList.remove(
                    "search-match"
                );

            }

        });

    }
);


/* =====================================
   CTRL + K
===================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            searchInput.focus();

        }

    }
);


/* =====================================
   ESCAPE = CLEAR SEARCH
===================================== */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            searchInput.value = "";

            searchInput.dispatchEvent(
                new Event("input")
            );

            searchInput.blur();

        }

    }
);


/* =====================================
   FAQ ANIMATION
===================================== */

const faqs =
    document.querySelectorAll("details");

faqs.forEach(faq => {

    faq.addEventListener(
        "toggle",
        () => {

            if (faq.open) {

                faq.style.borderColor =
                    "#478cbf";

            } else {

                faq.style.borderColor =
                    "";
            }

        }
    );

});