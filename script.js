/* =========================================================
   ROYAL BIKE POINT
   MAIN JAVASCRIPT
========================================================= */

"use strict";


/* ================= PAGE LOAD ================= */

window.addEventListener("load", function () {

    const preloader = document.getElementById("preloader");

    if (preloader) {

        setTimeout(function () {
            preloader.classList.add("hide");
        }, 700);

    }

});


/* ================= MOBILE MENU ================= */

document.addEventListener("DOMContentLoaded", function () {

    const menuBtn = document.getElementById("menuBtn");
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll(".nav-link");

    if (menuBtn && navbar) {

        menuBtn.addEventListener("click", function () {

            navbar.classList.toggle("open");
            document.body.classList.toggle("menu-open");

        });

    }


    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (navbar) {
                navbar.classList.remove("open");
            }

            document.body.classList.remove("menu-open");

        });

    });

});


/* ================= HEADER SCROLL ================= */

const header = document.getElementById("header");

window.addEventListener("scroll", function () {

    if (!header) {
        return;
    }

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* ================= SCROLL REVEAL ================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(function (element) {

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach(function (element) {

        element.classList.add("visible");

    });

}


/* ================= COUNTERS ================= */

const counters = document.querySelectorAll(".counter");

function startCounter(counter) {

    const target = Number(counter.dataset.target);

    if (Number.isNaN(target)) {
        return;
    }

    let current = 0;

    const increment = Math.max(1, Math.ceil(target / 50));

    const timer = setInterval(function () {

        current += increment;

        if (current >= target) {

            current = target;
            clearInterval(timer);

        }

        counter.textContent = current;

    }, 30);

}


if ("IntersectionObserver" in window) {

    const counterObserver = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    startCounter(entry.target);

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.7
        }
    );


    counters.forEach(function (counter) {

        counterObserver.observe(counter);

    });

}


/* ================= ACTIVE NAVIGATION ================= */

const sections = document.querySelectorAll("section[id]");
const navigationLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", function () {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop - 180;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navigationLinks.forEach(function (link) {

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === "#" + currentSection) {
            link.classList.add("active");
        }

    });

});


/* ================= FAQ ================= */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(function (item) {

    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (!question || !answer) {
        return;
    }


    question.addEventListener("click", function () {

        const isOpen = item.classList.contains("open");


        faqItems.forEach(function (otherItem) {

            otherItem.classList.remove("open");

            const otherAnswer =
                otherItem.querySelector(".faq-answer");

            if (otherAnswer) {
                otherAnswer.style.maxHeight = null;
            }

        });


        if (!isOpen) {

            item.classList.add("open");

            answer.style.maxHeight =
                answer.scrollHeight + "px";

        }

    });

});


/* ================= BOOKING FORM ================= */

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {

    bookingForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const nameInput = document.getElementById("name");
        const phoneInput = document.getElementById("phone");
        const bikeInput = document.getElementById("bike");
        const serviceInput = document.getElementById("service");
        const messageInput = document.getElementById("message");


        const name = nameInput ? nameInput.value.trim() : "";
        const phone = phoneInput ? phoneInput.value.trim() : "";
        const bike = bikeInput ? bikeInput.value.trim() : "";
        const service = serviceInput ? serviceInput.value : "";
        const message = messageInput ? messageInput.value.trim() : "";


        if (!name) {

            alert("Please enter your name.");
            if (nameInput) nameInput.focus();
            return;

        }


        if (!phone) {

            alert("Please enter your phone number.");
            if (phoneInput) phoneInput.focus();
            return;

        }


        if (!service) {

            alert("Please select a service.");
            if (serviceInput) serviceInput.focus();
            return;

        }


        const whatsappNumber = "919702289243";


        const whatsappMessage =
            "Hello Royal Bike Point,%0A%0A" +
            "I want to enquire/book a bike service.%0A%0A" +
            "Name: " + encodeURIComponent(name) + "%0A" +
            "Phone: " + encodeURIComponent(phone) + "%0A" +
            "Bike: " + encodeURIComponent(bike || "Not specified") + "%0A" +
            "Service: " + encodeURIComponent(service) + "%0A" +
            "Message: " + encodeURIComponent(message || "No additional message.") +
            "%0A%0AThank you.";


        const whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            whatsappMessage;


        window.open(whatsappURL, "_blank");


        bookingForm.reset();

    });

}


/* ================= GALLERY LIGHTBOX ================= */

const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");


galleryItems.forEach(function (item) {

    item.addEventListener("click", function () {

        const image = item.querySelector("img");

        if (!image || !lightbox || !lightboxImage) {
            return;
        }

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        lightbox.classList.add("show");

        document.body.classList.add("menu-open");

    });

});


function closeLightbox() {

    if (lightbox) {
        lightbox.classList.remove("show");
    }

    document.body.classList.remove("menu-open");

}


if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );

}


if (lightbox) {

    lightbox.addEventListener("click", function (event) {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });

}


/* ================= ESCAPE KEY ================= */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeLightbox();

        const navbar = document.getElementById("navbar");

        if (navbar) {
            navbar.classList.remove("open");
        }

        document.body.classList.remove("menu-open");

    }

});


/* ================= CURRENT YEAR ================= */

const currentYear = document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* ================= IMAGE ERROR HANDLING ================= */

const allImages = document.querySelectorAll("img");

allImages.forEach(function (image) {

    image.addEventListener("error", function () {

        image.style.opacity = "0.35";

    });

});


/* ================= WHATSAPP BUTTON TRACK ================= */

const whatsappLinks =
    document.querySelectorAll('a[href*="wa.me"]');

whatsappLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        console.log("WhatsApp button clicked.");

    });

});


/* ================= PHONE NUMBER CLEANUP ================= */

const phoneInputs =
    document.querySelectorAll('input[type="tel"]');

phoneInputs.forEach(function (input) {

    input.addEventListener("input", function () {

        input.value = input.value.replace(
            /[^0-9+\-\s]/g,
            ""
        );

    });

});


/* ================= SMOOTH ANCHOR FALLBACK ================= */

document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetID =
            link.getAttribute("href");

        if (
            !targetID ||
            targetID === "#" ||
            targetID.length < 2
        ) {
            return;
        }


        const target =
            document.querySelector(targetID);


        if (!target) {
            return;
        }


        event.preventDefault();


        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

});