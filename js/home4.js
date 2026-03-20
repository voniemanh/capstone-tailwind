const counters = document.querySelectorAll(".counter");

counters.forEach((counter) => {
  const updateCount = () => {
    const target = +counter.getAttribute("data-target");
    const current = +counter.innerText.replace("%", "");

    const increment = target / 100;

    if (current < target) {
      counter.innerText = `${Math.ceil(current + increment)}%`;
      setTimeout(updateCount, 20);
    } else {
      counter.innerText = `${target}%`;
    }
  };

  updateCount();
});

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
