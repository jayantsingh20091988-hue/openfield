/* ================= PROGRESS BAR ================= */

const progressBar =
    document.getElementById("progressBar");


window.addEventListener("scroll", () => {

    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress =
        (scrollTop / documentHeight) * 100;

    progressBar.style.width =
        progress + "%";

});


/* ================= BACK TO TOP ================= */

const topBtn =
    document.getElementById("topBtn");


topBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* ================= THEME ================= */

const themeBtn =
    document.getElementById("themeBtn");


themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");


    if (
        document.body.classList.contains("light")
    ) {

        themeBtn.textContent =
            "🌙 Dark Mode";

    } else {

        themeBtn.textContent =
            "☀️ Light Mode";

    }

});


/* ================= SCROLL REVEAL ================= */

const revealElements =
    document.querySelectorAll(".reveal");


const observer =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "active"
                    );

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


revealElements.forEach((element) => {

    observer.observe(element);

});


/* ================= SEARCH ================= */

const searchInput =
    document.getElementById("searchInput");


const sections =
    document.querySelectorAll("main section");


searchInput.addEventListener(
    "input",
    () => {

        const query =
            searchInput.value
                .toLowerCase()
                .trim();


        sections.forEach((section) => {

            const text =
                section.textContent
                    .toLowerCase();


            if (
                query === "" ||
                text.includes(query)
            ) {

                section.style.display =
                    "";

            } else {

                section.style.display =
                    "none";

            }

        });

    }
);


/* ================= CTRL + K ================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            searchInput.focus();

        }

    }
);


/* ================= ESCAPE ================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Escape") {

            searchInput.value = "";

            sections.forEach((section) => {

                section.style.display = "";

            });

            searchInput.blur();

        }

    }
);


/* ================= FAQ ================= */

const faqButtons =
    document.querySelectorAll(
        ".faq-item button"
    );


faqButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            const item =
                button.parentElement;


            item.classList.toggle("open");


            const icon =
                button.querySelector("span");


            if (
                item.classList.contains("open")
            ) {

                icon.textContent = "−";

            } else {

                icon.textContent = "+";

            }

        }
    );

});