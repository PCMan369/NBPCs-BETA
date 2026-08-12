/*
  ================================================================
  js/render/chrome.js — Shared Page Chrome
  ================================================================
  Handles behavior that's identical on every page: mobile nav toggle,
  scroll progress bar, back-to-top button, footer year, and the
  toggle-driven phone/social links in the footer.

  The old site had a version of this copy-pasted inline into all 8
  HTML files. Load this one file on every page instead.

  Load order matters: js/data/config.js must load before this file.
  ================================================================
*/

(function () {

  // ---- Mobile nav toggle ----
  var hamburger = document.getElementById('hamburger');
  var mobileNav = document.getElementById('mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      var isOpen = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    mobileNav.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Back-to-top + scroll progress ----
  var backToTop = document.getElementById('back-to-top');
  var progressBar = document.getElementById('scroll-progress');

  if (backToTop || progressBar) {
    window.addEventListener('scroll', function () {
      if (backToTop) {
        backToTop.classList.toggle('visible', window.scrollY > 400);
      }
      if (progressBar) {
        var scrollTop = window.scrollY;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = progress + '%';
      }
    });
  }

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- Footer year ----
  var yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ---- Toggle-driven footer contact links ----
  // Renders nothing at all unless a feature is both enabled AND has its
  // required value filled in. If it's enabled but the value is missing,
  // this warns loudly in the console (dev-time signal) rather than
  // silently showing a broken link to a customer.
  var footerExtra = document.getElementById('footer-extra');
  if (footerExtra && typeof features !== 'undefined') {
    var links = [];

    if (features.phone && features.phone.show) {
      if (features.phone.number) {
        var display = features.phone.displayFormat || features.phone.number;
        var telHref = features.phone.number.replace(/[^0-9+]/g, '');
        links.push('<a href="tel:' + telHref + '">' + display + '</a>');
      } else {
        console.warn('config.js: features.phone.show is true but no number is set.');
      }
    }

    if (features.facebook && features.facebook.show) {
      if (features.facebook.url) {
        links.push('<a href="' + features.facebook.url + '" target="_blank" rel="noopener">Facebook</a>');
      } else {
        console.warn('config.js: features.facebook.show is true but no url is set.');
      }
    }

    if (links.length) {
      footerExtra.innerHTML = links.join('');
    }
  }

})();
