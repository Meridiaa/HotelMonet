/* =====================================================
   MONET HOTEL
   INTERACTIONS
===================================================== */


/* ================= NAVBAR ================= */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


/* ================= MOBILE MENU ================= */

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {

    mobileMenu.classList.toggle("active");

});


document.querySelectorAll(".mobile-menu a").forEach(link => {

    link.addEventListener("click", () => {

        mobileMenu.classList.remove("active");

    });

});


/* ================= BOOKING DATES ================= */

const checkin = document.getElementById("checkin");
const checkout = document.getElementById("checkout");

const today = new Date();

const formattedToday =
    today.toISOString().split("T")[0];

checkin.min = formattedToday;
checkout.min = formattedToday;


checkin.addEventListener("change", () => {

    if (!checkin.value) return;

    checkout.min = checkin.value;

    if (
        checkout.value &&
        checkout.value <= checkin.value
    ) {

        checkout.value = "";

    }

});


/* ================= TOAST ================= */

const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

let toastTimer;


function showToast(message) {

    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3500);

}


/* ================= BOOKING ================= */

const bookingForm =
    document.getElementById("bookingForm");

bookingForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const arrival = checkin.value;
    const departure = checkout.value;

    if (!arrival || !departure) {

        showToast(
            "Please select your check-in and check-out dates."
        );

        return;

    }

    if (departure <= arrival) {

        showToast(
            "Your check-out date needs to be after check-in."
        );

        return;

    }

    showToast(
        "Availability request received. Opening WhatsApp..."
    );

    setTimeout(() => {

        const guests =
            document.getElementById("guests").value;

        const message =
            `Hi MONET! I would like to check availability.\n\n` +
            `Check-in: ${arrival}\n` +
            `Check-out: ${departure}\n` +
            `Guests: ${guests}`;

        const whatsappURL =
            `https://wa.me/918160197878?text=${encodeURIComponent(message)}`;

        window.open(
            whatsappURL,
            "_blank"
        );

    }, 900);

});


/* ================= FAQ ================= */

const faqItems =
    document.querySelectorAll(".faq-item");


faqItems.forEach(item => {

    const question =
        item.querySelector(".faq-question");

    const answer =
        item.querySelector(".faq-answer");


    question.addEventListener("click", () => {

        const isActive =
            item.classList.contains("active");


        faqItems.forEach(otherItem => {

            otherItem.classList.remove("active");

            otherItem.querySelector(
                ".faq-answer"
            ).style.maxHeight = null;

        });


        if (!isActive) {

            item.classList.add("active");

            answer.style.maxHeight =
                answer.scrollHeight + "px";

        }

    });

});


/* ================= ROOM BUTTONS ================= */

document.querySelectorAll(".room-btn").forEach(button => {

    button.addEventListener("click", () => {

        showToast(
            "Room details are being prepared. Contact MONET on WhatsApp for availability."
        );

        setTimeout(() => {

            window.open(
                "https://wa.me/918160197878",
                "_blank"
            );

        }, 900);

    });

});


/* ================= IMAGE LAZY LOAD ================= */

const lazyImages =
    document.querySelectorAll("img[loading='lazy']");


if ("IntersectionObserver" in window) {

    const imageObserver =
        new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    const image = entry.target;

                    image.style.opacity = "0";

                    image.style.transition =
                        "opacity 0.6s ease";

                    image.onload = () => {

                        image.style.opacity = "1";

                    };

                    observer.unobserve(image);

                }

            });

        });


    lazyImages.forEach(image => {

        imageObserver.observe(image);

    });

}


/* ================= SCROLL REVEAL ================= */

const revealElements =
    document.querySelectorAll(
        ".room-card, .amenity, .gallery-item, .contact-block"
    );


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
        "translateY(25px)";

    element.style.transition =
        "opacity 0.7s ease, transform 0.7s ease";

});


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

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


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* ================= GALLERY INTERACTION ================= */

document.querySelectorAll(".gallery-item").forEach(item => {

    item.addEventListener("click", () => {

        showToast(
            "Follow @mocha4monet for the full visual diary."
        );

    });

});


/* ================= INSTAGRAM ================= */

document
    .querySelectorAll(".instagram-link")
    .forEach(link => {

        link.addEventListener("click", () => {

            // Instagram opens normally.
            // Keeping this handler intentionally simple.

        });

    });


/* ================= ESC KEY ================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        mobileMenu.classList.remove("active");

    }

});


/* ================= CONSOLE ================= */

console.log(
    "%cMONET",
    "font-size:30px;font-weight:bold;color:#35194f;"
);

console.log(
    "Stay different."
);