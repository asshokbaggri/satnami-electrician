// ===== Smooth anchor scroll (native behavior via CSS is used; keeping JS minimal) =====

// ===== Team Slider =====
(function(){
  const slider = document.querySelector('.team-slider');
  if(!slider) return;
  const track = slider.querySelector('.track');
  const slides = Array.from(track.children);
  const prev = slider.querySelector('.prev');
  const next = slider.querySelector('.next');
  const dotsWrap = slider.querySelector('.dots');
  let index = 0;

  function renderDots(){
    dotsWrap.innerHTML = '';
    slides.forEach((_, i)=>{
      const b = document.createElement('button');
      if(i===index) b.classList.add('active');
      b.addEventListener('click', ()=>go(i));
      dotsWrap.appendChild(b);
    });
  }
  function go(i){
    index = (i+slides.length)%slides.length;
    track.style.transform = `translateX(-${index*100}%)`;
    renderDots();
  }

  prev.addEventListener('click', ()=>go(index-1));
  next.addEventListener('click', ()=>go(index+1));
  renderDots();

  // Autoplay
  let auto = setInterval(()=>go(index+1), 4000);
  slider.addEventListener('mouseenter', ()=>clearInterval(auto));
  slider.addEventListener('mouseleave', ()=>auto = setInterval(()=>go(index+1), 4000));
})();

// ===== Gallery Masonry + Lightbox =====
// Put your image/video file names (inside /images) here. Order = top to bottom.
const GALLERY_ITEMS = [
  // Examples:
  // { type: 'img', src: 'images/work1.jpg' },
  // { type: 'img', src: 'images/work2.jpg' },
  // { type: 'vid', src: 'images/work3.mp4' },
];

(function(){
  const grid = document.getElementById('galleryGrid');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeBtn = document.querySelector('.lightbox-close');

  if(!grid) return;

  function addItem(item){
    const wrap = document.createElement('div');
    wrap.className = 'masonry-item';
    if(item.type === 'img'){
      const img = document.createElement('img');
      img.loading = 'lazy';
      img.src = item.src;
      img.alt = 'Work photo';
      img.addEventListener('click', ()=>openLightbox(item.src));
      wrap.appendChild(img);
    }else if(item.type === 'vid'){
      const v = document.createElement('video');
      v.controls = true;
      v.innerHTML = `<source src="${item.src}" type="video/mp4">`;
      wrap.appendChild(v);
    }
    grid.appendChild(wrap);
  }

  function openLightbox(src){
    lightboxImg.src = src;
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden','false');
  }
  function closeLightbox(){
    lightbox.classList.remove('show');
    lightbox.setAttribute('aria-hidden','true');
    lightboxImg.src = '';
  }

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e)=>{ if(e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeLightbox(); });

  // Build grid
  GALLERY_ITEMS.forEach(addItem);
})();
