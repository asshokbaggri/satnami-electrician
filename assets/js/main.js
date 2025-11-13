/* =========================================
   ✅ MOBILE MENU — FIXED VERSION (works on all mobile browsers)
========================================= */
(function () {
  const btn = document.querySelector(".hamburger.only-mobile");
  const menu = document.getElementById("mobileMenu");

  if (!btn || !menu) return;

  // ✅ Open Menu
  function openMenu() {
    menu.classList.add("show");
    btn.setAttribute("aria-expanded", "true");
    menu.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    document.body.classList.add("menu-open"); // NEW FIX
  }

  // ✅ Close Menu
  function closeMenu() {
    menu.classList.remove("show");
    btn.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    document.body.classList.remove("menu-open"); // NEW FIX
  }

  // ✅ Toggle Menu
  function toggleMenu() {
    if (menu.classList.contains("show")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // ✅ Click hamburger → toggle
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // ✅ Click menu links → close
  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => closeMenu());
  });

  // ✅ Click outside (background click) → close
  document.addEventListener("click", (e) => {
    if (
      menu.classList.contains("show") &&
      !menu.contains(e.target) &&
      !btn.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // ✅ Swipe-down to close (mobile)
  let startY = 0;
  menu.addEventListener("touchstart", (e) => {
    startY = e.touches[0].clientY;
  });

  menu.addEventListener("touchmove", (e) => {
    const currentY = e.touches[0].clientY;
    if (currentY - startY > 80) {
      closeMenu();
    }
  });

   // ✅ SAFETY FALLBACK — tap anywhere outside closes menu even if overlay bug occurs
document.addEventListener("touchend", (e) => {
  if (
    menu.classList.contains("show") &&
    !menu.contains(e.target) &&
    !btn.contains(e.target)
  ) {
    closeMenu();
  }
});


  // ✅ Escape key to close (desktop testing or keyboard users)
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("show")) {
      closeMenu();
    }
  });
})();

/* =========================================
   ✅ TEAM SLIDER
========================================= */
(function () {
  const slider = document.querySelector(".team-slider");
  if (!slider) return;

  const track = slider.querySelector(".track");
  const slides = Array.from(track.children);
  const prev = slider.querySelector(".prev");
  const next = slider.querySelector(".next");
  const dotsWrap = slider.querySelector(".dots");

  let index = 0;

  function renderDots() {
    dotsWrap.innerHTML = "";
    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      if (i === index) dot.classList.add("active");
      dot.addEventListener("click", () => go(i));
      dotsWrap.appendChild(dot);
    });
  }

  function go(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    renderDots();
  }

  prev.addEventListener("click", () => go(index - 1));
  next.addEventListener("click", () => go(index + 1));

  renderDots();

  let auto = setInterval(() => go(index + 1), 4000);

  slider.addEventListener("mouseenter", () => clearInterval(auto));
  slider.addEventListener("mouseleave", () => {
    auto = setInterval(() => go(index + 1), 4000);
  });
})();

/* =========================================
   ✅ GALLERY ITEMS (67 images + 3 videos)
========================================= */
const GALLERY_ITEMS = [
  { type: "img", src: "images/work01.JPG" },
  { type: "img", src: "images/work02.JPG" },
  { type: "img", src: "images/work03.JPG" },
  { type: "img", src: "images/work04.JPG" },
  { type: "img", src: "images/work05.JPG" },
  { type: "img", src: "images/work06.JPG" },
  { type: "img", src: "images/work07.JPG" },
  { type: "img", src: "images/work08.JPG" },
  { type: "img", src: "images/work09.JPG" },
  { type: "img", src: "images/work10.JPG" },

  { type: "img", src: "images/work11.JPG" },
  { type: "img", src: "images/work12.JPG" },
  { type: "img", src: "images/work13.JPG" },
  { type: "img", src: "images/work14.JPG" },
  { type: "img", src: "images/work15.JPG" },
  { type: "img", src: "images/work16.JPG" },
  { type: "img", src: "images/work17.JPG" },
  { type: "img", src: "images/work18.JPG" },
  { type: "img", src: "images/work19.JPG" },
  { type: "img", src: "images/work20.JPG" },

  { type: "img", src: "images/work21.JPG" },
  { type: "img", src: "images/work22.JPG" },
  { type: "img", src: "images/work23.JPG" },
  { type: "img", src: "images/work24.JPG" },
  { type: "img", src: "images/work25.JPG" },
  { type: "img", src: "images/work26.JPG" },
  { type: "img", src: "images/work27.JPG" },
  { type: "img", src: "images/work28.JPG" },
  { type: "img", src: "images/work29.JPG" },
  { type: "img", src: "images/work30.JPG" },

  { type: "img", src: "images/work31.JPG" },
  { type: "img", src: "images/work32.JPG" },
  { type: "img", src: "images/work33.JPG" },
  { type: "img", src: "images/work34.JPG" },
  { type: "img", src: "images/work35.JPG" },
  { type: "img", src: "images/work36.JPG" },
  { type: "img", src: "images/work37.JPG" },
  { type: "img", src: "images/work38.JPG" },
  { type: "img", src: "images/work39.JPG" },
  { type: "img", src: "images/work40.JPG" },

  { type: "img", src: "images/work41.JPG" },
  { type: "img", src: "images/work42.JPG" },
  { type: "img", src: "images/work43.JPG" },
  { type: "img", src: "images/work44.JPG" },
  { type: "img", src: "images/work45.JPG" },
  { type: "img", src: "images/work46.JPG" },
  { type: "img", src: "images/work47.JPG" },
  { type: "img", src: "images/work48.JPG" },
  { type: "img", src: "images/work49.JPG" },
  { type: "img", src: "images/work50.JPG" },

  { type: "img", src: "images/work51.JPG" },
  { type: "img", src: "images/work52.JPG" },
  { type: "img", src: "images/work53.JPG" },
  { type: "img", src: "images/work54.JPG" },
  { type: "img", src: "images/work55.JPG" },
  { type: "img", src: "images/work56.JPG" },
  { type: "img", src: "images/work57.JPG" },
  { type: "img", src: "images/work58.JPG" },
  { type: "img", src: "images/work59.JPG" },
  { type: "img", src: "images/work60.JPG" },

  { type: "img", src: "images/work61.JPG" },
  { type: "img", src: "images/work62.JPG" },
  { type: "img", src: "images/work63.JPG" },
  { type: "img", src: "images/work64.JPG" },
  { type: "img", src: "images/work65.JPG" },
  { type: "img", src: "images/work66.JPG" },
  { type: "img", src: "images/work67.JPG" },

  { type: "vid", src: "images/video01.MP4" },
  { type: "vid", src: "images/video02.MP4" },
  { type: "vid", src: "images/video03.MP4" },
];

/* =========================================
   ✅ GALLERY — Masonry + Lightbox + Load More
========================================= */
(function () {
  const grid = document.getElementById("galleryGrid");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const closeBtn = document.querySelector(".lightbox-close");
  const loadMoreBtn = document.getElementById("loadMore");
  const counter = document.getElementById("counter");

  if (!grid) return;

  const PAGE_SIZE = 15;
  let rendered = 0;

  function addItem(item) {
    const wrap = document.createElement("div");
    wrap.className = "masonry-item";

    if (item.type === "img") {
      const img = document.createElement("img");
      img.src = item.src;
      img.loading = "lazy";
      img.addEventListener("click", () => openLightbox(item.src));
      wrap.appendChild(img);
    } else if (item.type === "vid") {
      const vid = document.createElement("video");
      vid.controls = true;
      vid.innerHTML = `<source src="${item.src}" type="video/mp4">`;
      wrap.appendChild(vid);
    }

    grid.appendChild(wrap);
  }

  function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add("show");
    lightbox.setAttribute("aria-hidden", "false");
  }

  function closeLightbox() {
    lightbox.classList.remove("show");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
  }

  closeBtn.addEventListener("click", closeLightbox);

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

  function renderChunk() {
    const next = GALLERY_ITEMS.slice(rendered, rendered + PAGE_SIZE);
    next.forEach(addItem);

    rendered += next.length;
    updateCounter();

    if (rendered >= GALLERY_ITEMS.length) {
      loadMoreBtn.style.display = "none";
    }
  }

  function updateCounter() {
    counter.textContent = `${rendered}/${GALLERY_ITEMS.length} shown`;
  }

  loadMoreBtn.addEventListener("click", renderChunk);

  renderChunk();
})();
