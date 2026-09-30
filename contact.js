document.querySelectorAll('[data-demo-form]').forEach(form => {
  const status = form.querySelector('[role="status"]');
  const submit = form.querySelector('[type="submit"]');
  form.addEventListener('submit', async event => {
    event.preventDefault(); event.stopImmediatePropagation();
    if (!form.reportValidity() || submit.disabled) return;
    submit.disabled = true; status.textContent = 'Saving request…';
    try {
      const response = await fetch(form.dataset.endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Unable to save your request.');
      status.textContent = `Request saved in this local demo. Reference: ${result.id}`; form.reset();
    } catch { status.textContent = 'Unable to save. Start the Node backend, then try again. Your input is still here.'; }
    finally { submit.disabled = false; }
  }, true);
});
