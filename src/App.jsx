import { useEffect } from 'react'
import './App.css'

function App() {
  useEffect(() => {
    const revealEls = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.16 }
    )

    revealEls.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const navItems = [
    { label: 'Services', href: '#services' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'About', href: '#about' },
    { label: 'Book Now', href: '#booking' },
  ]

  const services = [
    {
      id: '01',
      name: 'Ceramic Coating',
      description: 'Long-lasting paint protection',
      price: '$499',
      image:
        'https://media.base44.com/images/public/69e0e772228ea848e6faec1c/e0f06e054_generated_8a0a71f4.png',
    },
    {
      id: '02',
      name: 'Paint Correction',
      description: 'Remove swirls, scratches & dullness',
      price: '$299',
      image:
        'https://media.base44.com/images/public/69e0e772228ea848e6faec1c/905fd7ad1_generated_29aa91a4.png',
    },
    {
      id: '03',
      name: 'Full Detail',
      description: 'Inside and out, top to bottom',
      price: '$149',
      image:
        'https://media.base44.com/images/public/69e0e772228ea848e6faec1c/7d5cd352f_generated_8ef9fd9f.png',
    },
  ]

  const gallery = [
    {
      image:
        'https://media.base44.com/images/public/69e0e772228ea848e6faec1c/aacdcd2c0_generated_ce299443.png',
      tag: 'Before & After',
      label: 'Paint Correction',
    },
    {
      image:
        'https://media.base44.com/images/public/69e0e772228ea848e6faec1c/90036106d_generated_ce8af5a1.png',
      tag: 'Facility',
      label: 'The Shop',
    },
    {
      image:
        'https://media.base44.com/images/public/69e0e772228ea848e6faec1c/9cafc0d2b_generated_6adb096e.png',
      tag: 'Protection',
      label: 'Ceramic Coating',
    },
    {
      image:
        'https://media.base44.com/images/public/69e0e772228ea848e6faec1c/cb73649f3_generated_123f930a.png',
      tag: 'Correction',
      label: 'Paint Correction',
    },
  ]

  const highlights = [
    {
      title: 'Done By Hand',
      text: 'No shortcuts. Every wash, polish, and coat is applied by hand with attention to every panel.',
    },
    {
      title: 'Pro-Grade Products',
      text: 'I only use professional detailing products, the same stuff used at high-end shops.',
    },
    {
      title: 'Local & Proud',
      text: "Based right here in Michigan. I'm your neighbor, not a franchise. You'll always deal with me directly.",
    },
    {
      title: 'Satisfaction Guaranteed',
      text: "Not happy with something? I'll make it right. Simple as that.",
    },
  ]

  return (
    <main>
      <header className="topbar">
        <div className="container topbar-inner">
          <a className="brand" href="#">
            <span className="brand-bar"></span>
            <span>
              <strong>Clean Stream</strong>
              <small>Detailing</small>
            </span>
          </a>
          <nav className="nav-links">
            {navItems.map((item) => (
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <section className="hero">
        <img
          src="https://media.base44.com/images/public/69e0e772228ea848e6faec1c/87d9e8342_generated_eae1bee2.png"
          alt="Luxury car in a professional detailing studio"
          className="hero-bg"
        />
        <div className="hero-overlay"></div>
        <div className="hero-overlay-right"></div>
        <div className="container hero-content">
          <p className="trust-pill hero-animate delay-1">Trusted by 500+ local customers</p>
          <h1 className="hero-animate delay-2">
            Your car, <span>looking its best.</span>
          </h1>
          <p className="hero-copy hero-animate delay-3">
            Clean Stream Detailing is a Michigan-based auto detailing shop specializing in ceramic
            coatings, paint correction, and full-service detailing. We treat every car like it&apos;s
            our own.
          </p>
          <div className="hero-actions hero-animate delay-4">
            <a className="button button-primary" href="#booking">
              Book an Appointment
            </a>
            <a className="button button-outline" href="#services">
              See Services
            </a>
          </div>
          <div className="stats hero-animate delay-5" aria-label="Business metrics">
            <article>
              <strong>500+</strong>
              <span>Cars Detailed</span>
            </article>
            <article>
              <strong>5 Years</strong>
              <span>In Business</span>
            </article>
            <article>
              <strong>5★</strong>
              <span>Avg. Rating</span>
            </article>
          </div>
        </div>
      </section>

      <section id="services" className="section section-cream reveal">
        <div className="container">
        <p className="section-label reveal-item">What I Offer</p>
        <h2 className="reveal-item">Services</h2>
        <p className="section-copy reveal-item">
          Every job is done by hand with professional products. Click a service to see what&apos;s
          included.
        </p>
        <div className="service-grid">
          {services.map((service, index) => (
            <article key={service.id} className="service-card reveal-item" style={{ '--delay': `${index * 90}ms` }}>
              <img src={service.image} alt={service.name} />
              <div className="service-body">
                <p className="service-id">{service.id}</p>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <strong>{service.price}</strong>
              </div>
            </article>
          ))}
        </div>
        </div>
      </section>

      <section id="gallery" className="section section-cream-dark reveal">
        <div className="container">
        <p className="section-label reveal-item">Our Work</p>
        <h2 className="reveal-item">Results Speak for Themselves</h2>
        <p className="section-copy reveal-item">
          Every photo is a real job from a real customer&apos;s car. No stock photos, no filters.
        </p>
        <div className="work-grid">
          {gallery.map((item, index) => (
            <article
              key={`${item.tag}-${item.label}`}
              className="work-item reveal-item"
              style={{ '--delay': `${index * 90}ms` }}
            >
              <img src={item.image} alt={item.label} />
              <div className="work-caption">
                <span>{item.tag}</span>
                <h3>{item.label}</h3>
              </div>
            </article>
          ))}
        </div>
        </div>
      </section>

      <section id="about" className="section section-cream about reveal">
        <div className="container about-grid">
          <div className="reveal-item">
        <p className="section-label">About Me</p>
        <h2>I&apos;m a car guy who takes pride in his work.</h2>
        <p className="section-copy">
          Clean Stream Detailing started because I genuinely love cars and couldn&apos;t find a local
          detailer who cared as much as I did. So I started doing it myself and people noticed.
        </p>
        <p className="section-copy">
          Whether it&apos;s a daily driver or a weekend show car, I give every vehicle the same level
          of care. No crews, no assembly lines, just me, the right tools, and a commitment to
          doing it right.
        </p>
        <div className="hero-actions about-actions">
          <a className="button button-primary" href="#contact">
            Get a Quote
          </a>
          <a className="button button-secondary" href="#contact">
            Reach Out
          </a>
        </div>
          </div>
        <div className="highlight-grid">
          {highlights.map((item, index) => (
            <article key={item.title} className="reveal-item" style={{ '--delay': `${index * 100}ms` }}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        </div>
      </section>

      <section id="booking" className="section cta reveal">
        <div className="container cta-inner">
        <h2 className="reveal-item">Ready to book?</h2>
        <p className="section-copy reveal-item">
          Shoot me a message or book directly online. I&apos;ll get back to you quickly to lock in a
          time that works.
        </p>
        <div className="hero-actions reveal-item">
          <a
            className="button button-primary"
            href="https://www.cleanstreamdetailing.com/s/appointments"
            target="_blank"
            rel="noreferrer"
          >
            Book Online
          </a>
          <a className="button button-secondary" href="tel:+15551234567">
            Call or Text
          </a>
        </div>
        <ul className="badges reveal-item" aria-label="Business highlights">
          <li>Free Estimates</li>
          <li>Mobile Service Available</li>
          <li>Michigan-Based</li>
          <li>5-Star Rated</li>
        </ul>
        </div>
      </section>

      <footer id="contact" className="footer">
        <div className="container footer-inner">
          <p>Clean Stream Detailing</p>
          <div className="footer-links">
            {navItems.map((item) => (
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  )
}

export default App
