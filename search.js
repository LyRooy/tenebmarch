document.addEventListener("DOMContentLoaded", () => {
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "🔍 Szukaj w tej stronie...";
  input.style.margin = "1rem auto";
  input.style.display = "block";
  input.style.padding = "0.5rem";
  input.style.width = "80%";
  input.style.fontSize = "1rem";

  const main = document.querySelector("main");
  main.prepend(input);

  input.addEventListener("input", () => {
    const filter = input.value.toLowerCase();
    const sections = main.querySelectorAll("section");
    sections.forEach(section => {
      const text = section.innerText.toLowerCase();
      section.style.display = text.includes(filter) ? "block" : "none";
    });
  });
});
