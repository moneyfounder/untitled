fetch("/header.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("header-placeholder").innerHTML = data;
    initHeaderEvents();
  });

fetch("/footer.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("footer-placeholder").innerHTML = data;
  });






const a = [
  "News", "Stocks", "Crypto", "Forex", "Commodities", "Wealth",
  "Tech", "Forecasts", "Startup", "Investing", "Loans", "Taxes", "Tools"
];

let s = [], i = "";

async function r(e) {
  const t = `/${e.toLowerCase()}/index.html`;
  try {
    const n = await fetch(t);
    const o = await n.text();
    return [...new DOMParser()
      .parseFromString(o, "text/html")
      .querySelectorAll("article.blog-card, div.tool-card")
    ].map(t => {
      const n = document.createElement("div");
      n.innerHTML = t.outerHTML;
      n.querySelectorAll("a").forEach(t => {
        if (!t.href.startsWith(`/${e.toLowerCase()}/`)) {
          t.href = `/${e.toLowerCase()}/${t.getAttribute("href")}`;
        }
      });
      return { html: n.innerHTML, text: n.innerText.toLowerCase() };
    });
  } catch (e) {
    return [];
  }
}

function l() {
  const n = document.getElementById("search-input");
  const e = n?.value.trim().toLowerCase();
  const c = document.querySelector("main");
  if (!c) return;

  if (e) {
    const result = s.filter(t => t.text.includes(e));
    const header = `<h2 class='pageH1'>Search Results for: "${e}"</h2>`;
    const body = result.length ? result.map(t => t.html).join("") : "<p>No search results found.</p>";
    c.innerHTML = `
      <div class="article-section">
        ${header}
        <div class="blog-grid">
          ${body}
        </div>
      </div>
    `;
  } else if (i) {
    c.innerHTML = i;
  }
}


(async function () {
  s = await (async function () {
    let e = [];
    for (const t of a) {
      const n = await r(t);
      e = e.concat(n);
    }
    return e;
  })();
})();

function initHeaderEvents() {
  const searchToggle = document.getElementById("search-toggle");
  const searchContainer = document.getElementById("search-bar-container");
  const searchInput = document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const main = document.querySelector("main");

  if (searchToggle && searchContainer) {
    searchToggle.addEventListener("click", () => {
      const visible = searchContainer.style.display === "block";
      searchContainer.style.display = visible ? "none" : "block";
      searchToggle.classList.toggle("active", !visible);
      if (!visible && searchInput) searchInput.focus();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        e.preventDefault();
        l();
      }
    });
  }

  if (searchButton) {
    searchButton.addEventListener("click", e => {
      e.preventDefault();
      l();
    });
  }






  const hamburger = document.querySelector(".hamburger");
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.getElementById("overlay");
  const sectionButton = document.getElementById("section-button");
  const toolsButton = document.getElementById("tools-button");
  const sectionLinks = document.getElementById("section-links");
  const toolsLinks = document.getElementById("tools-links");
  const sidebarTitle = document.getElementById("sidebar-title");

  function toggleSidebar(show) {
    sidebar?.classList.toggle("open", show);
    hamburger?.classList.toggle("active", show);
    overlay?.classList.toggle("active", show);
    main?.classList.toggle("dim", show);
    document.body?.classList.toggle("dim", show);
  }
  function switchTab(active, inactive, showList, hideList, title) {
    active?.classList.add("active");
    inactive?.classList.remove("active");
    showList?.classList.remove("hidden");
    hideList?.classList.add("hidden");
    if (sidebarTitle) sidebarTitle.textContent = title;
  }
  hamburger?.addEventListener("click", () => toggleSidebar(!sidebar?.classList.contains("open")));
  overlay?.addEventListener("click", () => toggleSidebar(false));
  sectionButton?.addEventListener("click", () => switchTab(sectionButton, toolsButton, sectionLinks, toolsLinks, "Section"));
  toolsButton?.addEventListener("click", () => switchTab(toolsButton, sectionButton, toolsLinks, sectionLinks, "Tools"));
  const moreToggle = document.getElementById("more-toggle");
  const moreDropdown = document.getElementById("more-dropdown");
  const moreContainer = document.querySelector(".more-container");

  moreToggle?.addEventListener("click", e => {
    e.preventDefault();
    moreDropdown?.classList.toggle("active");
  });

  document.addEventListener("click", e => {
    if (!moreContainer?.contains(e.target)) {
      moreDropdown?.classList.remove("active");
    }
  });
  const shareBtn = document.querySelector(".share-button");
  shareBtn?.addEventListener("click", async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: "Check out this article!",
          url: url,
        });
      } catch (e) {}
    } else {
      alert("Sharing is not supported on your device.");
    }
  });








  
  // Theme toggle button elements (must exist in header.html)
  const toggleBtn = document.getElementById('theme-toggle');
  const body = document.body;
  const sunIcon = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');

  if (!toggleBtn || !sunIcon || !moonIcon) {
    console.warn("Theme toggle elements not found");
    return;
  }

  // Apply saved theme on load
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    body.classList.add(savedTheme);
    toggleIcons(savedTheme);
  }

  // Toggle on button click
  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark');
    const theme = body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    toggleIcons(theme);
  });

  // Show/hide icons based on theme
  function toggleIcons(theme) {
    if (theme === 'dark') {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    } else {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    }
  }


}














    // Get elements
    const notificationBtn = document.getElementById('notification-toggle');
    const popup = document.getElementById('notification-popup');
    const closeBtn = document.querySelector('.close-popup');
    const form = document.getElementById('notification-form');

    // Open popup on button click
    notificationBtn.addEventListener('click', () => {
        popup.classList.remove('hidden');
    });

    // Close popup
    closeBtn.addEventListener('click', () => {
        popup.classList.add('hidden');
    });

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const selected = Array.from(form.querySelectorAll('input[name="category"]:checked'))
                              .map(input => input.value);

        alert("Subscribed to: " + selected.join(', '));

        popup.classList.add('hidden');
    });
















// Theme Toggle Logic (runs AFTER header is loaded)
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  const body = document.body;
  const sunIcon = document.getElementById('sun-icon');
  const moonIcon = document.getElementById('moon-icon');

  if (!toggleBtn || !sunIcon || !moonIcon) {
    console.warn("Theme toggle elements not found");
    return;
  }

  // Apply saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    body.classList.add(savedTheme);
    toggleIcons(savedTheme);
  }

  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark');
    const theme = body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    toggleIcons(theme);
  });

  function toggleIcons(theme) {
    sunIcon.style.display = theme === 'dark' ? 'none' : 'block';
    moonIcon.style.display = theme === 'dark' ? 'block' : 'none';
  }
}
