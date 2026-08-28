/*
  ================================================================
  js/render/galleryGrid.js — Gallery Grid + Lightbox
  ================================================================
  Renders a grid of images into a container, and wires up a simple
  click-to-enlarge lightbox (new — the old site's gallery was
  grid-only). No dependencies, no library — just a modal overlay with
  prev/next and Escape-to-close, consistent with the rest of the site.

  Every gallery grid rendered by this file shares one lightbox that's
  built lazily on first use, so multiple grids on the same page (e.g.
  "Current Builds" and "Completed Builds") can each open it correctly
  with their own image set.

  Focus management: opening moves focus to the close button and
  remembers whatever had focus beforehand (the grid item that was
  activated); Tab/Shift+Tab cycle within the lightbox's own buttons
  while it's open; closing (via Escape, the close button, or clicking
  the overlay) returns focus to that original element. See DECISIONS.md
  D20.
  ================================================================
*/

function renderGalleryGrid(images, containerId) {
  var container = document.getElementById(containerId);
  if (!container) return;

  if (!images || !images.length) {
    container.innerHTML =
      '<div style="grid-column:1/-1; text-align:center; padding:3rem 2rem; color:var(--dim);">' +
        '<div style="font-size:2.5rem; margin-bottom:1rem; opacity:0.4;">&#128247;</div>' +
        '<p style="color:var(--dim);">Photos coming soon.</p>' +
      '</div>';
    return;
  }

  container.innerHTML = images.map(function (img, i) {
    return '<div class="gallery-item" data-idx="' + i + '" tabindex="0" role="button" ' +
      'aria-label="View full-size: ' + img.alt + '">' +
      '<img src="' + img.src + '" alt="' + img.alt + '" loading="lazy" ' +
        'onload="this.classList.add(\'loaded\')" ' +
        'onerror="this.parentElement.innerHTML=\'<div class=gallery-placeholder><span class=gp-icon>&#128247;</span><span>Photo coming soon</span></div>\'">' +
    '</div>';
  }).join('');

  container.querySelectorAll('.gallery-item').forEach(function (item) {
    function open() {
      var idx = parseInt(item.getAttribute('data-idx'), 10);
      openLightbox(images, idx);
    }
    item.addEventListener('click', open);
    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open();
      }
    });
  });
}

// ---- Lightbox (shared across all grids on the page) ----

var _lightboxEl = null;
var _lightboxImages = [];
var _lightboxIdx = 0;
var _lightboxTriggerEl = null; // element to restore focus to on close

function _ensureLightbox() {
  if (_lightboxEl) return _lightboxEl;

  var el = document.createElement('div');
  el.className = 'lightbox';
  el.setAttribute('role', 'dialog');
  el.setAttribute('aria-modal', 'true');
  el.setAttribute('aria-label', 'Photo viewer');
  el.innerHTML =
    '<button class="lightbox-close" aria-label="Close">&times;</button>' +
    '<button class="lightbox-arrow lightbox-prev" aria-label="Previous photo">&lsaquo;</button>' +
    '<img class="lightbox-img" alt="">' +
    '<button class="lightbox-arrow lightbox-next" aria-label="Next photo">&rsaquo;</button>' +
    '<div class="lightbox-counter"></div>';

  document.body.appendChild(el);

  el.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  el.querySelector('.lightbox-prev').addEventListener('click', function () { lightboxStep(-1); });
  el.querySelector('.lightbox-next').addEventListener('click', function () { lightboxStep(1); });

  // Click the dark overlay (not the image itself) to close.
  el.addEventListener('click', function (e) {
    if (e.target === el) closeLightbox();
  });

  document.addEventListener('keydown', function (e) {
    if (!el.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxStep(-1);
    if (e.key === 'ArrowRight') lightboxStep(1);
    if (e.key === 'Tab') _trapLightboxFocus(e);
  });

  _lightboxEl = el;
  return el;
}

// Keeps Tab/Shift+Tab cycling within the lightbox's own buttons while
// it's open, instead of moving focus to the page underneath. Only
// considers currently-visible buttons — prev/next are hidden via
// style.display when there's just one photo (see _renderLightboxImage).
function _trapLightboxFocus(e) {
  var focusable = Array.prototype.filter.call(
    _lightboxEl.querySelectorAll('button'),
    function (btn) { return getComputedStyle(btn).display !== 'none'; }
  );
  if (!focusable.length) return;
  var first = focusable[0];
  var last = focusable[focusable.length - 1];

  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

function openLightbox(images, idx) {
  _lightboxTriggerEl = document.activeElement;
  var el = _ensureLightbox();
  _lightboxImages = images;
  _lightboxIdx = idx;
  _renderLightboxImage();
  el.classList.add('open');
  document.body.classList.add('lightbox-open');
  el.querySelector('.lightbox-close').focus();
}

function closeLightbox() {
  if (!_lightboxEl) return;
  _lightboxEl.classList.remove('open');
  document.body.classList.remove('lightbox-open');
  if (_lightboxTriggerEl && document.contains(_lightboxTriggerEl)) {
    _lightboxTriggerEl.focus();
  }
  _lightboxTriggerEl = null;
}

function lightboxStep(delta) {
  var len = _lightboxImages.length;
  _lightboxIdx = (_lightboxIdx + delta + len) % len;
  _renderLightboxImage();
}

function _renderLightboxImage() {
  var img = _lightboxImages[_lightboxIdx];
  var imgEl = _lightboxEl.querySelector('.lightbox-img');
  imgEl.src = img.src;
  imgEl.alt = img.alt;
  _lightboxEl.querySelector('.lightbox-counter').textContent =
    (_lightboxIdx + 1) + ' / ' + _lightboxImages.length;

  var multi = _lightboxImages.length > 1;
  _lightboxEl.querySelector('.lightbox-prev').style.display = multi ? '' : 'none';
  _lightboxEl.querySelector('.lightbox-next').style.display = multi ? '' : 'none';
}
