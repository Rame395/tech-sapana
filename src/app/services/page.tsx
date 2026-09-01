export default function Services() {
  return (
    <>
      {/* ==========================================================================
       NAVBAR
       ========================================================================== */}

      <main>
        {/* ==========================================================================
       HERO SECTION
       ========================================================================== */}
        <section className="service-hero">
          <div className="w-full max-w-[1240px] mx-auto px-6">
            <div className="hero-grid-split">
              <div>
                <div className="eyebrow">CORE ENGINEERING SERVICE</div>
                <h1 className="title-lg">
                  Custom Software That <span>Fits Your Workflow.</span>
                </h1>
                <p className="desc-lead">
                  No bloated off-the-shelf templates. We engineer secure web
                  applications, automated ERP systems, and management portals
                  tailored precisely around how your business functions.
                </p>
                <div>
                  <button className="btn btn-primary">
                    Scope Your Software
                  </button>
                  <a href="#capabilities" className="btn btn-secondary">
                    Explore Capabilities
                  </a>
                </div>
              </div>

              <div className="mockup-frame-card">
                <div className="mockup-topbar">
                  <div className="mockup-dots">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  <div className="mockup-url-pill">
                    https://app.yourcompany.com/workspace
                  </div>
                  <div></div>
                </div>
                <div className="mockup-screen-body">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&amp;fit=crop&amp;w=900&amp;q=80"
                    alt="Custom software dashboard preview"
                    className="dashboard-preview-img"
                  />
                  <div>
                    <span>STATUS: 200 OK // SECURE SSL</span>
                    <span>● Live System Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================================================
       INTERACTIVE CAPABILITY TOGGLES (CLEAN, NO IMAGE CLUTTER)
       ========================================================================== */}
        <section
          className="section-spacing interactive-capability-section"
          id="capabilities"
        >
          <div className="w-full max-w-[1240px] mx-auto px-6">
            <div>
              <div className="eyebrow">ENGINEERING MODULES</div>
              <h2 className="title-lg">What We Can Build For You.</h2>
              <p>
                Click through our core development modules below to inspect our
                technical delivery focus.
              </p>
            </div>

            {/* Toggle Switcher Bar */}
            <div className="toggle-navigation-bar">
              <button
                className="cap-toggle-btn active"
                data-target="dashboards"
              >
                📊 Dashboards &amp; Portals
              </button>
              <button className="cap-toggle-btn" data-target="erp">
                ⚙️ Custom ERP &amp; CRM
              </button>
              <button className="cap-toggle-btn" data-target="automation">
                🤖 AI &amp; Workflow Bridges
              </button>
              <button className="cap-toggle-btn" data-target="cloud">
                ☁️ Cloud Infrastructure
              </button>
            </div>

            {/* Interactive Display Board */}
            <div className="cap-display-board" id="capBoard">
              <div className="cap-content-col">
                <h3 id="capTitle">
                  Enterprise Dashboards &amp; Client Portals
                </h3>
                <p id="capDesc">
                  Consolidate operations, live tracking, and user analytics into
                  lightning-fast web apps. Built with role-based access control
                  and high-frequency data refresh rates.
                </p>
                <div className="cap-feature-pills">
                  <div className="cap-pill-row">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span id="capPoint1">
                      Role-based user permission matrices
                    </span>
                  </div>
                  <div className="cap-pill-row">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span id="capPoint2">
                      Sub-second data grid rendering &amp; reporting
                    </span>
                  </div>
                  <div className="cap-pill-row">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2.5"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span id="capPoint3">
                      Exportable PDF/Excel reporting modules
                    </span>
                  </div>
                </div>
              </div>

              <div className="cap-image-col">
                <img
                  id="capImage"
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&amp;fit=crop&amp;w=900&amp;q=80"
                  alt="Capability Visual"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================================================
       SINGLE BALANCED ZIG-ZAG SPOTLIGHT (SECURE BACKENDS)
       ========================================================================== */}
        <section className="section-spacing single-spotlight-section">
          <div className="w-full max-w-[1240px] mx-auto px-6">
            <div className="spotlight-grid">
              <div className="spotlight-img-frame">
                <img
                  src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&amp;fit=crop&amp;w=900&amp;q=80"
                  alt="Secure Server Architecture"
                />
              </div>

              <div>
                <div className="eyebrow">ENTERPRISE SECURITY</div>
                <h2 className="title-lg">
                  Engineered for Scale &amp; Absolute Security.
                </h2>
                <p>
                  We architect bulletproof backends and database systems with
                  encrypted data-at-rest, automated backups, and rigorous API
                  rate-limiting to protect your commercial data.
                </p>
                <div className="tech-stack-strip">
                  <span className="tech-chip">Node.js &amp; Python</span>
                  <span className="tech-chip">PostgreSQL</span>
                  <span className="tech-chip">AWS / Cloudflare</span>
                  <span className="tech-chip">OAuth 2.0 Security</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================================================
       FINAL CONVERSION CTA
       ========================================================================== */}
        <section className="section-spacing">
          <div className="w-full max-w-[1240px] mx-auto px-6">
            <div className="cta-banner">
              <h2 className="title-lg">Have a Complex Software Requirement?</h2>
              <p>
                Let’s discuss your technical scope, database architecture, and
                project timeline with our engineering leads.
              </p>
              <div>
                <button className="btn btn-primary">
                  Request Software Scoping
                </button>
                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noopener"
                  className="btn btn-secondary"
                >
                  Talk via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ==========================================================================
       FOOTER
       ========================================================================== */}

      {/* Lead Modal */}
      <div className="modal-overlay" id="contactModalOverlay">
        <div className="modal-window">
          <div>
            <h3>Custom Software Scoping</h3>
            <button>✕</button>
          </div>

          <form>
            <input type="text" placeholder="Your Full Name *" required />
            <input type="email" placeholder="Business Email *" required />
            <textarea
              rows={3}
              placeholder="Describe your software requirement or workflow..."
              required
            ></textarea>
            <button type="submit" className="btn btn-primary">
              Submit Scoping Inquiry
            </button>
            <div id="formStatus">
              Thank you! Our engineering lead will reach out within 24 hours.
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
