document.addEventListener("DOMContentLoaded", () => {

    // Arrange slides according to their ID numbers
    const slides = Array.from(document.querySelectorAll(".slide"))
        .sort((a, b) => {
            const numA = parseInt(a.id.replace("slide", ""));
            const numB = parseInt(b.id.replace("slide", ""));
            return numA - numB;
        });

    let currentSlide = 0;

    function showSlide(index) {

        if (index < 0 || index >= slides.length) return;

        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove("active");
        });

        // Show selected slide
        slides[index].classList.add("active");

        currentSlide = index;

        // Animate counters on Slide 03
        if (slides[index].id === "slide3") {
            animateCounters(slides[index]);
        }

    }

    function animateCounters(slide) {

        const counters = slide.querySelectorAll(".counter");

        counters.forEach(counter => {

            const target = Number(counter.dataset.target);
            const duration = 1400;
            const startTime = performance.now();

            function update(currentTime) {

                const progress = Math.min(
                    (currentTime - startTime) / duration,
                    1
                );

                counter.textContent =
                    Math.floor(progress * target).toLocaleString();

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            }

            counter.textContent = "0";
            requestAnimationFrame(update);
        });
    }

    // Keyboard Navigation
    document.addEventListener("keydown", (event) => {

        if (event.key === "ArrowRight" || event.key === " ") {
            showSlide(currentSlide + 1);
        }

        if (event.key === "ArrowLeft") {
            showSlide(currentSlide - 1);
        }

    });

    // Start from Slide 01
    showSlide(0);

});
/* ========================================
   FLOATING AI NETWORK ANIMATION
======================================== */

document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.getElementById("ai-network");

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let particles = [];
    let animationId;

    const particleCount = 65;
    const connectionDistance = 150;

    function resizeCanvas() {

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        createParticles();
    }

    class Particle {

        constructor() {

            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;

            this.radius = Math.random() * 1.8 + 0.7;

            this.speedX = (Math.random() - 0.5) * 0.35;
            this.speedY = (Math.random() - 0.5) * 0.35;

            this.color = Math.random() > 0.5
                ? "0, 212, 255"
                : "139, 92, 246";
        }

        update() {

            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) {
                this.speedX *= -1;
            }

            if (this.y < 0 || this.y > canvas.height) {
                this.speedY *= -1;
            }
        }

        draw() {

            ctx.beginPath();

            ctx.arc(
                this.x,
                this.y,
                this.radius,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = `rgba(${this.color}, 0.55)`;

            ctx.shadowBlur = 8;
            ctx.shadowColor = `rgba(${this.color}, 0.5)`;

            ctx.fill();

            ctx.shadowBlur = 0;
        }
    }

    function createParticles() {

        particles = [];

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function drawConnections() {

        for (let i = 0; i < particles.length; i++) {

            for (let j = i + 1; j < particles.length; j++) {

                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;

                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {

                    const opacity =
                        (1 - distance / connectionDistance) * 0.12;

                    ctx.beginPath();

                    ctx.strokeStyle =
                        `rgba(0, 212, 255, ${opacity})`;

                    ctx.lineWidth = 0.7;

                    ctx.moveTo(
                        particles[i].x,
                        particles[i].y
                    );

                    ctx.lineTo(
                        particles[j].x,
                        particles[j].y
                    );

                    ctx.stroke();
                }
            }
        }
    }

    function animate() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        particles.forEach(particle => {

            particle.update();
            particle.draw();

        });

        drawConnections();

        animationId = requestAnimationFrame(animate);
    }

    window.addEventListener("resize", resizeCanvas);

    // Respect reduced-motion preferences
    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    resizeCanvas();

    if (reducedMotion.matches) {

        particles.forEach(particle => particle.draw());
        drawConnections();

    } else {

        animate();
    }

});
/* =================================
   MODEL PERFORMANCE BAR ANIMATION
================================= */

document.addEventListener("DOMContentLoaded", () => {

    const slide9 = document.getElementById("slide9");

    if (!slide9) return;

    const bars = slide9.querySelectorAll(".bar-fill");

    const observer = new MutationObserver(() => {

        if (slide9.classList.contains("active")) {

            bars.forEach(bar => {

                const width = bar.dataset.width;

                bar.style.width = width + "%";

            });

        } else {

            bars.forEach(bar => {
                bar.style.width = "0%";
            });

        }

    });

    observer.observe(slide9, {
        attributes: true,
        attributeFilter: ["class"]
    });

});
/* =================================
   R² COUNT-UP ANIMATION
================================= */

document.addEventListener("DOMContentLoaded", () => {

    const slide9 = document.getElementById("slide9");

    if (!slide9) return;

    const counters = slide9.querySelectorAll(".r2-counter");

    function animateR2() {

        counters.forEach(counter => {

            const target = parseFloat(counter.dataset.target);

            const duration = 1500;
            const startTime = performance.now();

            function update(currentTime) {

                const progress = Math.min(
                    (currentTime - startTime) / duration,
                    1
                );

                const easeOut = 1 - Math.pow(1 - progress, 3);

                const value = easeOut * target;

                counter.textContent = value.toFixed(4);

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target.toFixed(4);
                }

            }

            counter.textContent = "0.0000";

            requestAnimationFrame(update);

        });

    }

    const observer = new MutationObserver(() => {

        if (slide9.classList.contains("active")) {
            animateR2();
        }

    });

    observer.observe(slide9, {
        attributes: true,
        attributeFilter: ["class"]
    });

});