// Record existing CTA events in memory only; no network request or persistent storage.
window.gulooConversionEvents = window.gulooConversionEvents || [];
document.querySelectorAll('[data-cta-id]').forEach((element) => {
  element.addEventListener('click', () => {
    const event = {
      event_name: 'cta_clicked',
      cta_id: element.dataset.ctaId || null,
      journey: element.dataset.journey || null,
      source_page: location.pathname,
      occurred_at: new Date().toISOString(),
    };
    window.gulooConversionEvents.push(event);
    window.dispatchEvent(new CustomEvent('guloo:conversion', { detail: event }));
  });
});
