const reveals = document.querySelectorAll('.reveal');
    window.addEventListener('scroll', () => {
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
          reveals[i].classList.add('active');
        }
      }
    });

  document.addEventListener('DOMContentLoaded', () => {
    const pricingSection = document.querySelector('.pricing-section');
    const featureItems = pricingSection.querySelectorAll('.features-list li');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            pricingSection.classList.add('active');
            pricingSection.classList.remove('hidden');

            // Stagger features list animation using JS delays
            featureItems.forEach((item, index) => {
              item.style.transitionDelay = `${0.3 + index * 0.15}s`;
            });

            observer.unobserve(pricingSection);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(pricingSection);
  });


  // Scroll reveal for team cards
  const cards = document.querySelectorAll('.team-card');
  const title = document.querySelector('.section-title');
  const shapes = document.querySelectorAll('.bg-shape');

  function revealCards() {
    const triggerPoint = window.innerHeight * 0.85;
    cards.forEach(card => {
      const cardTop = card.getBoundingClientRect().top;
      if (cardTop < triggerPoint) {
        card.classList.add('visible');
      }
    });
  }

  // Smooth mouse follow tilt for title and cards
  function lerp(start, end, t) {
    return start + (end - start) * t;
  }

  let mouseX = 0, mouseY = 0;
  let currentX = 0, currentY = 0;
  let rafId;

  function animate() {
    currentX = lerp(currentX, mouseX, 0.1);
    currentY = lerp(currentY, mouseY, 0.1);

    // Map -1 to 1 range for tilt angles
    const tiltX = (currentY - window.innerHeight / 2) / (window.innerHeight / 2);
    const tiltY = (currentX - window.innerWidth / 2) / (window.innerWidth / 2);

    // Title tilt (subtle)
    title.style.transform = `
      rotateX(${tiltX * 8}deg)
      rotateY(${tiltY * 8}deg)
    `;

    // Cards tilt (stronger)
    cards.forEach(card => {
      card.style.transform = `
        translateY(0)
        scale(1)
        rotateX(${-tiltX * 12}deg)
        rotateY(${tiltY * 12}deg)
      `;
    });

    rafId = requestAnimationFrame(animate);
  }

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  window.addEventListener('scroll', revealCards);
  window.addEventListener('load', () => {
    revealCards();
    animate();
  });

  window.addEventListener("load", () => {
    document.querySelector(".final-content").style.animationPlayState = "running";
  });
const scrollBtn = document.getElementById("scrollToTopBtn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add("show");
    } else {
      scrollBtn.classList.remove("show");
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });