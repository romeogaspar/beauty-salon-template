import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=Lato:wght@300;400;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --purple:       #3D1A5E;
    --purple-mid:   #4E2575;
    --purple-light: #6B3A9A;
    --purple-pale:  rgba(61,26,94,0.06);
    --gold:         #C9A84C;
    --gold-light:   #E2C47A;
    --gold-pale:    rgba(201,168,76,0.12);
    --cream:        #FDF8F2;
    --cream-dark:   #F5EDE0;
    --blush:        #F9E8E8;
    --white:        #FFFFFF;
    --muted:        #8B7088;
    --text:         #2D1A3A;
    --font-head:    'Playfair Display', serif;
    --font-body:    'Lato', sans-serif;
    --radius:       12px;
    --radius-sm:    8px;
    --shadow:       0 4px 24px rgba(61,26,94,0.08);
    --shadow-lg:    0 12px 48px rgba(61,26,94,0.14);
  }

  html { scroll-behavior: smooth; }
  body { font-family: var(--font-body); background: var(--cream); color: var(--text); line-height: 1.7; overflow-x: hidden; }

  /* NAV */
  .nav {
    position: fixed; top: 0; width: 100%; z-index: 100;
    padding: 1.5rem 4rem;
    display: flex; align-items: center; justify-content: space-between;
    transition: all 0.35s;
    background: transparent;
  }
  .nav.scrolled {
    background: rgba(253,248,242,0.97);
    backdrop-filter: blur(12px);
    padding: 1rem 4rem;
    box-shadow: 0 1px 0 rgba(61,26,94,0.08), var(--shadow);
  }
  .nav__logo {
    font-family: var(--font-head);
    font-size: 1.4rem; font-weight: 400;
    color: var(--white); text-decoration: none;
    letter-spacing: 0.04em;
  }
  .nav.scrolled .nav__logo { color: var(--purple); }
  .nav__logo span { color: var(--gold); font-style: italic; }
  .nav__links { display: flex; gap: 2.5rem; list-style: none; }
  .nav__links a {
    color: rgba(255,255,255,0.82); text-decoration: none;
    font-size: 0.82rem; font-weight: 400;
    letter-spacing: 0.06em; transition: color 0.2s;
  }
  .nav.scrolled .nav__links a { color: var(--muted); }
  .nav__links a:hover { color: var(--gold); }
  .nav.scrolled .nav__links a:hover { color: var(--purple); }
  .nav__links a.nav-active { color: var(--gold); }
  .nav.scrolled .nav__links a.nav-active { color: var(--purple); }
  .nav__btn {
    background: var(--gold); color: var(--purple);
    padding: 0.6rem 1.5rem; border-radius: 50px;
    font-size: 0.78rem; font-weight: 700;
    text-decoration: none; transition: all 0.2s;
    border: none; cursor: pointer; letter-spacing: 0.04em;
  }
  .nav__btn:hover { background: var(--gold-light); transform: translateY(-1px); box-shadow: 0 4px 14px rgba(201,168,76,0.35); }

  /* HAMBURGER */
  .nav__hamburger {
    display: none; flex-direction: column; gap: 5px;
    background: none; border: none; cursor: pointer; padding: 4px; z-index: 200;
  }
  .nav__hamburger span {
    display: block; width: 24px; height: 2px;
    background: var(--white); border-radius: 2px; transition: all 0.3s;
  }
  .nav.scrolled .nav__hamburger span { background: var(--purple); }
  .nav__hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .nav__hamburger.open span:nth-child(2) { opacity: 0; }
  .nav__hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
  .nav__mobile-menu {
    display: none; position: fixed; inset: 0;
    background: var(--purple);
    z-index: 150; flex-direction: column; align-items: center;
    justify-content: center; gap: 2.5rem;
  }
  .nav__mobile-menu.open { display: flex; }
  .nav__mobile-menu a {
    color: rgba(255,255,255,0.85); font-size: 2rem;
    font-family: var(--font-head); font-weight: 400;
    text-decoration: none; transition: color 0.2s;
  }
  .nav__mobile-menu a:hover { color: var(--gold); }
  .nav__mobile-menu .nav__mobile-cta {
    margin-top: 0.5rem; background: var(--gold); color: var(--purple);
    padding: 0.75rem 2.5rem; border-radius: 50px;
    font-size: 0.9rem; font-weight: 700;
    font-family: var(--font-body); letter-spacing: 0.04em;
  }

  /* HERO */
  .hero {
    position: relative; min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    overflow: hidden; text-align: center; padding: 8rem 2rem 4rem;
  }
  .hero__bg {
    position: absolute; inset: 0;
    background-image: url('https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1800&q=85');
    background-size: cover; background-position: center 30%;
  }
  .hero__bg::after {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(61,26,94,0.82) 0%, rgba(61,26,94,0.65) 100%);
  }
  .hero__content { position: relative; z-index: 1; max-width: 680px; }
  .hero__eyebrow {
    display: inline-flex; align-items: center; gap: 0.75rem;
    color: var(--gold-light); font-size: 0.72rem; font-weight: 400;
    letter-spacing: 0.28em; text-transform: uppercase; margin-bottom: 1.5rem;
  }
  .hero__eyebrow::before, .hero__eyebrow::after { content: '✦'; font-size: 0.5rem; }
  .hero__title {
    font-family: var(--font-head); font-size: clamp(3rem, 7vw, 5.5rem);
    font-weight: 400; color: var(--white); line-height: 1.1;
    margin-bottom: 1.25rem; letter-spacing: 0.02em;
  }
  .hero__title em { font-style: italic; color: var(--gold-light); }
  .hero__sub {
    color: rgba(255,255,255,0.75); font-size: 1rem; font-weight: 300;
    max-width: 480px; margin: 0 auto 2.5rem; line-height: 1.85;
  }
  .hero__btns { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }
  .btn-gold {
    background: var(--gold); color: var(--purple);
    padding: 0.875rem 2.25rem; border-radius: 50px;
    font-size: 0.82rem; font-weight: 700; letter-spacing: 0.04em;
    text-decoration: none; border: none; cursor: pointer;
    transition: all 0.2s; display: inline-block;
    box-shadow: 0 4px 20px rgba(201,168,76,0.35);
  }
  .btn-gold:hover { background: var(--gold-light); transform: translateY(-2px); }
  .btn-outline-white {
    background: transparent; color: var(--white);
    padding: 0.875rem 2.25rem; border-radius: 50px;
    font-size: 0.82rem; font-weight: 400; letter-spacing: 0.04em;
    text-decoration: none; border: 1px solid rgba(255,255,255,0.4); cursor: pointer;
    transition: all 0.2s; display: inline-block;
  }
  .btn-outline-white:hover { border-color: var(--gold); color: var(--gold); }
  .btn-purple {
    background: var(--purple); color: var(--white);
    padding: 0.875rem 2.25rem; border-radius: 50px;
    font-size: 0.82rem; font-weight: 700; letter-spacing: 0.04em;
    text-decoration: none; border: none; cursor: pointer;
    transition: all 0.2s; display: inline-block;
  }
  .btn-purple:hover { background: var(--purple-mid); transform: translateY(-2px); }
  .btn-outline-purple {
    background: transparent; color: var(--purple);
    padding: 0.875rem 2.25rem; border-radius: 50px;
    font-size: 0.82rem; font-weight: 400; letter-spacing: 0.04em;
    text-decoration: none; border: 1px solid rgba(61,26,94,0.25); cursor: pointer;
    transition: all 0.2s; display: inline-block;
  }
  .btn-outline-purple:hover { border-color: var(--purple); background: var(--purple-pale); }
  .hero__divider {
    margin-top: 4rem; padding-top: 2.5rem;
    border-top: 1px solid rgba(255,255,255,0.12);
    display: flex; justify-content: center; gap: 3rem; flex-wrap: wrap;
  }
  .hero__stat-num { font-family: var(--font-head); font-size: 2rem; color: var(--gold-light); line-height: 1; }
  .hero__stat-label { font-size: 0.68rem; color: rgba(255,255,255,0.55); letter-spacing: 0.1em; text-transform: uppercase; margin-top: 0.2rem; }

  /* SECTIONS */
  .section { padding: 6rem 4rem; }
  .section-inner { max-width: 1100px; margin: 0 auto; }
  .section--purple { background: var(--purple); }
  .section--purple-mid { background: var(--purple-mid); }
  .section--cream { background: var(--cream-dark); }
  .section--blush { background: var(--blush); }

  .eyebrow {
    display: flex; align-items: center; gap: 0.75rem;
    color: var(--gold); font-size: 0.68rem; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase; margin-bottom: 0.75rem;
  }
  .eyebrow::before { content: '✦'; font-size: 0.55rem; }
  .eyebrow--white { color: var(--gold-light); }
  .section-title {
    font-family: var(--font-head); font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 400; line-height: 1.15; margin-bottom: 0.75rem; letter-spacing: 0.01em;
  }
  .section-title em { font-style: italic; color: var(--gold); }
  .section-title--white { color: var(--white); }
  .section-title--white em { color: var(--gold-light); }
  .section-title--purple { color: var(--purple); }
  .section-sub { color: var(--muted); font-size: 0.925rem; max-width: 480px; line-height: 1.8; }
  .section-sub--white { color: rgba(255,255,255,0.65); }
  .rule { width: 48px; height: 2px; background: var(--gold); margin-bottom: 2.5rem; border-radius: 2px; }

  /* SERVICES */
  .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
  .service-card {
    background: var(--white); border-radius: var(--radius);
    padding: 2.25rem 2rem; box-shadow: var(--shadow);
    border-bottom: 3px solid transparent;
    transition: all 0.25s;
  }
  .service-card:hover { border-bottom-color: var(--gold); transform: translateY(-4px); box-shadow: var(--shadow-lg); }
  .service-card__icon { font-size: 2.2rem; margin-bottom: 1.25rem; display: block; }
  .service-card__name { font-family: var(--font-head); font-size: 1.2rem; color: var(--purple); margin-bottom: 0.5rem; }
  .service-card__desc { font-size: 0.85rem; color: var(--muted); line-height: 1.75; margin-bottom: 1.25rem; }
  .service-card__price { font-family: var(--font-head); font-size: 1.3rem; color: var(--gold); }
  .service-card__duration { font-size: 0.72rem; color: var(--muted); letter-spacing: 0.06em; text-transform: uppercase; }

  /* ABOUT */
  .about-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 5rem; align-items: center; }
  .about-img-wrap { position: relative; }
  .about-img {
    width: 100%; aspect-ratio: 3/4; object-fit: cover;
    object-position: center top; border-radius: var(--radius);
    box-shadow: var(--shadow-lg); display: block;
  }
  .about-img-badge {
    position: absolute; bottom: -1.5rem; right: -1.5rem;
    background: var(--gold); color: var(--purple);
    padding: 1.5rem; border-radius: var(--radius);
    text-align: center; box-shadow: var(--shadow-lg);
  }
  .about-img-badge__num { font-family: var(--font-head); font-size: 2.2rem; line-height: 1; }
  .about-img-badge__label { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; margin-top: 0.2rem; opacity: 0.85; }
  .about-text p { color: var(--muted); font-size: 0.9rem; line-height: 1.9; margin-bottom: 1rem; }
  .about-values { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 2rem; }
  .about-value {
    padding: 1.25rem; background: var(--blush);
    border-radius: var(--radius-sm); border-left: 3px solid var(--gold);
  }
  .about-value__title { font-family: var(--font-head); font-size: 0.95rem; color: var(--purple); margin-bottom: 0.25rem; }
  .about-value__desc { font-size: 0.78rem; color: var(--muted); line-height: 1.6; }

  /* TEAM */
  .team-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
  .team-card {
    background: var(--white); border-radius: var(--radius);
    overflow: hidden; box-shadow: var(--shadow);
    transition: transform 0.25s, box-shadow 0.25s;
    text-align: center;
  }
  .team-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
  .team-card__img { width: 100%; height: 260px; object-fit: cover; object-position: center top; display: block; }
  .team-card__body { padding: 1.5rem 1.25rem; }
  .team-card__name { font-family: var(--font-head); font-size: 1.1rem; color: var(--purple); margin-bottom: 0.2rem; }
  .team-card__role { font-size: 0.72rem; color: var(--gold); font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 0.5rem; }
  .team-card__spec { font-size: 0.8rem; color: var(--muted); }

  /* GALLERY */
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: auto auto;
    gap: 0.75rem;
  }
  .gallery-item { overflow: hidden; border-radius: var(--radius-sm); }
  .gallery-item--wide { grid-column: span 2; }
  .gallery-item--tall { grid-row: span 2; }
  .gallery-item img {
    width: 100%; height: 100%; object-fit: cover;
    display: block; min-height: 220px;
    transition: transform 0.5s;
  }
  .gallery-item--tall img { min-height: 460px; }
  .gallery-item--wide img { min-height: 300px; }
  .gallery-item:hover img { transform: scale(1.04); }

  /* TESTIMONIALS */
  .testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
  .testi-card {
    background: var(--white); border-radius: var(--radius);
    padding: 2rem; box-shadow: var(--shadow);
    position: relative; transition: transform 0.2s;
  }
  .testi-card:hover { transform: translateY(-3px); }
  .testi-card::before {
    content: '"';
    position: absolute; top: 1.25rem; right: 1.5rem;
    font-family: var(--font-head); font-size: 4rem;
    color: var(--gold-pale); line-height: 1;
  }
  .testi-card__stars { color: var(--gold); font-size: 0.85rem; margin-bottom: 1rem; letter-spacing: 0.08em; }
  .testi-card__text { font-family: var(--font-head); font-style: italic; font-size: 0.95rem; color: var(--text); line-height: 1.8; margin-bottom: 1.5rem; }
  .testi-card__author { display: flex; align-items: center; gap: 0.75rem; }
  .testi-card__avatar { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 2px solid var(--gold-pale); }
  .testi-card__name { font-weight: 700; font-size: 0.875rem; color: var(--purple); }
  .testi-card__detail { font-size: 0.72rem; color: var(--muted); }

  /* BOOKING */
  .booking-grid { display: grid; grid-template-columns: 1fr 1.6fr; gap: 5rem; align-items: start; }
  .booking-info p { color: rgba(255,255,255,0.65); font-size: 0.9rem; line-height: 1.85; margin-bottom: 2rem; }
  .booking-details { display: flex; flex-direction: column; gap: 1rem; }
  .booking-detail {
    display: flex; align-items: center; gap: 1rem;
    padding: 1rem 1.25rem; border-radius: var(--radius-sm);
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(201,168,76,0.15);
    transition: border-color 0.2s;
  }
  .booking-detail:hover { border-color: rgba(201,168,76,0.4); }
  .booking-detail__icon { font-size: 1.25rem; width: 36px; text-align: center; }
  .booking-detail__label { font-size: 0.65rem; color: rgba(255,255,255,0.45); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.1rem; }
  .booking-detail__value { font-size: 0.875rem; color: var(--white); font-weight: 400; }
  .booking-form-wrap {
    background: var(--white); border-radius: var(--radius);
    padding: 2.5rem; box-shadow: var(--shadow-lg);
  }
  .booking-form-wrap h3 { font-family: var(--font-head); font-size: 1.7rem; color: var(--purple); margin-bottom: 0.25rem; }
  .booking-form-wrap p { color: var(--muted); font-size: 0.82rem; margin-bottom: 2rem; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .form-group { display: flex; flex-direction: column; gap: 0.35rem; margin-bottom: 1rem; }
  .form-group label { font-size: 0.68rem; font-weight: 700; color: var(--muted); letter-spacing: 0.1em; text-transform: uppercase; }
  .form-group input, .form-group select, .form-group textarea {
    border: 1px solid #EAE0F0; border-radius: var(--radius-sm);
    padding: 0.75rem 1rem; font-family: var(--font-body); font-size: 0.9rem;
    color: var(--text); outline: none; transition: border-color 0.2s, box-shadow 0.2s;
    background: var(--cream);
  }
  .form-group input:focus, .form-group select:focus, .form-group textarea:focus {
    border-color: var(--gold); background: var(--white);
    box-shadow: 0 0 0 3px rgba(201,168,76,0.1);
  }
  .form-group textarea { resize: vertical; }

  /* FOOTER */
  .footer { background: var(--purple); padding: 4rem 4rem 2rem; }
  .footer__grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; max-width: 1100px; margin: 0 auto 3rem; }
  .footer__logo { font-family: var(--font-head); font-size: 1.5rem; color: var(--white); display: block; margin-bottom: 1rem; text-decoration: none; }
  .footer__logo span { color: var(--gold); font-style: italic; }
  .footer__about { color: rgba(255,255,255,0.4); font-size: 0.82rem; line-height: 1.75; max-width: 240px; }
  .footer__heading { font-size: 0.62rem; font-weight: 700; color: var(--gold); letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 1.25rem; }
  .footer__links { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; }
  .footer__links a { color: rgba(255,255,255,0.4); font-size: 0.82rem; text-decoration: none; transition: color 0.2s; }
  .footer__links a:hover { color: var(--gold-light); }
  .footer__bottom { max-width: 1100px; margin: 0 auto; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; }
  .footer__copy { color: rgba(255,255,255,0.2); font-size: 0.75rem; }
  .footer__social { display: flex; gap: 0.75rem; }
  .footer__social a {
    width: 36px; height: 36px; border-radius: 50%;
    background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.4);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.75rem; font-weight: 700; text-decoration: none; transition: all 0.2s;
  }
  .footer__social a:hover { background: var(--gold); color: var(--purple); }

  @media (max-width: 1024px) {
    .nav { padding: 1.25rem 1.5rem; }
    .nav__links, .nav__btn { display: none; }
    .nav__hamburger { display: flex !important; }
    .hero { padding: 6rem 1.5rem 4rem; }
    .section { padding: 4rem 1.5rem; }
    .services-grid { grid-template-columns: 1fr; }
    .about-grid { grid-template-columns: 1fr; gap: 3rem; }
    .about-img-badge { right: 0; }
    .team-grid { grid-template-columns: repeat(2, 1fr); }
    .gallery-grid { grid-template-columns: 1fr 1fr; }
    .gallery-item--wide { grid-column: span 1; }
    .gallery-item--tall { grid-row: span 1; }
    .testi-grid { grid-template-columns: 1fr; }
    .booking-grid { grid-template-columns: 1fr; gap: 2.5rem; }
    .footer__grid { grid-template-columns: 1fr 1fr; }
    .footer { padding: 3rem 1.5rem 1.5rem; }
    .footer__bottom { flex-direction: column; }
    .form-row { grid-template-columns: 1fr; }
    .about-values { grid-template-columns: 1fr; }
  }
`;

const services = [
  { icon: "💆", name: "Signature Facial", desc: "Our most beloved treatment — a deeply nourishing facial tailored to your skin type, using premium botanical extracts.", price: "From $85", duration: "60 min" },
  { icon: "🛁", name: "Aromatherapy Body Wrap", desc: "Indulge in a full-body detoxifying wrap infused with essential oils, leaving skin silky and radiant.", price: "From $110", duration: "75 min" },
  { icon: "💅", name: "Luxury Manicure & Pedicure", desc: "A complete nail experience with hand and foot massage, cuticle care, and your choice of premium polish.", price: "From $65", duration: "90 min" },
  { icon: "✂️", name: "Hair & Style", desc: "Expert cutting, colouring, and styling services delivered by our senior hair artists.", price: "From $95", duration: "60–120 min" },
  { icon: "🌸", name: "Couples Massage", desc: "Share a moment of pure relaxation in our private couples suite with personalised aromatherapy.", price: "From $180", duration: "60 min each" },
  { icon: "💄", name: "Bridal Package", desc: "The complete bridal experience — hair, makeup, nails, and a relaxing facial for your most special day.", price: "From $350", duration: "Full Day" },
];

const team = [
  { name: "Isabelle Moreau", role: "Creative Director", spec: "Balayage & Color Specialist", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80" },
  { name: "Sophia Chen", role: "Senior Therapist", spec: "Facial & Skin Treatments", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80" },
  { name: "Aria Patel", role: "Nail Artist", spec: "Nail Art & Extensions", img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80" },
  { name: "Luna Kim", role: "Makeup Artist", spec: "Bridal & Editorial Makeup", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80" },
];

const gallery = [
  { src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=700&q=80", tall: true },
  { src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=700&q=80", wide: false },
  { src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=700&q=80", wide: false },
  { src: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=700&q=80", wide: true },
  { src: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=700&q=80", wide: false },
];

const testimonials = [
  {
    text: "The most relaxing experience I've ever had. Isabelle transformed my hair completely and the facial left my skin glowing for weeks. I won't go anywhere else.",
    name: "Sophie Laurent",
    detail: "Regular Client · 3 Years",
    stars: "★★★★★",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
  },
  {
    text: "My bridal package was absolutely perfect. The whole team made me feel like a queen on my wedding day. Every detail was flawless — I cried happy tears!",
    name: "Maria Santos",
    detail: "Bridal Client",
    stars: "★★★★★",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
  },
  {
    text: "The couples massage was the best gift I've ever given my partner. The suite is beautiful, the therapists are exceptional, and the atmosphere is pure luxury.",
    name: "Elena Rossi",
    detail: "Spa Client",
    stars: "★★★★★",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
  },
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", date: "", time: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const sections = ["home", "services", "about", "team", "gallery", "contact"];
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      if (window.scrollY > 60) setMenuOpen(false);
      const scrollY = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollY) { setActiveSection(sections[i]); break; }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); setSent(true); };
  const isActive = (s) => activeSection === s ? "nav-active" : "";

  return (
    <>
      <style>{styles}</style>

      {/* NAV */}
      <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
        <a href="#home" className="nav__logo">Lumière <span>Beauty</span></a>
        <ul className="nav__links">
          <li><a href="#services" className={isActive("services")}>Services</a></li>
          <li><a href="#about" className={isActive("about")}>About</a></li>
          <li><a href="#team" className={isActive("team")}>Our Team</a></li>
          <li><a href="#gallery" className={isActive("gallery")}>Gallery</a></li>
          <li><a href="#contact" className={isActive("contact")}>Contact</a></li>
        </ul>
        <a href="#contact" className="nav__btn">Book Now</a>
        <button className={`nav__hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </nav>
      <div className={`nav__mobile-menu ${menuOpen ? "open" : ""}`}>
        <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
        <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        <a href="#team" onClick={() => setMenuOpen(false)}>Our Team</a>
        <a href="#gallery" onClick={() => setMenuOpen(false)}>Gallery</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        <a href="#contact" className="nav__mobile-cta" onClick={() => setMenuOpen(false)}>Book Now</a>
      </div>

      {/* HERO */}
      <section id="home" className="hero">
        <div className="hero__bg" />
        <div className="hero__content">
          <div className="hero__eyebrow">Luxury Beauty & Spa</div>
          <h1 className="hero__title">
            Where Beauty<br />Becomes an <em>Art</em>
          </h1>
          <p className="hero__sub">
            Indulge in a world of luxury treatments, expert hair artistry, and transformative spa experiences — all crafted exclusively for you.
          </p>
          <div className="hero__btns">
            <a href="#contact" className="btn-gold">Book an Appointment</a>
            <a href="#services" className="btn-outline-white">Our Services</a>
          </div>
          <div className="hero__divider">
            {[
              { num: "12+", label: "Years of Excellence" },
              { num: "5,000+", label: "Happy Clients" },
              { num: "4.9★", label: "Average Rating" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div className="hero__stat-num">{s.num}</div>
                <div className="hero__stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section">
        <div className="section-inner">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <span className="eyebrow">Our Treatments</span>
              <h2 className="section-title section-title--purple">Services & <em>Pricing</em></h2>
            </div>
            <a href="#contact" className="btn-purple">Book Now →</a>
          </div>
          <div className="services-grid">
            {services.map((s, i) => (
              <div className="service-card" key={i}>
                <span className="service-card__icon">{s.icon}</span>
                <h3 className="service-card__name">{s.name}</h3>
                <p className="service-card__desc">{s.desc}</p>
                <div className="service-card__price">{s.price}</div>
                <div className="service-card__duration">⏱ {s.duration}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section section--cream">
        <div className="section-inner">
          <div className="about-grid">
            <div className="about-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=700&q=85"
                alt="Lumière Beauty Salon"
                className="about-img"
              />
              <div className="about-img-badge">
                <div className="about-img-badge__num">12+</div>
                <div className="about-img-badge__label">Years of Excellence</div>
              </div>
            </div>
            <div>
              <span className="eyebrow">Our Story</span>
              <h2 className="section-title section-title--purple">Beauty is Our <em>Passion</em></h2>
              <div className="rule" />
              <div className="about-text">
                <p>Lumière Beauty was founded in 2012 with a simple but powerful vision: to create a sanctuary where every woman feels celebrated, beautiful, and deeply cared for.</p>
                <p>Our award-winning team of hair artists, skincare therapists, and beauty specialists bring together years of international training and a genuine love for their craft — delivering results that go beyond the surface.</p>
              </div>
              <div className="about-values">
                {[
                  { title: "Premium Products", desc: "We use only the finest luxury brands — carefully selected for results and skin safety." },
                  { title: "Expert Team", desc: "Every stylist and therapist is internationally trained and continuously educated." },
                  { title: "Bespoke Experience", desc: "No two clients are the same. Every treatment is tailored personally to you." },
                  { title: "Pure Luxury", desc: "From the moment you walk in, every detail is designed for your total relaxation." },
                ].map((v, i) => (
                  <div className="about-value" key={i}>
                    <div className="about-value__title">{v.title}</div>
                    <div className="about-value__desc">{v.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="section section--blush">
        <div className="section-inner">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="eyebrow">Meet the Experts</span>
            <h2 className="section-title section-title--purple">Our <em>Beauty Artists</em></h2>
            <div className="rule" style={{ margin: "0 auto" }} />
          </div>
          <div className="team-grid">
            {team.map((t, i) => (
              <div className="team-card" key={i}>
                <img src={t.img} alt={t.name} className="team-card__img" />
                <div className="team-card__body">
                  <h3 className="team-card__name">{t.name}</h3>
                  <div className="team-card__role">{t.role}</div>
                  <div className="team-card__spec">{t.spec}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="section">
        <div className="section-inner">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <span className="eyebrow">Our Space</span>
              <h2 className="section-title section-title--purple">The <em>Lumière</em> Experience</h2>
            </div>
          </div>
          <div className="gallery-grid">
            {gallery.map((img, i) => (
              <div className={`gallery-item ${img.tall ? "gallery-item--tall" : ""} ${img.wide ? "gallery-item--wide" : ""}`} key={i}>
                <img src={img.src} alt={`Gallery ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section section--cream">
        <div className="section-inner">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="eyebrow">Client Love</span>
            <h2 className="section-title section-title--purple">What Our <em>Clients</em> Say</h2>
            <div className="rule" style={{ margin: "0 auto" }} />
          </div>
          <div className="testi-grid">
            {testimonials.map((t, i) => (
              <div className="testi-card" key={i}>
                <div className="testi-card__stars">{t.stars}</div>
                <p className="testi-card__text">"{t.text}"</p>
                <div className="testi-card__author">
                  <img src={t.avatar} alt={t.name} className="testi-card__avatar" />
                  <div>
                    <div className="testi-card__name">{t.name}</div>
                    <div className="testi-card__detail">{t.detail}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="contact" className="section section--purple">
        <div className="section-inner">
          <div style={{ marginBottom: "3rem" }}>
            <span className="eyebrow eyebrow--white">Book Your Visit</span>
            <h2 className="section-title section-title--white">Reserve Your <em>Experience</em></h2>
            <p className="section-sub section-sub--white">Treat yourself to the luxury you deserve. Book your appointment today.</p>
          </div>
          <div className="booking-grid">
            <div>
              <div className="booking-info">
                <p>We recommend booking in advance to secure your preferred date and therapist. Walk-ins are welcome based on availability.</p>
              </div>
              <div className="booking-details">
                {[
                  { icon: "📞", label: "Phone", value: "+63 917 000 0000" },
                  { icon: "✉️", label: "Email", value: "hello@lumierebeauty.ph" },
                  { icon: "📍", label: "Location", value: "BGC, Taguig City, Manila" },
                  { icon: "🕐", label: "Hours", value: "Tue–Sun: 9AM–8PM" },
                  { icon: "🅿️", label: "Parking", value: "Free parking available" },
                ].map((item, i) => (
                  <div className="booking-detail" key={i}>
                    <div className="booking-detail__icon">{item.icon}</div>
                    <div>
                      <div className="booking-detail__label">{item.label}</div>
                      <div className="booking-detail__value">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="booking-form-wrap">
              {sent ? (
                <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
                  <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>💜</div>
                  <h3 style={{ fontFamily: "var(--font-head)", fontSize: "1.6rem", color: "var(--gold)", marginBottom: "0.75rem" }}>Booking Received!</h3>
                  <p style={{ color: "var(--muted)" }}>Thank you! We'll confirm your appointment within a few hours. We can't wait to welcome you to Lumière!</p>
                </div>
              ) : (
                <>
                  <h3>Book Your Appointment</h3>
                  <p>Fill in your details and we'll confirm within a few hours.</p>
                  <form onSubmit={handleSubmit}>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Full Name</label>
                        <input name="name" type="text" placeholder="Your name" value={form.name} onChange={handleChange} required />
                      </div>
                      <div className="form-group">
                        <label>Email</label>
                        <input name="email" type="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Phone</label>
                        <input name="phone" type="tel" placeholder="+63 9XX XXX XXXX" value={form.phone} onChange={handleChange} />
                      </div>
                      <div className="form-group">
                        <label>Preferred Date</label>
                        <input name="date" type="date" value={form.date} onChange={handleChange} />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Service</label>
                        <select name="service" value={form.service} onChange={handleChange}>
                          <option value="">Select a service</option>
                          <option>Signature Facial</option>
                          <option>Aromatherapy Body Wrap</option>
                          <option>Luxury Manicure & Pedicure</option>
                          <option>Hair & Style</option>
                          <option>Couples Massage</option>
                          <option>Bridal Package</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Preferred Time</label>
                        <select name="time" value={form.time} onChange={handleChange}>
                          <option value="">Select a time</option>
                          <option>9:00 AM</option>
                          <option>10:00 AM</option>
                          <option>11:00 AM</option>
                          <option>12:00 PM</option>
                          <option>2:00 PM</option>
                          <option>3:00 PM</option>
                          <option>4:00 PM</option>
                          <option>5:00 PM</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Special Requests</label>
                      <textarea name="message" rows={3} placeholder="Any allergies, preferences, or special occasions we should know about?" value={form.message} onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn-gold" style={{ width: "100%", textAlign: "center", padding: "1rem" }}>
                      Confirm Booking →
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer__grid">
          <div>
            <a href="#home" className="footer__logo">Lumière <span>Beauty</span></a>
            <p className="footer__about">A luxury beauty sanctuary in the heart of BGC, Manila. Where every visit is a celebration of you.</p>
          </div>
          <div>
            <h6 className="footer__heading">Services</h6>
            <ul className="footer__links">
              <li><a href="#services">Facials & Skin</a></li>
              <li><a href="#services">Hair & Style</a></li>
              <li><a href="#services">Nails</a></li>
              <li><a href="#services">Spa & Body</a></li>
              <li><a href="#services">Bridal</a></li>
            </ul>
          </div>
          <div>
            <h6 className="footer__heading">Salon</h6>
            <ul className="footer__links">
              <li><a href="#about">About Us</a></li>
              <li><a href="#team">Our Team</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#contact">Book Now</a></li>
            </ul>
          </div>
          <div>
            <h6 className="footer__heading">Visit Us</h6>
            <ul className="footer__links">
              <li><a href="tel:+63917000000">+63 917 000 0000</a></li>
              <li><a href="mailto:hello@lumierebeauty.ph">hello@lumierebeauty.ph</a></li>
              <li><a href="#contact">BGC, Taguig City</a></li>
              <li><a href="#contact">Tue–Sun: 9AM–8PM</a></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <p className="footer__copy">© {new Date().getFullYear()} Lumière Beauty. All rights reserved.</p>
          <div className="footer__social">
            <a href="#">ig</a>
            <a href="#">fb</a>
            <a href="#">tw</a>
          </div>
        </div>
      </footer>
    </>
  );
}
