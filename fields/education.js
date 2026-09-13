/* ================= READING PROGRESS ================= */

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


const revealObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "active"
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


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* ================= SEARCH ================= */

const searchInput =
    document.getElementById("searchInput");


const channelCards =
    document.querySelectorAll(".channel-card");


searchInput.addEventListener(
    "input",
    () => {

        const query =
            searchInput.value
                .toLowerCase()
                .trim();


        channelCards.forEach((card) => {

            const text =
                card.textContent.toLowerCase();


            if (text.includes(query)) {

                card.classList.remove(
                    "hidden"
                );

            } else {

                card.classList.add(
                    "hidden"
                );

            }

        });

    }
);


/* ================= CTRL + K SEARCH ================= */

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

            channelCards.forEach((card) => {

                card.classList.remove(
                    "hidden"
                );

            });

            searchInput.blur();

        }

    }
);