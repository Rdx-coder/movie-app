
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card");

  function fadeInCards() {
    cards.forEach((card, index) => {
      card.style.opacity = 0;
      card.style.animation = `fadeIn 0.5s ease-out ${index * 0.1}s forwards`;
    });
  }

  fadeInCards();
});
