// Template library: turns intake data into a full client site.
// This is the "configured, not hand-built" engine the WaaS business model depends on.

function shade(hex, percent) {
  const n = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, (n >> 16) + Math.round(255 * percent)));
  const g = Math.min(255, Math.max(0, ((n >> 8) & 0xff) + Math.round(255 * percent)));
  const b = Math.min(255, Math.max(0, (n & 0xff) + Math.round(255 * percent)));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function esc(str) {
  return (str || '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function servicesList(services) {
  return services.map(s => `<li>${esc(s)}</li>`).join('');
}

function renderSite(data) {
  const templates = { modern: modernTemplate, classic: classicTemplate, bold: boldTemplate };
  const fn = templates[data.template] || modernTemplate;
  return fn(data);
}

function modernTemplate(d) {
  const dark = shade(d.color, -0.35);
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
  <style>
    * { box-sizing: border-box; }
    body { font-family: 'Segoe UI', system-ui, sans-serif; margin: 0; color: #1e293b; }
    header { padding: 64px 32px; text-align: center; background: #fafaf9; }
    header h1 { font-size: 2.4rem; margin: 0 0 12px; }
    header p { color: #64748b; font-size: 1.1rem; }
    .btn { display: inline-block; margin-top: 20px; background: ${d.color}; color: #fff; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; }
    section { padding: 48px 32px; max-width: 720px; margin: 0 auto; }
    h2 { border-left: 4px solid ${d.color}; padding-left: 12px; }
    ul { padding-left: 20px; line-height: 1.9; }
    footer { background: ${dark}; color: #fff; padding: 32px; text-align: center; font-size: 0.9rem; }
  </style></head><body>
    <header>
      <h1>${esc(d.businessName)}</h1>
      <p>${esc(d.tagline)}</p>
      <a class="btn" href="#contact">Contact us</a>
    </header>
    <section>
      <h2>About</h2>
      <p>${esc(d.about)}</p>
    </section>
    ${d.services.length ? `<section><h2>Services</h2><ul>${servicesList(d.services)}</ul></section>` : ''}
    <section id="contact">
      <h2>Visit / Contact</h2>
      <p>${esc(d.address)}<br>${esc(d.phone)} · ${esc(d.email)}</p>
    </section>
    <footer>${esc(d.businessName)} — built with Hive Sites</footer>
  </body></html>`;
}

function classicTemplate(d) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
  <style>
    * { box-sizing: border-box; }
    body { font-family: Georgia, 'Times New Roman', serif; margin: 0; color: #292524; background: #fffdf8; }
    header { padding: 56px 32px; text-align: center; border-bottom: 3px double ${d.color}; }
    header h1 { font-size: 2.2rem; margin: 0 0 8px; letter-spacing: 0.5px; }
    header p { font-style: italic; color: #57534e; }
    section { padding: 40px 32px; max-width: 680px; margin: 0 auto; }
    h2 { font-variant: small-caps; letter-spacing: 1px; color: ${d.color}; border-bottom: 1px solid #e7e5e4; padding-bottom: 6px; }
    ul { padding-left: 20px; line-height: 2; }
    footer { text-align: center; padding: 28px; font-size: 0.85rem; color: #78716c; border-top: 1px solid #e7e5e4; }
  </style></head><body>
    <header>
      <h1>${esc(d.businessName)}</h1>
      <p>${esc(d.tagline)}</p>
    </header>
    <section>
      <h2>Our Story</h2>
      <p>${esc(d.about)}</p>
    </section>
    ${d.services.length ? `<section><h2>What We Offer</h2><ul>${servicesList(d.services)}</ul></section>` : ''}
    <section>
      <h2>Visit Us</h2>
      <p>${esc(d.address)}<br>${esc(d.phone)} · ${esc(d.email)}</p>
    </section>
    <footer>&copy; ${esc(d.businessName)} · site by Hive Sites</footer>
  </body></html>`;
}

function boldTemplate(d) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
  <style>
    * { box-sizing: border-box; }
    body { font-family: 'Segoe UI', system-ui, sans-serif; margin: 0; background: #0f172a; color: #f1f5f9; }
    header { padding: 80px 32px; text-align: center; }
    header h1 { font-size: 3rem; margin: 0 0 12px; font-weight: 800; color: ${d.color}; }
    header p { color: #cbd5e1; font-size: 1.2rem; }
    .btn { display: inline-block; margin-top: 24px; background: ${d.color}; color: #0f172a; padding: 14px 32px; border-radius: 999px; text-decoration: none; font-weight: 700; }
    section { padding: 48px 32px; max-width: 720px; margin: 0 auto; }
    h2 { color: ${d.color}; text-transform: uppercase; letter-spacing: 2px; font-size: 1rem; }
    ul { padding-left: 20px; line-height: 2; }
    footer { background: #000; padding: 28px; text-align: center; font-size: 0.85rem; color: #94a3b8; }
  </style></head><body>
    <header>
      <h1>${esc(d.businessName)}</h1>
      <p>${esc(d.tagline)}</p>
      <a class="btn" href="#contact">Get in touch</a>
    </header>
    <section>
      <h2>About</h2>
      <p style="font-size:1.1rem; color:#e2e8f0;">${esc(d.about)}</p>
    </section>
    ${d.services.length ? `<section><h2>Services</h2><ul>${servicesList(d.services)}</ul></section>` : ''}
    <section id="contact">
      <h2>Contact</h2>
      <p>${esc(d.address)}<br>${esc(d.phone)} · ${esc(d.email)}</p>
    </section>
    <footer>${esc(d.businessName)} — built with Hive Sites</footer>
  </body></html>`;
}
