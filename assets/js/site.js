document.querySelectorAll("details.abstract").forEach((abstract) => {
  abstract.addEventListener("toggle", () => {
    const summary = abstract.querySelector("summary");
    if (summary) {
      summary.setAttribute("aria-expanded", String(abstract.open));
    }
  });
});

document.querySelectorAll("[data-email-scramble]").forEach((container) => {
  const characters = Array.from("a.vsr@e.ieu.dnqnuteug");
  const positions = [5, 18, 0, 19, 2, 10, 9, 14, 3, 15, 8, 6, 16, 4, 7, 11, 17, 12, 1, 13, 20];

  const swap = (first, second) => {
    [characters[first], characters[second]] = [characters[second], characters[first]];
    [positions[first], positions[second]] = [positions[second], positions[first]];
  };

  for (let index = positions.length - 1; index > 0; index -= 1) {
    swap(index, Math.floor(Math.random() * (index + 1)));
  }

  const scrambledText = document.createElement("span");
  scrambledText.textContent = characters.join("");
  scrambledText.setAttribute("aria-hidden", "true");

  const revealButton = document.createElement("button");
  revealButton.type = "button";
  revealButton.className = "email-unscramble";
  revealButton.textContent = "unscramble";
  revealButton.setAttribute("aria-label", "Unscramble email address");

  container.replaceChildren(scrambledText, revealButton);

  revealButton.addEventListener("click", () => {
    revealButton.remove();
    container.setAttribute("aria-busy", "true");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const swapsPerFrame = prefersReducedMotion ? Number.MAX_SAFE_INTEGER : 8;

    const sortStep = () => {
      let completed = false;

      for (let count = 0; count < swapsPerFrame; count += 1) {
        const inversion = positions.findIndex(
          (position, index) => index < positions.length - 1 && position > positions[index + 1]
        );

        if (inversion === -1) {
          completed = true;
          break;
        }

        swap(inversion, inversion + 1);
      }

      scrambledText.textContent = characters.join("");

      if (completed) {
        container.textContent = characters.join("");
        container.removeAttribute("aria-busy");
        return;
      }

      window.requestAnimationFrame(sortStep);
    };

    sortStep();
  });
});
