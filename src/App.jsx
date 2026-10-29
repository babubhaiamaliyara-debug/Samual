import { useState } from 'react';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const FEATURES = [
  {
    title: 'Responsive Design',
    text: 'Layouts adapt smoothly from large desktop screens to Android phones.',
    icon: '📱',
  },
  {
    title: 'Fast Performance',
    text: 'Lightweight code and optimized assets keep every page quick to load.',
    icon: '⚡',
  },
  {
    title: 'Easy to Customize',
    text: 'Clean, modular components make it simple to change content and styling.',
    icon: '🎨',
  },
];

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <a href="#home" className="brand" onClick={() => setOpen(false)}>
          Samual
        </a>
        <button
          className="menu-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav id="primary-nav" className={`nav-links ${open ? 'open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="container hero-inner">
        <div className="hero-text">
          <span className="eyebrow">Welcome to Samual</span>
          <h1>Build something people love to use.</h1>
          <p className="lead">
            A clean, modern website that looks great on desktop and works
            smoothly on any phone.
          </p>
          <div className="button-row">
            <a href="#contact" className="btn btn-primary">
              Get in touch
            </a>
            <a href="#features" className="btn btn-secondary">
              Explore features
            </a>
          </div>
        </div>
        <div className="hero-image">
          <img src="/images/hero.svg" alt="Illustration of a laptop and phone displaying a website" />
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="section">
      <div className="container">
        <header className="section-header">
          <h2>Why choose us</h2>
          <p>Everything you need to present your work clearly and beautifully.</p>
        </header>
        <div className="card-grid">
          {FEATURES.map((feature) => (
            <article key={feature.title} className="card">
              <span className="card-icon" aria-hidden="true">
                {feature.icon}
              </span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section section-alt">
      <div className="container about-inner">
        <div className="about-image">
          <img src="/images/about.svg" alt="Team collaborating around a table" />
        </div>
        <div className="about-text">
          <h2>About Samual</h2>
          <p>
            We create thoughtful digital experiences focused on clarity, speed,
            and accessibility. Every layout is designed to be easy to navigate
            on any screen size.
          </p>
          <p>
            Our goal is simple: give visitors a site that feels professional,
            loads fast, and makes the next step obvious.
          </p>
          <a href="#contact" className="btn btn-primary">
            Work with us
          </a>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="section">
      <div className="container contact-inner">
        <div className="contact-info">
          <h2>Contact us</h2>
          <p>Have a question or a project in mind? Send us a message and we will get back to you.</p>
          <ul className="contact-details">
            <li>
              <strong>Email:</strong>{' '}
              <a href="mailto:hello@example.com">hello@example.com</a>
            </li>
            <li>
              <strong>Phone:</strong>{' '}
              <a href="tel:+10000000000">+1 (000) 000-0000</a>
            </li>
          </ul>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              autoComplete="name"
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
          </label>
          <label>
            Message
            <textarea
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit" className="btn btn-primary">
            Send message
          </button>
          {submitted && (
            <p className="form-success" role="status">
              Thanks for reaching out! Your message has been noted.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>&copy; {new Date().getFullYear()} Samual. All rights reserved.</p>
        <nav className="footer-links" aria-label="Footer">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
