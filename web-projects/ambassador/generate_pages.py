#!/usr/bin/env python3
"""Generate remaining HTML pages for Ambassador Limousine website mockup."""

import os

def header(title, meta_desc, css_path, js_path, home_path):
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <meta name="description" content="{meta_desc}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="{css_path}">
</head>
<body>
<div class="top-bar" id="topBar"><div class="container"><div class="top-bar__left"><a href="mailto:info@ambassadorlimoga.com"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>info@ambassadorlimoga.com</a></div><div class="top-bar__right"><a href="tel:+14045559876"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.15a16 16 0 006.94 6.94l1.5-1.5a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>(404) 555-9876</a></div></div></div>
<header class="site-header" id="siteHeader"><div class="container"><div class="header__inner"><a href="{home_path}" class="header__logo"><svg class="logo-svg" viewBox="0 0 220 56"><text x="0" y="32" font-family="Georgia, serif" font-size="26" font-weight="700" fill="#c9a84c" letter-spacing="-0.5">Ambassador</text><text x="2" y="50" font-family="Arial, sans-serif" font-size="11" fill="rgba(255,255,255,0.65)" letter-spacing="5">LIMOUSINE</text></svg></a><nav class="header__nav"><ul class="nav__list"><li><a href="{home_path.replace('index.html','about.html')}">About Us</a></li><li><a href="{home_path.replace('index.html','fleet.html')}">Fleet</a></li><li><a href="{home_path.replace('index.html','services.html')}">Services</a></li><li><a href="{home_path.replace('index.html','contact.html')}">Contact Us</a></li></ul></nav><div class="header__ctas"><a href="{home_path.replace('index.html','reservations.html')}" class="btn btn--outline btn--sm">Reservations</a><a href="{home_path.replace('index.html','get-a-quote.html')}" class="btn btn--gold btn--sm">Get a Quote</a></div><button class="hamburger" id="hamburger" aria-label="Open menu"><span></span><span></span><span></span></button></div></div></header>
<nav class="mobile-nav" id="mobileNav"><ul class="mobile-nav__list"><li class="mobile-nav__item"><a href="{home_path.replace('index.html','about.html')}" class="mobile-nav__link">About Us</a></li><li class="mobile-nav__item"><a href="{home_path.replace('index.html','fleet.html')}" class="mobile-nav__link">Fleet</a></li><li class="mobile-nav__item"><a href="{home_path.replace('index.html','services.html')}" class="mobile-nav__link">Services</a></li><li class="mobile-nav__item"><a href="{home_path.replace('index.html','contact.html')}" class="mobile-nav__link">Contact</a></li></ul><div class="mobile-nav__ctas"><a href="{home_path.replace('index.html','reservations.html')}" class="btn btn--outline btn--full">Reservations</a><a href="{home_path.replace('index.html','get-a-quote.html')}" class="btn btn--gold btn--full">Get a Quote</a></div></nav>'''


def footer(home_path, css_depth, js_path):
    terms = home_path.replace('index.html', 'terms.html')
    privacy = home_path.replace('index.html', 'privacy.html')
    return f'''
<footer class="site-footer">
  <div class="container">
    <div class="footer__top">
      <div class="footer__brand"><a href="{home_path}" class="footer__logo"><svg width="180" height="48" viewBox="0 0 220 56"><text x="0" y="32" font-family="Georgia, serif" font-size="26" font-weight="700" fill="#c9a84c" letter-spacing="-0.5">Ambassador</text><text x="2" y="50" font-family="Arial, sans-serif" font-size="11" fill="rgba(255,255,255,0.5)" letter-spacing="5">LIMOUSINE</text></svg></a><p class="footer__desc">Atlanta\'s premier limousine and black car service since 2012.</p></div>
      <div><p class="footer__col-title">Useful Links</p><nav class="footer__links"><a href="{home_path.replace('index.html','about.html')}">About Us</a><a href="{home_path.replace('index.html','fleet.html')}">Fleet</a><a href="{home_path.replace('index.html','services.html')}">Services</a><a href="{home_path.replace('index.html','contact.html')}">Contact</a><a href="{home_path.replace('index.html','faq.html')}">FAQ</a></nav></div>
      <div><p class="footer__col-title">Services</p><nav class="footer__links"><a href="{css_depth}pages/services/airport-transportation.html">Airport Transportation</a><a href="{css_depth}pages/services/corporate-transportation.html">Corporate Transportation</a><a href="{css_depth}pages/services/wedding-transportation.html">Wedding Transportation</a><a href="{home_path.replace('index.html','services.html')}">View All →</a></nav></div>
      <div><p class="footer__col-title">Contact</p><div class="footer__contact-block"><div class="footer__contact-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.15a16 16 0 006.94 6.94l1.5-1.5a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg><a href="tel:+14045559876">(404) 555-9876</a></div></div></div>
    </div>
    <div class="footer__bottom"><p class="footer__copyright">&copy; 2025 Ambassador Limousine. All rights reserved.</p><div class="footer__legal-links"><a href="{terms}">Terms</a><a href="{privacy}">Privacy</a></div></div>
  </div>
</footer>
<script src="{js_path}"></script>
</body>
</html>'''


def service_page(filename, page_title, h1, subtitle, desc1, desc2, includes, vehicles, cta_title, cta_desc, sidebar_extra, related):
    home = '../../index.html'
    css = '../../css/style.css'
    js = '../../js/main.js'
    depth = ''  # relative from pages/services/ to root is ../../

    vehicle_svgs = {
        'sedan': '<svg viewBox="0 0 120 60" fill="none"><rect x="10" y="20" width="100" height="28" rx="8" fill="#1a1a1a"/><rect x="25" y="12" width="65" height="20" rx="5" fill="#222"/><circle cx="30" cy="50" r="8" fill="#333"/><circle cx="90" cy="50" r="8" fill="#333"/></svg>',
        'suv': '<svg viewBox="0 0 120 60" fill="none"><rect x="8" y="18" width="104" height="32" rx="6" fill="#1a1a1a"/><rect x="20" y="10" width="75" height="22" rx="4" fill="#222"/><circle cx="28" cy="52" r="9" fill="#333"/><circle cx="92" cy="52" r="9" fill="#333"/></svg>',
        'limo': '<svg viewBox="0 0 120 60" fill="none"><rect x="3" y="22" width="114" height="26" rx="5" fill="#1a1a1a"/><rect x="15" y="14" width="85" height="18" rx="4" fill="#222"/><circle cx="25" cy="50" r="8" fill="#333"/><circle cx="55" cy="50" r="8" fill="#333"/><circle cx="95" cy="50" r="8" fill="#333"/></svg>',
        'van': '<svg viewBox="0 0 120 60" fill="none"><rect x="5" y="15" width="110" height="35" rx="5" fill="#1a1a1a"/><rect x="10" y="10" width="70" height="20" rx="3" fill="#222"/><circle cx="25" cy="52" r="8" fill="#333"/><circle cx="95" cy="52" r="8" fill="#333"/></svg>',
        'bus': '<svg viewBox="0 0 120 60" fill="none"><rect x="3" y="12" width="114" height="38" rx="4" fill="#1a1a1a"/><rect x="8" y="16" width="104" height="18" rx="2" fill="#222"/><circle cx="22" cy="52" r="8" fill="#333"/><circle cx="98" cy="52" r="8" fill="#333"/></svg>',
    }

    v_cards = ''
    for v in vehicles:
        vtype = v.get('type', 'sedan')
        svg = vehicle_svgs.get(vtype, vehicle_svgs['sedan'])
        v_cards += f'''
            <a href="../fleet/{v['slug']}" class="vehicle-card">
              <div class="vehicle-card__img">{svg}</div>
              <div class="vehicle-card__info"><strong>{v['name']}</strong><span>{v['cap']}</span></div>
            </a>'''

    rel_links = ''
    for r in related:
        rel_links += f'<a href="{r["slug"]}">{r["name"]}</a>'

    inc_items = ''.join(f'<li>{i}</li>' for i in includes)

    sidebar_extra_html = ''
    if sidebar_extra:
        sidebar_extra_html = f'''
        <div class="sidebar-card">
          <h4>{sidebar_extra["title"]}</h4>
          <ul style="font-size:0.9rem;color:var(--color-text-muted);padding-left:1.2rem">
            {''.join(f"<li>{i}</li>" for i in sidebar_extra["items"])}
          </ul>
        </div>'''

    content = header(f'{page_title} | Ambassador Limousine', desc1[:155], css, js, home)
    content += f'''

<div class="page-banner">
  <div class="container">
    <div class="page-banner__content">
      <div class="breadcrumb"><a href="../../index.html">Home</a><span>/</span><a href="../../services.html">Services</a><span>/</span><span>{h1}</span></div>
      <h1 class="page-banner__title">{h1}</h1>
      <p class="page-banner__sub">{subtitle}</p>
    </div>
  </div>
</div>

<section class="section">
  <div class="container">
    <div class="service-detail-layout">
      <div class="service-detail-main">
        <div class="fade-up">
          <h2>{page_title} in Atlanta</h2>
          <p>{desc1}</p>
          <p>{desc2}</p>
        </div>
        <div class="service-includes fade-up">
          <h3>Service Includes</h3>
          <ul class="service-includes__list">{inc_items}</ul>
        </div>
        <div class="vehicle-selection fade-up">
          <h3>Recommended Vehicles</h3>
          <div class="vehicle-grid">{v_cards}
          </div>
        </div>
        <div class="service-cta-box fade-up">
          <h3>{cta_title}</h3>
          <p>{cta_desc}</p>
          <div class="cta-buttons">
            <a href="../../get-a-quote.html" class="btn btn--gold">Get a Quote</a>
            <a href="../../reservations.html" class="btn btn--outline">Book Now</a>
          </div>
        </div>
      </div>
      <aside class="service-detail-sidebar">
        <div class="sidebar-card">
          <h4>Book This Service</h4>
          <a href="../../reservations.html" class="btn btn--gold btn--full" style="margin-bottom:12px">Book Online Now</a>
          <a href="tel:+14045559876" class="btn btn--outline btn--full">Call (404) 555-9876</a>
        </div>
        <div class="sidebar-card">
          <h4>Available 24/7</h4>
          <p style="font-size:0.9rem;color:var(--color-text-muted)">Our dispatch team is available around the clock, every day of the year.</p>
        </div>{sidebar_extra_html}
        <div class="sidebar-card">
          <h4>Related Services</h4>
          <nav class="sidebar-nav">{rel_links}</nav>
        </div>
      </aside>
    </div>
  </div>
</section>'''

    content += footer(home, '../../', js)
    return content


def fleet_page(filename, vehicle_name, vehicle_type, passengers, luggage, features, desc1, desc2):
    home = '../../index.html'
    css = '../../css/style.css'
    js = '../../js/main.js'

    vehicle_svgs = {
        'sedan': '<svg viewBox="0 0 200 100" fill="none"><rect x="15" y="35" width="170" height="48" rx="12" fill="#1a1a1a"/><rect x="40" y="18" width="115" height="35" rx="8" fill="#222"/><circle cx="50" cy="87" r="14" fill="#2a2a2a"/><circle cx="150" cy="87" r="14" fill="#2a2a2a"/><rect x="55" y="22" width="85" height="20" rx="4" fill="#111" opacity="0.5"/></svg>',
        'suv': '<svg viewBox="0 0 200 100" fill="none"><rect x="12" y="28" width="176" height="54" rx="10" fill="#1a1a1a"/><rect x="28" y="14" width="135" height="38" rx="7" fill="#222"/><circle cx="48" cy="86" r="14" fill="#2a2a2a"/><circle cx="152" cy="86" r="14" fill="#2a2a2a"/><rect x="35" y="18" width="118" height="22" rx="4" fill="#111" opacity="0.5"/></svg>',
        'limo': '<svg viewBox="0 0 200 100" fill="none"><rect x="5" y="35" width="190" height="44" rx="8" fill="#1a1a1a"/><rect x="25" y="20" width="145" height="30" rx="6" fill="#222"/><circle cx="40" cy="83" r="13" fill="#2a2a2a"/><circle cx="95" cy="83" r="13" fill="#2a2a2a"/><circle cx="160" cy="83" r="13" fill="#2a2a2a"/><rect x="30" y="23" width="130" height="18" rx="3" fill="#111" opacity="0.5"/></svg>',
        'van': '<svg viewBox="0 0 200 100" fill="none"><rect x="8" y="22" width="184" height="58" rx="8" fill="#1a1a1a"/><rect x="14" y="16" width="120" height="34" rx="6" fill="#222"/><circle cx="42" cy="84" r="14" fill="#2a2a2a"/><circle cx="158" cy="84" r="14" fill="#2a2a2a"/><rect x="18" y="20" width="110" height="20" rx="3" fill="#111" opacity="0.5"/></svg>',
        'bus': '<svg viewBox="0 0 200 100" fill="none"><rect x="5" y="18" width="190" height="64" rx="6" fill="#1a1a1a"/><rect x="10" y="22" width="180" height="30" rx="3" fill="#222"/><circle cx="35" cy="86" r="14" fill="#2a2a2a"/><circle cx="165" cy="86" r="14" fill="#2a2a2a"/><rect x="14" y="25" width="170" height="18" rx="2" fill="#111" opacity="0.5"/></svg>',
    }

    svg = vehicle_svgs.get(vehicle_type, vehicle_svgs['sedan'])
    feat_items = ''.join(f'<li>{f}</li>' for f in features)

    content = header(
        f'{vehicle_name} | Ambassador Limousine Fleet',
        f'Ride in style with the {vehicle_name}. Up to {passengers} passengers. Professional chauffeur service in Atlanta, GA.',
        css, js, home
    )
    content += f'''

<div class="page-banner">
  <div class="container">
    <div class="page-banner__content">
      <div class="breadcrumb"><a href="../../index.html">Home</a><span>/</span><a href="../../fleet.html">Fleet</a><span>/</span><span>{vehicle_name}</span></div>
      <h1 class="page-banner__title">{vehicle_name}</h1>
      <p class="page-banner__sub">{vehicle_type.title()} · Up to {passengers} passengers · Available 24/7</p>
    </div>
  </div>
</div>

<section class="section">
  <div class="container">
    <div class="fleet-detail-layout">
      <div class="fleet-detail-main">
        <div class="fleet-detail-hero fade-up">
          <div class="fleet-hero-img">{svg}</div>
        </div>
        <div class="fade-up" style="margin-top:2rem">
          <h2>About the {vehicle_name}</h2>
          <p>{desc1}</p>
          <p>{desc2}</p>
        </div>
        <div class="fleet-specs fade-up">
          <h3>Vehicle Specifications</h3>
          <div class="specs-grid">
            <div class="spec-item"><strong>Vehicle Class</strong><span>{vehicle_type.title()}</span></div>
            <div class="spec-item"><strong>Passenger Capacity</strong><span>Up to {passengers}</span></div>
            <div class="spec-item"><strong>Luggage</strong><span>{luggage}</span></div>
            <div class="spec-item"><strong>Availability</strong><span>24/7</span></div>
          </div>
        </div>
        <div class="service-includes fade-up">
          <h3>Vehicle Features &amp; Amenities</h3>
          <ul class="service-includes__list">{feat_items}</ul>
        </div>
      </div>
      <aside class="service-detail-sidebar">
        <div class="sidebar-card">
          <h4>Reserve the {vehicle_name}</h4>
          <a href="../../reservations.html" class="btn btn--gold btn--full" style="margin-bottom:12px">Book Online Now</a>
          <a href="../../get-a-quote.html" class="btn btn--outline btn--full" style="margin-bottom:12px">Get a Quote</a>
          <a href="tel:+14045559876" class="btn btn--outline btn--full">Call (404) 555-9876</a>
        </div>
        <div class="sidebar-card">
          <h4>Capacity</h4>
          <p style="font-size:0.9rem;color:var(--color-text-muted)"><strong>{passengers} passengers</strong> maximum. Luggage: {luggage}.</p>
        </div>
        <div class="sidebar-card">
          <h4>Services Using This Vehicle</h4>
          <nav class="sidebar-nav">
            <a href="../../pages/services/airport-transportation.html">Airport Transportation</a>
            <a href="../../pages/services/corporate-transportation.html">Corporate Transportation</a>
            <a href="../../pages/services/hourly-car-service.html">Hourly Car Service</a>
            <a href="../../services.html">View All Services</a>
          </nav>
        </div>
      </aside>
    </div>
  </div>
</section>'''

    content += footer(home, '../../', js)
    return content


def service_area_page(filename, area_name, county, zip_codes, desc1, desc2, services, nearby):
    home = '../../index.html'
    css = '../../css/style.css'
    js = '../../js/main.js'

    svc_items = ''.join(f'<li><a href="../../pages/services/{s["slug"]}">{s["name"]}</a></li>' for s in services)
    nearby_items = ''.join(f'<li><a href="{n["slug"]}">{n["name"]}</a></li>' for n in nearby)

    content = header(
        f'Limo Service {area_name} GA | Ambassador Limousine',
        f'Luxury limousine and black car service in {area_name}, GA. Professional chauffeurs, airport transfers, and corporate transportation. Call (404) 555-9876.',
        css, js, home
    )
    content += f'''

<div class="page-banner">
  <div class="container">
    <div class="page-banner__content">
      <div class="breadcrumb"><a href="../../index.html">Home</a><span>/</span><a href="../../service-area.html">Service Areas</a><span>/</span><span>{area_name}</span></div>
      <h1 class="page-banner__title">Limo Service in {area_name}, GA</h1>
      <p class="page-banner__sub">Professional limousine and black car service throughout {area_name} and {county} County.</p>
    </div>
  </div>
</div>

<section class="section">
  <div class="container">
    <div class="service-detail-layout">
      <div class="service-detail-main">
        <div class="fade-up">
          <h2>Ambassador Limousine Serves {area_name}</h2>
          <p>{desc1}</p>
          <p>{desc2}</p>
        </div>
        <div class="service-includes fade-up">
          <h3>Services Available in {area_name}</h3>
          <ul class="service-includes__list">{svc_items}</ul>
        </div>
        <div class="service-cta-box fade-up">
          <h3>Book a Ride in {area_name}</h3>
          <p>Ready to experience Atlanta's finest ground transportation? Book online or call our 24/7 dispatch team.</p>
          <div class="cta-buttons">
            <a href="../../get-a-quote.html" class="btn btn--gold">Get a Free Quote</a>
            <a href="../../reservations.html" class="btn btn--outline">Book Online</a>
          </div>
        </div>
      </div>
      <aside class="service-detail-sidebar">
        <div class="sidebar-card">
          <h4>Book a Ride</h4>
          <a href="../../reservations.html" class="btn btn--gold btn--full" style="margin-bottom:12px">Book Online Now</a>
          <a href="tel:+14045559876" class="btn btn--outline btn--full">Call (404) 555-9876</a>
        </div>
        <div class="sidebar-card">
          <h4>Area Details</h4>
          <p style="font-size:0.9rem;color:var(--color-text-muted)">{area_name}, {county} County, GA<br>Zip codes: {zip_codes}</p>
        </div>
        <div class="sidebar-card">
          <h4>Nearby Areas We Serve</h4>
          <ul style="font-size:0.9rem;color:var(--color-text-muted);padding-left:1.2rem">{nearby_items}</ul>
        </div>
      </aside>
    </div>
  </div>
</section>'''

    content += footer(home, '../../', js)
    return content


def location_page(filename, city, state, state_full, desc1, desc2, services_list, airport_info):
    home = '../../index.html'
    css = '../../css/style.css'
    js = '../../js/main.js'

    svc_items = ''.join(f'<li>{s}</li>' for s in services_list)

    content = header(
        f'Limousine Service {city}, {state} | Ambassador Limousine',
        f'Luxury limousine and black car service in {city}, {state_full}. Professional chauffeurs, airport transfers, and corporate transportation. Available 24/7.',
        css, js, home
    )
    content += f'''

<div class="page-banner">
  <div class="container">
    <div class="page-banner__content">
      <div class="breadcrumb"><a href="../../index.html">Home</a><span>/</span><a href="../../locations.html">Locations</a><span>/</span><span>{city}, {state}</span></div>
      <h1 class="page-banner__title">Limo Service in {city}, {state}</h1>
      <p class="page-banner__sub">Ambassador Limousine's trusted nationwide partners provide five-star ground transportation in {city}.</p>
    </div>
  </div>
</div>

<section class="section">
  <div class="container">
    <div class="service-detail-layout">
      <div class="service-detail-main">
        <div class="fade-up">
          <h2>Ambassador Limousine in {city}, {state_full}</h2>
          <p>{desc1}</p>
          <p>{desc2}</p>
        </div>
        <div class="service-includes fade-up">
          <h3>Services Available in {city}</h3>
          <ul class="service-includes__list">{svc_items}</ul>
        </div>
        <div class="service-cta-box fade-up">
          <h3>Book {city} Transportation</h3>
          <p>Get a quote for your {city} trip or call our Atlanta office to coordinate nationwide travel. We handle all logistics so you can focus on your journey.</p>
          <div class="cta-buttons">
            <a href="../../get-a-quote.html" class="btn btn--gold">Get a Quote</a>
            <a href="tel:+14045559876" class="btn btn--outline">Call (404) 555-9876</a>
          </div>
        </div>
      </div>
      <aside class="service-detail-sidebar">
        <div class="sidebar-card">
          <h4>Book {city} Service</h4>
          <a href="../../reservations.html" class="btn btn--gold btn--full" style="margin-bottom:12px">Book Online Now</a>
          <a href="tel:+14045559876" class="btn btn--outline btn--full">Call (404) 555-9876</a>
        </div>
        <div class="sidebar-card">
          <h4>{city} Airport</h4>
          <p style="font-size:0.9rem;color:var(--color-text-muted)">{airport_info}</p>
        </div>
        <div class="sidebar-card">
          <h4>Other Locations</h4>
          <nav class="sidebar-nav">
            <a href="washington-dc.html">Washington, DC</a>
            <a href="san-francisco.html">San Francisco, CA</a>
            <a href="orlando.html">Orlando, FL</a>
            <a href="chicago.html">Chicago, IL</a>
            <a href="boston.html">Boston, MA</a>
          </nav>
        </div>
      </aside>
    </div>
  </div>
</section>'''

    content += footer(home, '../../', js)
    return content


# ─── SERVICE PAGES ─────────────────────────────────────────────────────────────

service_pages = [
    {
        'filename': 'pages/services/hourly-car-service.html',
        'page_title': 'Hourly Car Service',
        'h1': 'Hourly Car Service',
        'subtitle': 'Flexible, as-directed chauffeured transportation by the hour in Atlanta and surrounding areas.',
        'desc1': 'Sometimes you need a chauffeur at your disposal for several hours at a time. Ambassador Limousine\'s hourly car service gives you a dedicated driver and vehicle for as long as you need — perfect for business meetings, multi-stop errands, special events, or a leisurely day out.',
        'desc2': 'With our hourly service, your chauffeur is completely at your direction. Stop where you want, stay as long as you like, and move on when you\'re ready. It\'s the most flexible way to travel Atlanta.',
        'includes': [
            'Dedicated chauffeur for the full duration',
            'As-directed routing — you set the itinerary',
            'Multiple stops, no extra charge',
            'Late-model luxury vehicle of your choice',
            'Complimentary water and amenities',
            'Professional attire and courteous service',
            'Available in 2-hour minimum increments',
            'Rates available for half-day and full-day',
            'Wait time included within booked hours',
            'Flexible pickup and drop-off locations',
        ],
        'vehicles': [
            {'slug': 'sedan-volvo-s90.html', 'name': '2025 Volvo S90', 'cap': 'Executive Sedan · 3 passengers', 'type': 'sedan'},
            {'slug': 'suv-cadillac-escalade.html', 'name': 'Cadillac Escalade ESV', 'cap': 'Executive SUV · 6 passengers', 'type': 'suv'},
            {'slug': 'van-sprinter-exec.html', 'name': 'Mercedes Sprinter Executive', 'cap': 'Executive Van · 12 passengers', 'type': 'van'},
        ],
        'cta_title': 'Reserve Your Chauffeur by the Hour',
        'cta_desc': 'Book hourly service online or call our team to discuss your itinerary and get a custom quote.',
        'sidebar_extra': {'title': 'Minimum Booking', 'items': ['2-hour minimum', 'Half-day: 4 hours', 'Full-day: 8 hours', 'Custom rates available']},
        'related': [
            {'slug': 'corporate-transportation.html', 'name': 'Corporate Transportation'},
            {'slug': 'airport-transportation.html', 'name': 'Airport Transportation'},
            {'slug': 'special-occasion.html', 'name': 'Special Occasions'},
        ],
    },
    {
        'filename': 'pages/services/charter-bus.html',
        'page_title': 'Charter Bus Service',
        'h1': 'Charter Bus Service',
        'subtitle': 'Comfortable, full-size motor coach and charter bus service for large groups in Atlanta.',
        'desc1': 'When your group is too large for a standard limousine or SUV, Ambassador Limousine\'s charter bus service steps up. We offer 28-passenger mini-coaches, 38-passenger buses, and 56-passenger full-size motor coaches to handle groups of any size with the same luxury and professionalism you expect.',
        'desc2': 'Ideal for corporate retreats, sports team travel, school groups, convention shuttles, and large event transportation, our charter buses are equipped with premium seating, climate control, and experienced drivers.',
        'includes': [
            'Professional CDL-licensed bus driver',
            'Climate-controlled coach with reclining seats',
            'Overhead and under-coach luggage storage',
            'Onboard restroom (full-size coaches)',
            'PA system for announcements',
            'Power outlets and USB charging ports',
            'Wi-Fi available in select coaches',
            'Custom signage/welcome boards available',
            'Flexible scheduling and multi-day trips',
            'Nationwide service with partner operators',
        ],
        'vehicles': [
            {'slug': 'bus-28-passenger.html', 'name': '28-Passenger Mini-Coach', 'cap': 'Mini-Coach · 28 passengers', 'type': 'bus'},
            {'slug': 'bus-38-passenger.html', 'name': '38-Passenger Coach', 'cap': 'Mid-Size Coach · 38 passengers', 'type': 'bus'},
            {'slug': 'coach-56-passenger.html', 'name': '56-Passenger Motor Coach', 'cap': 'Full-Size Coach · 56 passengers', 'type': 'bus'},
        ],
        'cta_title': 'Request a Charter Bus Quote',
        'cta_desc': 'Tell us your group size, event date, and route. Our team will provide a competitive charter bus quote within hours.',
        'sidebar_extra': {'title': 'Coach Features', 'items': ['28 to 56 passengers', 'Nationwide coverage', 'CDL-licensed drivers', 'Multi-day trips available']},
        'related': [
            {'slug': 'group-transportation.html', 'name': 'Group Transportation'},
            {'slug': 'shuttle-service.html', 'name': 'Shuttle Service'},
            {'slug': 'meeting-event.html', 'name': 'Meeting & Event Service'},
        ],
    },
    {
        'filename': 'pages/services/concert-transportation.html',
        'page_title': 'Concert Transportation',
        'h1': 'Concert Transportation',
        'subtitle': 'Skip the parking hassle and arrive at Atlanta concerts and music venues in luxury.',
        'desc1': 'Attending a concert at State Farm Arena, Ameris Bank Amphitheatre, or any Atlanta music venue is far more enjoyable when you don\'t have to worry about parking, traffic, or finding a safe ride home. Ambassador Limousine provides premium concert transportation so you can focus on the show.',
        'desc2': 'Our chauffeurs track concert end times and are waiting for you when the show lets out, no matter how late. We serve all major Atlanta concert venues and can accommodate groups of all sizes.',
        'includes': [
            'On-time pickup from your home or hotel',
            'VIP drop-off at the venue entrance',
            'Chauffeur waits and monitors concert end time',
            'Post-concert pickup right at your exit',
            'Vehicles stocked with beverages',
            'Group and party vehicles available',
            'No parking fees or traffic stress',
            'Safe, sober driver guaranteed',
            'Multi-venue and after-party stops available',
            'Available for all Atlanta venues',
        ],
        'vehicles': [
            {'slug': 'suv-cadillac-escalade.html', 'name': 'Cadillac Escalade ESV', 'cap': 'Group SUV · 6 passengers', 'type': 'suv'},
            {'slug': 'limo-chrysler-stretch.html', 'name': 'Chrysler 300 Stretch Limo', 'cap': 'Party Limo · 10 passengers', 'type': 'limo'},
            {'slug': 'van-sprinter-limo.html', 'name': 'Mercedes Sprinter Limo Van', 'cap': 'Party Van · 14 passengers', 'type': 'van'},
        ],
        'cta_title': 'Book Concert Transportation Today',
        'cta_desc': 'Planning to attend an upcoming show? Reserve your ride early — concert nights fill up fast.',
        'sidebar_extra': {'title': 'Popular Venues', 'items': ['State Farm Arena', 'Ameris Bank Amphitheatre', 'Coca-Cola Roxy', 'Music Midtown', 'Tabernacle Atlanta']},
        'related': [
            {'slug': 'night-on-town.html', 'name': 'Night on the Town'},
            {'slug': 'sporting-event.html', 'name': 'Sporting Event Transportation'},
            {'slug': 'group-transportation.html', 'name': 'Group Transportation'},
        ],
    },
    {
        'filename': 'pages/services/sporting-event.html',
        'page_title': 'Sporting Event Transportation',
        'h1': 'Sporting Event Transportation',
        'subtitle': 'Arrive at Atlanta\'s biggest games in style. Chauffeur service to Mercedes-Benz Stadium, Truist Park, and more.',
        'desc1': 'Atlanta is home to world-class sports teams — the Falcons, Braves, Hawks, Atlanta United, and Dream. Game days bring excitement and massive crowds, which is exactly why Ambassador Limousine\'s sporting event transportation is the smart choice for serious fans.',
        'desc2': 'We know every parking garage, every drop-off lane, and every traffic shortcut around Atlanta\'s major venues. Our chauffeurs get you there efficiently and pick you up at the perfect post-game spot.',
        'includes': [
            'Premium door-to-door service to all Atlanta venues',
            'Advance booking with guaranteed availability',
            'Chauffeur monitoring for game end times',
            'Coordinated post-game pickup',
            'Tailgating and pre-game arrival service',
            'Cold beverages and snacks available',
            'Groups from 1 to 56 passengers accommodated',
            'Suite and VIP entrance coordination',
            'Corporate suite package available',
            'Safe, reliable transport home after the game',
        ],
        'vehicles': [
            {'slug': 'suv-cadillac-escalade.html', 'name': 'Cadillac Escalade ESV', 'cap': 'Group SUV · 6 passengers', 'type': 'suv'},
            {'slug': 'van-sprinter-exec.html', 'name': 'Mercedes Sprinter Executive', 'cap': 'Group Van · 12 passengers', 'type': 'van'},
            {'slug': 'bus-28-passenger.html', 'name': '28-Passenger Mini-Coach', 'cap': 'Mini-Coach · 28 passengers', 'type': 'bus'},
        ],
        'cta_title': 'Book Your Game Day Ride',
        'cta_desc': 'Don\'t battle game day parking and traffic. Reserve your chauffeur today for an effortless stadium experience.',
        'sidebar_extra': {'title': 'Atlanta Venues', 'items': ['Mercedes-Benz Stadium', 'Truist Park', 'State Farm Arena', 'Bobby Dodd Stadium', 'Fifth Third Bank Stadium']},
        'related': [
            {'slug': 'concert-transportation.html', 'name': 'Concert Transportation'},
            {'slug': 'group-transportation.html', 'name': 'Group Transportation'},
            {'slug': 'masters-golf.html', 'name': 'Masters Golf Transportation'},
        ],
    },
]

for p in service_pages:
    html = service_page(**p)
    path = f'/home/user/ambassador-website-mockup-/{p["filename"]}'
    with open(path, 'w') as f:
        f.write(html)
    print(f'Created {path}')


service_pages2 = [
    {
        'filename': 'pages/services/group-transportation.html',
        'page_title': 'Group Transportation',
        'h1': 'Group Transportation',
        'subtitle': 'Seamless transportation for large groups in Atlanta. Vans, coaches, and coordinated fleets for any size gathering.',
        'desc1': 'Managing transportation for a large group can be logistically complex. Ambassador Limousine specializes in group transportation — from small parties of 7 to corporate groups of 100+ — with coordinated dispatch, matched vehicles, and professional chauffeurs who handle every detail.',
        'desc2': 'We offer single-vehicle group transport for mid-size groups and multi-vehicle fleet coordination for large events. Our experienced operations team ensures every passenger arrives on time, every time.',
        'includes': [
            'Vehicles for groups from 7 to 100+ passengers',
            'Multi-vehicle fleet coordination',
            'Single point of contact for all bookings',
            'Coordinated pick-up and drop-off logistics',
            'Custom signage and branding available',
            'Passenger manifest management',
            'On-site coordinator for large events',
            'Flexible scheduling and routing',
            'Corporate billing and invoicing',
            'Nationwide partner network for travel anywhere',
        ],
        'vehicles': [
            {'slug': 'van-sprinter-exec.html', 'name': 'Mercedes Sprinter Executive', 'cap': 'Group Van · 12 passengers', 'type': 'van'},
            {'slug': 'bus-28-passenger.html', 'name': '28-Passenger Mini-Coach', 'cap': 'Mini-Coach · 28 passengers', 'type': 'bus'},
            {'slug': 'coach-56-passenger.html', 'name': '56-Passenger Motor Coach', 'cap': 'Full-Size Coach · 56 passengers', 'type': 'bus'},
        ],
        'cta_title': 'Get a Group Transportation Quote',
        'cta_desc': 'Share your group size, event date, and route details. We\'ll provide a comprehensive group transportation plan.',
        'sidebar_extra': {'title': 'Group Sizes We Serve', 'items': ['7–14 passengers (vans)', '15–28 passengers (mini-coach)', '29–56 passengers (full coach)', '57–100+ (multiple vehicles)']},
        'related': [
            {'slug': 'charter-bus.html', 'name': 'Charter Bus Service'},
            {'slug': 'shuttle-service.html', 'name': 'Shuttle Service'},
            {'slug': 'meeting-event.html', 'name': 'Meeting & Event Service'},
        ],
    },
    {
        'filename': 'pages/services/shuttle-service.html',
        'page_title': 'Shuttle Service',
        'h1': 'Shuttle Service',
        'subtitle': 'Continuous loop shuttle service for hotels, corporate campuses, events, and airports in Atlanta.',
        'desc1': 'Ambassador Limousine offers professionally managed shuttle service for hotels, corporate campuses, conference centers, and special events. Our shuttle programs run on your schedule, keeping guests, employees, and attendees moving efficiently between destinations.',
        'desc2': 'From a single hotel-to-airport shuttle to a multi-stop conference shuttle running all weekend, we scale our service to fit your exact needs. Our dispatchers monitor routes in real time for maximum reliability.',
        'includes': [
            'Scheduled and on-demand shuttle options',
            'Hotel, airport, and venue shuttle programs',
            'Corporate campus shuttle routes',
            'Conference and convention shuttle loops',
            'Event-day guest arrival and departure service',
            'GPS-tracked vehicles for live monitoring',
            'Professional, uniformed drivers',
            'Custom schedule and route planning',
            'Passenger counting and manifest tracking',
            'Multi-day and extended program rates',
        ],
        'vehicles': [
            {'slug': 'suv-suburban.html', 'name': 'Chevy Suburban LT', 'cap': 'Group SUV · 6 passengers', 'type': 'suv'},
            {'slug': 'van-sprinter-exec.html', 'name': 'Mercedes Sprinter Executive', 'cap': 'Shuttle Van · 12 passengers', 'type': 'van'},
            {'slug': 'bus-28-passenger.html', 'name': '28-Passenger Mini-Coach', 'cap': 'Shuttle Coach · 28 passengers', 'type': 'bus'},
        ],
        'cta_title': 'Set Up Your Shuttle Program',
        'cta_desc': 'Tell us your location, schedule, and passenger volume. We\'ll design an efficient shuttle program that fits your operation.',
        'sidebar_extra': {'title': 'Shuttle Programs', 'items': ['Hotel shuttle service', 'Airport shuttle loops', 'Corporate campus routes', 'Convention center service', 'Event ingress/egress']},
        'related': [
            {'slug': 'group-transportation.html', 'name': 'Group Transportation'},
            {'slug': 'meeting-event.html', 'name': 'Meeting & Event Service'},
            {'slug': 'charter-bus.html', 'name': 'Charter Bus Service'},
        ],
    },
    {
        'filename': 'pages/services/meeting-event.html',
        'page_title': 'Meeting & Event Transportation',
        'h1': 'Meeting & Event Transportation',
        'subtitle': 'Professional ground transportation for corporate meetings, conferences, and events in Atlanta.',
        'desc1': 'Ambassador Limousine is Atlanta\'s go-to transportation partner for corporate meetings, conferences, seminars, and special events. We handle every transportation detail — from VIP executive transfers to large group shuttle coordination — so your event runs seamlessly.',
        'desc2': 'Our event transportation specialists work with your event planners, hotel coordinators, and venue teams to ensure every attendee arrives on time and in style. We scale from single executive arrivals to 500+ attendee conference logistics.',
        'includes': [
            'VIP executive arrival and departure transfers',
            'Multi-vehicle fleet coordination',
            'Airport meet-and-greet for out-of-town guests',
            'Hotel-to-venue shuttle programs',
            'Gala and awards dinner transportation',
            'Off-site dinner and entertainment transport',
            'Custom branding and signage on vehicles',
            'On-site transportation coordinator',
            'Corporate billing and detailed trip reporting',
            'Pre-event planning consultation',
        ],
        'vehicles': [
            {'slug': 'sedan-mercedes-s580.html', 'name': 'Mercedes-Benz S580', 'cap': 'VIP Sedan · 3 passengers', 'type': 'sedan'},
            {'slug': 'suv-cadillac-escalade.html', 'name': 'Cadillac Escalade ESV', 'cap': 'Executive SUV · 6 passengers', 'type': 'suv'},
            {'slug': 'van-sprinter-exec.html', 'name': 'Mercedes Sprinter Executive', 'cap': 'Group Van · 12 passengers', 'type': 'van'},
            {'slug': 'coach-56-passenger.html', 'name': '56-Passenger Motor Coach', 'cap': 'Full-Size Coach · 56 passengers', 'type': 'bus'},
        ],
        'cta_title': 'Plan Your Event Transportation',
        'cta_desc': 'Reach out to our event transportation team early to lock in vehicles and coordinate logistics for your Atlanta event.',
        'sidebar_extra': {'title': 'Event Types', 'items': ['Corporate conferences', 'Annual meetings & galas', 'Product launches', 'Awards ceremonies', 'Team-building retreats']},
        'related': [
            {'slug': 'corporate-transportation.html', 'name': 'Corporate Transportation'},
            {'slug': 'group-transportation.html', 'name': 'Group Transportation'},
            {'slug': 'shuttle-service.html', 'name': 'Shuttle Service'},
        ],
    },
    {
        'filename': 'pages/services/roadshow-transportation.html',
        'page_title': 'Roadshow Transportation',
        'h1': 'Roadshow Transportation',
        'subtitle': 'Executive-grade transportation for investor roadshows, IPO tours, and multi-city business travel.',
        'desc1': 'Investor roadshows demand precision timing, confidential handling, and seamless execution across multiple cities. Ambassador Limousine\'s roadshow transportation service is purpose-built for C-suite executives, investment bankers, and IR teams who need flawless ground transportation on the tightest schedules.',
        'desc2': 'Our roadshow specialists coordinate airport pickups, office-to-office transfers, hotel check-ins, and evening dinners across your entire roadshow itinerary. Nationally, our affiliate network covers all major U.S. financial centers.',
        'includes': [
            'Dedicated roadshow coordinator for your entire tour',
            'Pre-planned daily itineraries with buffer times',
            'Flight monitoring for all airport connections',
            'Confidential, discreet service standard',
            'Meeting-to-meeting scheduling with precision',
            'Nationwide affiliate network coverage',
            'Secure vehicle communication',
            'Real-time itinerary updates and contingencies',
            'Priority escalation for schedule changes',
            'Corporate billing with detailed trip reporting',
        ],
        'vehicles': [
            {'slug': 'sedan-mercedes-s580.html', 'name': 'Mercedes-Benz S580', 'cap': 'Executive Sedan · 3 passengers', 'type': 'sedan'},
            {'slug': 'sedan-volvo-s90.html', 'name': '2025 Volvo S90', 'cap': 'Executive Sedan · 3 passengers', 'type': 'sedan'},
            {'slug': 'suv-cadillac-escalade.html', 'name': 'Cadillac Escalade ESV', 'cap': 'Executive SUV · 6 passengers', 'type': 'suv'},
        ],
        'cta_title': 'Plan Your Roadshow Logistics',
        'cta_desc': 'Share your roadshow cities, dates, and team size. We\'ll coordinate full ground transportation across your entire tour.',
        'sidebar_extra': {'title': 'Roadshow Coverage', 'items': ['Atlanta HQ operations', 'New York City', 'San Francisco / Bay Area', 'Boston', 'Chicago', 'Washington, DC']},
        'related': [
            {'slug': 'corporate-transportation.html', 'name': 'Corporate Transportation'},
            {'slug': 'airport-transportation.html', 'name': 'Airport Transportation'},
            {'slug': 'worldwide-car-service.html', 'name': 'Worldwide Car Service'},
        ],
    },
]

for p in service_pages2:
    html = service_page(**p)
    path = f'/home/user/ambassador-website-mockup-/{p["filename"]}'
    with open(path, 'w') as f:
        f.write(html)
    print(f'Created {path}')


service_pages3 = [
    {
        'filename': 'pages/services/government-transportation.html',
        'page_title': 'Government Transportation',
        'h1': 'Government Transportation',
        'subtitle': 'Secure, professional ground transportation for government officials, agencies, and contractors in Atlanta.',
        'desc1': 'Ambassador Limousine provides specialized transportation services for government officials, federal and state agencies, diplomatic personnel, and government contractors. Our drivers undergo thorough background checks and are trained in the elevated protocols required for government transport.',
        'desc2': 'From routine airport transfers for government employees to motorcade-style transport for visiting officials, we bring the highest level of professionalism, discretion, and reliability to every government engagement.',
        'includes': [
            'Thoroughly vetted, background-checked chauffeurs',
            'Discreet, confidential service protocols',
            'Secure vehicle communication systems',
            'Motorcycle escort coordination available',
            'Airport meet-and-greet with security coordination',
            'Compliance with applicable federal guidelines',
            'Government purchase order billing accepted',
            'Emergency and last-minute booking capability',
            'Bilingual drivers available on request',
            'Contract vehicle programs for agencies',
        ],
        'vehicles': [
            {'slug': 'sedan-mercedes-s580.html', 'name': 'Mercedes-Benz S580', 'cap': 'Executive Sedan · 3 passengers', 'type': 'sedan'},
            {'slug': 'suv-cadillac-escalade.html', 'name': 'Cadillac Escalade ESV', 'cap': 'Executive SUV · 6 passengers', 'type': 'suv'},
            {'slug': 'suv-denali-yukon.html', 'name': 'GMC Yukon Denali', 'cap': 'Executive SUV · 6 passengers', 'type': 'suv'},
        ],
        'cta_title': 'Contact Our Government Division',
        'cta_desc': 'Government transportation requires advance coordination. Contact our team to discuss your agency\'s specific requirements.',
        'sidebar_extra': {'title': 'Government Services', 'items': ['Official airport transfers', 'Diplomatic transportation', 'Agency contract vehicles', 'Contractor transportation', 'FEMA and emergency support']},
        'related': [
            {'slug': 'corporate-transportation.html', 'name': 'Corporate Transportation'},
            {'slug': 'roadshow-transportation.html', 'name': 'Roadshow Transportation'},
            {'slug': 'airport-transportation.html', 'name': 'Airport Transportation'},
        ],
    },
    {
        'filename': 'pages/services/school-college.html',
        'page_title': 'School & College Transportation',
        'h1': 'School & College Transportation',
        'subtitle': 'Safe, professional transportation for students, campus events, and school group travel in Atlanta.',
        'desc1': 'Ambassador Limousine provides safe, professionally managed transportation for school groups, college athletic teams, alumni events, and campus organizations. We understand the unique responsibility involved in transporting students and maintain the strictest safety standards.',
        'desc2': 'Whether it\'s a school field trip, college move-in day shuttle, athletic team travel, or a senior prom night, our courteous, professional chauffeurs ensure every student travels safely and comfortably.',
        'includes': [
            'Thoroughly vetted, background-checked drivers',
            'Age-appropriate, professional conduct standards',
            'Compliance with all Georgia student transport regulations',
            'Parent and administrator communication protocols',
            'Safe drop-off and pick-up verification',
            'Seat belts and safety equipment in all vehicles',
            'Chauffeur training in student group management',
            'Group vehicles from 6 to 56 passengers',
            'Real-time tracking available for school administrators',
            'Post-event safe transport guarantee',
        ],
        'vehicles': [
            {'slug': 'suv-suburban.html', 'name': 'Chevy Suburban LT', 'cap': 'Group SUV · 6 passengers', 'type': 'suv'},
            {'slug': 'van-sprinter-exec.html', 'name': 'Mercedes Sprinter Executive', 'cap': 'Group Van · 12 passengers', 'type': 'van'},
            {'slug': 'bus-28-passenger.html', 'name': '28-Passenger Mini-Coach', 'cap': 'Mini-Coach · 28 passengers', 'type': 'bus'},
        ],
        'cta_title': 'Book School Transportation',
        'cta_desc': 'For school group bookings, please contact our team directly to discuss safety protocols and complete required documentation.',
        'sidebar_extra': {'title': 'School Events We Serve', 'items': ['Prom & homecoming', 'Graduation parties', 'Athletic team travel', 'College campus tours', 'Field trips & retreats']},
        'related': [
            {'slug': 'group-transportation.html', 'name': 'Group Transportation'},
            {'slug': 'charter-bus.html', 'name': 'Charter Bus Service'},
            {'slug': 'special-occasion.html', 'name': 'Special Occasions'},
        ],
    },
    {
        'filename': 'pages/services/special-occasion.html',
        'page_title': 'Special Occasion Transportation',
        'h1': 'Special Occasion Transportation',
        'subtitle': 'Celebrate life\'s milestones in luxurious style with Atlanta\'s premier special occasion limo service.',
        'desc1': 'Life\'s milestone moments deserve extraordinary transportation. Ambassador Limousine provides premium special occasion transportation for birthdays, anniversaries, graduations, quinceañeras, Bar/Bat Mitzvahs, retirement celebrations, and any occasion that calls for something truly special.',
        'desc2': 'Our special occasion packages are fully customizable. Tell us what you\'re celebrating and we\'ll tailor the vehicle, amenities, decorations, and itinerary to match the significance of your event.',
        'includes': [
            'Personalized decoration and setup for your occasion',
            'Complimentary champagne or sparkling cider',
            'Custom "Happy Birthday / Anniversary / Congratulations" banner',
            'Premium sound system for your celebration playlist',
            'Professional, celebratory-attired chauffeur',
            'Red carpet arrival available',
            'Multi-stop celebration itinerary',
            'Photography-friendly vehicle presentation',
            'Midnight sparkler and balloon options available',
            'Surprise arrival coordination for guests',
        ],
        'vehicles': [
            {'slug': 'limo-chrysler-stretch.html', 'name': 'Chrysler 300 Stretch Limo', 'cap': 'Celebration Limo · 10 passengers', 'type': 'limo'},
            {'slug': 'limo-lincoln-stretch.html', 'name': 'Lincoln Stretch Limo', 'cap': 'Classic Limo · 8 passengers', 'type': 'limo'},
            {'slug': 'van-sprinter-limo.html', 'name': 'Mercedes Sprinter Limo Van', 'cap': 'Party Van · 14 passengers', 'type': 'van'},
        ],
        'cta_title': 'Make Your Celebration Unforgettable',
        'cta_desc': 'Tell us about your special occasion and we\'ll design the perfect celebration transportation experience.',
        'sidebar_extra': {'title': 'Occasions We Celebrate', 'items': ['Milestone birthdays', 'Anniversaries', 'Graduations', 'Quinceañeras', 'Bar/Bat Mitzvahs', 'Retirement parties']},
        'related': [
            {'slug': 'wedding-transportation.html', 'name': 'Wedding Transportation'},
            {'slug': 'bachelorette-party.html', 'name': 'Bachelorette Party'},
            {'slug': 'night-on-town.html', 'name': 'Night on the Town'},
        ],
    },
    {
        'filename': 'pages/services/night-on-town.html',
        'page_title': 'Night on the Town',
        'h1': 'Night on the Town',
        'subtitle': 'Experience Atlanta\'s nightlife without the hassle of parking or designated driving. Pure luxury, door to door.',
        'desc1': 'Atlanta\'s restaurant, bar, and nightclub scene is world-class — and it\'s even better when you\'re not worrying about parking, surge pricing, or who\'s driving home. Ambassador Limousine\'s "Night on the Town" service puts a professional chauffeur at your disposal for an epic Atlanta evening.',
        'desc2': 'Perfect for date nights, group dinners, VIP club nights, or spontaneous adventures across the city. We know Atlanta\'s best venues and can help you plan the perfect evening itinerary if needed.',
        'includes': [
            'Chauffeured luxury vehicle for the entire evening',
            'Custom itinerary — your schedule, your stops',
            'VIP drop-off at Atlanta\'s top restaurants and clubs',
            'Chilled beverages and snacks in the vehicle',
            'Chauffeur waits between stops',
            'Safe, professional transport home at night\'s end',
            'Reservation assistance available on request',
            'Group vehicles for parties up to 14',
            'No surge pricing — flat hourly rate',
            'Discreet, professional service',
        ],
        'vehicles': [
            {'slug': 'sedan-mercedes-s580.html', 'name': 'Mercedes-Benz S580', 'cap': 'Date Night Sedan · 3 passengers', 'type': 'sedan'},
            {'slug': 'suv-cadillac-escalade.html', 'name': 'Cadillac Escalade ESV', 'cap': 'Group SUV · 6 passengers', 'type': 'suv'},
            {'slug': 'limo-chrysler-stretch.html', 'name': 'Chrysler 300 Stretch Limo', 'cap': 'Party Limo · 10 passengers', 'type': 'limo'},
        ],
        'cta_title': 'Book Your Atlanta Night Out',
        'cta_desc': 'Reserve your chauffeur for tonight or plan ahead for an upcoming celebration. Call or book online anytime.',
        'sidebar_extra': {'title': 'Atlanta Hot Spots', 'items': ['Buckhead nightlife district', 'Midtown restaurants', 'Virginia-Highland dining', 'Ponce City Market', 'Inman Park & Krog St Market']},
        'related': [
            {'slug': 'bachelorette-party.html', 'name': 'Bachelorette Party'},
            {'slug': 'concert-transportation.html', 'name': 'Concert Transportation'},
            {'slug': 'hourly-car-service.html', 'name': 'Hourly Car Service'},
        ],
    },
]

for p in service_pages3:
    html = service_page(**p)
    path = f'/home/user/ambassador-website-mockup-/{p["filename"]}'
    with open(path, 'w') as f:
        f.write(html)
    print(f'Created {path}')


service_pages4 = [
    {
        'filename': 'pages/services/worldwide-car-service.html',
        'page_title': 'Worldwide Car Service',
        'h1': 'Worldwide Car Service',
        'subtitle': 'Ambassador Limousine\'s trusted affiliate network delivers five-star black car service in cities across the globe.',
        'desc1': 'Your business travel takes you around the world, and Ambassador Limousine goes with you. Through our vetted global affiliate network, we coordinate luxury ground transportation in hundreds of cities across North America, Europe, Asia, and beyond — all booked through one trusted point of contact.',
        'desc2': 'No matter where your itinerary takes you, you can expect the same Ambassador standard: professional chauffeurs, late-model vehicles, punctual arrivals, and seamless service. One call or booking handles your entire journey.',
        'includes': [
            'Single point of contact for all global bookings',
            'Vetted affiliate partners in 500+ cities worldwide',
            'Consistent service standards across all locations',
            'Real-time booking confirmation for every leg',
            'Multi-city roadshow and tour coordination',
            'International airport meet-and-greet',
            'Multilingual chauffeurs in key markets',
            'Consolidated corporate billing',
            '24/7 global support line',
            'Proactive flight monitoring for all connections',
        ],
        'vehicles': [
            {'slug': 'sedan-mercedes-s580.html', 'name': 'Mercedes-Benz S580', 'cap': 'Executive Sedan · 3 passengers', 'type': 'sedan'},
            {'slug': 'suv-cadillac-escalade.html', 'name': 'Cadillac Escalade ESV', 'cap': 'Executive SUV · 6 passengers', 'type': 'suv'},
        ],
        'cta_title': 'Book Global Ground Transportation',
        'cta_desc': 'Tell us your international destinations and travel dates. We\'ll coordinate five-star ground transportation wherever you\'re headed.',
        'sidebar_extra': {'title': 'Global Coverage', 'items': ['500+ cities worldwide', 'All major US metro areas', 'Europe & UK', 'Asia & Middle East', 'Latin America']},
        'related': [
            {'slug': 'corporate-transportation.html', 'name': 'Corporate Transportation'},
            {'slug': 'roadshow-transportation.html', 'name': 'Roadshow Transportation'},
            {'slug': 'airport-transportation.html', 'name': 'Airport Transportation'},
        ],
    },
    {
        'filename': 'pages/services/brewery-tours.html',
        'page_title': 'Brewery Tours',
        'h1': 'Atlanta Brewery Tours',
        'subtitle': 'Explore Atlanta\'s thriving craft beer scene with a guided brewery tour in a chauffeured luxury vehicle.',
        'desc1': 'Atlanta has emerged as a craft beer destination with dozens of award-winning breweries — from the BeltLine corridor to Tucker, Smyrna, and beyond. Ambassador Limousine\'s brewery tour service lets your whole group hop between taprooms without anyone having to stay sober behind the wheel.',
        'desc2': 'We can suggest popular craft brewery routes or work with your custom itinerary. Our chauffeurs are familiar with Atlanta\'s best taprooms and can get you to each stop efficiently, giving you maximum tasting time.',
        'includes': [
            'Chauffeured vehicle for the full tour duration',
            'Custom brewery itinerary planning assistance',
            'Cooler available for road beers (where legal)',
            'Stop at 3–5 breweries on your schedule',
            'Group vehicles for parties up to 14',
            'Safe, sober driver for the entire tour',
            'Snack and water service between stops',
            'Coordinated departure and return home',
            'Can combine with restaurant stops',
            'Available weekends and weekdays',
        ],
        'vehicles': [
            {'slug': 'suv-cadillac-escalade.html', 'name': 'Cadillac Escalade ESV', 'cap': 'Group SUV · 6 passengers', 'type': 'suv'},
            {'slug': 'van-sprinter-exec.html', 'name': 'Mercedes Sprinter Executive', 'cap': 'Group Van · 12 passengers', 'type': 'van'},
        ],
        'cta_title': 'Book Your Brewery Tour',
        'cta_desc': 'Ready to explore Atlanta\'s craft beer scene? Tell us your group size and we\'ll plan the perfect brewery crawl.',
        'sidebar_extra': {'title': 'Atlanta Breweries', 'items': ['Monday Night Brewing', 'Orpheus Brewing', 'Sweetwater Brewing', 'Second Self Beer', 'Wild Heaven Beer', 'SweetWater Brewing']},
        'related': [
            {'slug': 'wine-tours.html', 'name': 'Wine Tours'},
            {'slug': 'private-tours.html', 'name': 'Private Tours'},
            {'slug': 'night-on-town.html', 'name': 'Night on the Town'},
        ],
    },
    {
        'filename': 'pages/services/wine-tours.html',
        'page_title': 'Wine Tours',
        'h1': 'Georgia Wine Tours',
        'subtitle': 'Discover North Georgia\'s wine country in a luxury chauffeured vehicle. Sip, swirl, and savor — safely.',
        'desc1': 'North Georgia\'s mountain wine country is home to award-winning wineries just an hour from Atlanta. Ambassador Limousine\'s wine tour service is the perfect way to explore Dahlonega, Helen, and the surrounding wine trail without worry — enjoy every tasting while a professional chauffeur handles the mountain roads.',
        'desc2': 'Whether you\'re celebrating a special occasion, hosting clients, or simply treating yourself to a day in wine country, our wine tour service combines luxury transportation with an unforgettable Georgia experience.',
        'includes': [
            'Luxury vehicle with dedicated chauffeur',
            'Custom winery itinerary (3–4 stops suggested)',
            'Chilled water and light snacks for the drive',
            'Ample trunk/van space for wine purchases',
            'Flexible departure times to match winery hours',
            'Private, intimate experience for your party',
            'Group vehicles for parties up to 12',
            'Can be combined with lunch or dinner stop',
            'Full-day packages available',
            'Hotel and Atlanta metro pickups available',
        ],
        'vehicles': [
            {'slug': 'suv-cadillac-escalade.html', 'name': 'Cadillac Escalade ESV', 'cap': 'Wine Tour SUV · 6 passengers', 'type': 'suv'},
            {'slug': 'van-sprinter-exec.html', 'name': 'Mercedes Sprinter Executive', 'cap': 'Wine Tour Van · 12 passengers', 'type': 'van'},
        ],
        'cta_title': 'Book a Georgia Wine Tour',
        'cta_desc': 'Tell us your preferred date and group size. We\'ll plan a beautiful North Georgia winery experience for you.',
        'sidebar_extra': {'title': 'North GA Wineries', 'items': ['Wolf Mountain Vineyards', 'Three Sisters Vineyards', 'Montaluce Winery', 'Frogtown Cellars', 'Château Élan (Braselton)']},
        'related': [
            {'slug': 'brewery-tours.html', 'name': 'Brewery Tours'},
            {'slug': 'private-tours.html', 'name': 'Private Tours'},
            {'slug': 'special-occasion.html', 'name': 'Special Occasions'},
        ],
    },
    {
        'filename': 'pages/services/private-tours.html',
        'page_title': 'Private Tours',
        'h1': 'Private Atlanta Tours',
        'subtitle': 'Discover Atlanta\'s best neighborhoods, landmarks, and hidden gems on a custom private tour.',
        'desc1': 'Atlanta has a rich history, stunning architecture, vibrant neighborhoods, and world-class attractions. Ambassador Limousine\'s private tour service lets you explore the city on your own terms — with a knowledgeable chauffeur, a comfortable vehicle, and a completely customized itinerary.',
        'desc2': 'Popular tour routes include Atlanta\'s Civil Rights history trail, MLK Historic Site, BeltLine, Piedmont Park, Buckhead architecture, Little Five Points, and more. We also offer custom tours tailored to your interests.',
        'includes': [
            'Custom tour itinerary based on your interests',
            'Knowledgeable, Atlanta-native chauffeur',
            'Comfortable, spacious luxury vehicle',
            'Multiple stops with flexible timing',
            'Commentary and recommendations en route',
            'Photo stops at Atlanta\'s iconic landmarks',
            'Restaurant and attraction reservation assistance',
            'Half-day (4 hrs) or full-day (8 hrs) packages',
            'Airport pickup and hotel drop-off available',
            'Group tours for families and corporate guests',
        ],
        'vehicles': [
            {'slug': 'suv-cadillac-escalade.html', 'name': 'Cadillac Escalade ESV', 'cap': 'Tour SUV · 6 passengers', 'type': 'suv'},
            {'slug': 'van-sprinter-exec.html', 'name': 'Mercedes Sprinter Executive', 'cap': 'Tour Van · 12 passengers', 'type': 'van'},
        ],
        'cta_title': 'Plan Your Private Atlanta Tour',
        'cta_desc': 'Tell us your interests, group size, and available time. We\'ll craft an unforgettable Atlanta experience just for you.',
        'sidebar_extra': {'title': 'Popular Tour Stops', 'items': ['MLK Historic Site', 'World of Coca-Cola', 'Georgia Aquarium', 'Atlanta BeltLine', 'Buckhead & Midtown', 'Little Five Points']},
        'related': [
            {'slug': 'hourly-car-service.html', 'name': 'Hourly Car Service'},
            {'slug': 'wine-tours.html', 'name': 'Wine Tours'},
            {'slug': 'brewery-tours.html', 'name': 'Brewery Tours'},
        ],
    },
]

for p in service_pages4:
    html = service_page(**p)
    path = f'/home/user/ambassador-website-mockup-/{p["filename"]}'
    with open(path, 'w') as f:
        f.write(html)
    print(f'Created {path}')


service_pages5 = [
    {
        'filename': 'pages/services/holiday-lights-tours.html',
        'page_title': 'Holiday Lights Tours',
        'h1': 'Holiday Lights Tours',
        'subtitle': 'Experience Atlanta\'s most dazzling holiday light displays in a warm, luxurious chauffeured vehicle.',
        'desc1': 'Atlanta transforms into a magical winter wonderland each holiday season, with spectacular light displays at Zoo Atlanta, Callaway Gardens, Stone Mountain, Centennial Olympic Park, and countless neighborhoods. Ambassador Limousine\'s Holiday Lights Tour service is the most comfortable, stress-free way to experience it all.',
        'desc2': 'Cuddle up in a warm luxury vehicle with your family or friends while your chauffeur navigates between Atlanta\'s best holiday displays. Hot cocoa, cozy blankets, and holiday music available on request.',
        'includes': [
            'Comfortable, heated luxury vehicle',
            'Custom holiday lights itinerary',
            'Hot cocoa and holiday treats available',
            'Cozy blankets on request',
            'Holiday music for the journey',
            'Multiple display stops on your tour',
            'Family-friendly service',
            'Group vehicles for families up to 14',
            'Evening departures to catch all the lights',
            'Seasonal availability (November–January)',
        ],
        'vehicles': [
            {'slug': 'suv-cadillac-escalade.html', 'name': 'Cadillac Escalade ESV', 'cap': 'Family SUV · 6 passengers', 'type': 'suv'},
            {'slug': 'van-sprinter-exec.html', 'name': 'Mercedes Sprinter Executive', 'cap': 'Family Van · 12 passengers', 'type': 'van'},
        ],
        'cta_title': 'Book Your Holiday Lights Tour',
        'cta_desc': 'Holiday season dates book up fast! Reserve your tour early for November and December evenings.',
        'sidebar_extra': {'title': 'Top Atlanta Light Displays', 'items': ['Zoo Atlanta ZooLights', 'Stone Mountain Christmas', 'Centennial Olympic Park', 'Callaway Gardens', 'Neighborhood displays']},
        'related': [
            {'slug': 'private-tours.html', 'name': 'Private Tours'},
            {'slug': 'special-occasion.html', 'name': 'Special Occasions'},
            {'slug': 'hourly-car-service.html', 'name': 'Hourly Car Service'},
        ],
    },
    {
        'filename': 'pages/services/masters-golf.html',
        'page_title': 'Masters Golf Tournament Transportation',
        'h1': 'Masters Golf Transportation',
        'subtitle': 'Luxury chauffeured transportation to Augusta National for The Masters — the most prestigious golf tournament in the world.',
        'desc1': 'The Masters Tournament at Augusta National Golf Club is one of the most sought-after sporting events on the planet. Ambassador Limousine provides premium, stress-free transportation from Atlanta to Augusta for every session of tournament week — practice rounds through the final Sunday round.',
        'desc2': 'Our Masters transportation service handles the 150-mile Atlanta-to-Augusta drive in complete comfort, getting you there fresh and ready to enjoy every moment at Augusta National. Round-trip and one-way packages available.',
        'includes': [
            'Round-trip or one-way Atlanta to Augusta service',
            'Door-to-door pickup from Atlanta metro area',
            'Drop-off at Augusta National gate closest to your entrance',
            'Chilled beverages and snacks for the drive',
            'Coordination with your patron badge schedule',
            'Flexible departure times for practice and competition rounds',
            'Luggage and equipment space for merchandise',
            'Multi-day packages available for full tournament week',
            'Return pickup timed to your departure',
            'Corporate hospitality coordination available',
        ],
        'vehicles': [
            {'slug': 'suv-cadillac-escalade.html', 'name': 'Cadillac Escalade ESV', 'cap': 'Executive SUV · 6 passengers', 'type': 'suv'},
            {'slug': 'van-sprinter-exec.html', 'name': 'Mercedes Sprinter Executive', 'cap': 'Group Van · 12 passengers', 'type': 'van'},
            {'slug': 'bus-28-passenger.html', 'name': '28-Passenger Mini-Coach', 'cap': 'Group Coach · 28 passengers', 'type': 'bus'},
        ],
        'cta_title': 'Reserve Masters Transportation Now',
        'cta_desc': 'Masters week bookings fill months in advance. Secure your Atlanta-to-Augusta transportation as soon as your badges arrive.',
        'sidebar_extra': {'title': 'Masters Details', 'items': ['Augusta National Golf Club', '~150 miles from Atlanta', 'Tournament week: April', 'Practice rounds: Mon–Wed', 'Competition: Thu–Sun']},
        'related': [
            {'slug': 'sporting-event.html', 'name': 'Sporting Event Transportation'},
            {'slug': 'group-transportation.html', 'name': 'Group Transportation'},
            {'slug': 'hourly-car-service.html', 'name': 'Hourly Car Service'},
        ],
    },
    {
        'filename': 'pages/services/fifa-world-cup.html',
        'page_title': 'FIFA World Cup 2026 Transportation',
        'h1': 'FIFA World Cup 2026 Transportation',
        'subtitle': 'Atlanta is a host city for FIFA World Cup 2026. Ambassador Limousine is your official luxury transportation partner.',
        'desc1': 'Atlanta\'s Mercedes-Benz Stadium is one of the official host venues for FIFA World Cup 2026, one of the most-watched sporting events in human history. With an estimated 500,000+ visitors descending on Atlanta during match days, transportation will be at a premium — which is exactly why booking early with Ambassador Limousine is critical.',
        'desc2': 'We are fully prepared to handle World Cup transportation needs for fans, corporate hospitality groups, sponsors, and media. Book your match day transportation well in advance to guarantee availability during this historic event.',
        'includes': [
            'Guaranteed availability with advance booking',
            'Hotel, airport, and venue transfers',
            'Match day and hospitality transport packages',
            'Corporate hospitality fleet coordination',
            'Multi-match packages for the group stage and beyond',
            'Bilingual chauffeurs in Spanish, Portuguese, and French',
            'Fan group transportation for 6–56 passengers',
            'Media and broadcast crew transportation',
            'VIP and sponsor transportation programs',
            'Nationwide coordination for multi-city fans',
        ],
        'vehicles': [
            {'slug': 'suv-cadillac-escalade.html', 'name': 'Cadillac Escalade ESV', 'cap': 'Group SUV · 6 passengers', 'type': 'suv'},
            {'slug': 'van-sprinter-exec.html', 'name': 'Mercedes Sprinter Executive', 'cap': 'Group Van · 12 passengers', 'type': 'van'},
            {'slug': 'bus-28-passenger.html', 'name': '28-Passenger Mini-Coach', 'cap': 'Fan Coach · 28 passengers', 'type': 'bus'},
            {'slug': 'coach-56-passenger.html', 'name': '56-Passenger Motor Coach', 'cap': 'Fan Coach · 56 passengers', 'type': 'bus'},
        ],
        'cta_title': 'Reserve Your World Cup Transportation',
        'cta_desc': 'FIFA World Cup 2026 match day transportation will sell out fast. Reserve your vehicle now — matches are June–July 2026.',
        'sidebar_extra': {'title': 'World Cup Details', 'items': ['Venue: Mercedes-Benz Stadium', 'Atlanta match dates: Summer 2026', 'Host country: USA/Canada/Mexico', 'Book now — very limited availability']},
        'related': [
            {'slug': 'sporting-event.html', 'name': 'Sporting Event Transportation'},
            {'slug': 'group-transportation.html', 'name': 'Group Transportation'},
            {'slug': 'charter-bus.html', 'name': 'Charter Bus Service'},
        ],
    },
]

for p in service_pages5:
    html = service_page(**p)
    path = f'/home/user/ambassador-website-mockup-/{p["filename"]}'
    with open(path, 'w') as f:
        f.write(html)
    print(f'Created {path}')


# ─── FLEET PAGES ───────────────────────────────────────────────────────────────

fleet_pages = [
    {
        'filename': 'pages/fleet/sedan-volvo-s90.html',
        'vehicle_name': '2025 Volvo S90',
        'vehicle_type': 'sedan',
        'passengers': '3',
        'luggage': '3 standard bags',
        'features': [
            'Pilot Assist semi-autonomous driving technology',
            'Bowers & Wilkins premium 19-speaker sound system',
            'Nappa leather heated and ventilated seats',
            '12-inch Sensus touchscreen infotainment',
            'Panoramic sunroof',
            'Rear heated seats and private executive cabin feel',
            'USB-C and wireless charging for all passengers',
            'Complimentary bottled water',
            'Climate control personalized to passenger preference',
            'Advanced HEPA-grade air filtration',
        ],
        'desc1': 'The 2025 Volvo S90 represents the pinnacle of Scandinavian luxury and safety. With its elegant profile, hushed cabin, and cutting-edge technology, the S90 is our flagship executive sedan — ideal for business travelers, airport transfers, and anyone who demands the best.',
        'desc2': 'Powered by a refined T6 AWD powertrain, the S90 delivers a serene, confident ride whether navigating Hartsfield-Jackson or cruising Georgia\'s highways. Volvo\'s legendary safety reputation means you arrive not just in comfort, but in confidence.',
    },
    {
        'filename': 'pages/fleet/sedan-mercedes-s580.html',
        'vehicle_name': 'Mercedes-Benz S580',
        'vehicle_type': 'sedan',
        'passengers': '3',
        'luggage': '3 standard bags',
        'features': [
            'MBUX Hyperscreen — 56-inch curved display system',
            'Burmester High-End 4D Surround Sound System',
            'Executive rear seating with massage function',
            'Air Balance Cabin Fragrance System',
            'Rear-axle steering for unmatched agility',
            'Active suspension for ultra-smooth ride quality',
            'Ambient lighting with 64 color options',
            'Chauffeur privacy partition (on request)',
            'USB-C charging for all passengers',
            'Complimentary premium water and amenities',
        ],
        'desc1': 'The Mercedes-Benz S580 is the definitive statement in automotive luxury. Widely regarded as the world\'s best sedan, the S580\'s extraordinary cabin transforms every journey into a first-class experience. Every detail — from the hand-stitched leather to the Burmester surround sound — is designed for the most discerning passenger.',
        'desc2': 'For clients who demand the absolute best, the S580 is the natural choice. Its commanding presence, whisper-quiet cabin, and unmatched technology make it the ideal vehicle for VIP airport arrivals, executive meetings, and any occasion that calls for the finest.',
    },
    {
        'filename': 'pages/fleet/suv-cadillac-escalade.html',
        'vehicle_name': 'Cadillac Escalade ESV',
        'vehicle_type': 'suv',
        'passengers': '6',
        'luggage': '6 standard bags',
        'features': [
            'Extended wheelbase ESV for maximum cabin space',
            'AKG Studio Reference sound system (36 speakers)',
            'Super Cruise hands-free driving capability',
            'OLED curved 38-inch screen across the dashboard',
            'Captain\'s chairs in second row (available)',
            'Third-row seating for 6-passenger capacity',
            'Power running boards and automated steps',
            'Rear climate controls for passenger comfort',
            'USB and wireless charging throughout cabin',
            'Complimentary water, snacks, and amenities',
        ],
        'desc1': 'The Cadillac Escalade ESV is America\'s ultimate luxury SUV — and the most popular vehicle in our fleet. The extended-length ESV delivers exceptional passenger space, commanding road presence, and the sophisticated amenities Atlanta\'s discerning travelers demand.',
        'desc2': 'Equally at home on a black-tie evening or a corporate airport run, the Escalade ESV accommodates up to 6 passengers and substantial luggage without compromise. It\'s the preferred choice for families, small groups, and executives who want space and style in equal measure.',
    },
    {
        'filename': 'pages/fleet/suv-suburban.html',
        'vehicle_name': 'Chevrolet Suburban LT',
        'vehicle_type': 'suv',
        'passengers': '6',
        'luggage': '5 standard bags',
        'features': [
            'Full-size, three-row SUV with spacious cabin',
            'Magnetic Ride Control suspension for smooth rides',
            'Bose premium audio system',
            'Tri-zone automatic climate control',
            'Power-folding third-row seats for luggage',
            'Wireless Apple CarPlay and Android Auto',
            'USB charging ports front and rear',
            'Heated front and rear seats',
            'Rear-seat entertainment screens available',
            'Complimentary bottled water',
        ],
        'desc1': 'The Chevrolet Suburban LT is a classic American luxury workhorse. Spacious, capable, and refined, the Suburban is perfect for families, sports teams, and any group that needs reliable, comfortable transportation for up to 6 passengers with ample cargo room.',
        'desc2': 'The Suburban\'s long wheelbase provides a smooth, comfortable ride even on extended trips. Its generous cargo area with folding third-row seats accommodates everything from airport luggage to sports equipment with ease.',
    },
    {
        'filename': 'pages/fleet/suv-denali-yukon.html',
        'vehicle_name': 'GMC Yukon Denali',
        'vehicle_type': 'suv',
        'passengers': '6',
        'luggage': '5 standard bags',
        'features': [
            'Denali-exclusive magnetic ride control suspension',
            'Bose Performance Series 15-speaker audio',
            'Panoramic moonroof',
            'Perforated leather-appointed seating throughout',
            'Tri-zone automatic climate control',
            'Rear Camera Mirror system',
            'Super Cruise driver assistance available',
            'Wireless charging and multiple USB ports',
            'Head-up display (HUD) for navigation',
            'Complimentary water and snacks',
        ],
        'desc1': 'The GMC Yukon Denali is the premium tier of the beloved Yukon lineup — offering Denali-exclusive design, technology, and performance upgrades that elevate every journey. Its magnetic ride control suspension delivers an exceptionally smooth, confident ride for all passengers.',
        'desc2': 'For clients who want a sophisticated alternative to the Escalade, the Yukon Denali delivers comparable luxury in a slightly more understated package. It\'s an excellent choice for executive transportation, family travel, and group airport transfers.',
    },
    {
        'filename': 'pages/fleet/limo-chrysler-stretch.html',
        'vehicle_name': 'Chrysler 300 Stretch Limousine',
        'vehicle_type': 'limo',
        'passengers': '10',
        'luggage': '6 bags in trunk',
        'features': [
            'Extended stretch body with floor-to-ceiling height',
            'Premium wrap-around leather seating for 10',
            'Full bar with crystal glassware (BYOB)',
            'Multicolor LED mood lighting',
            'Premium JBL surround sound system',
            'Fiber optic ceiling starlight effect',
            'Privacy partition between cabin and driver',
            'Separate HVAC controls for passenger cabin',
            'Multiple USB charging stations',
            'Multiple flatscreen monitors',
        ],
        'desc1': 'The Chrysler 300 Stretch Limousine is Atlanta\'s most iconic party and celebration vehicle. Its dramatic stretched profile and lavishly appointed interior make it the centerpiece of weddings, prom nights, bachelorette parties, and milestone celebrations of all kinds.',
        'desc2': 'Step inside and enter a world of luxury entertainment — wrap-around leather seating, LED mood lighting, a built-in bar, and a premium sound system create the perfect atmosphere for any celebration. Available for hourly bookings with complimentary champagne for special occasions.',
    },
    {
        'filename': 'pages/fleet/limo-lincoln-stretch.html',
        'vehicle_name': 'Lincoln Stretch Limousine',
        'vehicle_type': 'limo',
        'passengers': '8',
        'luggage': '4 bags',
        'features': [
            'Classic stretch limousine profile with elegant lines',
            'Plush leather seating for up to 8 passengers',
            'Beverage bar with crystal decanters',
            'Sunroof panel for stargazing',
            'Premium audio system with aux connectivity',
            'Fiber optic ceiling accent lighting',
            'Privacy partition',
            'Dual-zone climate control',
            'USB charging stations throughout',
            'Elegant wood trim interior accents',
        ],
        'desc1': 'The Lincoln Stretch Limousine is a timeless classic — elegant, graceful, and unmistakably luxurious. Its sleek lines and refined interior make it a popular choice for weddings, proms, anniversary celebrations, and any occasion that deserves a touch of old-school Hollywood glamour.',
        'desc2': 'With seating for up to 8 passengers, the Lincoln Stretch is ideal for intimate celebrations and small groups who want a classic limo experience. The plush interior and quiet ride make it as comfortable as it is stylish.',
    },
    {
        'filename': 'pages/fleet/van-sprinter-limo.html',
        'vehicle_name': 'Mercedes Sprinter Limo Van',
        'vehicle_type': 'van',
        'passengers': '14',
        'luggage': '10 bags',
        'features': [
            'Custom limo conversion with raised roof',
            'Plush leather bench and captain seating for 14',
            'Full entertainment system with flat-screen monitors',
            'LED mood lighting system',
            'Onboard sound system with Bluetooth connectivity',
            'Built-in cooler and bar area',
            'Privacy tinted windows throughout',
            'Standing room for select guests',
            'USB charging throughout',
            'Panoramic rear sunroof available',
        ],
        'desc1': 'The Mercedes Sprinter Limo Van combines the party atmosphere of a stretch limo with the capacity of a passenger van. With room for up to 14 passengers, it\'s the perfect choice for large bachelorette groups, corporate outings, and any celebration that needs serious space without sacrificing luxury.',
        'desc2': 'The custom limo conversion features raised roofline, plush seating, a full entertainment system, and the same premium amenities found in our stretch limousines. It\'s the ultimate "party bus" experience in a more elegant, brand-name Mercedes package.',
    },
    {
        'filename': 'pages/fleet/van-sprinter-exec.html',
        'vehicle_name': 'Mercedes Sprinter Executive Van',
        'vehicle_type': 'van',
        'passengers': '12',
        'luggage': '12 bags',
        'features': [
            'Executive sprinter conversion with club seating',
            'Individual captain chairs or bench configuration',
            'Folding work tables for in-transit productivity',
            'Wi-Fi hotspot for business connectivity',
            'Dual flat-screen monitors',
            'USB and power outlet at every seat',
            'Individual reading lights and climate vents',
            'Onboard refreshment center',
            'Premium sound system with Bluetooth',
            'Generous under-floor luggage storage',
        ],
        'desc1': 'The Mercedes Sprinter Executive Van is purpose-built for business groups who need a mobile office on wheels. With seating for up to 12 executives in genuine comfort, onboard Wi-Fi, fold-out work tables, and power at every seat, your team can remain productive from airport pickup to final destination.',
        'desc2': 'This vehicle is a favorite for corporate retreats, roadshows, conference groups, and executive shuttle services. The generous luggage capacity makes it equally popular for airport group transfers with substantial bags.',
    },
    {
        'filename': 'pages/fleet/bus-28-passenger.html',
        'vehicle_name': '28-Passenger Mini-Coach',
        'vehicle_type': 'bus',
        'passengers': '28',
        'luggage': 'Under-coach storage',
        'features': [
            'Comfortable individual reclining seats',
            'Overhead luggage storage bins',
            'Under-coach luggage bays',
            'Dual-zone climate control throughout',
            'PA announcement system',
            'Front-facing flatscreen monitor for presentations',
            'USB charging at every seat row',
            'Wide center aisle with easy boarding',
            'Retractable seatbelts at all seats',
            'Professional CDL-licensed driver',
        ],
        'desc1': 'The 28-Passenger Mini-Coach is the ideal solution for mid-size groups that exceed van capacity but don\'t need a full-size coach. Perfect for corporate retreats, school groups, sports teams, tour groups, and conference shuttles, this coach delivers comfort and efficiency in a manageable size.',
        'desc2': 'Easier to navigate than a full-size coach in urban Atlanta environments, the mini-coach still provides comfortable individual seating, climate control, and under-coach storage for all passenger luggage. A versatile choice for both short city transfers and longer-distance trips.',
    },
    {
        'filename': 'pages/fleet/bus-38-passenger.html',
        'vehicle_name': '38-Passenger Coach',
        'vehicle_type': 'bus',
        'passengers': '38',
        'luggage': 'Under-coach storage',
        'features': [
            'Contoured reclining coach seats',
            'Overhead luggage compartments',
            'Large under-coach storage bays',
            'Tri-zone climate control',
            'PA system with wireless microphone',
            'Dual overhead flat-screen monitors',
            'Power outlets and USB charging throughout',
            'Onboard restroom',
            'Step lighting and wide entry door',
            'CDL-certified professional driver',
        ],
        'desc1': 'The 38-Passenger Coach bridges the gap between a mini-coach and a full-size motor coach — providing substantial group capacity while maintaining maneuverability in Atlanta\'s urban environment. The onboard restroom makes it ideal for event transportation and longer day trips.',
        'desc2': 'With full overhead and under-coach storage, this coach handles everything from carry-on bags to team equipment. The dual monitors make it a great choice for corporate presentations and team briefings during transit.',
    },
    {
        'filename': 'pages/fleet/coach-56-passenger.html',
        'vehicle_name': '56-Passenger Motor Coach',
        'vehicle_type': 'bus',
        'passengers': '56',
        'luggage': 'Large under-coach bays',
        'features': [
            'Premium contoured reclining seats (56 total)',
            'Individual reading lights and air vents',
            'Large overhead storage compartments',
            'Massive under-coach luggage capacity',
            'Quad-zone climate control',
            'PA system with wireless microphone',
            'Multiple overhead flatscreen monitors',
            '110V power and USB at every row',
            'Full onboard restroom',
            'Wi-Fi hotspot available',
        ],
        'desc1': 'Our 56-Passenger full-size Motor Coach is the largest vehicle in the Ambassador Limousine fleet — and the gold standard for large group transportation. With seating for up to 56 passengers in airline-style comfort, this coach handles corporate conferences, conventions, major sporting events, and charter tours with ease.',
        'desc2': 'The full-size motor coach features the most comprehensive amenity package in our fleet: onboard restroom, Wi-Fi, power outlets at every seat, and massive luggage capacity. For groups of 29–56, this coach provides the most economical per-person rate while delivering premium comfort.',
    },
]

for p in fleet_pages:
    html = fleet_page(**p)
    path = f'/home/user/ambassador-website-mockup-/{p["filename"]}'
    with open(path, 'w') as f:
        f.write(html)
    print(f'Created {path}')


# ─── SERVICE AREA PAGES ────────────────────────────────────────────────────────

common_services = [
    {'slug': 'airport-transportation.html', 'name': 'Airport Transportation'},
    {'slug': 'corporate-transportation.html', 'name': 'Corporate Transportation'},
    {'slug': 'wedding-transportation.html', 'name': 'Wedding Transportation'},
    {'slug': 'hourly-car-service.html', 'name': 'Hourly Car Service'},
    {'slug': 'special-occasion.html', 'name': 'Special Occasions'},
    {'slug': 'night-on-town.html', 'name': 'Night on the Town'},
    {'slug': 'group-transportation.html', 'name': 'Group Transportation'},
]

service_areas = [
    {
        'filename': 'pages/service-area/alpharetta.html',
        'area_name': 'Alpharetta',
        'county': 'Fulton',
        'zip_codes': '30004, 30005, 30022, 30009',
        'desc1': 'Alpharetta is one of Atlanta\'s most affluent and fastest-growing suburbs, home to Fortune 500 technology companies, the Avalon mixed-use district, and some of Georgia\'s finest residential communities. Ambassador Limousine serves Alpharetta and the broader Fulton County area with premium chauffeured transportation tailored to the demands of both corporate professionals and discerning residents.',
        'desc2': 'Whether you need a reliable car service to Hartsfield-Jackson Airport, executive transportation for your Alpharetta business district meetings, or a luxury vehicle for a special occasion, our professional chauffeurs arrive on time, every time.',
        'services': common_services,
        'nearby': [
            {'slug': 'roswell.html', 'name': 'Roswell'},
            {'slug': 'sandy-springs.html', 'name': 'Sandy Springs'},
            {'slug': 'duluth.html', 'name': 'Duluth'},
        ],
    },
    {
        'filename': 'pages/service-area/augusta.html',
        'area_name': 'Augusta',
        'county': 'Richmond',
        'zip_codes': '30901, 30904, 30907, 30909',
        'desc1': 'Augusta, Georgia is a historic city on the Savannah River, world-renowned as the home of Augusta National Golf Club and The Masters Tournament. Ambassador Limousine provides premium transportation between Atlanta and Augusta, serving business travelers, golf enthusiasts, and special event attendees throughout the year.',
        'desc2': 'Our Augusta service is especially popular during Masters Tournament week (April), when demand for reliable, professional transportation between Atlanta and Augusta National reaches its peak. Book early to secure your vehicle during tournament week.',
        'services': common_services + [{'slug': 'masters-golf.html', 'name': 'Masters Golf Transportation'}],
        'nearby': [
            {'slug': 'hartsfield-jackson-airport.html', 'name': 'Hartsfield-Jackson Airport'},
        ],
    },
    {
        'filename': 'pages/service-area/duluth.html',
        'area_name': 'Duluth',
        'county': 'Gwinnett',
        'zip_codes': '30096, 30097',
        'desc1': 'Duluth is a vibrant Gwinnett County city in Atlanta\'s northeastern suburbs, home to Gas South Arena, a diverse international community, and major corporate campuses. Ambassador Limousine provides luxury chauffeured transportation throughout Duluth and the broader Gwinnett County region.',
        'desc2': 'With major employers and event venues in the area, Duluth residents and business travelers benefit from Ambassador\'s reliable airport transfers, corporate car service, and event transportation throughout the metro Atlanta area.',
        'services': common_services,
        'nearby': [
            {'slug': 'alpharetta.html', 'name': 'Alpharetta'},
            {'slug': 'lawrenceville.html', 'name': 'Lawrenceville'},
            {'slug': 'roswell.html', 'name': 'Roswell'},
        ],
    },
    {
        'filename': 'pages/service-area/hartsfield-jackson-airport.html',
        'area_name': 'Hartsfield-Jackson Atlanta International Airport',
        'county': 'Clayton/Fulton',
        'zip_codes': '30337 (Airport)',
        'desc1': 'Hartsfield-Jackson Atlanta International Airport (ATL) is the world\'s busiest passenger airport, processing over 100 million passengers annually. As Atlanta\'s primary air hub, ATL serves hundreds of domestic and international destinations and serves as a major connection point for the Eastern United States.',
        'desc2': 'Ambassador Limousine specializes in Hartsfield-Jackson airport transfers with flight-tracking technology, 45-minute complimentary wait time, and professional meet-and-greet service. Whether you\'re flying into Terminal Domestic, International Terminal, or connecting through ATL, we ensure a smooth, stress-free ground experience.',
        'services': [
            {'slug': 'airport-transportation.html', 'name': 'Airport Transportation'},
            {'slug': 'corporate-transportation.html', 'name': 'Corporate Transportation'},
            {'slug': 'group-transportation.html', 'name': 'Group Transportation'},
            {'slug': 'shuttle-service.html', 'name': 'Shuttle Service'},
        ],
        'nearby': [
            {'slug': 'sandy-springs.html', 'name': 'Sandy Springs'},
            {'slug': 'alpharetta.html', 'name': 'Alpharetta'},
            {'slug': 'marietta.html', 'name': 'Marietta'},
        ],
    },
    {
        'filename': 'pages/service-area/lawrenceville.html',
        'area_name': 'Lawrenceville',
        'county': 'Gwinnett',
        'zip_codes': '30043, 30044, 30045, 30046',
        'desc1': 'Lawrenceville is the county seat of Gwinnett County and one of Atlanta\'s fastest-growing suburban communities. Home to major employers, Gateway Center Arena, and a growing downtown district, Lawrenceville is increasingly served by Ambassador Limousine\'s professional transportation network.',
        'desc2': 'Residents and businesses in Lawrenceville rely on Ambassador for reliable airport transportation to Hartsfield-Jackson, corporate transfers throughout the metro area, and event transportation for occasions throughout Gwinnett County.',
        'services': common_services,
        'nearby': [
            {'slug': 'duluth.html', 'name': 'Duluth'},
            {'slug': 'alpharetta.html', 'name': 'Alpharetta'},
        ],
    },
    {
        'filename': 'pages/service-area/marietta.html',
        'area_name': 'Marietta',
        'county': 'Cobb',
        'zip_codes': '30060, 30062, 30064, 30066, 30067, 30068',
        'desc1': 'Marietta is the county seat of Cobb County and one of metro Atlanta\'s most storied communities. Home to Truist Park (Braves stadium), the Marietta Square, Kennesaw Mountain National Battlefield Park, and major corporations, Marietta offers the perfect blend of history, culture, and modern commerce.',
        'desc2': 'Ambassador Limousine provides comprehensive transportation throughout Cobb County, from airport transfers to game day rides to Truist Park, corporate service for the many businesses along the Cumberland corridor, and luxury transportation for Marietta\'s vibrant special event scene.',
        'services': common_services + [{'slug': 'sporting-event.html', 'name': 'Sporting Event Transportation'}],
        'nearby': [
            {'slug': 'smyrna.html', 'name': 'Smyrna'},
            {'slug': 'truist-park.html', 'name': 'Truist Park'},
            {'slug': 'sandy-springs.html', 'name': 'Sandy Springs'},
        ],
    },
    {
        'filename': 'pages/service-area/mercedes-benz-stadium.html',
        'area_name': 'Mercedes-Benz Stadium',
        'county': 'Fulton',
        'zip_codes': '30313',
        'desc1': 'Mercedes-Benz Stadium is Atlanta\'s world-class multi-purpose venue and home to the Atlanta Falcons (NFL) and Atlanta United FC (MLS). The state-of-the-art stadium, with its retractable roof and iconic design, hosts some of the world\'s biggest events — from NFL playoff games to college football championships, concerts, and the upcoming FIFA World Cup 2026.',
        'desc2': 'Event days at Mercedes-Benz Stadium bring massive crowds and significant transportation challenges. Ambassador Limousine\'s stadium transportation service ensures you arrive and depart efficiently, with experienced chauffeurs who know every route, drop-off lane, and pickup point around the stadium.',
        'services': [
            {'slug': 'sporting-event.html', 'name': 'Sporting Event Transportation'},
            {'slug': 'concert-transportation.html', 'name': 'Concert Transportation'},
            {'slug': 'group-transportation.html', 'name': 'Group Transportation'},
            {'slug': 'fifa-world-cup.html', 'name': 'FIFA World Cup 2026'},
        ],
        'nearby': [
            {'slug': 'truist-park.html', 'name': 'Truist Park (Braves)'},
            {'slug': 'hartsfield-jackson-airport.html', 'name': 'Hartsfield-Jackson Airport'},
        ],
    },
    {
        'filename': 'pages/service-area/peachtree-city.html',
        'area_name': 'Peachtree City',
        'county': 'Fayette',
        'zip_codes': '30269',
        'desc1': 'Peachtree City is a planned community in Fayette County, located approximately 30 miles south of Atlanta. Known for its extensive golf cart path network, excellent schools, and high quality of life, Peachtree City is home to many Atlanta-area executives and business professionals who require reliable transportation to Hartsfield-Jackson Airport and the city.',
        'desc2': 'Ambassador Limousine provides convenient Peachtree City-to-airport transfers, corporate transportation to downtown Atlanta and Midtown, and luxury car service for the community\'s many special events and celebrations.',
        'services': common_services,
        'nearby': [
            {'slug': 'hartsfield-jackson-airport.html', 'name': 'Hartsfield-Jackson Airport'},
            {'slug': 'sandy-springs.html', 'name': 'Sandy Springs'},
        ],
    },
    {
        'filename': 'pages/service-area/roswell.html',
        'area_name': 'Roswell',
        'county': 'Fulton',
        'zip_codes': '30075, 30076',
        'desc1': 'Roswell is a charming historic city in northern Fulton County, known for its antebellum architecture along Canton Street, vibrant dining scene, and access to the Chattahoochee River. As one of Atlanta\'s most desirable suburban communities, Roswell is home to many professionals who value premium transportation services.',
        'desc2': 'Ambassador Limousine serves Roswell with the full range of luxury transportation services — from daily airport transfers to Hartsfield-Jackson, corporate car service for business meetings, and special occasion transportation for events throughout the city.',
        'services': common_services,
        'nearby': [
            {'slug': 'alpharetta.html', 'name': 'Alpharetta'},
            {'slug': 'sandy-springs.html', 'name': 'Sandy Springs'},
            {'slug': 'marietta.html', 'name': 'Marietta'},
        ],
    },
    {
        'filename': 'pages/service-area/sandy-springs.html',
        'area_name': 'Sandy Springs',
        'county': 'Fulton',
        'zip_codes': '30327, 30328, 30338, 30342, 30350',
        'desc1': 'Sandy Springs is an affluent city in northern Fulton County, home to numerous Fortune 500 corporate headquarters including UPS, NCR, and Genuine Parts Company. The city\'s Perimeter Center district is one of Atlanta\'s most significant business clusters, making Sandy Springs a major hub for corporate transportation demand.',
        'desc2': 'Ambassador Limousine serves Sandy Springs professionals with premium executive transportation, daily airport transfers, and comprehensive event transportation throughout the city. Our corporate accounts serve many of the major employers along the Perimeter corridor.',
        'services': common_services,
        'nearby': [
            {'slug': 'alpharetta.html', 'name': 'Alpharetta'},
            {'slug': 'roswell.html', 'name': 'Roswell'},
            {'slug': 'marietta.html', 'name': 'Marietta'},
        ],
    },
    {
        'filename': 'pages/service-area/smyrna.html',
        'area_name': 'Smyrna',
        'county': 'Cobb',
        'zip_codes': '30080, 30082',
        'desc1': 'Smyrna is a vibrant Cobb County city located just minutes from Truist Park (Atlanta Braves) and along the Cumberland area corridor. With its thriving Market Village district, growing residential communities, and proximity to both the Braves stadium and major corporate campuses, Smyrna is well-served by Ambassador Limousine\'s transportation network.',
        'desc2': 'Whether you\'re a Smyrna resident headed to Hartsfield-Jackson, a business professional in the Cumberland area, or attending events at Truist Park and surrounding venues, Ambassador Limousine provides reliable, professional transportation throughout the area.',
        'services': common_services + [{'slug': 'sporting-event.html', 'name': 'Sporting Event Transportation'}],
        'nearby': [
            {'slug': 'marietta.html', 'name': 'Marietta'},
            {'slug': 'truist-park.html', 'name': 'Truist Park'},
            {'slug': 'sandy-springs.html', 'name': 'Sandy Springs'},
        ],
    },
    {
        'filename': 'pages/service-area/truist-park.html',
        'area_name': 'Truist Park',
        'county': 'Cobb',
        'zip_codes': '30339',
        'desc1': 'Truist Park is the home stadium of the Atlanta Braves, located in the Cumberland area of Cobb County. The Battery Atlanta entertainment district surrounds the stadium, offering world-class dining, entertainment, and hospitality year-round. On game days, Truist Park draws tens of thousands of fans from across metro Atlanta and beyond.',
        'desc2': 'Ambassador Limousine provides seamless Truist Park transportation for baseball games, concerts, and Battery Atlanta events. Our chauffeurs know every parking, drop-off, and pickup point in The Battery, ensuring you enjoy the event rather than battling traffic.',
        'services': [
            {'slug': 'sporting-event.html', 'name': 'Sporting Event Transportation'},
            {'slug': 'concert-transportation.html', 'name': 'Concert Transportation'},
            {'slug': 'group-transportation.html', 'name': 'Group Transportation'},
        ],
        'nearby': [
            {'slug': 'marietta.html', 'name': 'Marietta'},
            {'slug': 'smyrna.html', 'name': 'Smyrna'},
            {'slug': 'sandy-springs.html', 'name': 'Sandy Springs'},
        ],
    },
]

for p in service_areas:
    html = service_area_page(**p)
    path = f'/home/user/ambassador-website-mockup-/{p["filename"]}'
    with open(path, 'w') as f:
        f.write(html)
    print(f'Created {path}')


# ─── LOCATION PAGES ────────────────────────────────────────────────────────────

locations = [
    {
        'filename': 'pages/locations/washington-dc.html',
        'city': 'Washington',
        'state': 'DC',
        'state_full': 'Washington, D.C.',
        'desc1': 'Washington, D.C. is one of America\'s most significant business and government destinations, drawing executives, lobbyists, diplomats, and event attendees year-round. Ambassador Limousine\'s trusted D.C. affiliate partners provide the same level of five-star service and professionalism you experience in Atlanta.',
        'desc2': 'Whether you need transportation from Reagan National (DCA), Dulles International (IAD), or BWI, our D.C. network handles all airports, downtown hotel transfers, Capitol Hill meetings, embassy row service, and gala event transportation throughout the D.C. metro area.',
        'services_list': [
            'Airport transfers from DCA, IAD, and BWI',
            'Corporate and government transportation',
            'Embassy and diplomatic transportation',
            'Capitol Hill and K Street meeting service',
            'Hotel transfers and hourly as-directed service',
            'Gala and special event transportation',
            'Congressional and regulatory meeting service',
            'Group and charter coach service',
        ],
        'airport_info': 'Reagan National (DCA), Dulles International (IAD), and Baltimore-Washington (BWI) all served.',
    },
    {
        'filename': 'pages/locations/san-francisco.html',
        'city': 'San Francisco',
        'state': 'CA',
        'state_full': 'California',
        'desc1': 'San Francisco and the greater Bay Area is the epicenter of global technology and venture capital. Ambassador Limousine\'s San Francisco partners serve the full Bay Area — from SFO and OAK airports to Silicon Valley offices in Palo Alto, Menlo Park, and San Jose — with the premium black car service tech executives demand.',
        'desc2': 'Our Bay Area network provides executive airport transfers, roadshow transportation between Sand Hill Road VCs and SF offices, and group transportation for technology conferences at Moscone Center and other Bay Area venues.',
        'services_list': [
            'SFO, OAK, and SJC airport transfers',
            'Silicon Valley corporate transportation',
            'Sand Hill Road VC meeting service',
            'Roadshow coordination (SF + Peninsula)',
            'Moscone Center conference shuttle',
            'Hotel transfers in SF and San Jose',
            'Tech campus shuttle service',
            'Group transportation for Bay Area events',
        ],
        'airport_info': 'San Francisco International (SFO), Oakland International (OAK), and San Jose Mineta (SJC) all served.',
    },
    {
        'filename': 'pages/locations/orlando.html',
        'city': 'Orlando',
        'state': 'FL',
        'state_full': 'Florida',
        'desc1': 'Orlando is one of the world\'s top tourism and convention destinations, welcoming millions of visitors annually to its world-class theme parks, Orlando International Airport, and the Orange County Convention Center — one of the largest in the United States. Ambassador Limousine\'s Orlando partners provide premium ground transportation throughout the Orlando metro.',
        'desc2': 'Whether you\'re visiting Walt Disney World, Universal Studios, attending a convention at OCCC, or traveling on business through MCO, our Orlando affiliate network delivers the same five-star experience you expect from Ambassador Limousine in Atlanta.',
        'services_list': [
            'MCO airport transfers and meet-and-greet',
            'Walt Disney World resort transfers',
            'Universal Studios and International Drive service',
            'Orange County Convention Center shuttle',
            'Corporate transportation throughout Orlando',
            'Theme park group transportation',
            'Hotel and resort transfers',
            'I-Drive and Kissimmee service',
        ],
        'airport_info': 'Orlando International Airport (MCO) served with professional meet-and-greet service.',
    },
    {
        'filename': 'pages/locations/chicago.html',
        'city': 'Chicago',
        'state': 'IL',
        'state_full': 'Illinois',
        'desc1': 'Chicago is the Midwest\'s financial and commercial capital — a global hub for finance, law, commodities trading, manufacturing, and healthcare. Ambassador Limousine\'s Chicago partners deliver executive-grade black car service throughout the city and suburbs, serving O\'Hare and Midway airports, the Loop, and suburban business districts.',
        'desc2': 'Atlanta-based companies visiting Chicago for roadshows, investor meetings, or industry conferences can rely on Ambassador to coordinate seamless ground transportation across the entire Chicago metro area through our trusted affiliate network.',
        'services_list': [
            'O\'Hare (ORD) and Midway (MDW) airport transfers',
            'Loop financial district transportation',
            'Corporate and roadshow service',
            'McCormick Place convention transportation',
            'Suburban corporate campus transfers',
            'Hotel transfers throughout Chicago',
            'Group transportation for events',
            'Hourly executive as-directed service',
        ],
        'airport_info': "O'Hare International (ORD) and Midway International (MDW) both served.",
    },
    {
        'filename': 'pages/locations/boston.html',
        'city': 'Boston',
        'state': 'MA',
        'state_full': 'Massachusetts',
        'desc1': 'Boston is a global center of education, biotechnology, healthcare, and finance — home to Harvard, MIT, Massachusetts General Hospital, and one of the world\'s most concentrated biotech corridors. Ambassador Limousine\'s Boston partners serve the full Greater Boston area with the premium executive transportation that the city\'s high-caliber business community demands.',
        'desc2': 'From Logan International Airport transfers to Cambridge biotech campus service, Kendall Square meetings, and Financial District corporate transportation, our Boston affiliate network handles every leg of your New England business travel.',
        'services_list': [
            'Logan International (BOS) airport transfers',
            'Financial District and Back Bay corporate service',
            'Cambridge and Kendall Square biotech campus transfers',
            'Harvard and MIT meeting transportation',
            'Seaport District hotel and conference service',
            'Roadshow transportation throughout Boston metro',
            'Group transportation for conferences',
            'Cape Cod and North Shore service available',
        ],
        'airport_info': 'Logan International Airport (BOS) served with professional meet-and-greet and flight monitoring.',
    },
]

for p in locations:
    html = location_page(**p)
    path = f'/home/user/ambassador-website-mockup-/{p["filename"]}'
    with open(path, 'w') as f:
        f.write(html)
    print(f'Created {path}')

print('\\nAll sub-pages generated successfully!')
