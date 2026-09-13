// ==========================================
// KiCad Field Page
// ==========================================


// Reading progress
const progressBar = document.getElementById("progressBar");

window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress =
        (scrollTop / documentHeight) * 100;

    progressBar.style.width = `${progress}%`;

});


// ==========================================
// Theme Toggle
// ==========================================

const themeBtn = document.getElementById("themeBtn");

const savedTheme = localStorage.getItem("kicad-theme");

if (savedTheme === "light") {
    document.body.classList.add("light");
    themeBtn.textContent = "🌙";
}

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const isLight =
        document.body.classList.contains("light");

    themeBtn.textContent =
        isLight ? "🌙" : "☀️";

    localStorage.setItem(
        "kicad-theme",
        isLight ? "light" : "dark"
    );

});


// ==========================================
// FAQ
// ==========================================

const faqQuestions =
    document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {

    question.addEventListener("click", () => {

        const item =
            question.parentElement;

        const wasActive =
            item.classList.contains("active");

        document
            .querySelectorAll(".faq-item")
            .forEach(other => {
                other.classList.remove("active");

                const icon =
                    other.querySelector(".faq-question span");

                if (icon) {
                    icon.textContent = "+";
                }
            });

        if (!wasActive) {

            item.classList.add("active");

            const icon =
                question.querySelector("span");

            if (icon) {
                icon.textContent = "−";
            }

        }

    });

});


// ==========================================
// Scroll Reveal
// ==========================================

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

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

revealElements.forEach(element => {
    revealObserver.observe(element);
});


// ==========================================
// Back To Top
// ==========================================

const backTop =
    document.getElementById("backTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {
        backTop.classList.add("show");
    } else {
        backTop.classList.remove("show");
    }

});

backTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// ==========================================
// Ctrl + K Search / Quick Navigation
// ==========================================

document.addEventListener("keydown", event => {

    if ((event.ctrlKey || event.metaKey) && event.key === "k") {

        event.preventDefault();

        const search =
            prompt("What do you want to explore?");

        if (!search) return;

        const query =
            search.toLowerCase().trim();

        const sections =
            document.querySelectorAll("section");

        let found = false;

        sections.forEach(section => {

            if (found) return;

            const text =
                section.innerText.toLowerCase();

            if (text.includes(query)) {

                section.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                found = true;
            }

        });

        if (!found) {
            alert("No matching section found.");
        }

    }

});


// ==========================================
// Keyboard shortcut: Home
// ==========================================

document.addEventListener("keydown", event => {

    if (event.key === "Home" && !event.ctrlKey) {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

});


// ==========================================
// Current year
// ==========================================

const year =
    new Date().getFullYear();

const footer =
    document.querySelector(".footer");

if (footer) {

    const yearText =
        document.createElement("small");

    yearText.textContent =
        `© ${year} OpenField`;

    yearText.style.color =
        "var(--muted)";

    yearText.style.display =
        "block";

    yearText.style.marginTop =
        "10px";

    footer.querySelector(".footer-inner > div")
        ?.appendChild(yearText);

}