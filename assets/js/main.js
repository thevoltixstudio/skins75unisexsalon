(function () {
  const fallbackSite = {
    brand: { name: "Skins75", fullName: "Skins75 Unisex Salon & Academy", tagline: "Unisex Salon & Academy" },
    nav: [
      { label: "Home", href: "index.html", page: "home" },
      { label: "About", href: "about.html", page: "about" },
      { label: "Services", href: "services.html", page: "services" },
      { label: "Portfolio", href: "portfolio.html", page: "portfolio" },
      { label: "Courses", href: "courses.html", page: "courses" },
      { label: "Contact", href: "contact.html", page: "contact" }
    ],
    pages: {
      home: {
        hero: { eyebrow: "Salon and academy", title: "Skins75 Unisex Salon & Academy", subtitle: "Beauty services and professional training.", buttons: [{ label: "Book Appointment", href: "contact.html", style: "primary" }] },
        servicesPreview: { eyebrow: "Services", title: "Popular salon services" },
        portfolioPreview: { eyebrow: "Recent work", title: "Fresh looks from the salon floor" },
        reviewsPreview: { eyebrow: "Reviews", title: "Client reviews" }
      },
      about: { eyebrow: "About", title: "About Skins75", intro: "A modern unisex salon and academy.", values: [], teamSection: { eyebrow: "Team", title: "Team members" } },
      services: { eyebrow: "Services", title: "Salon services", intro: "Choose a service and book your appointment." },
      portfolio: { eyebrow: "Portfolio", title: "Salon portfolio", intro: "Browse our recent work." },
      contact: { eyebrow: "Contact", title: "Contact Skins75", intro: "Send your enquiry on WhatsApp." },
      courses: { eyebrow: "Academy", title: "Beauty courses", intro: "Learn practical salon skills." }
    }
  };

  const rawSite = window.Skins75Site || {};
  const site = {
    brand: { ...fallbackSite.brand, ...(rawSite.brand || {}) },
    nav: Array.isArray(rawSite.nav) ? rawSite.nav : fallbackSite.nav,
    pages: { ...fallbackSite.pages, ...(rawSite.pages || {}) }
  };
  const contact = window.Skins75ContactInfo || { whatsappNumber: "", infoSectionTitle: "Salon details", formTitle: "Send enquiry", info: [], formFields: [], map: {} };
  const services = Array.isArray(window.Skins75Services) ? window.Skins75Services : [];
  const courses = Array.isArray(window.Skins75Courses) ? window.Skins75Courses : [];
  const reviews = Array.isArray(window.Skins75Reviews) ? window.Skins75Reviews : [];
  const team = Array.isArray(window.Skins75Team) ? window.Skins75Team : [];
  const heroImages = Array.isArray(window.Skins75HeroImages) && window.Skins75HeroImages.length
    ? window.Skins75HeroImages
    : [{ src: "assets/images/hero-images/hero-1.jpg", alt: "Skins75 salon interior" }];
  const portfolio = window.Skins75Portfolio || { filters: ["All"], gallery: [] };
  portfolio.filters = Array.isArray(portfolio.filters) ? portfolio.filters : ["All"];
  portfolio.gallery = Array.isArray(portfolio.gallery) ? portfolio.gallery : [];
  const footerData = window.Skins75Footer || { heading: site.brand.fullName, text: "", quickLinksTitle: "Quick links", copyright: "All rights reserved." };
  const page = document.body.dataset.page;
  const root = document.getElementById("page-root");

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  function img(src, alt) {
    const image = document.createElement("img");
    image.src = src || "assets/images/salon-hero.svg";
    image.alt = alt || "";
    image.loading = "lazy";
    image.referrerPolicy = "no-referrer";
    image.onerror = () => {
      image.onerror = null;
      image.src = "assets/images/salon-hero.svg";
    };
    return image;
  }

  function bookHref(label) {
    return `contact.html?interest=${encodeURIComponent(label || "Appointment")}`;
  }

  function sectionHead(content) {
    content = content || {};
    const head = el("div", "section-head reveal");
    if (content.eyebrow) head.append(el("p", "eyebrow", content.eyebrow));
    if (content.title) head.append(el("h2", "", content.title));
    if (content.intro || content.subtitle) head.append(el("p", "lead", content.intro || content.subtitle));
    return head;
  }

  function emptyState(message) {
    const card = el("article", "card card-body empty-state reveal");
    card.append(el("h3", "", "Nothing to show yet"), el("p", "muted-text", message));
    return card;
  }

  function renderShell() {
    const header = document.getElementById("site-header");
    header.className = "site-header";

    const nav = el("nav", "nav container");
    const brand = el("a", "brand");
    brand.href = "index.html";
    brand.innerHTML = `<span>${site.brand.name}</span><small>${site.brand.tagline}</small>`;

    const toggle = el("button", "nav-toggle");
    toggle.type = "button";
    toggle.setAttribute("aria-label", "Open menu");
    toggle.setAttribute("aria-expanded", "false");
    toggle.innerHTML = "<span></span>";

    const menu = el("div", "nav-menu");
    site.nav.forEach((item) => {
      const link = el("a", item.page === page ? "is-active" : "", item.label);
      link.href = item.href;
      menu.append(link);
    });

    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.append(brand, toggle, menu);
    header.replaceChildren(nav);

    const footer = document.getElementById("site-footer");
    footer.className = "site-footer";
    const footerWrap = el("div", "container footer-grid");
    const about = el("div");
    about.append(el("h3", "", footerData.heading), el("p", "", footerData.text));
    const linksBlock = el("div");
    linksBlock.append(el("h3", "", footerData.quickLinksTitle));
    const links = el("div", "footer-links");
    site.nav.forEach((item) => {
      const link = el("a", "", item.label);
      link.href = item.href;
      links.append(link);
    });
    linksBlock.append(links, el("p", "", `Copyright ${new Date().getFullYear()} ${site.brand.fullName}. ${footerData.copyright}`));
    footerWrap.append(about, linksBlock);
    footer.replaceChildren(footerWrap);

    if (!document.querySelector(".floating-cta")) {
      const floating = el("a", "floating-cta", "Book Now");
      floating.href = "contact.html";
      floating.setAttribute("aria-label", "Book appointment");
      document.body.append(floating);
    }
  }

  function renderPageIntro(content) {
    content = content || { eyebrow: "", title: site.brand.fullName, intro: "" };
    const section = el("section", "page-hero section");
    const wrap = el("div", "container");
    const head = el("div", "section-head reveal");
    head.append(el("p", "eyebrow", content.eyebrow), el("h1", "", content.title), el("p", "lead", content.intro));
    wrap.append(head);
    section.append(wrap);
    root.append(section);
  }

  function renderHome() {
    const home = site.pages.home || fallbackSite.pages.home;
    const hero = el("section", "hero");
    const wrap = el("div", "container hero-grid");
    const copy = el("div", "reveal hero-copy");
    copy.append(el("p", "eyebrow", home.hero.eyebrow), el("h1", "", home.hero.title), el("p", "lead", home.hero.subtitle));
    const actions = el("div", "hero-actions");
    (home.hero.buttons || []).forEach((button) => {
      const link = el("a", button.style === "secondary" ? "btn btn-secondary" : "btn", button.label);
      link.href = button.href;
      actions.append(link);
    });
    copy.append(actions);
    const panel = el("div", "hero-panel reveal");
    const heroImage = img(heroImages[0].src, heroImages[0].alt);
    heroImage.className = "hero-slider-image";
    panel.append(heroImage);
    wrap.append(copy, panel);
    hero.append(wrap);
    root.append(hero);
    startHeroImageSlider(heroImage, heroImages, 5000);

    renderServicePreview(home.servicesPreview);
    renderRotatingPortfolio(home.portfolioPreview, 3, 10000);
    renderRotatingReviews(home.reviewsPreview, 3, 10000);
  }

  function startHeroImageSlider(image, images, intervalMs) {
    if (!image || !Array.isArray(images) || images.length < 2) return;

    let index = 0;
    setInterval(() => {
      index = (index + 1) % images.length;
      image.classList.add("is-changing");

      setTimeout(() => {
        image.src = images[index].src;
        image.alt = images[index].alt || "Skins75 salon";
        image.classList.remove("is-changing");
      }, 220);
    }, intervalMs);
  }

  function allServiceItems() {
    return services.flatMap((group) => {
      const items = Array.isArray(group.items) ? group.items : [];
      return items.map((item) => ({ ...item, category: group.category || "Service" }));
    });
  }

  function renderServicePreview(content) {
    const section = el("section", "section");
    const wrap = el("div", "container");
    wrap.append(sectionHead(content));
    const grid = el("div", "cards-4");
    allServiceItems().slice(0, 4).forEach((service) => grid.append(serviceCard(service, true)));
    if (!grid.children.length) grid.append(emptyState("Services will appear here after you add them in services.js."));
    wrap.append(grid);
    section.append(wrap);
    root.append(section);
  }

  function serviceCard(service, compact) {
    const card = el("article", "card service-card reveal");
    if (service.image) card.append(img(service.image, service.name));
    const body = el("div", "card-body");
    body.append(
      el("span", "tag", service.category || "Service"),
      el("h3", "", service.name || "Service"),
      el("p", "", service.desc || ""),
      el("p", "price", service.price || "")
    );
    const link = el("a", "btn", "Book Now");
    link.href = bookHref(service.name || "Service");
    body.append(link);
    if (!compact) card.dataset.service = service.name || "";
    card.append(body);
    return card;
  }

  function renderServices() {
    renderPageIntro(site.pages.services);
    const section = el("section", "section section-alt");
    const wrap = el("div", "container");
    const filters = el("div", "filters service-filters");
    const grid = el("div", "cards-4 service-filter-grid");
    const categories = ["All", ...services.map((group) => group.category).filter(Boolean)];
    let currentFilter = "All";

    function draw() {
      const items = allServiceItems().filter((item) => currentFilter === "All" || item.category === currentFilter);
      grid.replaceChildren(...items.map((service) => serviceCard(service)));
      if (!grid.children.length) grid.append(emptyState("No services found in this category."));
      revealOnScroll();
    }

    categories.forEach((category, index) => {
      const button = el("button", `filter-btn${index === 0 ? " is-active" : ""}`, category);
      button.type = "button";
      button.addEventListener("click", () => {
        currentFilter = category;
        filters.querySelectorAll(".filter-btn").forEach((btn) => btn.classList.remove("is-active"));
        button.classList.add("is-active");
        draw();
      });
      filters.append(button);
    });

    draw();
    wrap.append(filters, grid);
    section.append(wrap);
    root.append(section);
  }

  function renderRotatingPortfolio(content, visibleCount, intervalMs) {
    const section = el("section", "section section-alt");
    const wrap = el("div", "container");
    wrap.append(sectionHead(content));
    const grid = el("div", "gallery-grid rotating-gallery");
    wrap.append(grid);
    section.append(wrap);
    root.append(section);
    startRotatingCards(grid, portfolio.gallery, visibleCount, intervalMs, galleryCard);
  }

  function galleryCard(item) {
    const figure = el("figure", "gallery-card reveal");
    figure.append(img(item.image, item.title), el("figcaption", "", `${item.title} - ${item.category}`));
    return figure;
  }

  function renderPortfolio() {
    renderPageIntro(site.pages.portfolio);
    const section = el("section", "section section-alt");
    const wrap = el("div", "container");
    const filters = el("div", "filters");
    const grid = el("div", "gallery-grid");
    let currentFilter = "All";
    let start = 0;

    function filteredItems() {
      return portfolio.gallery.filter((item) => currentFilter === "All" || item.category === currentFilter);
    }

    function draw() {
      const items = filteredItems();
      const ordered = rotateList(items, start).slice(0, Math.min(4, items.length));
      grid.replaceChildren(...ordered.map(galleryCard));
      if (!grid.children.length) grid.append(emptyState("Portfolio items will appear here after you add them in portfolio.js."));
      revealOnScroll();
    }

    portfolio.filters.forEach((filter, index) => {
      const button = el("button", `filter-btn${index === 0 ? " is-active" : ""}`, filter);
      button.type = "button";
      button.addEventListener("click", () => {
        currentFilter = filter;
        start = 0;
        filters.querySelectorAll(".filter-btn").forEach((btn) => btn.classList.remove("is-active"));
        button.classList.add("is-active");
        draw();
      });
      filters.append(button);
    });

    draw();
    setInterval(() => {
      const count = filteredItems().length;
      if (count > 1) {
        start = (start + 1) % count;
        draw();
      }
    }, 5000);

    wrap.append(filters, grid);
    section.append(wrap);
    root.append(section);
  }

  function renderRotatingReviews(content, visibleCount, intervalMs) {
    const section = el("section", "section");
    const wrap = el("div", "container");
    wrap.append(sectionHead(content));
    const grid = el("div", "testimonial-track");
    wrap.append(grid);
    section.append(wrap);
    root.append(section);
    startRotatingCards(grid, reviews, visibleCount, intervalMs, reviewCard);
  }

  function reviewCard(item) {
    const card = el("article", "card card-body testimonial-card reveal is-active");
    card.append(el("p", "", `"${item.quote || ""}"`), el("h3", "", item.name || "Client"), el("p", "muted-text", item.role || ""));
    return card;
  }

  function renderAbout() {
    const about = site.pages.about || fallbackSite.pages.about;
    renderPageIntro(about);
    const values = el("section", "section section-alt");
    const valueWrap = el("div", "container split-grid");
    (about.values || []).forEach((item) => {
      const card = el("article", "card card-body reveal");
      card.append(el("h2", "", item.title), el("p", "", item.text));
      valueWrap.append(card);
    });
    if (!valueWrap.children.length) valueWrap.append(emptyState("About content can be added in site-data.js."));
    values.append(valueWrap);
    root.append(values);

    const teamSection = el("section", "section");
    const wrap = el("div", "container");
    wrap.append(sectionHead(about.teamSection));
    const grid = el("div", "team-grid");
    team.forEach((member) => {
      const card = el("article", "card reveal");
      card.append(img(member.image, member.name));
      const body = el("div", "card-body");
      body.append(el("span", "tag", member.role || "Team"), el("h3", "", member.name || "Team member"), el("p", "", member.bio || ""));
      card.append(body);
      grid.append(card);
    });
    if (!grid.children.length) grid.append(emptyState("Team members will appear here after you add them in team-members.js."));
    wrap.append(grid);
    teamSection.append(wrap);
    root.append(teamSection);
  }

  function renderCourses() {
    renderPageIntro(site.pages.courses);
    const section = el("section", "section section-alt");
    const wrap = el("div", "container course-grid");
    courses.forEach((course) => {
      const card = el("article", "card course-card reveal");
      if (course.image) card.append(img(course.image, course.title));
      const body = el("div", "card-body");
      body.append(el("h3", "", course.title || "Course"), el("p", "", course.duration || ""), el("p", "price", course.price || ""));
      const list = el("ul", "list");
      (course.features || []).forEach((feature) => list.append(el("li", "", feature)));
      const link = el("a", "btn", "Book Now");
      link.href = bookHref(course.title || "Course");
      body.append(list, link);
      card.append(body);
      wrap.append(card);
    });
    if (!wrap.children.length) wrap.append(emptyState("Courses will appear here after you add them in courses.js."));
    section.append(wrap);
    root.append(section);
  }

  function renderContact() {
    renderPageIntro(site.pages.contact);
    const section = el("section", "section section-alt");
    const wrap = el("div", "container contact-grid");
    const infoCard = el("article", "card card-body reveal");
    const list = el("dl", "info-list");
    (Array.isArray(contact.info) ? contact.info : []).forEach((item) => {
      const row = el("div");
      row.append(el("dt", "", item.label), el("dd", "", item.value));
      list.append(row);
    });
    if (!list.children.length) list.append(el("div", "", "Contact details can be added in contact-info.js."));
    infoCard.append(el("h2", "", contact.infoSectionTitle || "Salon details"), list);

    const formCard = el("article", "card card-body reveal");
    const form = el("form", "form");
    const params = new URLSearchParams(window.location.search);
    (Array.isArray(contact.formFields) ? contact.formFields : []).forEach((field) => {
      const fieldWrap = el("div", "field");
      const label = el("label", "", field.label);
      label.setAttribute("for", field.name);
      const input = document.createElement(field.type === "textarea" ? "textarea" : "input");
      input.id = field.name;
      input.name = field.name;
      if (field.type !== "textarea") input.type = field.type || "text";
      input.placeholder = field.placeholder || "";
      input.required = true;
      if (field.name === "interest" && params.get("interest")) input.value = params.get("interest");
      fieldWrap.append(label, input);
      form.append(fieldWrap);
    });
    const submit = el("button", "btn", "Send on WhatsApp");
    submit.type = "submit";
    form.append(submit);
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const message = [
        "Hello Skins75, I want to book an appointment.",
        `Name: ${formData.get("name") || ""}`,
        `Phone: ${formData.get("phone") || ""}`,
        `Service/Course: ${formData.get("interest") || ""}`,
        `Message: ${formData.get("message") || ""}`
      ].join("\n");
      window.location.href = `https://wa.me/${contact.whatsappNumber || ""}?text=${encodeURIComponent(message)}`;
    });
    formCard.append(el("h2", "", contact.formTitle || "Send enquiry"), form);

    wrap.append(infoCard, formCard);
    section.append(wrap);
    root.append(section);

    const mapSection = el("section", "section");
    const mapWrap = el("div", "container reveal");
    mapWrap.append(sectionHead(contact.map));
    if (contact.map && contact.map.src) {
      const map = document.createElement("iframe");
      map.className = "map";
      map.title = contact.map.iframeTitle || "Map";
      map.src = contact.map.src;
      map.allowFullscreen = true;
      map.loading = "lazy";
      map.referrerPolicy = "no-referrer-when-downgrade";
      mapWrap.append(map);
    }
    mapSection.append(mapWrap);
    root.append(mapSection);
  }

  function rotateList(items, start) {
    if (!items.length) return [];
    return items.map((_, index) => items[(start + index) % items.length]);
  }

  function startRotatingCards(container, items, visibleCount, intervalMs, cardFactory) {
    if (!Array.isArray(items) || !items.length) {
      container.replaceChildren(emptyState("Content will appear here after you add it in the matching JS file."));
      return;
    }

    let start = 0;
    function draw() {
      const visible = rotateList(items, start).slice(0, Math.min(visibleCount, items.length));
      container.replaceChildren(...visible.map(cardFactory));
      revealOnScroll();
    }
    draw();
    setInterval(() => {
      if (items.length > visibleCount) {
        start = (start + 1) % items.length;
        draw();
      }
    }, intervalMs);
  }

  function revealOnScroll() {
    const items = document.querySelectorAll(".reveal:not(.is-visible)");
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    items.forEach((item) => observer.observe(item));
  }

  function renderCurrentPage() {
    try {
      root.replaceChildren();
      if (page === "home") renderHome();
      if (page === "about") renderAbout();
      if (page === "services") renderServices();
      if (page === "portfolio") renderPortfolio();
      if (page === "contact") renderContact();
      if (page === "courses") renderCourses();
      revealOnScroll();
    } catch (error) {
      root.replaceChildren(emptyState("Please check the latest edit in your JS data file. The page is protected from going fully blank."));
      console.error(error);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderShell();
    renderCurrentPage();
  });
})();
