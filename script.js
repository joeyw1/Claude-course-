/* =========================================================
   Wellview Family Clinic — Behavior
   Sections: Mobile nav toggle, Scroll fade-in, Form handling,
   Footer year
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Scroll fade-in ---------- */
  const fadeEls = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  fadeEls.forEach((el) => observer.observe(el));

  /* ---------- Enquiry form handling ---------- */
  const form = document.getElementById('enquiryForm');
  const successBanner = document.getElementById('formSuccess');

  const fields = {
    fullName: { el: document.getElementById('fullName'), errorEl: document.getElementById('fullNameError') },
    email: { el: document.getElementById('email'), errorEl: document.getElementById('emailError') },
    phone: { el: document.getElementById('phone'), errorEl: document.getElementById('phoneError') },
    preferredDate: { el: document.getElementById('preferredDate'), errorEl: document.getElementById('preferredDateError') },
    message: { el: document.getElementById('message'), errorEl: document.getElementById('messageError') },
  };

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const PHONE_REGEX = /^[\d\s()+-]{7,}$/;

  function setError(fieldKey, message) {
    const { el, errorEl } = fields[fieldKey];
    errorEl.textContent = message;
    if (message) {
      el.setAttribute('aria-invalid', 'true');
    } else {
      el.removeAttribute('aria-invalid');
    }
  }

  function validate() {
    let firstInvalid = null;
    let isValid = true;

    // Full Name
    if (!fields.fullName.el.value.trim()) {
      setError('fullName', 'Please enter your full name.');
      isValid = false;
      firstInvalid = firstInvalid || fields.fullName.el;
    } else {
      setError('fullName', '');
    }

    // Email
    const emailValue = fields.email.el.value.trim();
    if (!emailValue) {
      setError('email', 'Please enter your email address.');
      isValid = false;
      firstInvalid = firstInvalid || fields.email.el;
    } else if (!EMAIL_REGEX.test(emailValue)) {
      setError('email', 'Please enter a valid email address.');
      isValid = false;
      firstInvalid = firstInvalid || fields.email.el;
    } else {
      setError('email', '');
    }

    // Phone
    const phoneValue = fields.phone.el.value.trim();
    if (!phoneValue) {
      setError('phone', 'Please enter your phone number.');
      isValid = false;
      firstInvalid = firstInvalid || fields.phone.el;
    } else if (!PHONE_REGEX.test(phoneValue)) {
      setError('phone', 'Please enter a valid phone number.');
      isValid = false;
      firstInvalid = firstInvalid || fields.phone.el;
    } else {
      setError('phone', '');
    }

    // Preferred Date & Message are optional — no validation required
    setError('preferredDate', '');
    setError('message', '');

    return { isValid, firstInvalid };
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    successBanner.hidden = true;

    const { isValid, firstInvalid } = validate();

    if (!isValid) {
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const formData = {
      fullName: fields.fullName.el.value.trim(),
      email: fields.email.el.value.trim(),
      phone: fields.phone.el.value.trim(),
      preferredDate: fields.preferredDate.el.value,
      message: fields.message.el.value.trim(),
      submittedAt: new Date().toISOString(),
    };

    // TODO: Replace with a real API call once a backend is available, e.g.:
    // fetch('/api/appointments', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // });
    console.log('New appointment request:', formData);

    successBanner.hidden = false;
    form.reset();
    Object.keys(fields).forEach((key) => setError(key, ''));
  });

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();
});
