/**
 * CONTACT.JS — Form submission via Formspree
 */
(function initContactForm() {
  const form   = document.getElementById('contactForm');
  const submit = document.getElementById('submitBtn');
  if (!form || !submit) return;

  // Create accessible live region for feedback
  let statusEl = document.getElementById('form-status');
  if (!statusEl) {
    statusEl = document.createElement('p');
    statusEl.id = 'form-status';
    statusEl.setAttribute('aria-live', 'polite');
    statusEl.setAttribute('aria-atomic', 'true');
    statusEl.style.cssText = 'font-size:0.75rem;color:var(--color-text-muted);text-align:center;margin-top:12px;min-height:20px;';
    submit.parentNode.insertBefore(statusEl, submit.nextSibling);
  }

  const setStatus = (msg, isError) => {
    statusEl.textContent = msg;
    statusEl.style.color = isError ? 'var(--color-error)' : 'var(--color-text-muted)';
  };

  // Mark field as invalid
  const markInvalid = (field) => {
    field.classList.add('error');
    field.setAttribute('aria-invalid', 'true');
    field.addEventListener('input', () => {
      field.classList.remove('error');
      field.removeAttribute('aria-invalid');
    }, { once: true });
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    setStatus('');

    // ── Validation ──
    let valid = true;

    form.querySelectorAll('[required]').forEach(field => {
      if (!field.value.trim()) {
        valid = false;
        markInvalid(field);
      }
    });

    // Email format check
    const emailField = form.querySelector('[type="email"]');
    if (emailField && emailField.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailField.value.trim())) {
        valid = false;
        markInvalid(emailField);
        setStatus('Please enter a valid email address.', true);
        emailField.focus();
        return;
      }
    }

    if (!valid) {
      setStatus('Please fill in all required fields.', true);
      // Focus the first invalid field
      const firstInvalid = form.querySelector('.error');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // ── Submit ──
    const originalText = submit.textContent;
    submit.textContent = 'Sending…';
    submit.disabled    = true;
    setStatus('Sending your message…');

    try {
      const res = await fetch('https://formspree.io/f/mrerayra', {
        method:  'POST',
        body:    new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        submit.textContent = '✓ Message sent!';
        submit.classList.add('form-submit--success');
        setStatus("I'll be in touch within 24 hours.");
        form.reset();

        setTimeout(() => {
          submit.textContent = originalText;
          submit.classList.remove('form-submit--success');
          submit.disabled = false;
          setStatus('');
        }, 5000);
      } else {
        const data = await res.json().catch(() => ({}));
        const msg  = data?.errors?.[0]?.message || 'Something went wrong. Please try again.';
        submit.textContent = originalText;
        submit.disabled    = false;
        setStatus(msg, true);
      }
    } catch {
      submit.textContent = originalText;
      submit.disabled    = false;
      setStatus('Network error. Please check your connection and try again.', true);
    }
  });
})();
