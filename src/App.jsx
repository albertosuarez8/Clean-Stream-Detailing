import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'

function App() {
  const [activeImageIndex, setActiveImageIndex] = useState(null)
  const [activeFilter, setActiveFilter] = useState('All')
  const [isAutoPlay, setIsAutoPlay] = useState(false)
  const [carouselIndex, setCarouselIndex] = useState(0)

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
    },
    {
      id: '02',
      name: 'Paint Correction',
      description: 'Remove swirls, scratches & dullness',
      price: '$299',
    },
    {
      id: '03',
      name: 'Full Detail',
      description: 'Inside and out, top to bottom',
      price: '$149',
    },
  ]

  const gallery = useMemo(
    () => [
      {
        image: '/images/gallery/IMG_5544.jpg',
        tag: 'Before & After',
        label: 'Paint Correction',
        size: 'large',
      },
      {
        image: '/images/gallery/photo-output.jpg',
        tag: 'Facility',
        label: 'The Shop',
        size: 'wide',
      },
      {
        image: '/images/gallery/photo-output(1).jpg',
        tag: 'Protection',
        label: 'Ceramic Coating',
        size: 'tall',
      },
      {
        image: '/images/gallery/photo-output(2).jpg',
        tag: 'Correction',
        label: 'Paint Correction',
        size: 'normal',
      },
      {
        image: '/images/gallery/photo-output(3).jpg',
        tag: 'Interior',
        label: 'Deep Interior Detail',
        size: 'wide',
      },
      {
        image: '/images/gallery/photo-output(4).jpg',
        tag: 'Exterior',
        label: 'Foam + Hand Wash',
        size: 'normal',
      },
      {
        image: '/images/gallery/photo-output(5).jpg',
        tag: 'Before & After',
        label: 'Swirl Removal',
        size: 'normal',
      },
      {
        image: '/images/gallery/photo-output(6).jpg',
        tag: 'Protection',
        label: 'Coating Finish',
        size: 'tall',
      },
      {
        image: '/images/gallery/photo-output(7).jpg',
        tag: 'Exterior',
        label: 'Gloss Restore',
        size: 'normal',
      },
      {
        image: '/images/gallery/photo-output(8).jpg',
        tag: 'Interior',
        label: 'Interior Reset',
        size: 'wide',
      },
      {
        image: '/images/gallery/photo-output(9).jpg',
        tag: 'Correction',
        label: 'Cut + Polish',
        size: 'normal',
      },
      {
        image: '/images/gallery/photo-output(10).jpg',
        tag: 'Before & After',
        label: 'Paint Revival',
        size: 'normal',
      },
      {
        image: '/images/gallery/photo-output(11).jpg',
        tag: 'Exterior',
        label: 'Showroom Wash',
        size: 'normal',
      },
      {
        image: '/images/gallery/photo-output(12).jpg',
        tag: 'Protection',
        label: 'Hydrophobic Beading',
        size: 'normal',
      },
      {
        image: '/images/gallery/photo-output(13).jpg',
        tag: 'Interior',
        label: 'Detail Finish',
        size: 'normal',
      },
      {
        image: '/images/gallery/photo-output(14).jpg',
        tag: 'Facility',
        label: 'Service Bay',
        size: 'normal',
      },
      {
        image: '/images/gallery/photo-output(15).jpg',
        tag: 'Exterior',
        label: 'Final Walkaround',
        size: 'normal',
      },
    ],
    []
  )

  const galleryWithIndex = useMemo(
    () => gallery.map((item, index) => ({ ...item, originalIndex: index })),
    [gallery]
  )

  const filters = useMemo(
    () => ['All', ...new Set(gallery.map((item) => item.tag))],
    [gallery]
  )

  const filteredGallery = useMemo(
    () =>
      activeFilter === 'All'
        ? galleryWithIndex
        : galleryWithIndex.filter((item) => item.tag === activeFilter),
    [activeFilter, galleryWithIndex]
  )

  const visibleIndexes = useMemo(
    () => filteredGallery.map((item) => item.originalIndex),
    [filteredGallery]
  )

  const activeCarouselItem =
    filteredGallery.length > 0 ? filteredGallery[carouselIndex] : null

  const activeItem =
    activeImageIndex !== null ? gallery[activeImageIndex] : null

  const goToNextCarousel = useCallback(() => {
    if (filteredGallery.length === 0) {
      return
    }
    setCarouselIndex((prev) => (prev + 1) % filteredGallery.length)
  }, [filteredGallery.length])

  const goToPreviousCarousel = useCallback(() => {
    if (filteredGallery.length === 0) {
      return
    }
    setCarouselIndex((prev) => (prev - 1 + filteredGallery.length) % filteredGallery.length)
  }, [filteredGallery.length])

  const goToNextImage = useCallback(() => {
    if (activeImageIndex === null || visibleIndexes.length === 0) {
      return
    }

    const currentPosition = visibleIndexes.indexOf(activeImageIndex)
    const nextPosition = (currentPosition + 1) % visibleIndexes.length
    setActiveImageIndex(visibleIndexes[nextPosition])
  }, [activeImageIndex, visibleIndexes])

  const goToPreviousImage = useCallback(() => {
    if (activeImageIndex === null || visibleIndexes.length === 0) {
      return
    }

    const currentPosition = visibleIndexes.indexOf(activeImageIndex)
    const prevPosition = (currentPosition - 1 + visibleIndexes.length) % visibleIndexes.length
    setActiveImageIndex(visibleIndexes[prevPosition])
  }, [activeImageIndex, visibleIndexes])

  useEffect(() => {
    if (activeImageIndex === null) {
      return undefined
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveImageIndex(null)
        setIsAutoPlay(false)
      }
      if (event.key === 'ArrowRight') {
        goToNextImage()
      }
      if (event.key === 'ArrowLeft') {
        goToPreviousImage()
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeImageIndex, goToNextImage, goToPreviousImage])

  useEffect(() => {
    if (activeImageIndex === null || !isAutoPlay || visibleIndexes.length < 2) {
      return undefined
    }

    const timer = window.setInterval(() => {
      goToNextImage()
    }, 2800)

    return () => window.clearInterval(timer)
  }, [activeImageIndex, goToNextImage, isAutoPlay, visibleIndexes])

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
            <img
              className="brand-logo"
              src="/images/gallery/cleanstream_logo.webp"
              alt="Clean Stream Detailing logo"
            />
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
            Clean Stream Detailing is a Michigan-based mobile full-service detailing company
            specializing in ceramic coatings, paint correction, and deep interior and exterior
            details. Every vehicle is treated with precision and pride.
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
          Every package is done by hand using pro-grade products and proven process steps for
          consistent, high-quality results.
        </p>
        <div className="service-grid">
          {services.map((service, index) => (
            <a
              key={service.id}
              className="service-card reveal-item"
              style={{ '--delay': `${index * 90}ms` }}
              href="https://www.cleanstreamdetailing.com/s/appointments"
              target="_blank"
              rel="noreferrer"
              aria-label={`Book online for ${service.name}`}
            >
              <div className="service-number">{service.id}</div>
              <div className="service-body">
                <p className="service-id">{service.id}</p>
                <h3>{service.name}</h3>
                <p>{service.description}</p>
              </div>
              <div className="service-meta">
                <strong>{service.price}</strong>
                <span className="service-arrow" aria-hidden="true">
                  ›
                </span>
              </div>
            </a>
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
        <div className="gallery-filters reveal-item">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`filter-chip ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => {
                setActiveFilter(filter)
                setCarouselIndex(0)
              }}
            >
              {filter}
            </button>
          ))}
        </div>
        {activeCarouselItem && (
          <div className="carousel reveal-item">
            <div className="carousel-main">
              <button
                type="button"
                className="carousel-image-button"
                onClick={() => setActiveImageIndex(activeCarouselItem.originalIndex)}
                aria-label={`Open image: ${activeCarouselItem.label}`}
              >
                <img src={activeCarouselItem.image} alt={activeCarouselItem.label} loading="lazy" />
              </button>
              <div className="work-caption">
                <span>{activeCarouselItem.tag}</span>
                <h3>{activeCarouselItem.label}</h3>
              </div>
              <button
                type="button"
                className="carousel-nav carousel-prev"
                onClick={goToPreviousCarousel}
                aria-label="Previous gallery image"
              >
                ‹
              </button>
              <button
                type="button"
                className="carousel-nav carousel-next"
                onClick={goToNextCarousel}
                aria-label="Next gallery image"
              >
                ›
              </button>
              <p className="carousel-count">
                {carouselIndex + 1} / {filteredGallery.length}
              </p>
            </div>

            <div className="carousel-thumbs">
              {filteredGallery.map((item, index) => (
                <button
                  key={`${item.tag}-${item.label}`}
                  type="button"
                  className={`thumb ${carouselIndex === index ? 'active' : ''}`}
                  onClick={() => setCarouselIndex(index)}
                  aria-label={`View ${item.label}`}
                >
                  <img src={item.image} alt={item.label} loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        )}
        </div>
      </section>

      <section id="about" className="section section-cream about reveal">
        <div className="container about-grid">
          <div className="reveal-item">
        <p className="section-label">About Me</p>
        <h2>I&apos;m a car guy who takes pride in his work.</h2>
        <p className="section-copy">
          Clean Stream Detailing started from a simple mission: provide honest, high-effort
          detailing with real results and no shortcuts. What began as personal passion became a
          trusted local service.
        </p>
        <p className="section-copy">
          From daily drivers to show builds, every job gets the same attention to prep, correction,
          and protection. Clean Stream also offers exterior home services like pressure washing,
          gutter cleaning, and window cleaning.
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
          <li>Auto + Home Exterior Services</li>
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

      {activeImageIndex !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image viewer"
          onClick={() => {
            setActiveImageIndex(null)
            setIsAutoPlay(false)
          }}
        >
          <button
            type="button"
            className="lightbox-close"
            onClick={() => {
              setActiveImageIndex(null)
              setIsAutoPlay(false)
            }}
            aria-label="Close image viewer"
          >
            ×
          </button>

          <button
            type="button"
            className="lightbox-play"
            onClick={(event) => {
              event.stopPropagation()
              setIsAutoPlay((prev) => !prev)
            }}
            aria-label={isAutoPlay ? 'Pause slideshow' : 'Start slideshow'}
          >
            {isAutoPlay ? 'Pause' : 'Slideshow'}
          </button>

          <button
            type="button"
            className="lightbox-nav lightbox-prev"
            onClick={(event) => {
              event.stopPropagation()
              goToPreviousImage()
            }}
            aria-label="Previous image"
          >
            ‹
          </button>

          <figure
            className="lightbox-figure"
            onClick={(event) => {
              event.stopPropagation()
            }}
          >
            <img
              src={activeItem?.image}
              alt={activeItem?.label}
              className={`lightbox-image ${isAutoPlay ? 'kenburns' : ''}`}
            />
            <figcaption>
              <span>{activeItem?.tag}</span>
              <strong>{activeItem?.label}</strong>
            </figcaption>
          </figure>

          <button
            type="button"
            className="lightbox-nav lightbox-next"
            onClick={(event) => {
              event.stopPropagation()
              goToNextImage()
            }}
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      )}
    </main>
  )
}

export default App
