document.addEventListener("DOMContentLoaded", () => {
  const isIndex = location.pathname.endsWith("index.html") || location.pathname === "/";
  const queryParams = new URLSearchParams(window.location.search);
  const query = queryParams.get("q");

  // Jeśli jesteśmy na index.html → wyszukiwarka globalna
  if (isIndex) {
    const form = document.createElement("form");
    form.style.textAlign = "center";
    form.style.margin = "1rem auto";

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "🔍 Wyszukaj w uniwersum Tenebmarch...";
    input.style.padding = "0.5rem";
    input.style.width = "80%";
    input.style.fontSize = "1rem";

    form.appendChild(input);

    const main = document.querySelector("main");
    main.prepend(form);

    const strony = [
      { url: "timeline.html", name: "Linia Czasu" },
      { url: "hierarchy.html", name: "Hierarchia" },
      { url: "universes.html", name: "Światy" },
      { url: "characters.html", name: "Postacie" },
      { url: "factions.html", name: "Frakcje" },
      { url: "mythos.html", name: "Mitologie" }
    ];

    form.addEventListener("submit", async e => {
      e.preventDefault();
      const query = input.value.toLowerCase();
      if (!query) return;

      for (const strona of strony) {
        try {
          const res = await fetch(strona.url);
          const html = await res.text();
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");
          const text = doc.body.innerText.toLowerCase();
          if (text.includes(query)) {
            window.location.href = strona.url + `?q=${encodeURIComponent(query)}`;
            return;
          }
        } catch (err) {
          console.warn("Nie udało się załadować strony:", strona.url);
        }
      }

      alert("Nie znaleziono pasujących treści w żadnej sekcji uniwersum.");
    });
  }

  // Jeśli jesteśmy na stronie docelowej → pokaż pasek i podświetl wyniki
  if (query) {
    const banner = document.createElement("div");
    banner.textContent = `🔎 Znaleziono wyniki dla: "${query}"`;
    banner.style.background = "#222";
    banner.style.color = "#ffcc00";
    banner.style.padding = "1rem";
    banner.style.textAlign = "center";
    banner.style.fontWeight = "bold";
    document.body.prepend(banner);

    // Podświetl pasujące frazy
    const main = document.querySelector("main");
    if (main) {
      const regex = new RegExp(`(${query})`, "gi");
      main.innerHTML = main.innerHTML.replace(regex, '<mark style="background: #ffcc00; color: #111;">$1</mark>');
    }
  }
});
