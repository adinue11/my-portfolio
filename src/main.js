import './style.css';
import { build3DScene } from '../js/scene.js';

const app = document.getElementById('app');
if (!app) throw new Error('App mount point was not found.');

app.innerHTML = `
  <div class="grain" aria-hidden="true"></div>
  
  <nav class="navbar" aria-label="Primary navigation">
    <div class="nav-shell">
      <a class="brand" href="#top" aria-label="Adinu home">AD<span>INU</span></a>
      <div class="nav-links" id="nav-links">
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#stack">Stack</a>
        <a href="#contact">Contact</a>
      </div>
      <div class="nav-actions">
        <a class="nav-cta" href="#contact">Let's talk <span>↗</span></a>
        <button class="menu-toggle" id="menu-toggle" type="button" aria-expanded="false" aria-controls="nav-links" aria-label="Open menu"><span></span><span></span></button>
      </div>
    </div>
  </nav>

  <main id="top">
  <div class="availability"><span class="dot-pulse"></span> Available for work</div>     
    <section class="hero-section">
      <div class="hero-copy reveal">
        <p class="hero-kicker">Frontend developer · Remote / Relocate</p>
        <h1 class="hero-name">Adinu<br><span class="accent-stroke">Builds</span><br>Web<span class="hero-period">.</span></h1>
        <p class="hero-lead">I build fast, thoughtful interfaces with React, TypeScript and modern web tools — from polished marketing sites to real-world business software.</p>
        <div class="hero-actions">
          <a href="#projects" class="btn-cta">See my work <span>↓</span></a>
          <a href="mailto:adinu.dev@gmail.com" class="text-link">adinu.dev@gmail.com <span>↗</span></a>
        </div>
        <div class="hero-meta"><span>Conversion</span><i></i><span>AI-assisted workflow</span><i></i><span>Responsive</span></div>
      </div>

      <div class="hero-visual reveal reveal-delay" aria-label="Interactive 3D developer workspace">
        <div class="visual-glow"></div>
        <div class="visual-label visual-label-top">01 / workspace</div>
        <div class="visual-label visual-label-bottom">build · test · ship</div>
        <div id="scene-root"></div>
      </div>
    </section>

    <section id="about" class="content-section split-section reveal">
      <div>
        <p class="section-eyebrow">01 — About</p>
        <h2>Frontend-focused,<br><em>detail-obsessed.</em></h2>
      </div>
      <div class="section-body">
        <p>Frontend Developer experienced in building and deploying production-ready web applications, with strengths in React development, API integration, database-driven features, responsive UI, performance optimization, and debugging. Proven ability to deliver real-world projects independently using modern development workflows and AI-assisted development.</p>
        <div class="mini-stats"><div><strong>01</strong><span>Core focus<br>Frontend</span></div><div><strong>∞</strong><span>Curiosity<br>Always learning</span></div><div><strong>24/7</strong><span>Ideas<br>For better UI</span></div></div>
      </div>
    </section>

    <section id="projects" class="content-section reveal">
      <div class="section-heading-row"><div><p class="section-eyebrow">02 — Selected work</p><h2>Things I've <em>shipped.</em></h2></div><a class="section-link" href="https://github.com/adinue11" target="_blank" rel="noopener noreferrer">More on GitHub ↗</a></div>
      <div class="project-grid">
        <a class="project-card project-featured" href="https://www.torgwholesale.com" target="_blank" rel="noopener noreferrer">
          <div class="project-top"><span class="project-number">01</span><span class="project-status">Live · Featured</span></div>
          <div class="project-art art-torg"><span>TORG</span><small>WHOLESALE</small><b>MEN'S FASHION</b></div>
          <div class="project-info"><h3>TORG Wholesale</h3><p>A production-ready wholesale fashion storefront with product management, SEO pages, Supabase storage and a responsive enquiry-first experience.</p><div class="tags"><span>React</span><span>TypeScript</span><span>Supabase</span><span>SEO</span></div></div>
        </a>
        <a class="project-card" href="https://almarri-accessories.vercel.app" target="_blank" rel="noopener noreferrer">
          <div class="project-top"><span class="project-number">02</span><span class="project-status">Live</span></div>
          <div class="project-art art-store"><span>ALMARRI</span><small>ACCESSORIES</small></div>
          <div class="project-info"><h3>E-commerce UI</h3><p>Catalog-focused storefront concept for a large accessories collection with clean browsing and enquiry flows.</p><div class="tags"><span>React</span><span>JavaScript</span><span>Supabase</span></div></div>
        </a>
        <a class="project-card" href="https://adinu-dev.vercel.app" target="_blank" rel="noopener noreferrer">
          <div class="project-top"><span class="project-number">03</span><span class="project-status">Live</span></div>
          <div class="project-art art-portfolio"><span>ADINU</span><small>PORTFOLIO / LAB</small></div>
          <div class="project-info"><h3>Portfolio &amp; 3D Lab</h3><p>An interactive portfolio experiment combining a playful 3D workspace with a minimal editorial interface.</p><div class="tags"><span>Three.js</span><span>GSAP</span><span>Vite</span></div></div>
        </a>
        <div class="project-card project-placeholder"><div class="project-top"><span class="project-number">04</span><span class="project-status">University</span></div><div class="project-art art-system"><span>CRUD</span><small>TRACKING SYSTEM</small></div><div class="project-info"><h3>Attendance &amp; Fund Tracking</h3><p>A university group project covering CRUD workflows, data handling and practical business-style screens.</p><div class="tags"><span>Web</span><span>CRUD</span><span>Team project</span></div></div></div>
      </div>
    </section>

    <section id="stack" class="content-section stack-section reveal">
      <div><p class="section-eyebrow">03 — Toolkit</p><h2>Tools I use to <em>make things.</em></h2><p class="section-copy">A practical stack built around shipping responsive interfaces and connecting them to real data.</p></div>
      <div class="stack-grid">
        <div class="stack-card"><span class="stack-index">01</span><h3>Frontend</h3><p>HTML5 · CSS3 · JavaScript (ES6+) · TypeScript · React.js · React Router · SCSS · Three.js · Responsive Web Design · Component-Based Development · Reusable Components · Cross-Browser Compatibility</p></div>
        <div class="stack-card"><span class="stack-index">02</span><h3>API &amp; backend Integration</h3><p>Node.js · REST APIs · API Integration · Supabase · PostgreSQL · CRUD Operations · Database Integration · File & Image Storage</p></div>
        <div class="stack-card"><span class="stack-index">03</span><h3>Development &amp; Workflow</h3><p>Vite · npm · Git · GitHub · ESLint · Prettier · DevTools · Debugging · Code Quality · AI-Assisted Development</p></div>
        <div class="stack-card"><span class="stack-index">04</span><h3>Deployment &amp; Web</h3><p>Vercel · Netlify · Cloudflare · SEO · Dynamic Metadata · Sitemap Generation · Web Performance Optimization · Responsive UI</p></div>
        <div class="stack-card"><span class="stack-index">05</span><h3>Currently learning</h3><p>Next.js · Express.js · Authentication & Authorization · State Management · Tailwind CSS · Web Accessibility · Server-Side Development · Software Testing · React Testing Library · Web Security</p></div>
      </div>
    </section>

    <section id="contact" class="contact-section reveal">
      <div class="contact-inner"><p class="section-eyebrow">04 — Contact</p><h2>Have a website<br><em>in mind?</em></h2><p>Tell me what you're building. If it's a good fit, let's turn the idea into something people enjoy using.</p><div class="contact-actions"><a href="mailto:adinu.dev@gmail.com" class="btn-cta">Start a conversation ↗</a><a href="https://wa.me/919895352709" target="_blank" rel="noopener noreferrer" class="contact-link">WhatsApp</a><a href="https://www.linkedin.com/in/mohammed-adnan-5709a0394" target="_blank" rel="noopener noreferrer" class="contact-link">LinkedIn</a></div></div>
    </section>
  </main>

  <footer class="footer"><span>© 2026 Adinu</span><span>Built with care, Three.js &amp; Vite.</span><a href="#top">Back to top ↑</a></footer>
`;

const mountEl = document.getElementById('scene-root');
if (mountEl) build3DScene(mountEl, window.matchMedia('(max-width: 767px)').matches);

const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
menuToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('is-open');
  menuToggle.classList.toggle('is-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
});
navLinks?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navLinks.classList.remove('is-open');
  menuToggle?.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));



const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
