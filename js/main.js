(function () {
  var header = document.querySelector('.site-header');
  var navToggle = document.querySelector('.nav-toggle');
  var siteNav = document.querySelector('.site-nav');
  var navLinks = document.querySelectorAll('.site-nav a');
  var yearEl = document.getElementById('year');
  var revealEls = document.querySelectorAll('.reveal');
  var faqButtons = document.querySelectorAll('.faq-question');
  var waitlistForm = document.querySelector('.waitlist-form');
  var heroImage = document.querySelector('.hero-visual img');
  var screenCards = document.querySelectorAll('.screen-card');
  var lightbox = document.getElementById('imageLightbox');
  var lightboxBody = document.querySelector('.lightbox-body');
  var lightboxClose = document.querySelector('.lightbox-close');

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  function onScroll() {
    if (!header) {
      return;
    }

    if (window.scrollY > 8) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = siteNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', function (event) {
      if (!siteNav.contains(event.target) && !navToggle.contains(event.target)) {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Offset sticky header during anchor navigation for a cleaner scroll landing.
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (event) {
      var href = anchor.getAttribute('href');

      if (!href || href === '#') {
        return;
      }

      var target = document.querySelector(href);

      if (!target) {
        return;
      }

      event.preventDefault();
      var offset = 78;
      var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
      history.pushState(null, '', href);
    });
  });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    revealEls.forEach(function (el, index) {
      el.style.transitionDelay = Math.min(index * 30, 220) + 'ms';
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  faqButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var item = button.closest('.faq-item');
      var isActive = item.classList.contains('active');

      document.querySelectorAll('.faq-item.active').forEach(function (openItem) {
        openItem.classList.remove('active');
        var openBtn = openItem.querySelector('.faq-question');
        if (openBtn) {
          openBtn.setAttribute('aria-expanded', 'false');
        }
      });

      if (!isActive) {
        item.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  if (waitlistForm) {
    waitlistForm.addEventListener('submit', function () {
      var submitButton = waitlistForm.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Submitting...';
      }
    });
  }

  function openLightboxImage(src, alt) {
    if (!lightbox || !lightboxBody) {
      return;
    }

    lightboxBody.innerHTML = '';
    var img = document.createElement('img');
    img.className = 'lightbox-image';
    img.src = src;
    img.alt = alt || 'Expanded image preview';
    lightboxBody.appendChild(img);
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
  }

  function openLightboxSprite(viewClass, src) {
    if (!lightbox || !lightboxBody) {
      return;
    }

    lightboxBody.innerHTML = '';
    var sprite = document.createElement('div');
    sprite.className = 'lightbox-sprite ' + viewClass;
    sprite.style.backgroundImage = 'url("' + src + '")';
    lightboxBody.appendChild(sprite);
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
  }

  function closeLightbox() {
    if (!lightbox || !lightboxBody) {
      return;
    }

    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxBody.innerHTML = '';
  }

  if (heroImage) {
    heroImage.addEventListener('click', function () {
      openLightboxImage(heroImage.src, 'Hero product preview');
    });
  }

  screenCards.forEach(function (card) {
    var frame = card.querySelector('.screen-frame');
    var img = card.querySelector('.screen-sprite');

    if (!frame || !img) {
      return;
    }

    frame.addEventListener('click', function () {
      if (card.classList.contains('screen-timeline')) {
        openLightboxSprite('view-timeline', img.src);
      } else if (card.classList.contains('screen-search')) {
        openLightboxSprite('view-search', img.src);
      } else if (card.classList.contains('screen-summary')) {
        openLightboxSprite('view-summary', img.src);
      } else {
        openLightboxSprite('view-album', img.src);
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && lightbox && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });
})();
