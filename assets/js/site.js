document.querySelectorAll("details.abstract").forEach((abstract) => {
  abstract.addEventListener("toggle", () => {
    const summary = abstract.querySelector("summary");
    if (summary) {
      summary.setAttribute("aria-expanded", String(abstract.open));
    }
  });
});
