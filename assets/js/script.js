 <script>
      // ===== Utilities =====
      const $ = (sel, ctx = document) => ctx.querySelector(sel);
      const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

      // ===== Mobile menu =====
      const menuBtn = $("#menuBtn");
      const navEl = $("#nav");
      menuBtn.addEventListener("click", () => {
        navEl.classList.toggle("open");
        const open = navEl.classList.contains("open");
        menuBtn.setAttribute("aria-expanded", String(open));
      });
      // Close on link click mobile
      $("#nav").addEventListener("click", (e) => {
        if (e.target.tagName === "A" && navEl.classList.contains("open")) {
          navEl.classList.remove("open");
          menuBtn.setAttribute("aria-expanded", "false");
        }
      });

      // ===== Active link on scroll (scrollspy) =====
      const sections = [
        "about",
        "skills",
        "courses",
        "Partners",
        "Quotes",
        "contact",
      ].map((id) => document.getElementById(id));
      const links = $$("#nav a");
      const onScroll = () => {
        let current = sections[0].id;
        sections.forEach((sec) => {
          const top = window.scrollY + 120; // offset for sticky header
          if (top >= sec.offsetTop) current = sec.id;
        });
        links.forEach((a) =>
          a.classList.toggle("active", a.getAttribute("href") === "#" + current)
        );
      };
      window.addEventListener("scroll", onScroll);

      // ===== Theme toggle (light/dark) =====
      const themeToggle = $("#themeToggle");
      const setTheme = (mode) => {
        document.documentElement.dataset.theme = mode;
        localStorage.setItem("theme", mode);
        themeToggle.textContent = mode === "dark" ? "🌙" : "☀️";
      };
      themeToggle.addEventListener("click", () => {
        const current = localStorage.getItem("theme") || "dark";
        setTheme(current === "dark" ? "light" : "dark");
      });
      // Start theme
      setTheme(localStorage.getItem("theme") || "dark");

      // Optional: Light theme overrides via CSS variables
      const style = document.createElement("style");
      style.textContent = `
    :root[data-theme="light"]{--bg:#f6f8ff; --text:#0b1020; --muted:#475069; --card:#ffffff;}
    :root[data-theme="light"] header{background:rgba(255,255,255,.7)}
    :root[data-theme="light"] nav a{color:#3a4166}
    :root[data-theme="light"] .hero-card,.skill,.card,.quote,.stat,.client,.about-card{border-color:#e6e8f5}
    :root[data-theme="light"] .social a, :root[data-theme="light"] input, :root[data-theme="light"] textarea, :root[data-theme="light"] select{border-color:#e6e8f5; background:#fff}
  `;
      document.head.appendChild(style);

      // ===== Courses data & rendering =====
      const courses = [
        {
          id: 1,
          tag: "excel",
          title: "Excel Essentials",
          level: "Beginner",
          hours: 5,
          img: "https://reandaily.dev/wp-content/uploads/2024/05/Basic-Excel-by-rean-computer-101-1.png",
          bullets: [
            "Data Input",
            "Data Format",
            "Formulas & functions, Printing...",
            "PDF download",
          ],
        },
        {
          id: 2,
          tag: "excel",
          title: "Master 101 Excel Formula",
          level: "Intermediate",
          hours: 9,
          img: "https://reandaily.dev/wp-content/uploads/2024/05/Master-101-Excel-Formulas-1-1.png",
          bullets: [
            "Common Formulas",
            "Text and Date Formulas",
            "Advance Formulas",
            "PDF download",
          ],
        },
        {
          id: 3,
          tag: "python",
          title: "Python for Beginners",
          level: "Beginner",
          hours: 12,
          img: "https://reandaily.dev/wp-content/uploads/2024/10/Python-Programming-2.png",
          bullets: [
            "Syntax & data types",
            "Class & Objects",
            "Algorithms",
            "Problem‑solving",
          ],
        },
        {
          id: 4,
          tag: "excel",
          title: "Advance Excel Custom Format",
          level: "Intermediate",
          hours: 4,
          img: "https://reandaily.dev/wp-content/uploads/2024/09/Advance-Custom-Format-in-Excel-2.png",
          bullets: [
            "Number Format",
            "Text Format",
            "Date Format...",
            "PDF download",
          ],
        },
        {
          id: 5,
          tag: "computer",
          title: "Computer Essentials",
          level: "Beginners",
          hours: 25,
          img: "https://reandaily.dev/wp-content/uploads/2024/06/computer-essentials-2.png",
          bullets: [
            "Hardware Software",
            "Operating System",
            "Virus & Safety",
            "PDF download",
          ],
        },
        {
          id: 6,
          tag: "sheets",
          title: "Google Sheets [Coming Soon]",
          level: "Coming Soon",
          hours: 12,
          img: "https://static0.howtogeekimages.com/wordpress/wp-content/uploads/2024/12/a-desk-with-a-laptop-a-sheet-with-some-graphs-and-a-book-with-the-google-sheets-logo.jpg",
          bullets: [
            "Data Input & Format",
            "Formulas",
            "Charts, Sharing & control",
            "PDF download",
          ],
        },
      ];

      const renderCourses = (filter = "all") => {
        const grid = $("#courseGrid");
        grid.innerHTML = "";
        courses
          .filter((c) => filter === "all" || c.tag === filter)
          .forEach((c) => {
            const el = document.createElement("article");
            el.className = "card";
            el.innerHTML = `
        <div class="thumb" style="background-image:url('${
          c.img
        }'); background-size:cover; background-position:center"></div>
        <div class="content">
          <div class="meta"><span class="tag">${
            c.level
          }</span><span class="tag">${c.hours}h</span><span class="tag">${
              c.tag
            }</span></div>
          <h3 style="margin:.2rem 0">${c.title}</h3>
          <ul class="muted" style="margin:0 0 .2rem 1rem">${c.bullets
            .map((b) => `<li>${b}</li>`)
            .join("")}</ul>
        </div>
        <div class="actions">
          <a class="btn ghost" href="#contact" aria-label="Request syllabus for ${
            c.title
          }">Request syllabus</a>
          <button class="btn" data-enroll="${c.id}" aria-label="Enroll in ${
              c.title
            }">Enroll</button>
        </div>
      `;
            grid.appendChild(el);
          });
      };
      renderCourses();

      $$(".chip").forEach((ch) =>
        ch.addEventListener("click", () => {
          $$(".chip").forEach((c) => c.classList.remove("active"));
          ch.classList.add("active");
          renderCourses(ch.dataset.filter);
        })
      );

      // ===== Clients (placeholder logos as SVG) =====
      const clients = ["UNIV", "NGO", "EDU", "GOV", "CORP"];
      const clientGrid = $("#clientGrid");
      clients.forEach((name) => {
        const div = document.createElement("div");
        div.className = "client";
        div.innerHTML = `<svg viewBox="0 0 200 120" width="100%" height="100%" aria-label="${name} logo">
      <rect x="8" y="8" width="184" height="104" rx="14" fill="#121938" stroke="#263253"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="36" font-weight="700" fill="#8aa2ff">${name}</text>
    </svg>`;
        clientGrid.appendChild(div);
      });

      // ===== Testimonials =====
      const quotes = [
        {
          name: "Nelson Mandela",
          text: "Education is the most powerful weapon which you can use to change the world.",
        },
        {
          name: "Malcolm X",
          text: "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.",
        },
        {
          name: "Dara, Program Lead",
          text: "The roots of education are bitter, but the fruit is sweet.",
        },
        {
          name: "George Washington Carver",
          text: "Education is the key to unlocking the golden door of freedom.",
        },
        {
          name: "Christine Gregoire",
          text: "Education is the foundation upon which we build our future.",
        },

        {
          name: "Elin Nordegren",
          text: "Education is one thing no one can take away from you.",
        },
      ];
      const qGrid = $("#testiGrid");
      quotes.forEach((q) => {
        const el = document.createElement("figure");
        el.className = "quote";
        el.innerHTML = `<blockquote>${q.text}</blockquote><figcaption class="muted" style="margin-top:.6rem">— ${q.name}</figcaption>`;
        qGrid.appendChild(el);
      });

      // ===== Contact form (client-side only) =====
      const form = $("#contactForm");
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form).entries());
        const valid = form.checkValidity();
        if (!valid) {
          $("#formMsg").textContent = "Please complete required fields.";
          return;
        }
        $("#formMsg").textContent = "Sending…";
        // Example: open mail client (no backend needed). Replace address to yours.
        const subject = encodeURIComponent(
          `[Training Inquiry] ${data.topic} – ${data.name}`
        );
        const body = encodeURIComponent(
          `Name: ${data.name}\nEmail: ${data.email}\nOrganization: ${
            data.org || "-"
          }\nTopic: ${data.topic}\n\nMessage:\n${data.message}`
        );
        window.location.href = `mailto:hello@edutrainer.com?subject=${subject}&body=${body}`;
        setTimeout(() => {
          $("#formMsg").textContent =
            "Thanks! Your email draft should be open.";
        }, 600);
        form.reset();
      });

      // Enroll click open each course

      document.addEventListener("click", (e) => {
        const id = e.target?.dataset?.enroll;
        if (id) {
          const c = courses.find((x) => String(x.id) === String(id));
          if (c) {
            const enrollUrl = {
              1: "https://reandaily.dev/courses-archive/microsoft-excel-101/",
              2: "https://reandaily.dev/courses-archive/master-microsoft-excel-101-formulas/",
              3: "https://reandaily.dev/courses-archive/python-programming-language-from-zero-to-hero/",
              4: "https://reandaily.dev/courses-archive/advance-custom-format-in-excel/",
              5: "https://reandaily.dev/courses-archive/computer-essentials/",
              6: "#", // Coming soon
            }[id];
            if (enrollUrl) {
              window.open(enrollUrl, "_blank");
            } else {
              alert("Enrollment URL not found for this course.");
            }
          }
        }
      });

      // Back to top button
      const toTop = $("#toTop");
      const backTop = () => {
        const show = window.scrollY > 600;
        toTop.style.opacity = show ? 1 : 0;
        toTop.style.pointerEvents = show ? "auto" : "none";
      };
      window.addEventListener("scroll", backTop);
      toTop.addEventListener("click", () =>
        window.scrollTo({ top: 0, behavior: "smooth" })
      );

      // Current year
      $("#year").textContent = new Date().getFullYear();

      // ===== Small intersection reveal animation =====
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((ent) => {
            if (ent.isIntersecting) {
              ent.target.animate(
                [
                  { opacity: 0, transform: "translateY(10px)" },
                  { opacity: 1, transform: "translateY(0)" },
                ],
                { duration: 500, easing: "ease-out", fill: "forwards" }
              );
              observer.unobserve(ent.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      $$(".section, .card, .skill, .quote, .client").forEach((el) =>
        observer.observe(el)
      );
    </script>
