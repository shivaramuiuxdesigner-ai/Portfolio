/**
 * CONTACT.JS — Form handling
 */
(function initContactForm() {
  const form   = document.getElementById('contactForm');
  const submit = document.getElementById('submitBtn');
  if (!form || !submit) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      if (!field.value.trim()) {
        valid = false;
        field.style.borderColor = 'rgba(255,80,80,0.5)';
        field.addEventListener('input', () => field.style.borderColor = '', { once: true });
      }
    });
    if (!valid) return;

    // Email format
    const emailField = form.querySelector('[type="email"]');
    if (emailField && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
      emailField.style.borderColor = 'rgba(255,80,80,0.5)';
      return;
    }

    // Send message
    submit.textContent = 'Sending…';
    submit.disabled = true;

    fetch('https://formspree.io/f/mrerayra', {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    })
    .then(res => {
      if (res.ok) {
        submit.textContent = '✓ Message sent — I\'ll be in touch soon!';
        submit.classList.add('form-submit--success');
        form.reset();
        setTimeout(() => {
          submit.textContent = 'Send Message';
          submit.classList.remove('form-submit--success');
        }, 4000);
      } else {
        submit.textContent = 'Something went wrong. Try again.';
      }
      submit.disabled = false;
    })
    .catch(() => {
      submit.textContent = 'Something went wrong. Try again.';
      submit.disabled = false;
    });
  });
})();