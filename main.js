class Particle {
  constructor(index) {
    this.index = index;
    this.element = document.createElement("div");
    this.size = Math.floor(Math.random() * 5) + 1;
    this.styles = {
      width: `${this.size}px`,
      height: `${this.size}px`,
      left: `${Math.floor(Math.random() * window.innerWidth) + 1}px`,
      top: `${Math.floor(Math.random() * window.innerHeight) + 1}px`,
      opacity: Math.random(),
      transitionDelay: `${Math.floor(Math.random() * 1000)}ms`,
    };
    this.blinkInterval = null;
  }

  applyStyles() {
    for (let [key, value] of Object.entries(this.styles)) {
      this.element.style[key] = value;
    }
  }

  create() {
    this.element.classList.add("particle");
    this.element.setAttribute("id", `particle-${this.index}`);

    this.applyStyles();

    return this.element;
  }

  moveTo(x, y) {
    this.element.style.left = `${x}px`;
    this.element.style.top = `${y}px`;
  }

  blink() {
    this.blinkInterval = setInterval(() => {
      this.element.style.opacity = 0;

      setTimeout(() => {
        this.element.style.opacity = Math.random();
      }, Math.floor(Math.random() * 200) + 100);
    }, Math.floor(Math.random() * 2000) + 1);
  }

  stopBlinking() {
    clearInterval(this.blinkInterval);
  }
}

const spaceHover = ({
  particlesWrapper = document.querySelector(".particle-hover-effect-wrapper"),
  button = document.querySelector(".button"),
  numberOfParticles = window.innerWidth >= window.innerHeight
    ? Math.floor(window.innerHeight / 4)
    : Math.floor(window.innerWidth / 4),
} = {}) => {
  const particles = [];

  const initializeParticles = () => {
    for (let i = 1; i <= numberOfParticles; i++) {
      const newParticle = new Particle(i);
      newParticle.blink();
      particles.push(newParticle);
      particlesWrapper.prepend(newParticle.create());
    }
  };

  const bindEvents = () => {
    button.addEventListener("mouseenter", (event) => {
      const { clientX, clientY } = event;

      for (const particle of particles) {
        particle.moveTo(clientX, clientY);
        particle.stopBlinking();
      }
    });

    button.addEventListener("mouseleave", () => {
      for (const particle of particles) {
        particle.applyStyles();
        particle.blink();
      }
    });
  };

  (() => {
    initializeParticles();
    bindEvents();
  })();
};

spaceHover();
