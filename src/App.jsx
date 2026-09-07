import React, { useState, useEffect } from 'react';
import { Mail, ChevronRight, Terminal, Code2, Database, Cpu, GraduationCap, ExternalLink, Code, Globe } from "lucide-react";

const TYPE_LINES = [
  { cmd: 'Name', out: 'Muhammad Fadhli Wijaya' },
  { cmd: 'Role', out: 'Informatics Engineering — Yarsi University' },
  { cmd: 'Status', out: 'Building Foundations' },
];

function useTypewriter(lines, speed = 28, pause = 900) {
  const [display, setDisplay] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let lineIdx = 0;
    let charIdx = 0;
    let phase = 'cmd'; // 'cmd' | 'out' | 'pause'
    let cancelled = false;
    let current = { cmd: '', out: '', outShown: '' };

    function tick() {
      if (cancelled) return;
      if (lineIdx >= lines.length) {
        setDone(true);
        return;
      }
      const line = lines[lineIdx];

      if (phase === 'cmd') {
        if (charIdx <= line.cmd.length) {
          current.cmd = line.cmd.slice(0, charIdx);
          setDisplay((prev) => {
            const copy = [...prev];
            copy[lineIdx] = { cmd: current.cmd, out: '' };
            return copy;
          });
          charIdx++;
          setTimeout(tick, speed);
        } else {
          phase = 'out';
          charIdx = 0;
          setTimeout(tick, 220);
        }
      } else if (phase === 'out') {
        if (charIdx <= line.out.length) {
          setDisplay((prev) => {
            const copy = [...prev];
            copy[lineIdx] = { cmd: line.cmd, out: line.out.slice(0, charIdx) };
            return copy;
          });
          charIdx++;
          setTimeout(tick, speed * 0.7);
        } else {
          phase = 'pause';
          setTimeout(tick, pause);
        }
      } else {
        lineIdx++;
        charIdx = 0;
        phase = 'cmd';
        setTimeout(tick, 120);
      }
    }
    tick();
    return () => { cancelled = true; };
  }, []);

  return { display, done };
}

function TerminalChrome({ title, children, className = '' }) {
  return (
    <div className={`term-window ${className}`}>
      <div className="term-bar">
        <div className="term-dots">
          <span style={{ background: '#ff5f56' }} />
          <span style={{ background: '#ffbd2e' }} />
          <span style={{ background: '#27c93f' }} />
        </div>
        <div className="term-title">{title}</div>
        <div style={{ width: 44 }} />
      </div>
      <div className="term-body">{children}</div>
    </div>
  );
}

function SectionLabel({ n, label }) {
  return (
    <div className="section-label">
      <span className="section-n">{n}</span>
      <span className="section-rule" />
      <span className="section-text">{label}</span>
    </div>
  );
}

export default function Portfolio() {
  const { display, done } = useTypewriter(TYPE_LINES);
  const [activeNav, setActiveNav] = useState('home');

  const skills = [
    { group: 'core/', items: ['C', 'Java (dasar)', 'Algoritma & Struktur Data'] },
    { group: 'data/', items: ['SQL', 'Basis Data Relasional', 'ERD Design'] },
    { group: 'web/', items: ['HTML', 'CSS', 'JavaScript'] },
    { group: 'tools/', items: ['Git & GitHub', 'VS Code', 'Linux basics'] },
  ];

  const projects = [
    {
      name: 'sistem-informasi-brmp',
      desc: 'Rancangan sistem informasi pengelolaan data penelitian & monitoring kegiatan budidaya untuk instansi pertanian.',
      stack: ['MySQL', 'ERD', 'Figma'],
      status: 'in-progress',
    },
    {
      name: 'nama-project-kamu',
      desc: 'Deskripsi singkat project kedua kamu — ganti dengan project nyata yang sudah/sedang dikerjakan.',
      stack: ['—', '—'],
      status: 'draft',
    },
    {
      name: 'nama-project-kamu',
      desc: 'Deskripsi singkat project ketiga — bisa tugas kuliah, latihan mandiri, atau kontribusi open source.',
      stack: ['—', '—'],
      status: 'draft',
    },
  ];

  return (
    <div className="portfolio-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');

        .portfolio-root {
          --bg: #0a0505;
          --bg-raised: #150a0a;
          --bg-panel: #1c0d0d;
          --border: #3a1414;
          --garnet: #b3181f;
          --ember: #ff4d3d;
          --ember-soft: rgba(255, 77, 61, 0.35);
          --text: #f2e9e4;
          --text-muted: #a9847f;
          --text-dim: #6b4d4a;
          font-family: 'Inter', sans-serif;
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        .portfolio-root::before {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          background: repeating-linear-gradient(
            0deg,
            rgba(255, 77, 61, 0.025) 0px,
            rgba(255, 77, 61, 0.025) 1px,
            transparent 1px,
            transparent 3px
          );
          z-index: 50;
        }

        .portfolio-root::after {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%);
          z-index: 49;
        }

        .mono { font-family: 'JetBrains Mono', monospace; }

        /* NAV */
        .nav {
          position: sticky;
          top: 0;
          z-index: 60;
          background: rgba(10, 5, 5, 0.85);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid var(--border);
        }
        .nav-inner {
          max-width: 1000px;
          margin: 0 auto;
          padding: 14px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .nav-brand {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 14px;
          color: var(--ember);
          letter-spacing: 0.02em;
        }
        .nav-links {
          display: flex;
          gap: 24px;
        }
        .nav-link {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12.5px;
          color: var(--text-muted);
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px 2px;
          transition: color 0.15s;
        }
        .nav-link:hover, .nav-link.active { color: var(--ember); }

        /* HERO */
        .hero {
          max-width: 900px;
          margin: 0 auto;
          padding: 90px 24px 70px;
        }
        .hero-eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: var(--text-dim);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 18px;
        }

        .term-window {
          background: var(--bg-raised);
          border: 1px solid var(--border);
          border-radius: 10px;
          box-shadow: 0 0 0 1px rgba(255,77,61,0.06), 0 20px 60px -20px rgba(0,0,0,0.8);
          overflow: hidden;
        }
        .term-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          background: var(--bg-panel);
          border-bottom: 1px solid var(--border);
        }
        .term-dots { display: flex; gap: 7px; }
        .term-dots span { width: 11px; height: 11px; border-radius: 50%; display: inline-block; opacity: 0.85; }
        .term-title {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: var(--text-dim);
        }
        .term-body {
          padding: 26px 26px 30px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 15px;
          line-height: 1.9;
          min-height: 130px;
        }
        .term-line { display: block; }
        .prompt-sym { color: var(--garnet); margin-right: 8px; }
        .cmd-text { color: var(--text); }
        .out-text {
          color: var(--ember);
          text-shadow: 0 0 12px var(--ember-soft);
          display: block;
          padding-left: 20px;
        }
        .cursor {
          display: inline-block;
          width: 9px;
          height: 17px;
          background: var(--ember);
          box-shadow: 0 0 10px var(--ember-soft);
          margin-left: 4px;
          animation: blink 1s steps(1) infinite;
          vertical-align: text-bottom;
        }
        @keyframes blink { 50% { opacity: 0; } }

        .hero-name {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 700;
          font-size: clamp(28px, 5vw, 44px);
          letter-spacing: -0.01em;
          margin: 30px 0 6px;
          color: var(--text);
          text-shadow: 0 0 30px rgba(255,77,61,0.15);
        }
        .hero-name span { color: var(--ember); }
        .hero-sub {
          font-size: 15px;
          color: var(--text-muted);
          max-width: 520px;
          line-height: 1.7;
        }
        .hero-actions {
          display: flex;
          gap: 12px;
          margin-top: 28px;
          flex-wrap: wrap;
        }
        .btn {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          padding: 11px 20px;
          border-radius: 6px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid var(--border);
          transition: all 0.15s;
          background: transparent;
          color: var(--text);
        }
        .btn-primary {
          background: var(--garnet);
          border-color: var(--garnet);
          color: #fff;
        }
        .btn-primary:hover { background: var(--ember); border-color: var(--ember); box-shadow: 0 0 20px var(--ember-soft); }
        .btn-ghost:hover { border-color: var(--ember); color: var(--ember); }

        /* SECTIONS */
        .section {
          max-width: 900px;
          margin: 0 auto;
          padding: 50px 24px;
        }
        .section-label {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 28px;
        }
        .section-n {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: var(--garnet);
          border: 1px solid var(--border);
          padding: 3px 8px;
          border-radius: 4px;
        }
        .section-rule { flex: 1; height: 1px; background: var(--border); }
        .section-text {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          color: var(--text-dim);
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .about-text {
          font-size: 15.5px;
          line-height: 1.85;
          color: var(--text-muted);
        }
        .about-text strong { color: var(--text); font-weight: 600; }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }
        @media (max-width: 640px) { .skills-grid { grid-template-columns: 1fr; } }
        .skill-card {
          background: var(--bg-raised);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 18px 20px;
        }
        .skill-group {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          color: var(--ember);
          margin-bottom: 12px;
        }
        .skill-item {
          font-family: 'JetBrains Mono', monospace;
          font-size: 12.5px;
          color: var(--text-muted);
          padding: 3px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .skill-item::before { content: '›'; color: var(--garnet); }

        .projects-list { display: flex; flex-direction: column; gap: 16px; }
        .project-card {
          background: var(--bg-raised);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 20px 22px;
          transition: border-color 0.15s;
        }
        .project-card:hover { border-color: var(--garnet); }
        .project-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        .project-name {
          font-family: 'JetBrains Mono', monospace;
          font-size: 14.5px;
          color: var(--text);
          font-weight: 600;
        }
        .project-status {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10.5px;
          padding: 2px 9px;
          border-radius: 20px;
          border: 1px solid var(--border);
          color: var(--text-dim);
          text-transform: lowercase;
        }
        .project-status.progress { color: var(--ember); border-color: var(--ember-soft); }
        .project-desc {
          font-size: 13.5px;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 12px;
        }
        .project-stack { display: flex; gap: 8px; flex-wrap: wrap; }
        .stack-chip {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10.5px;
          color: var(--text-dim);
          background: var(--bg-panel);
          padding: 3px 8px;
          border-radius: 4px;
          border: 1px solid var(--border);
        }

        .edu-card {
          background: var(--bg-raised);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 22px;
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }
        .edu-icon {
          width: 38px; height: 38px;
          border-radius: 8px;
          background: rgba(179,24,31,0.15);
          border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          color: var(--ember);
          flex-shrink: 0;
        }
        .edu-title { font-size: 14.5px; font-weight: 600; color: var(--text); margin-bottom: 3px; }
        .edu-sub { font-size: 13px; color: var(--text-muted); margin-bottom: 8px; }
        .edu-meta { font-family: 'JetBrains Mono', monospace; font-size: 11.5px; color: var(--text-dim); }

        .contact-term { max-width: 560px; }
        .contact-links { display: flex; gap: 12px; margin-top: 22px; flex-wrap: wrap; }
        .contact-link {
          display: flex; align-items: center; gap: 8px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12.5px;
          color: var(--text-muted);
          border: 1px solid var(--border);
          padding: 9px 16px;
          border-radius: 6px;
          text-decoration: none;
          transition: all 0.15s;
        }
        .contact-link:hover { color: var(--ember); border-color: var(--ember); box-shadow: 0 0 16px var(--ember-soft); }

        .footer {
          text-align: center;
          padding: 30px 24px 50px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 11.5px;
          color: var(--text-dim);
        }
      `}</style>

      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-brand mono">
            <Terminal size={15} />
            <span>Muhammad Fadhli Wijaya</span>
          </div>
          <div className="nav-links">
            {['home', 'about', 'skills', 'projects', 'contact'].map((id) => (
              <button
                key={id}
                className={`nav-link ${activeNav === id ? 'active' : ''}`}
                onClick={() => setActiveNav(id)}
              >
                ./{id}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-eyebrow">// portfolio v1.0.0 — compiled 2026</div>
        <TerminalChrome title="bash — 80x24">
          {TYPE_LINES.map((line, i) => {
            const shown = display[i];
            if (!shown) return null;
            return (
              <div className="term-line" key={i}>
                <span className="prompt-sym">$</span>
                <span className="cmd-text">{shown.cmd}</span>
                {shown.out && <span className="out-text">{shown.out}</span>}
              </div>
            );
          })}
          {!done && <span className="cursor" />}
        </TerminalChrome>

        <h1 className="hero-name">
          Muhammad Fadhli <span>Wijaya</span>
        </h1>
        <p className="hero-sub">
          Mahasiswa Teknik Informatika, Fakultas Teknologi Informasi, Universitas YARSI.
          Sedang membangun fondasi di algoritma, basis data, dan rekayasa perangkat lunak — satu commit pada satu waktu.
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={() => setActiveNav('projects')}>
            Lihat Project <ChevronRight size={14} />
          </button>
          <button className="btn btn-ghost" onClick={() => setActiveNav('contact')}>
            Hubungi Saya
          </button>
        </div>
      </header>

      <section className="section">
        <SectionLabel n="01" label="about.txt" />
        <TerminalChrome title="cat about.txt">
          <p className="about-text">
            Saya adalah <strong>mahasiswa Teknik Informatika</strong> di Universitas YARSI yang tertarik pada
            pengembangan perangkat lunak, perancangan basis data, dan sistem informasi. Saat ini masih di
            tahap awal perjalanan — semester 2 menuju 3 — dan sedang aktif memperdalam fondasi pemrograman,
            struktur data, serta praktik langsung lewat magang mandiri dan project kecil.
          </p>
          <br />
          <p className="about-text">
            Percaya bahwa cara terbaik belajar adalah dengan membangun sesuatu yang nyata, mendokumentasikan
            prosesnya, dan terus mengulang.
          </p>
        </TerminalChrome>
      </section>

      <section className="section">
        <SectionLabel n="02" label="skills/" />
        <div className="skills-grid">
          {skills.map((s) => (
            <div className="skill-card" key={s.group}>
              <div className="skill-group">{s.group}</div>
              {s.items.map((item) => (
                <div className="skill-item" key={item}>{item}</div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionLabel n="03" label="projects/" />
        <div className="projects-list">
          {projects.map((p, i) => (
            <div className="project-card" key={i}>
              <div className="project-head">
                <span className="project-name mono">{p.name}</span>
                <span className={`project-status ${p.status === 'in-progress' ? 'progress' : ''}`}>
                  {p.status}
                </span>
              </div>
              <p className="project-desc">{p.desc}</p>
              <div className="project-stack">
                {p.stack.map((s) => <span className="stack-chip" key={s}>{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionLabel n="04" label="education" />
        <div className="edu-card">
          <div className="edu-icon"><GraduationCap size={18} /></div>
          <div>
            <div className="edu-title">S1 Teknik Informatika</div>
            <div className="edu-sub">Fakultas Teknologi Informasi, Universitas YARSI</div>
            <div className="edu-meta">2025 — sekarang · IPK 3.66</div>
          </div>
        </div>
      </section>

      <section className="section contact-term">
        <SectionLabel n="05" label="contact" />
        <TerminalChrome title="ssh fadhli@reach-me">
          <div className="term-line">
            <span className="prompt-sym">$</span>
            <span className="cmd-text">echo "let's connect"</span>
          </div>
          <span className="out-text">let's connect</span>
        </TerminalChrome>
        <div className="contact-links">
          <a className="contact-link" href="mailto:fadhliwijaya0988@gmail.com">
            <Mail size={14} /> email
          </a>
          <a className="contact-link" href="#" onClick={(e) => e.preventDefault()}>
            <Code size={14} /> github
          </a>
          <a className="contact-link" href="#" onClick={(e) => e.preventDefault()}>
            <Globe size={14} /> linkedin
          </a>
        </div>
      </section>

      <footer className="footer">
        © 2026 Muhammad Fadhli Wijaya — built with React, styled like a red phosphor terminal.
      </footer>
    </div>
  );
}