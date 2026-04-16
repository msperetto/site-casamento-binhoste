// Wedding App - Stephanie & Fabio 2026

// 1. COUNTDOWN TIMER
const weddingDate = new Date("August 29, 2026 16:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days.toString().padStart(2, '0');
    document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');

    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById("countdown").innerHTML = "<h3>Já Casados! 🤍</h3>";
    }
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// 2. SNOW EFFECT
const canvas = document.getElementById('snow-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 100;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.init();
    }

    init() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.y > canvas.height) {
            this.y = -10;
            this.x = Math.random() * canvas.width;
        }
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
    }
}

function initSnow() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateSnow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateSnow);
}

initSnow();
animateSnow();

// 3. RSVP FORM HANDLING
const rsvpForm = document.getElementById('rsvp-form');
const statusMsg = document.getElementById('form-status');

rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = rsvpForm.querySelector('button');
    btn.innerText = 'Enviando...';
    btn.disabled = true;

    // Simulate network request
    setTimeout(() => {
        statusMsg.style.display = 'block';
        statusMsg.innerText = '✨ Presença confirmada! Nos vemos em Bariloche!';
        statusMsg.style.color = '#27ae60';
        rsvpForm.reset();
        btn.innerText = 'Confirmar Presença';
        btn.disabled = false;
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            statusMsg.style.display = 'none';
        }, 5000);
    }, 1500);
});

// 4. HEADER SCROLL EFFECT
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (window.scrollY > 50) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
});
