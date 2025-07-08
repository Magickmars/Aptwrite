// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const icon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
    document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form Validation
const form = document.querySelector('.contact-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert('Message sent successfully!');
    form.reset();
});

// Generate Noise Texture
const noise = document.querySelector('.noise');
const ctx = document.createElement('canvas').getContext('2d');
ctx.canvas.width = 100;
ctx.canvas.height = 100;

for (let x = 0; x < 100; x++) {
    for (let y = 0; y < 100; y++) {
        const value = Math.floor(Math.random() * 255);
        ctx.fillStyle = `rgb(${value},${value},${value})`;
        ctx.fillRect(x, y, 1, 1);
    }
}

noise.style.backgroundImage = `url(${ctx.canvas.toDataURL()})`;

// Typed.js implementation
class TypedText {
    constructor(element, strings, typeSpeed = 50, backSpeed = 30, loop = true) {
        this.element = element;
        this.strings = strings;
        this.typeSpeed = typeSpeed;
        this.backSpeed = backSpeed;
        this.loop = loop;
        this.currentStringIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.type();
    }

    type() {
        const currentString = this.strings[this.currentStringIndex];
        const currentText = this.isDeleting
            ? currentString.substring(0, this.currentCharIndex - 1)
            : currentString.substring(0, this.currentCharIndex + 1);

        this.element.textContent = currentText;

        let typeSpeed = this.isDeleting ? this.backSpeed : this.typeSpeed;

        if (!this.isDeleting && this.currentCharIndex === currentString.length) {
            typeSpeed = 1500; // Pause at end
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            this.isDeleting = false;
            this.currentStringIndex++;
            if (this.currentStringIndex === this.strings.length) {
                if (this.loop) {
                    this.currentStringIndex = 0;
                } else {
                    return;
                }
            }
            typeSpeed = 500; // Pause before typing next string
        }

        this.currentCharIndex += this.isDeleting ? -1 : 1;

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize Typed Text
new TypedText(document.getElementById('typed-text'), [
    "Technical Writer & Documentation Specialist",
    "Small, fast-loading websites",
    "Content Strategist"
]);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.setAttribute('data-aos', 'true');
        }
    });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(element => {
    observer.observe(element);
});
