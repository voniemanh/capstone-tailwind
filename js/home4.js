/* ============================================
   SCROLL ANIMATIONS
   - fade-up: mọi section
   - slide-in-left / slide-in-right: section 2 cột
   ============================================ */

const observerOptions = {
  threshold: 0.12,
  rootMargin: "0px 0px -60px 0px",
};

const onIntersect = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    const el = entry.target;
    el.style.animationPlayState = "running";

    /* Kích hoạt slide cho các cột con */
    el.querySelectorAll(".slide-left, .slide-right").forEach((child) => {
      child.style.animationPlayState = "running";
    });

    observer.unobserve(el);
  });
};

const scrollObserver = new IntersectionObserver(onIntersect, observerOptions);

/* Sections 2 cột — thêm class slide cho từng cột */
const twoColSections = document.querySelectorAll(
  ".securing, .protect, .optimize",
);

twoColSections.forEach((section) => {
  const children = [...(section.querySelector(".container")?.children ?? [])];
  children.forEach((child, i) => {
    child.classList.add(i % 2 === 0 ? "slide-left" : "slide-right");
  });
});

/* Observe tất cả fade-up sections */
document.querySelectorAll(".fade-up").forEach((el) => {
  el.style.animationPlayState = "paused";
  scrollObserver.observe(el);
});

/* ============================================
   COUNTER ANIMATION (chỉ chạy khi scroll tới)
   ============================================ */

const counterObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const counter = entry.target;
      const target = +counter.getAttribute("data-target");

      const tick = () => {
        const current = +counter.innerText.replace("%", "");
        const increment = target / 80;
        if (current < target) {
          counter.innerText = `${Math.min(Math.ceil(current + increment), target)}%`;
          setTimeout(tick, 18);
        } else {
          counter.innerText = `${target}%`;
        }
      };
      tick();
      obs.unobserve(counter);
    });
  },
  { threshold: 0.5 },
);

document
  .querySelectorAll(".counter")
  .forEach((el) => counterObserver.observe(el));

/* ============================================
   MOBILE MENU TOGGLE
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".mobile-toggle").forEach((btn) => {
    btn.onclick = () => {
      const target = document.getElementById(btn.dataset.target);
      if (!target) return;
      target.classList.toggle("hidden");
      const icon = btn.querySelector("img");
      if (icon) icon.classList.toggle("rotate-180");
    };
  });
});
