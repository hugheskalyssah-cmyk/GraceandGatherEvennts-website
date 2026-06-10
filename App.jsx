import React from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Instagram, MapPin, CalendarHeart, Sparkles, Camera, Flower2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import heroImage from "../assets/grace-gather-hero.png";
import decorWoodBalloon from "../assets/decor-wood-balloon.png";
import decorCutoutsProps from "../assets/decor-cutouts-props.png";
import photoBoothTablet from "../assets/photo-booth-tablet.png";
import photoBoothBackdrops from "../assets/photo-booth-backdrops.png";
import yellowDessertGiftTable from "../assets/yellow-dessert-gift-table.png";
import yellowDecorBackdrop from "../assets/yellow-decor-backdrop.png";
import yellowTableChairDisplay from "../assets/yellow-table-chair-display.png";
import "./styles.css";

export default function GraceGatherEventsWebsite() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [rentalQuantities, setRentalQuantities] = useState({});
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const date = new Date();
    date.setDate(1);
    return date;
  });
  const [selectedEventDate, setSelectedEventDate] = useState("");

  const packages = [
    {
      name: "The Grace Edit",
      price: "$650-$900",
      details: "Ideal for showers, birthdays, and intimate gatherings. Includes curated decor and styling for a focal area such as a cake table, gift table, or sweetheart table.",
      note: "Includes a design consultation, curated decor selection, setup, and breakdown."
    },
    {
      name: "The Gathered Experience",
      price: "$1,500-$2,500",
      details: "Our most popular package for weddings and milestone events. Includes a full design board, ceremony or event space styling, tablescape decor, a backdrop or arch, coordinated decor rentals, and complete setup and teardown."
    },
    {
      name: "The Gathering With Grace",
      price: "$3,000-$5,000+",
      details: "A premium, full-environment styling experience for clients seeking an elevated and cohesive design. Includes complete event styling, premium decor selections, custom design elements, floor plan optimization, and on-site styling oversight."
    },
    {
      name: "Decor Rental Collection",
      price: "$250 rental minimum",
      details: "A DIY-friendly option for clients who prefer to style their own event using curated decor rentals from the Grace & Gather Events inventory.",
      note: "Delivery, setup, breakdown, styling, and coordination services may be added and are quoted separately."
    }
  ];

  const services = [
    { icon: Sparkles, title: "Event Styling", text: "Warm layouts, curated colors, tablescapes, and decor styling for grown-up and kid-friendly moments." },
    { icon: Flower2, title: "Decor Rentals", text: "Wooden backdrops, balloon pieces, character cutouts, props, and seasonal accents." },
    { icon: Camera, title: "Photo Booth Add-ons", text: "Tablet-based booth rentals with simple backdrops, prop baskets, and easy guest fun." },
    { icon: CalendarHeart, title: "Event Support", text: "Setup assistance, design planning, and day-of styling support." }
  ];

  const decorPrices = [
    ["DIY-Friendly Rental Minimum", "Curated decor rentals from the Grace & Gather Events inventory.", "$250 minimum"],
    ["Wooden Backdrop Rental", "Wood panel or arch backdrop with basic setup.", "From $125"],
    ["Balloon Arch", "Organic balloon arch with selected colors.", "From $175"],
    ["Balloon Towers", "Pair of towers for entrances, stages, or photo corners.", "From $95"],
    ["Cutouts & Props", "Character-style cutouts, themed props, baskets, crates, and accent pieces.", "From $45"],
    ["6ft Rectangle Tables", "Rectangle table rentals for guest seating, layouts, and family-style gatherings.", "$12 each"],
    ["60in Round Tables", "Round table rentals for guest seating and gathered table layouts.", "$15 each"],
    ["White Acrylic Chairs", "Clean white acrylic chair rentals for modern, bright event seating.", "$3.50 each"],
    ["Rectangle Table Cloths", "Table cloth rentals for 6ft rectangle tables.", "$12 each"],
    ["Round Table Cloths", "Table cloth rentals for 60in round tables.", "$15 each"],
    ["Dessert & Gift Table", "Small display table rental for cake, desserts, gifts, favors, or sign-in displays.", "$90"],
    ["Custom Centerpieces", "Personalized centerpiece designs for guest tables, dessert tables, and focal displays.", "Custom quote"],
    ["Delivery, Setup & Breakdown", "Quoted separately. Styling and coordination services may be added to any rental order.", "Custom quote"]
  ];

  const photoBoothPrices = [
    ["Tablet Booth Rental", "Booth stand, tablet setup, and basic prop basket.", "From $150"],
    ["Simple Backdrop Add-on", "Fabric, wood, or balloon photo corner styling.", "From $75"],
    ["Props Refresh", "Extra themed props for birthdays, holidays, or school events.", "From $35"]
  ];

  const blockedDates = new Set(["2026-06-15", "2026-06-22"]);

  const paymentLinks = {
    serviceDeposit: "",
    rentalCheckout: "",
    customQuote: ""
  };

  const paymentOptions = [
    ["serviceDeposit", "Service Deposit", "Custom amount", "Place a deposit after your date, package, and service details are confirmed.", "Pay Deposit"],
    ["customQuote", "Custom Quote Items", "Custom quote", "Use this for custom centerpieces, delivery, setup, breakdown, or specialty rentals.", "Request Payment Link"]
  ];

  const rentalItems = [
    { key: "chairs", name: "White Acrylic Chairs", price: 3.5, label: "$3.50 each" },
    { key: "backdrops", name: "Wooden Backdrops", price: 125, label: "$125 each" },
    { key: "balloonArches", name: "Balloon Arches", price: 175, label: "$175 each" },
    { key: "balloonTowers", name: "Balloon Tower Pairs", price: 95, label: "$95 per pair" },
    { key: "rectangleTables", name: "6ft Rectangle Tables", price: 12, label: "$12 each" },
    { key: "roundTables", name: "60in Round Tables", price: 15, label: "$15 each" },
    { key: "dessertGiftTables", name: "Dessert/Gift Tables", price: 90, label: "$90 each" },
    { key: "rectangleCloths", name: "Rectangle Table Cloths", price: 12, label: "$12 each" },
    { key: "roundCloths", name: "Round Table Cloths", price: 15, label: "$15 each" }
  ];

  const calendarDays = buildCalendarDays(calendarMonth, blockedDates, selectedEventDate);
  const formattedEventDate = selectedEventDate ? formatDisplayDate(selectedEventDate) : "";

  const rentalTotal = rentalItems.reduce((total, item) => {
    return total + (Number(rentalQuantities[item.key]) || 0) * item.price;
  }, 0);

  const handlePayment = (key, name) => {
    const paymentUrl = paymentLinks[key];

    if (paymentUrl && paymentUrl.startsWith("http")) {
      window.location.href = paymentUrl;
      return;
    }

    const subject = `Payment link request: ${name}`;
    const body = [
      "Hi Grace & Gather Events,",
      "",
      `I would like to pay for: ${name}.`,
      "",
      "Event date:",
      "Quantity, if applicable:",
      "Name:",
      "Phone:"
    ].join("\n");
    window.location.href = `mailto:ggeventsep@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleRentalCheckout = () => {
    const paymentUrl = paymentLinks.rentalCheckout;

    if (paymentUrl && paymentUrl.startsWith("http")) {
      window.location.href = paymentUrl;
      return;
    }

    const selectedRentals = rentalItems
      .map((item) => {
        const quantity = Number(rentalQuantities[item.key]) || 0;
        return {
          ...item,
          quantity,
          subtotal: quantity * item.price
        };
      })
      .filter((item) => item.quantity > 0);

    const rentalDetails = selectedRentals.length
      ? selectedRentals.map((item) => `${item.name}: ${item.quantity} ($${item.subtotal.toFixed(2)})`).join("\n")
      : "No rental quantities selected yet.";

    const subject = "Rental checkout request";
    const body = [
      "Hi Grace & Gather Events,",
      "",
      "I would like to request checkout for these rentals:",
      rentalDetails,
      "",
      `Estimated total: $${rentalTotal.toFixed(2)}`,
      "",
      "Event date:",
      "Name:",
      "Phone:"
    ].join("\n");
    window.location.href = `mailto:ggeventsep@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const gallerySlides = [
    {
      src: heroImage,
      alt: "Elegant event tablescape with soft florals, linens, and warm natural light"
    },
    {
      src: decorWoodBalloon,
      alt: "Wooden backdrop with sage and cream balloon arch and balloon towers"
    },
    {
      src: decorCutoutsProps,
      alt: "Family party props, playful cutouts, and photo prop baskets"
    },
    {
      src: photoBoothTablet,
      alt: "Tablet-based photo booth stand with balloon backdrop and prop basket"
    },
    {
      src: photoBoothBackdrops,
      alt: "Simple photo booth backdrops and baskets of handheld props"
    },
    {
      src: yellowDessertGiftTable,
      alt: "Canary yellow, cream, and brown dessert and gift table display"
    },
    {
      src: yellowDecorBackdrop,
      alt: "Canary yellow, cream, and brown decor backdrop display"
    },
    {
      src: yellowTableChairDisplay,
      alt: "Canary yellow, cream, and brown table and chair rental display"
    },
    {
      src: new URL("../assets/gallery/IMG_1052.jpg", import.meta.url).href,
      alt: "Pink birthday table with balloon details and bow accents"
    },
    {
      src: new URL("../assets/gallery/IMG_1070.jpg", import.meta.url).href,
      alt: "Sunshine first birthday backdrop with yellow balloons"
    },
    {
      src: new URL("../assets/gallery/IMG_1084.jpg", import.meta.url).href,
      alt: "Fairy first birthday butterfly balloon backdrop"
    },
    {
      src: new URL("../assets/gallery/IMG_1088.jpg", import.meta.url).href,
      alt: "Black and gold graduation entry display"
    },
    {
      src: new URL("../assets/gallery/IMG_1116.jpg", import.meta.url).href,
      alt: "Colorful outdoor birthday backdrop with balloon styling"
    },
    {
      src: new URL("../assets/gallery/IMG_1127.jpg", import.meta.url).href,
      alt: "Baby shower backdrop with green and gold balloons"
    }
  ];

  const uploadedGalleryImages = [
    { src: new URL("../assets/gallery/IMG_1019.jpg", import.meta.url).href, alt: "Pastel balloon arch with flowers and dessert table", caption: "Pastel balloon arch and dessert display." },
    { src: new URL("../assets/gallery/IMG_1018.jpg", import.meta.url).href, alt: "Warm outdoor tablescape with desert florals", caption: "Warm tablescape styling with textured florals." },
    { src: new URL("../assets/gallery/IMG_1021.jpg", import.meta.url).href, alt: "Neutral birthday backdrop with balloon garland", caption: "Neutral birthday backdrop with soft balloon details." },
    { src: new URL("../assets/gallery/IMG_1022.jpg", import.meta.url).href, alt: "Wild one dessert table with jungle props", caption: "Playful character-themed dessert and prop setup." },
    { src: new URL("../assets/gallery/IMG_1023.jpg", import.meta.url).href, alt: "Balloon flower wall and pastel dessert table", caption: "Balloon flower wall for cheerful birthday moments." },
    { src: new URL("../assets/gallery/IMG_1024.jpg", import.meta.url).href, alt: "Outdoor pastel party setup with balloon backdrop", caption: "Outdoor pastel backdrop with kid-friendly seating." },
    { src: new URL("../assets/gallery/IMG_1025.jpg", import.meta.url).href, alt: "Jungle first birthday table with green balloon arch", caption: "Jungle-inspired first birthday table and arch." },
    { src: new URL("../assets/gallery/IMG_1026.jpg", import.meta.url).href, alt: "Pink balloon ceiling over dessert table", caption: "Floating balloon dessert table with star accents." },
    { src: new URL("../assets/gallery/IMG_1027.jpg", import.meta.url).href, alt: "Pink and red balloon arch with strawberry dessert table", caption: "Bright berry-toned dessert table and balloon arch." },
    { src: new URL("../assets/gallery/IMG_1029.jpg", import.meta.url).href, alt: "Rainbow balloon towers with pink birthday backdrop", caption: "Rainbow balloon towers with a sweet birthday backdrop." },
    { src: new URL("../assets/gallery/IMG_1030.jpg", import.meta.url).href, alt: "Pastel balloon garland and dessert table", caption: "Pastel balloon garland over a dessert display." },
    { src: new URL("../assets/gallery/IMG_1031.jpg", import.meta.url).href, alt: "Brown and cream birthday backdrop with balloons", caption: "Simple birthday backdrop with warm neutral accents." },
    { src: new URL("../assets/gallery/IMG_1032.jpg", import.meta.url).href, alt: "Surf themed first birthday backdrop with balloon styling", caption: "Adventure-themed backdrop with playful props." },
    { src: new URL("../assets/gallery/IMG_1034.jpg", import.meta.url).href, alt: "Colorful kids party with balloons and play setup", caption: "Colorful kids party styling with big photo moments." },
    { src: new URL("../assets/gallery/IMG_1035.jpg", import.meta.url).href, alt: "Bright balloon dessert display with flowers", caption: "Bright dessert setup with balloons and florals." },
    { src: new URL("../assets/gallery/IMG_1036.jpg", import.meta.url).href, alt: "Pink and gold dessert table with balloon garland", caption: "Pink and gold dessert table with elegant balloon styling." },
    { src: new URL("../assets/gallery/IMG_1038.jpg", import.meta.url).href, alt: "Soft pink bow birthday backdrop with balloons", caption: "Soft bow-themed birthday backdrop." },
    { src: new URL("../assets/gallery/IMG_1039.jpg", import.meta.url).href, alt: "Pink dessert table with large balloon arch", caption: "Pink dessert table with a full balloon arch." },
    { src: new URL("../assets/gallery/IMG_1040.jpg", import.meta.url).href, alt: "Pink themed character backdrop with balloons", caption: "Character-themed backdrop with balloons and dessert stands." },
    { src: new URL("../assets/gallery/IMG_1041.jpg", import.meta.url).href, alt: "Pink bow dessert table with balloon arch", caption: "Bow-themed dessert table with soft pink styling." },
    { src: new URL("../assets/gallery/IMG_1042.jpg", import.meta.url).href, alt: "Outdoor pink bow backdrop with balloon garland", caption: "Outdoor bow backdrop with matching balloon details." },
    { src: new URL("../assets/gallery/IMG_1043.jpg", import.meta.url).href, alt: "Pink curtain dessert table with lights and balloons", caption: "Lighted curtain backdrop with a dessert table." },
    { src: new URL("../assets/gallery/IMG_1044.jpg", import.meta.url).href, alt: "Pink and white balloon arch over dessert table", caption: "Pink and white dessert setup with floral accents." },
    { src: new URL("../assets/gallery/IMG_1045.jpg", import.meta.url).href, alt: "Pink birthday backdrop with balloon arch and cake table", caption: "Personalized birthday backdrop and cake table." },
    { src: new URL("../assets/gallery/IMG_1046.jpg", import.meta.url).href, alt: "Outdoor pink tablescape with floral centerpieces", caption: "Outdoor tablescape with soft pink florals." },
    { src: new URL("../assets/gallery/IMG_1047.jpg", import.meta.url).href, alt: "Outdoor pink tea party tablescape", caption: "Pink tea party table with layered place settings." },
    { src: new URL("../assets/gallery/IMG_1049.jpg", import.meta.url).href, alt: "Pastel pink and yellow balloon arch", caption: "Pastel balloon arch for simple photo moments." },
    { src: new URL("../assets/gallery/IMG_1050.jpg", import.meta.url).href, alt: "Pink birthday dessert table with bows and balloons", caption: "Pink bow birthday sweets display." },
    { src: new URL("../assets/gallery/IMG_1051.jpg", import.meta.url).href, alt: "Pink tablescape with floral bud vases and gold accents", caption: "Pink tablescape with bud vases and gold accents." },
    { src: new URL("../assets/gallery/IMG_1052.jpg", import.meta.url).href, alt: "Pink character-themed birthday table with balloon details", caption: "Pink character-themed birthday table with bow accents." },
    { src: new URL("../assets/gallery/IMG_1064.jpg", import.meta.url).href, alt: "Blush and pearl balloon garland over fireplace", caption: "Blush and pearl balloon garland with floral touches." },
    { src: new URL("../assets/gallery/IMG_1068.jpg", import.meta.url).href, alt: "Neutral baby backdrop with pink balloon garland", caption: "Neutral baby backdrop with soft pink balloon styling." },
    { src: new URL("../assets/gallery/IMG_1070.jpg", import.meta.url).href, alt: "Sunshine first birthday backdrop with yellow balloons", caption: "Sunshine-themed first birthday backdrop." },
    { src: new URL("../assets/gallery/IMG_1073.jpg", import.meta.url).href, alt: "White and gold first birthday balloon backdrop", caption: "White and gold first birthday photo backdrop." },
    { src: new URL("../assets/gallery/IMG_1074.jpg", import.meta.url).href, alt: "Wooden backdrop with sage and gold balloon garland", caption: "Wooden backdrop with sage and gold balloons." },
    { src: new URL("../assets/gallery/IMG_1075.jpg", import.meta.url).href, alt: "Western first birthday backdrop with balloons", caption: "Western-inspired first birthday balloon backdrop." },
    { src: new URL("../assets/gallery/IMG_1077.jpg", import.meta.url).href, alt: "Pastel flower balloon backdrop with cake pedestal", caption: "Pastel flower balloon backdrop with cake pedestal." },
    { src: new URL("../assets/gallery/IMG_1078.jpg", import.meta.url).href, alt: "Pink and cream balloon backdrop with goose party accents", caption: "Soft pink and cream birthday backdrop." },
    { src: new URL("../assets/gallery/IMG_1083.jpg", import.meta.url).href, alt: "First trip around the sun dessert table", caption: "First trip around the sun dessert table." },
    { src: new URL("../assets/gallery/IMG_1084.jpg", import.meta.url).href, alt: "Fairy first birthday butterfly balloon backdrop", caption: "Fairy first birthday backdrop with butterfly details." },
    { src: new URL("../assets/gallery/IMG_1088.jpg", import.meta.url).href, alt: "Black and gold graduation balloon entry display", caption: "Black and gold graduation entry display." },
    { src: new URL("../assets/gallery/IMG_1091.jpg", import.meta.url).href, alt: "Graduation floral centerpiece with year picks", caption: "Graduation centerpiece with floral details." },
    { src: new URL("../assets/gallery/IMG_1096.jpg", import.meta.url).href, alt: "Black and gold graduation balloon backdrop", caption: "Black and gold graduation balloon backdrop." },
    { src: new URL("../assets/gallery/IMG_1099.jpg", import.meta.url).href, alt: "Elegant graduation backdrop with black and gold balloons", caption: "Elegant graduation backdrop with candle styling." },
    { src: new URL("../assets/gallery/IMG_1100.jpg", import.meta.url).href, alt: "Indoor graduation backdrop with neutral and black balloons", caption: "Indoor graduation backdrop with layered balloon garlands." },
    { src: new URL("../assets/gallery/IMG_1101.jpg", import.meta.url).href, alt: "Outdoor graduation dessert table with chalkboard sign", caption: "Outdoor graduation sweets table with signage." },
    { src: new URL("../assets/gallery/IMG_1116.jpg", import.meta.url).href, alt: "Character-themed outdoor birthday backdrop with colorful balloons", caption: "Colorful character-themed outdoor birthday backdrop." },
    { src: new URL("../assets/gallery/IMG_1115.jpg", import.meta.url).href, alt: "Storybook first birthday dessert table with balloon arch", caption: "Storybook-inspired first birthday dessert table." },
    { src: new URL("../assets/gallery/IMG_1123.jpg", import.meta.url).href, alt: "Bright character-themed backdrop with marquee number", caption: "Bright character-themed backdrop with marquee number." },
    { src: new URL("../assets/gallery/IMG_1124.jpg", import.meta.url).href, alt: "Blue and purple character-themed balloon backdrop", caption: "Blue and purple character-themed balloon display." },
    { src: new URL("../assets/gallery/IMG_1126.jpg", import.meta.url).href, alt: "Balloon towers with character balloons and number balloon", caption: "Balloon towers with playful party accents." },
    { src: new URL("../assets/gallery/IMG_1127.jpg", import.meta.url).href, alt: "Baby shower backdrop with green and gold balloons", caption: "Baby shower backdrop with green and gold balloons." }
  ];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % gallerySlides.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [gallerySlides.length]);

  const showSlide = (index) => {
    setActiveSlide((index + gallerySlides.length) % gallerySlides.length);
  };

  return (
    <div className="site">
      <header className="site-header">
        <nav className="shell nav">
          <div>
            <p className="brand-title">Grace & Gather Events</p>
            <p className="brand-line">Events rooted in grace</p>
          </div>
          <div className="nav-links">
            <a className="nav-tab" href="#home">Home</a>
            <a className="nav-tab" href="#about">About</a>
            <details className="nav-dropdown">
              <summary>Services</summary>
              <div className="dropdown-menu">
                <a href="#services">All Services</a>
                <a href="#decor-rentals">Decor Rentals</a>
                <a href="#photo-booth">Photo Booth</a>
              </div>
            </details>
            <a className="nav-tab" href="#packages">Packages</a>
            <a className="nav-tab" href="#payments">Book & Pay</a>
            <a className="nav-tab" href="#gallery">Gallery</a>
            <a className="nav-tab" href="#inquiry">Inquiry Form</a>
            <a className="nav-tab" href="#contact">Contact</a>
          </div>
        </nav>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="shell hero-grid">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <p className="eyebrow">El Paso Event Styling</p>
              <h1>Grace & Gather Events</h1>
              <p className="lead">
                Beautiful gatherings, styled with grace for birthdays, showers, school celebrations, family milestones, and cozy community events.
              </p>
              <div className="actions">
                <Button asChild>
                  <a href="#inquiry">Start an Inquiry</a>
                </Button>
                <Button asChild variant="outline">
                  <a href="#packages">View Packages</a>
                </Button>
              </div>
            </motion.div>

            <motion.figure className="hero-photo" aria-label="Gallery slideshow of event styling and rentals" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }}>
              {gallerySlides.map((slide, index) => (
                <div className={`slide ${index === activeSlide ? "is-active" : ""}`} key={slide.src}>
                  <img src={slide.src} alt={slide.alt} />
                </div>
              ))}
              <div className="slideshow-controls" aria-label="Gallery slideshow controls">
                <button className="slide-button" type="button" onClick={() => showSlide(activeSlide - 1)} aria-label="Previous gallery photo">{"\u2039"}</button>
                <button className="slide-button" type="button" onClick={() => showSlide(activeSlide + 1)} aria-label="Next gallery photo">{"\u203a"}</button>
              </div>
              <div className="slide-dots" aria-label="Choose gallery photo">
                {gallerySlides.map((slide, index) => (
                  <button
                    className={`slide-dot ${index === activeSlide ? "is-active" : ""}`}
                    type="button"
                    onClick={() => showSlide(index)}
                    aria-label={`Show gallery photo ${index + 1}`}
                    key={slide.alt}
                  />
                ))}
              </div>
              <figcaption>Event styling, decor rentals, and photo moments</figcaption>
            </motion.figure>
          </div>
        </section>

        <section id="services">
          <div className="shell">
            <p className="eyebrow">What We Offer</p>
            <h2>Event services made simple</h2>
            <div className="cards services-grid">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <Card key={service.title}>
                    <CardContent>
                      <Icon className="service-icon" />
                      <h3>{service.title}</h3>
                      <p>{service.text}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        <section className="feature-section">
          <div className="shell tab-stack">
            <details id="decor-rentals" className="service-tab">
              <summary>
                <div>
                  <p className="eyebrow">Decor Rentals</p>
                  <h2 className="tab-title">Wooden backdrops, balloons, cutouts, and props</h2>
                  <p className="tab-hint">Open this tab to view rental photos, DIY-friendly pricing, and family party options.</p>
                </div>
                <span className="tab-toggle">Open Tab</span>
              </summary>
              <div className="tab-panel feature-grid">
                <div className="feature-copy">
                  <p className="lead">
                    Mix and match rental pieces for birthdays, baby showers, classroom celebrations, church events, holiday parties, and backyard gatherings. Each setup is styled to feel cheerful, tidy, and photo-ready.
                  </p>
                  <ul className="mini-list">
                    <li>Wooden backdrops, arch panels, and soft fabric backdrop options.</li>
                    <li>Balloon arches, balloon towers, and coordinating balloon accents.</li>
                    <li>Generic character-style cutouts, kid-height displays, prop baskets, crates, rugs, and table accents.</li>
                    <li>Round and rectangular guest tables, plus small round and rectangular dessert or gift tables.</li>
                    <li>White acrylic chairs, table cloths, and custom centerpieces for polished finishing details.</li>
                  </ul>
                  <div className="coming-soon">
                    <span className="soon-badge">Coming Soon</span>
                    <h3>Light-Up Marquee Letters & Numbers</h3>
                    <p>
                      Large illuminated letters and numbers will be available soon for birthdays, graduations, anniversaries, school events, and milestone photo moments.
                    </p>
                  </div>
                  <PricingSheet title="Decor Rental Collection" rows={decorPrices} />
                </div>

                <div className="photo-grid">
                  <figure className="photo-card">
                    <img src={decorWoodBalloon} alt="Wooden backdrop with sage and cream balloon arch and balloon towers" />
                    <p>Wooden backdrops with balloon arches and towers for birthdays, showers, and milestone photos.</p>
                  </figure>
                  <figure className="photo-card">
                    <img src={decorCutoutsProps} alt="Family party props, playful cutouts, and photo prop baskets" />
                    <p>Character-style cutouts and prop baskets bring a sweet, playful touch without feeling cluttered.</p>
                  </figure>
                  <figure className="photo-card">
                    <img src={yellowDessertGiftTable} alt="Canary yellow, cream, and brown dessert and gift table display" />
                    <p>Dessert and gift table displays styled in canary yellow, cream, and warm brown.</p>
                  </figure>
                  <figure className="photo-card">
                    <img src={yellowDecorBackdrop} alt="Canary yellow, cream, and brown decor backdrop display" />
                    <p>Backdrop displays with canary yellow balloons, cream panels, and warm brown accents.</p>
                  </figure>
                  <figure className="photo-card">
                    <img src={yellowTableChairDisplay} alt="Canary yellow, cream, and brown table and chair rental display" />
                    <p>Table, chair, linen, and centerpiece rentals shown in a bright yellow, cream, and brown palette.</p>
                  </figure>
                </div>
              </div>
            </details>

            <details id="photo-booth" className="service-tab">
              <summary>
                <div>
                  <p className="eyebrow">Photo Booth</p>
                  <h2 className="tab-title">Tablet-based booth, simple backdrops, and prop baskets</h2>
                  <p className="tab-hint">Open this tab to view photo booth stand options, backdrop examples, and add-on pricing.</p>
                </div>
                <span className="tab-toggle">Open Tab</span>
              </summary>
              <div className="tab-panel feature-grid">
                <div className="photo-grid">
                  <figure className="photo-card">
                    <img src={photoBoothTablet} alt="Tablet-based photo booth stand with balloon backdrop and prop basket" />
                    <p>Tablet-based photo booth stand with a simple backdrop, balloon accent, and family-friendly props.</p>
                  </figure>
                  <figure className="photo-card">
                    <img src={photoBoothBackdrops} alt="Simple photo booth backdrops and baskets of handheld props" />
                    <p>Simple backdrop and prop options for quick photos at kids' parties, showers, and community events.</p>
                  </figure>
                </div>

                <div className="feature-copy">
                  <p className="lead">
                    Add a tablet-based photo booth to keep guests smiling between cake, games, and family photos. The setup stays simple, tidy, and easy for guests to use.
                  </p>
                  <ul className="mini-list">
                    <li>Tablet-based photo booth with a clean stand and guest-ready setup.</li>
                    <li>Simple fabric, wood, or balloon backdrops styled to match your colors.</li>
                    <li>Prop baskets with glasses, crowns, hearts, stars, and themed handheld pieces.</li>
                  </ul>
                  <div className="coming-soon">
                    <span className="soon-badge">Coming Soon</span>
                    <h3>360 Photo Booth</h3>
                    <p>
                      A 360 photo booth experience is coming soon for guests who want a fun, high-energy video moment at birthdays, weddings, corporate events, and celebrations.
                    </p>
                  </div>
                  <PricingSheet title="Photo Booth Add-ons" rows={photoBoothPrices} />
                  <div className="actions">
                    <Button asChild>
                      <a href="#inquiry">Ask About Photo Booth</a>
                    </Button>
                  </div>
                </div>
              </div>
            </details>
          </div>
        </section>

        <section id="packages" className="band">
          <div className="shell">
            <p className="eyebrow">Packages</p>
            <h2>Choose your gathering style</h2>
            <div className="cards packages-grid">
              {packages.map((item) => (
                <Card key={item.name}>
                  <CardContent>
                    <h3>{item.name}</h3>
                    <p className="price">{item.price}</p>
                    <p>{item.details}</p>
                    {item.note ? <p>{item.note}</p> : null}
                    <Button asChild className="full">
                      <a href="#payments">{item.name === "Decor Rental Collection" ? "Reserve Rentals" : "Reserve This Package"}</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="payments">
          <div className="shell">
            <p className="eyebrow">Book & Pay</p>
            <h2>Reserve rentals or place a service deposit</h2>
            <div className="payment-grid">
              <article className="payment-card">
                <h3>Service Deposit</h3>
                <p className="price">Custom amount</p>
                <p>Place a deposit after your date, package, and service details are confirmed.</p>
                <Button type="button" onClick={() => handlePayment("serviceDeposit", "Service Deposit")}>
                  Pay Deposit
                </Button>
              </article>
              <article className="payment-card rental-calculator">
                <h3>Rental Calculator</h3>
                <p>Choose the quantity needed for each rental item. The estimated rental total updates automatically.</p>
                <div className="rental-lines">
                  {rentalItems.map((item) => (
                    <div className="rental-line" key={item.key}>
                      <label htmlFor={`rental-${item.key}`}>
                        {item.name}
                        <span>{item.label}</span>
                      </label>
                      <input
                        id={`rental-${item.key}`}
                        type="number"
                        min="0"
                        value={rentalQuantities[item.key] || 0}
                        onChange={(event) =>
                          setRentalQuantities((current) => ({
                            ...current,
                            [item.key]: Math.max(0, Number(event.target.value) || 0)
                          }))
                        }
                      />
                    </div>
                  ))}
                </div>
                <div className="rental-total">
                  <p>Estimated rental total</p>
                  <strong>${rentalTotal.toFixed(2)}</strong>
                </div>
                <Button type="button" onClick={handleRentalCheckout}>
                  Request Checkout Link
                </Button>
              </article>
              {paymentOptions.slice(1).map(([key, name, price, description, buttonLabel]) => (
                <article className="payment-card" key={key}>
                  <h3>{name}</h3>
                  <p className="price">{price}</p>
                  <p>{description}</p>
                  <Button type="button" onClick={() => handlePayment(key, name)}>
                    {buttonLabel}
                  </Button>
                </article>
              ))}
            </div>
            <p className="fine-print">
              Payment buttons are ready to connect to your payment processor. Add your real checkout links in the paymentLinks settings in this file. Until then, each button opens an email request so no card details are collected on the website.
            </p>
          </div>
        </section>

        <section id="gallery">
          <div className="shell">
            <p className="eyebrow">Gallery</p>
            <h2>A look at gatherings, rentals, and photo moments</h2>
            <div className="gallery-grid">
              <figure className="gallery-item">
                <img src={heroImage} alt="Elegant styled event tablescape with florals and candles" />
                <p>Styled tablescapes for warm, meaningful celebrations.</p>
              </figure>
              <figure className="gallery-item">
                <img src={decorWoodBalloon} alt="Wooden backdrop with balloon arch and balloon towers" />
                <p>Wooden backdrops, balloon arches, and balloon towers.</p>
              </figure>
              <figure className="gallery-item">
                <img src={decorCutoutsProps} alt="Family party props and character-style cutouts" />
                <p>Family-friendly props, cutouts, and themed accents.</p>
              </figure>
              <figure className="gallery-item">
                <img src={photoBoothTablet} alt="Tablet-based photo booth stand with balloon backdrop" />
                <p>Tablet-based photo booth setup with simple styling.</p>
              </figure>
              <figure className="gallery-item">
                <img src={photoBoothBackdrops} alt="Simple photo booth backdrops and handheld props" />
                <p>Backdrop and prop options for quick guest photos.</p>
              </figure>
              {uploadedGalleryImages.map((image) => (
                <figure className="gallery-item" key={image.src}>
                  <img src={image.src} alt={image.alt} />
                  <p>{image.caption}</p>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="about">
          <div className="shell about-grid">
            <div>
              <p className="eyebrow">About Grace & Gather Events</p>
              <h2>Meaningful celebrations, intentionally designed</h2>
            </div>
            <p className="story">
              At Grace & Gather Events, we believe every celebration deserves to feel meaningful, beautiful, and intentionally designed. Rooted in hospitality and guided by grace, our mission is to create memorable event experiences that bring people together in a way that feels elegant, welcoming, and personal. Based in El Paso, Texas, Grace & Gather Events specializes in event styling, decor rentals, and planning support for weddings, milestone celebrations, church gatherings, corporate events, and intimate social occasions. Our approach blends timeless design with thoughtful details to create spaces that feel both elevated and genuine.
            </p>
          </div>
        </section>

        <section>
          <div className="shell steps">
            <div>
              <p className="step-number">1</p>
              <h3>Submit Inquiry</h3>
              <p>Tell us your date, theme, guest count, and vision.</p>
            </div>
            <div>
              <p className="step-number">2</p>
              <h3>Plan the Look</h3>
              <p>We help shape your colors, rentals, layout, and details.</p>
            </div>
            <div>
              <p className="step-number">3</p>
              <h3>Gather Gracefully</h3>
              <p>Your event is styled with intention and ready for memories.</p>
            </div>
          </div>
        </section>

        <section id="inquiry" className="band">
          <div className="shell inquiry-grid">
            <div>
              <p className="eyebrow">Inquiry Form</p>
              <h2>Let's start planning your event</h2>
              <p className="lead">Share a few details and Grace & Gather Events will follow up with package options, availability, and next steps.</p>
            </div>

            <form onSubmit={(event) => event.preventDefault()}>
              <input placeholder="Full Name" />
              <input placeholder="Email Address" />
              <input placeholder="Phone Number" />
              <div className="calendar-field">
                <div className="calendar-input-row">
                  <input placeholder="Event Date" value={formattedEventDate} readOnly required />
                  <Button type="button" variant="outline" onClick={() => setCalendarOpen((open) => !open)}>
                    Calendar
                  </Button>
                </div>
                <div className={`calendar-picker ${calendarOpen ? "is-open" : ""}`}>
                  <div className="calendar-header">
                    <button className="calendar-nav" type="button" onClick={() => setCalendarMonth((date) => new Date(date.getFullYear(), date.getMonth() - 1, 1))} aria-label="Previous month">
                      {"\u2039"}
                    </button>
                    <p className="calendar-title">
                      {calendarMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                    </p>
                    <button className="calendar-nav" type="button" onClick={() => setCalendarMonth((date) => new Date(date.getFullYear(), date.getMonth() + 1, 1))} aria-label="Next month">
                      {"\u203a"}
                    </button>
                  </div>
                  <div className="calendar-grid">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <div className="calendar-weekday" key={day}>{day}</div>
                    ))}
                    {calendarDays.map((day, index) =>
                      day.placeholder ? (
                        <button className="calendar-day is-placeholder" type="button" disabled key={`blank-${index}`} />
                      ) : (
                        <button
                          className={`calendar-day ${day.selected ? "is-selected" : ""}`}
                          type="button"
                          disabled={day.blocked}
                          onClick={() => {
                            setSelectedEventDate(day.isoDate);
                            setCalendarOpen(false);
                          }}
                          key={day.isoDate}
                        >
                          {day.label}
                        </button>
                      )
                    )}
                  </div>
                  <p className="calendar-note">Unavailable dates are crossed out and cannot be selected.</p>
                </div>
              </div>
              <input placeholder="Event Type" />
              <textarea placeholder="Tell us about your theme, colors, guest count, and what you need help with." />
              <Button type="submit">Submit Inquiry</Button>
            </form>
          </div>
        </section>

        <section id="contact">
          <div className="shell">
            <p className="eyebrow">Contact</p>
            <h2>Reach Grace & Gather Events</h2>
            <div className="contact-grid">
              <Card>
                <CardContent>
                  <Mail className="service-icon" />
                  <h3>Email</h3>
                  <p><a href="mailto:ggeventsep@gmail.com">ggeventsep@gmail.com</a></p>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <Phone className="service-icon" />
                  <h3>Phone</h3>
                  <p><a href="tel:+12817909997">281-790-9997</a></p>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <Instagram className="service-icon" />
                  <h3>Instagram</h3>
                  <p>@gracegathereventsep</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <MapPin className="service-icon" />
                  <h3>Location</h3>
                  <p>El Paso, Texas</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function PricingSheet({ title, rows }) {
  return (
    <div className="pricing-sheet">
      <h3>{title}</h3>
      {rows.map(([name, description, amount]) => (
        <div className="price-row" key={name}>
          <div>
            <strong>{name}</strong>
            <p>{description}</p>
          </div>
          <span className="amount">{amount}</span>
        </div>
      ))}
    </div>
  );
}

function toIsoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDisplayDate(isoDate) {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }).format(new Date(year, month - 1, day));
}

function buildCalendarDays(monthDate, blockedDates, selectedEventDate) {
  const days = [];
  const firstDay = monthDate.getDay();
  const daysInMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate();

  for (let index = 0; index < firstDay; index += 1) {
    days.push({ placeholder: true });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(monthDate.getFullYear(), monthDate.getMonth(), day);
    const isoDate = toIsoDate(date);
    days.push({
      blocked: blockedDates.has(isoDate),
      isoDate,
      label: day,
      selected: selectedEventDate === isoDate
    });
  }

  return days;
}
