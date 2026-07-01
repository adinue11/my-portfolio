function Nav() {
  return (
    <nav className="navbar fixed top-0 left-0 right-0 z-40">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <span className="font-display font-bold text-[17px] tracking-tight" style={{color:'var(--ink)'}}>AD<span style={{color:'var(--orange)'}}></span>
        <div className="hidden md:flex items-center gap-9">
          <a href="#about" className="nav-link">About</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>
        <a href="#contact" className="btn-cta">Get in Touch</a>
      </div>
    </nav>
  );
}

function Hero() {
  const leftRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(leftRef.current.children,
      { opacity: 0, y: 26 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.13, ease: 'power3.out', delay: 0.3 }
    );
  }, []);

  return (
    <section className="relative min-h-screen pt-16 grid md:grid-cols-2 max-w-7xl mx-auto px-6 md:px-10">
      {/* LEFT */}
      <div ref={leftRef} className="flex flex-col justify-center gap-6 py-14 md:py-0 relative z-20 order-2 md:order-1">
        <div className="badge w-fit">
          <span className="dot-pulse"></span> Available for work
        </div>

        <h1 className="hero-name text-[15vw] sm:text-[68px] md:text-[76px] lg:text-[92px]">
          Adinu<br/><span className="accent-stroke">Builds</span><br/>Web.
        </h1>

        <p className="text-base md:text-lg max-w-md" style={{color:'rgba(43,33,24,0.72)'}}>
          Frontend developer crafting clean, fast interfaces with React &amp; the MERN stack — currently taking on freelance and full-time roles.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <span className="badge">Web Developer</span>
          <span className="badge">React · MERN</span>
          <span className="badge">Frontend</span>
          <span className="badge">UI Conversion</span>
          <span className="badge">AI Skilled</span>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <a href="#contact" className="btn-cta">Get in Touch</a>
          <a href="#projects" className="text-sm font-semibold underline underline-offset-4" style={{color:'var(--ink)'}}>View Projects →</a>
        </div>
      </div>

      {/* RIGHT — 3D Scene */}
      <div className="relative order-1 md:order-2 h-[58vh] md:h-screen">
        <Scene3D />
      </div>
    </section>
  );
}

function Section({ id, eyebrow, title, children }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        gsap.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' });
        obs.disconnect();
      }
    }, { threshold: 0.2 });
    obs.observe(el);
  }, []);
  return (
    <section id={id} ref={ref} className="max-w-7xl mx-auto px-6 md:px-10 py-24">
      <p className="font-mono text-xs tracking-[0.2em] uppercase mb-3" style={{color:'var(--orange-deep)'}}>{eyebrow}</p>
      <h2 className="font-display font-bold text-3xl md:text-5xl mb-8" style={{color:'var(--ink)'}}>{title}</h2>
      {children}
    </section>
  );
}

function App() {
  return (
    <div className="relative">
      <Nav />
      <Hero />

      <Section id="about" eyebrow="01 — About" title="Frontend-focused, detail-obsessed.">
        <p className="max-w-2xl text-base md:text-lg" style={{color:'rgba(43,33,24,0.75)'}}>
          I specialize in building modern digital experiences using HTML, CSS, JavaScript, React, and Three.js. My expertise spans responsive web development, interactive interfaces, and AI-assisted workflows for faster development, testing, and optimization. I prioritize clean architecture, performance, and thoughtfully crafted user experiences.
        </p>
      </Section>

      <Section id="projects" eyebrow="02 — Selected Work" title="Things I've shipped.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {['Portfolio Site','E-commerce UI','SEO Landing Pages'].map((p,i)=>(
            <div key={i} className="rounded-2xl p-6" style={{background:'var(--card)', boxShadow:'0 12px 30px -14px rgba(43,33,24,.2)'}}>
              <div className="w-9 h-9 rounded-full mb-5" style={{background:'var(--orange)'}}></div>
              <h3 className="font-display font-semibold text-lg mb-1" style={{color:'var(--ink)'}}>{p}</h3>
              <p className="text-sm" style={{color:'rgba(43,33,24,.6)'}}>React · Tailwind · Responsive build</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="contact" eyebrow="03 — Contact" title="Let's build something.">
        <a href="mailto:hello@adinu.dev" className="btn-cta inline-block">hello@adinu.dev</a>
      </Section>

      <footer className="text-center py-10 text-xs" style={{color:'rgba(43,33,24,.45)'}}>
        © 2026 Adinu — built with React, Three.js &amp; GSAP.
      </footer>
    </div>
  );
}


