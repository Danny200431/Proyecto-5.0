var currentLang = 'es';
var lbIndex = 0;
var confImgs = [
  '../img.jpg/foto1.jpeg',
  '../img.jpg/foto2.jpeg',
  '../img.jpg/foto3.jpeg',
  '../img.jpg/foto4.jpeg',
  '../img.jpg/foto5.jpeg',
  '../img.jpg/foto6.jpeg',
  '../img.jpg/foto7.jpeg',
  '../img.jpg/foto8.jpeg',
  '../img.jpg/foto9.jpeg',
  '../img.jpg/foto10.jpeg'
];

function createGallery() {
  var grid = document.getElementById('galeriaGrid');
  if (!grid) return;
  confImgs.forEach(function(src, i) {
    var img = document.createElement('img');
    img.src = src;
    img.alt = 'Foto de conferencia ' + (i + 1);
    img.onclick = function() { openLB(i); };
    grid.appendChild(img);
  });
}

function openLB(i) {
  lbIndex = i;
  document.getElementById('lbImg').src = confImgs[i];
  document.getElementById('lightbox').classList.add('open');
}

function closeLB() {
  document.getElementById('lightbox').classList.remove('open');
}

function changeLB(dir) {
  lbIndex = (lbIndex + dir + confImgs.length) % confImgs.length;
  document.getElementById('lbImg').src = confImgs[lbIndex];
}

document.addEventListener('DOMContentLoaded', function() {
  createGallery();

  document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === this) closeLB();
  });

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(function(el) { observer.observe(el); });

  updateLanguage();
  window.addEventListener('scroll', updateNavActive);
});

function updateLanguage() {
  var all = document.querySelectorAll('[data-lang]');
  all.forEach(function(el) {
    if (el.dataset.lang === currentLang) {
      el.classList.add('visible');
      if (el.tagName === 'SPAN' || el.tagName === 'STRONG') el.style.display = 'inline-block';
      else el.style.display = 'block';
    } else {
      el.classList.remove('visible');
      el.style.display = 'none';
    }
  });
  document.getElementById('langBtn').textContent = currentLang === 'es' ? 'EN' : 'ES';
  var scrollDown = document.querySelector('.scroll-down');
  if (scrollDown) scrollDown.textContent = currentLang === 'es' ? '▼ Desplázate para explorar' : '▼ Scroll to explore';
}

function toggleLang() {
  currentLang = currentLang === 'es' ? 'en' : 'es';
  updateLanguage();
}

function updateNavActive() {
  var sections = ['inicio', 'conferencias', 'glosario', 'etica', 'autor'];
  var nav = document.querySelectorAll('.nav-links a');
  sections.forEach(function(id) {
    var el = document.getElementById(id);
    if (!el) return;
    var rect = el.getBoundingClientRect();
    if (rect.top <= 80 && rect.bottom > 80) {
      nav.forEach(function(a) { a.classList.remove('active'); });
      nav.forEach(function(a) {
        if (a.getAttribute('href') === '#' + id) a.classList.add('active');
      });
    }
  });
}
