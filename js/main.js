/**
 * ═══════════════════════════════════════════════════════════════
 * ACM-W NMIMS INDORE — 2026 OFFICIAL WEBSITE RUNTIME
 * Clean, Fast, High-End & Lightweight Architecture
 * ═══════════════════════════════════════════════════════════════
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Initialize Reveal Animations on page load
  initRevealAnimations();

  /* ─────────────────────────────────────────────────────────────
     2. SCROLL PROGRESS BAR & NAVBAR SCROLL BEHAVIOR
  ───────────────────────────────────────────────────────────── */
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  const siteHeader = document.getElementById('siteHeader');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progressRatio = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

    if (scrollProgressBar) {
      scrollProgressBar.style.transform = `scaleX(${progressRatio})`;
    }

    if (siteHeader) {
      if (scrollTop > 40) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollTop > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }

    updateActiveNavLink();
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ─────────────────────────────────────────────────────────────
     3. NAVIGATION ACTIVE SECTION TRACKING & SMOOTH SCROLL
  ───────────────────────────────────────────────────────────── */
  const navLinks = document.querySelectorAll('.nav-pill-link, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id], main[id]');

  function updateActiveNavLink() {
    let currentId = 'home';
    const scrollPos = window.scrollY + 140;

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      const target = link.getAttribute('data-target');
      if (target === currentId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Smooth scroll handler
  document.querySelectorAll('[data-scroll-to]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-scroll-to');
      scrollToSection(targetId);
    });
  });

  window.scrollToSection = function (id) {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 76;
      const elPosition = el.getBoundingClientRect().top;
      const offsetPosition = elPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      closeMobileMenu();
    }
  };

  /* ─────────────────────────────────────────────────────────────
     4. MOBILE MENU DRAWER
  ───────────────────────────────────────────────────────────── */
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const mobileNavClose = document.getElementById('mobileNavClose');

  function openMobileMenu() {
    if (mobileNavOverlay) {
      mobileNavOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileMenu() {
    if (mobileNavOverlay) {
      mobileNavOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileMenu);
  if (mobileNavClose) mobileNavClose.addEventListener('click', closeMobileMenu);

  /* ─────────────────────────────────────────────────────────────
     5. SUBTLE PARALLAX SCROLLING
  ───────────────────────────────────────────────────────────── */
  const heroParallax = document.getElementById('heroParallaxBg');
  const joinParallax = document.getElementById('joinParallaxBg');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (heroParallax && scrollY < window.innerHeight * 1.5) {
      heroParallax.style.transform = `translate3d(0, ${scrollY * 0.22}px, 0)`;
    }

    if (joinParallax) {
      const rect = joinParallax.parentElement.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const offset = (window.innerHeight - rect.top) * 0.1;
        joinParallax.style.transform = `translate3d(0, ${offset - 30}px, 0)`;
      }
    }
  }, { passive: true });

  /* ─────────────────────────────────────────────────────────────
     6. SCROLL REVEAL (INTERSECTION OBSERVER)
  ───────────────────────────────────────────────────────────── */
  function initRevealAnimations() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
    );

    revealElements.forEach((el) => observer.observe(el));
  }

  /* ─────────────────────────────────────────────────────────────
     7. ANIMATED NUMBER COUNTERS (INTERSECTION OBSERVER)
  ───────────────────────────────────────────────────────────── */
  const counterElements = document.querySelectorAll('[data-counter-target]');
  const counterObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-counter-target'), 10);
          const suffix = el.getAttribute('data-counter-suffix') || '';
          animateCounter(el, target, suffix);
          obs.unobserve(el);
        }
      });
    },
    { threshold: 0.2 }
  );

  counterElements.forEach((el) => counterObserver.observe(el));

  function animateCounter(element, target, suffix) {
    const duration = 1600; // ms
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      const currentVal = Math.floor(ease * target);

      element.textContent = `${currentVal}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.textContent = `${target}${suffix}`;
      }
    }

    requestAnimationFrame(step);
  }

  /* ─────────────────────────────────────────────────────────────
     8. 3D TILT EFFECT ON CARDS
  ───────────────────────────────────────────────────────────── */
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach((card) => {
    const intensity = parseFloat(card.getAttribute('data-tilt-intensity')) || 4;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateX = (0.5 - y) * intensity * 2;
      const rotateY = (x - 0.5) * intensity * 2;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  /* ─────────────────────────────────────────────────────────────
     9. INTERACTIVE MODAL DIALOGS (JOIN & EVENT DETAILS)
  ───────────────────────────────────────────────────────────── */
  const joinModalBackdrop = document.getElementById('joinModal');
  const detailsModalBackdrop = document.getElementById('detailsModal');
  const modalCloseBtns = document.querySelectorAll('[data-close-modal]');

  window.openJoinModal = function () {
    if (joinModalBackdrop) {
      joinModalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeAllModals = function () {
    if (joinModalBackdrop) joinModalBackdrop.classList.remove('active');
    if (detailsModalBackdrop) detailsModalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  modalCloseBtns.forEach((btn) => {
    btn.addEventListener('click', closeAllModals);
  });

  [joinModalBackdrop, detailsModalBackdrop].forEach((modal) => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeAllModals();
        }
      });
    }
  });

  // ESC key to close
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
      closeMobileMenu();
    }
  });

  // Modal open triggers
  document.querySelectorAll('[data-open-join]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openJoinModal();
    });
  });

  // Details Modal handler for Events & Projects
  window.openDetailsModal = function (title, category, dateOrYear, description) {
    if (detailsModalBackdrop) {
      document.getElementById('detailsModalTitle').textContent = title;
      document.getElementById('detailsModalCategory').textContent = category;
      document.getElementById('detailsModalDate').textContent = dateOrYear;
      document.getElementById('detailsModalDesc').textContent = description;
      detailsModalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  /* ─────────────────────────────────────────────────────────────
     10. FORM SUBMISSIONS & TOAST NOTIFICATIONS
  ───────────────────────────────────────────────────────────── */
  const joinForm = document.getElementById('joinForm');
  const newsletterForm = document.getElementById('newsletterForm');

  if (joinForm) {
    joinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('joinName').value.trim();
      const email = document.getElementById('joinEmail').value.trim();

      if (!name || !email) {
        showToast('Please fill in all required fields.', 'error');
        return;
      }

      closeAllModals();
      joinForm.reset();
      showToast(`Welcome to ACM-W, ${name}! Your membership request has been received.`, 'success');
    });
  }

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value.trim()) {
        showToast('Thank you! You are now subscribed to ACM-W updates.', 'success');
        emailInput.value = '';
      }
    });
  }

  window.showToast = function (message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <svg class="toast-icon" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
      </svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 20);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  };

  /* ─────────────────────────────────────────────────────────────
     11. REFINED & SUBTLE THREE.JS AMBIENT PARTICLE ENGINE
  ───────────────────────────────────────────────────────────── */
  function initThreeJS() {
    const canvas = document.getElementById('threeCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 180;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

    const group = new THREE.Group();
    scene.add(group);

    // Subtle ambient particle field (clean, understated star/network dust)
    const count = 75;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const velocities = [];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 260;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 180;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 120;
      velocities.push({
        x: (Math.random() - 0.5) * 0.12,
        y: (Math.random() - 0.5) * 0.12,
        z: (Math.random() - 0.5) * 0.12
      });
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x61d9f8,
      size: 3,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending
    });
    const points = new THREE.Points(geometry, material);
    group.add(points);

    // Subtle connecting lines
    const maxLines = 100;
    const linePositions = new Float32Array(maxLines * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x61d9f8,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    group.add(lines);

    // Mouse lerp
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    window.addEventListener('mousemove', (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 0.8;
      targetY = (e.clientY / window.innerHeight - 0.5) * 0.8;
    }, { passive: true });

    let isVisible = true;
    document.addEventListener('visibilitychange', () => {
      isVisible = !document.hidden;
      if (isVisible) requestAnimationFrame(render);
    });

    const render = () => {
      if (!isVisible) return;
      requestAnimationFrame(render);

      mouseX += (targetX - mouseX) * 0.04;
      mouseY += (targetY - mouseY) * 0.04;

      group.rotation.y = mouseX * 0.3 + window.scrollY * 0.0004;
      group.rotation.x = mouseY * 0.2;

      const pos = geometry.attributes.position.array;
      let lineIndex = 0;
      let lineCount = 0;

      for (let i = 0; i < count; i++) {
        pos[i * 3] += velocities[i].x;
        pos[i * 3 + 1] += velocities[i].y;
        pos[i * 3 + 2] += velocities[i].z;

        if (pos[i * 3] < -130 || pos[i * 3] > 130) velocities[i].x = -velocities[i].x;
        if (pos[i * 3 + 1] < -90 || pos[i * 3 + 1] > 90) velocities[i].y = -velocities[i].y;
        if (pos[i * 3 + 2] < -60 || pos[i * 3 + 2] > 60) velocities[i].z = -velocities[i].z;

        for (let j = i + 1; j < count; j++) {
          const dx = pos[i * 3] - pos[j * 3];
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < 42 && lineCount < maxLines) {
            linePositions[lineIndex * 3] = pos[i * 3];
            linePositions[lineIndex * 3 + 1] = pos[i * 3 + 1];
            linePositions[lineIndex * 3 + 2] = pos[i * 3 + 2];

            linePositions[(lineIndex + 1) * 3] = pos[j * 3];
            linePositions[(lineIndex + 1) * 3 + 1] = pos[j * 3 + 1];
            linePositions[(lineIndex + 1) * 3 + 2] = pos[j * 3 + 2];

            lineIndex += 2;
            lineCount++;
          }
        }
      }

      geometry.attributes.position.needsUpdate = true;
      lineGeometry.setDrawRange(0, lineCount * 2);
      lineGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    const handleResize = () => {
      if (!canvas) return;
      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    handleResize();
    render();
  }

  // Initialize Three.js Engine
  initThreeJS();
});
