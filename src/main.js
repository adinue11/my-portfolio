import './style.css';
import { build3DScene } from '../js/scene.js';
import { runCharacterTimeline } from '../js/animations.js';

const app = document.getElementById('app');

if (!app) {
  throw new Error('App mount point was not found.');
}

app.innerHTML = `
  <div class="grain"></div>
  <nav class="navbar">
    <div class="nav-shell">
      <a class="brand" href="#top">AD<span>INU</span></a>
      <div class="nav-links">
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </div>
      <a class="btn-cta" href="#contact">Get in Touch</a>
    </div>
  </nav>

  <main id="top">
    <section class="hero-section">
      <div class="hero-copy">
        <div class="badge"><span class="dot-pulse"></span> Available for work</div>
        <h1 class="hero-name">Adinu<br /><span class="accent-stroke">Builds</span><br />Web.</h1>
        <p>
          Frontend developer crafting clean, fast interfaces with React and the MERN stack — currently taking on freelance and full-time roles.
        </p>
        <div class="pill-row">
          <span class="badge">Web Developer</span>
          <span class="badge">React · MERN</span>
          <span class="badge">Frontend</span>
          <span class="badge">UI Conversion</span>
          <span class="badge">AI Skilled</span>
        </div>
        <div class="hero-actions">
          <a href="#contact" class="btn-cta">Get in Touch</a>
          <a href="#projects" class="text-link">View Projects →</a>
        </div>
      </div>
      <div class="hero-visual">
        <div id="scene-root"></div>
      </div>
    </section>

    <section id="about" class="content-section">
      <p class="section-eyebrow">01 — About</p>
      <h2>Frontend-focused, detail-obsessed.</h2>
      <p class="section-copy">
        I specialize in building modern digital experiences using HTML, CSS, JavaScript, React, and Three.js. My expertise spans responsive web development, interactive interfaces, and AI-assisted workflows for faster development, testing, and optimization. I prioritize clean architecture, performance, and thoughtfully crafted user experiences.
      </p>
    </section>

    <section id="projects" class="content-section">
      <p class="section-eyebrow">02 — Selected Work</p>
      <h2>Things I’ve shipped.</h2>
      <div class="card-grid">
        <article class="card">
          <a href="https://adinu-dev.vercel.app" target="_blank" rel="noopener noreferrer">
          <div class="card-dot"></div>
          <h3>Portfolio Site</h3>
          <p>React · Tailwind · Three JS · Vanilla JS</p></a>
        </article>
        <article class="card">
          <a href="almarri-accessories.vercel.app" target="_blank" rel="noopener noreferrer">
          <div class="card-dot"></div>
          <h3>E-commerce UI</h3>
          <p>React · JS · CSS · Supabase</p></a>
        </article>
        <article class="card">
          <div class="card-dot"></div>
          <h3>University Project (Group)</h3>
          <p>Attendance and fund tracking with CRUD functionality.</p>
        </article>
        <article class="card">
          <a href="https://github.com/adinue11" target="_blank" rel="noopener noreferrer">
          <div class="card-dot"></div>
          <h3>GitHub Profile</h3>
          <p>Explore my code &amp; contributions on GitHub.</p></a>
        </article>
      </div>
    </section>

    <section id="contact" class="content-section contact-section">
      <p class="section-eyebrow">03 — Contact</p>
      <h2>Let’s build something.</h2>
      <a href="mailto:adinu.dev@gmail.com" class="btn-cta">hello@adinu.dev</a>
      <a href="tel:+91989535209" class="btn-cta">Call Me Now</a><br>
      <a href="https://wa.me/+919895352709?text=Hi%20Adinu%20%F0%9F%98%8A%2C%0AI'd%20like%20you%20to%20build%20a%20website%20for%20me.%20Are%20you%20available%20to%20take%20this%20on%3F" class="btn-cta">WhatsApp Me</a>
    </section>
  </main>

  <footer class="footer">© 2026 Adinu — built with Three.js | GSAP&ampFBX.</footer>
`;

const mountEl = document.getElementById('scene-root');

if (mountEl) {
  const scene = build3DScene(mountEl, window.innerWidth < 768);
  runCharacterTimeline(scene);
}
