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
  // ✅ Photos (67)
  { type: 'img', src: 'images/work01.jpg' },
  { type: 'img', src: 'images/work02.jpg' },
  { type: 'img', src: 'images/work03.jpg' },
  { type: 'img', src: 'images/work04.jpg' },
  { type: 'img', src: 'images/work05.jpg' },
  { type: 'img', src: 'images/work06.jpg' },
  { type: 'img', src: 'images/work07.jpg' },
  { type: 'img', src: 'images/work08.jpg' },
  { type: 'img', src: 'images/work09.jpg' },
  { type: 'img', src: 'images/work10.jpg' },

  { type: 'img', src: 'images/work11.jpg' },
  { type: 'img', src: 'images/work12.jpg' },
  { type: 'img', src: 'images/work13.jpg' },
  { type: 'img', src: 'images/work14.jpg' },
  { type: 'img', src: 'images/work15.jpg' },
  { type: 'img', src: 'images/work16.jpg' },
  { type: 'img', src: 'images/work17.jpg' },
  { type: 'img', src: 'images/work18.jpg' },
  { type: 'img', src: 'images/work19.jpg' },
  { type: 'img', src: 'images/work20.jpg' },

  { type: 'img', src: 'images/work21.jpg' },
  { type: 'img', src: 'images/work22.jpg' },
  { type: 'img', src: 'images/work23.jpg' },
  { type: 'img', src: 'images/work24.jpg' },
  { type: 'img', src: 'images/work25.jpg' },
  { type: 'img', src: 'images/work26.jpg' },
  { type: 'img', src: 'images/work27.jpg' },
  { type: 'img', src: 'images/work28.jpg' },
  { type: 'img', src: 'images/work29.jpg' },
  { type: 'img', src: 'images/work30.jpg' },

  { type: 'img', src: 'images/work31.jpg' },
  { type: 'img', src: 'images/work32.jpg' },
  { type: 'img', src: 'images/work33.jpg' },
  { type: 'img', src: 'images/work34.jpg' },
  { type: 'img', src: 'images/work35.jpg' },
  { type: 'img', src: 'images/work36.jpg' },
  { type: 'img', src: 'images/work37.jpg' },
  { type: 'img', src: 'images/work38.jpg' },
  { type: 'img', src: 'images/work39.jpg' },
  { type: 'img', src: 'images/work40.jpg' },

  { type: 'img', src: 'images/work41.jpg' },
  { type: 'img', src: 'images/work42.jpg' },
  { type: 'img', src: 'images/work43.jpg' },
  { type: 'img', src: 'images/work44.jpg' },
  { type: 'img', src: 'images/work45.jpg' },
  { type: 'img', src: 'images/work46.jpg' },
  { type: 'img', src: 'images/work47.jpg' },
  { type: 'img', src: 'images/work48.jpg' },
  { type: 'img', src: 'images/work49.jpg' },
  { type: 'img', src: 'images/work50.jpg' },

  { type: 'img', src: 'images/work51.jpg' },
  { type: 'img', src: 'images/work52.jpg' },
  { type: 'img', src: 'images/work53.jpg' },
  { type: 'img', src: 'images/work54.jpg' },
  { type: 'img', src: 'images/work55.jpg' },
  { type: 'img', src: 'images/work56.jpg' },
  { type: 'img', src: 'images/work57.jpg' },
  { type: 'img', src: 'images/work58.jpg' },
  { type: 'img', src: 'images/work59.jpg' },
  { type: 'img', src: 'images/work60.jpg' },

  { type: 'img', src: 'images/work61.jpg' },
  { type: 'img', src: 'images/work62.jpg' },
  { type: 'img', src: 'images/work63.jpg' },
  { type: 'img', src: 'images/work64.jpg' },
  { type: 'img', src: 'images/work65.jpg' },
  { type: 'img', src: 'images/work66.jpg' },
  { type: 'img', src: 'images/work67.jpg' },

  // ✅ Videos (3)
  { type: 'vid', src: 'images/video01.mp4' },
  { type: 'vid', src: 'images/video02.mp4' },
  { type: 'vid', src: 'images/video03.mp4' },
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
