export default function Contact() {
  return (
    <>
      <div className="whatsapp-float-container">
        <div className="whatsapp-menu-popup" id="waMenuPopup">
          <div>Select Region WhatsApp</div>

          <a
            href="https://wa.me/9779800000000?text=Hello%20TechSapana%2C%20I%20would%20like%20to%20discuss%20a%20project."
            target="_blank"
            rel="noopener"
            className="wa-region-link"
          >
            <span>🇳🇵 Nepal Support</span>
          </a>

          <a
            href="https://wa.me/10000000000?text=Hello%20TechSapana%2C%20I%20am%20calling%20from%20the%20US."
            target="_blank"
            rel="noopener"
            className="wa-region-link"
          >
            <span>🇺🇸 United States</span>
          </a>

          <a
            href="https://wa.me/61000000000?text=Hello%20TechSapana%2C%20I%20am%20calling%20from%20Australia."
            target="_blank"
            rel="noopener"
            className="wa-region-link"
          >
            <span>🇦🇺 Australia Team</span>
          </a>
        </div>

        <button
          className="whatsapp-trigger-btn"
          id="waTriggerBtn"
          aria-label="Open WhatsApp Chat"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.198-.198.347-.764.966-.937 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"></path>
          </svg>
        </button>
      </div>

      <main>
        <section className="contact-hero" id="contactForm">
          <div className="w-full max-w-[1240px] mx-auto px-6">
            <div>
              <div className="eyebrow">GLOBAL INQUIRIES</div>
              <h1 className="title-lg">
                Let’s Build Something <span>Meaningful Together.</span>
              </h1>
              <p className="desc-lead">
                Select your preferred region below to connect with our local
                engineering and consultation teams in Nepal, the United States,
                or Australia.
              </p>
            </div>

            <div className="region-toggle-strip">
              <button className="region-tab-btn active" data-region="nepal">
                <span>🇳🇵</span> Nepal Hub
              </button>
              <button className="region-tab-btn" data-region="usa">
                <span>🇺🇸</span> United States
              </button>
              <button className="region-tab-btn" data-region="aus">
                <span>🇦🇺</span> Australia
              </button>
            </div>

            <div className="contact-main-grid">
              <div className="contact-form-card">
                <div id="formHeadingTitle">
                  Book Free Consultation (Nepal Hub)
                </div>
                <p id="formSubNotice">
                  Direct scheduling with our Kathmandu engineering leadership.
                </p>

                <form>
                  <div className="form-row-2">
                    <div className="input-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        className="form-input-ctrl"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="input-group">
                      <label>Business Email *</label>
                      <input
                        type="email"
                        className="form-input-ctrl"
                        placeholder="john@company.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="input-group">
                      <label>Phone / WhatsApp *</label>
                      <input
                        type="tel"
                        className="form-input-ctrl"
                        placeholder="+977 9800000000"
                        required
                      />
                    </div>
                    <div className="input-group">
                      <label>Service Required *</label>
                      <select className="form-input-ctrl">
                        <option>Website Development</option>
                        <option>Custom Software &amp; ERP</option>
                        <option>AI Solutions &amp; Automation</option>
                        <option>Training &amp; Courses</option>
                      </select>
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Project Scope &amp; Requirements *</label>
                    <textarea
                      rows={4}
                      className="form-input-ctrl"
                      placeholder="Tell us what you're building..."
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Confirm Free Consultation
                  </button>
                  <div id="consultationStatus">
                    Thank you! Your consultation has been scheduled. Our
                    regional team will contact you shortly.
                  </div>
                </form>
              </div>

              <div className="office-info-stack">
                <div className="office-address-card">
                  <span className="office-region-tag" id="officeRegionTag">
                    🇳🇵 Primary Development Lab
                  </span>
                  <h3 className="office-location-title" id="officeTitle">
                    Kathmandu, Nepal
                  </h3>

                  <div className="office-spec-line">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span id="officeAddress">
                      Baluwatar, Kathmandu 44600, Nepal
                    </span>
                  </div>

                  <div className="office-spec-line">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span id="officePhone">
                      +977 1-4000000 / WhatsApp Support
                    </span>
                  </div>

                  <div className="office-spec-line">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span id="officeHours">
                      Support Hours: Sun – Fri (9:00 AM – 6:00 PM NPT)
                    </span>
                  </div>
                </div>

                <div id="mapContainer">
                  <div className="map-frame-box">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.368369049448!2d85.3240!3d27.7172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQzJzAyLjIiTiA4NcKwMTknMjYuNCJF!5e0!3m2!1sen!2snp!4v1650000000000!5m2!1sen!2snp"
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
