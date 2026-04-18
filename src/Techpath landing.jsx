import { useState, useEffect, useRef } from "react";
import { useHeroCanvas } from "./HeroCanvas"; // adjust path as needed

// Speakers
import imgAbuHadhoud from "./assets/speakers/abu-hadhoud.jpg";
import imgDandis from "./assets/speakers/dandis.png";
import imgAlghwairi from "./assets/speakers/alghwairi.jpg";
// Panelists
import imgShannak from "./assets/panelists/shannak.jpg";
import imgGhnimat from "./assets/panelists/ghnimat.jpg";
import imgIsmail from "./assets/panelists/ismail.jpg";
// About
import imgIEEE_CS from "./assets/about/IEEE-CS-UJ-Branch.png";
import imgOutstanding from "./assets/about/Outstanding_Chapter.jpg";
import imgRegion_8 from "./assets/about/Region_8_Award.jpg";

// Group your imported images into a single array
const FILM_STRIP_IMAGES = [
  imgAbuHadhoud,
  imgDandis,
  imgAlghwairi,
  imgShannak,
  imgGhnimat,
  imgIsmail,
];

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

:root{
  --bg:#080300;
  --bg2:#0D0400;
  --bg3:#060200;
  --gold:#F5A623;
  --amber:#E8891A;
  --orange:#D4700A;
  --cream:#F5EDE0;
  --muted:#6B5A45;
  --border:rgba(245,166,35,0.1);
}

html,body{height:100%;overflow:hidden;}

.snap-wrap{
  height:100vh;
  overflow-y:scroll;
  scroll-snap-type:y mandatory;
  scroll-behavior:smooth;
  -webkit-overflow-scrolling:touch;
  background:var(--bg);
}
.snap-wrap::-webkit-scrollbar{display:none;}

/* Slow the snap itself via scroll-snap-stop */
.section{
  scroll-snap-align:start;
  scroll-snap-stop:always;
  min-height:100vh;
  position:relative;
  overflow:hidden;
  display:flex;
  align-items:center;
}

@supports (scroll-timeline: none) {
  .snap-wrap {
    scroll-timeline: --page-scroll block;
  }
}

.flip-card{perspective:1200px;}
.flip-inner{
  position:relative; width:100%; height:100%;
  transform-style:preserve-3d;
  transition:transform 0.75s cubic-bezier(.22,1,.36,1);
}
.flip-card:hover .flip-inner{transform:rotateY(180deg) scale(1.06);}
.flip-front,.flip-back{
  position:absolute; inset:0;
  backface-visibility:hidden;
  -webkit-backface-visibility:hidden;
  border-radius:18px;
  overflow:hidden;
}
.flip-back{transform:rotateY(180deg);}

/* ── HERO ANIMATIONS ── */
@keyframes letterDrop{
  0%{opacity:0;transform:translateY(80px) skewY(8deg);filter:blur(8px);}
  100%{opacity:1;transform:translateY(0) skewY(0);filter:blur(0);}
}
@keyframes fadeSlideUp{
  0%{opacity:0;transform:translateY(28px);}
  100%{opacity:1;transform:translateY(0);}
}
@keyframes scaleIn{
  0%{opacity:0;transform:scale(0.85);}
  100%{opacity:1;transform:scale(1);}
}
@keyframes goldPulse{
  0%,100%{text-shadow:0 0 30px rgba(245,166,35,0.25);}
  50%{text-shadow:0 0 80px rgba(245,166,35,0.6),0 0 140px rgba(232,137,26,0.3);}
}
@keyframes borderGrow{
  0%{width:0;}100%{width:100%;}
}
@keyframes scrollLine{
  0%{transform:scaleY(0);transform-origin:top;}
  50%{transform:scaleY(1);transform-origin:top;}
  51%{transform-origin:bottom;}
  100%{transform:scaleY(0);transform-origin:bottom;}
}

/* ── FILM STRIP ANIMATIONS ── */
@keyframes filmLeft{
  0%{transform:translateX(0);}
  100%{transform:translateX(-50%);}
}
@keyframes filmRight{
  0%{transform:translateX(-50%);}
  100%{transform:translateX(0);}
}
@keyframes txtLeft{
  0%{transform:translateX(0);}
  100%{transform:translateX(-50%);}
}
@keyframes txtRight{
  0%{transform:translateX(-50%);}
  100%{transform:translateX(0);}
}

.strip-left{animation:filmLeft 35s linear infinite;display:flex;width:max-content;}
.strip-right{animation:filmRight 35s linear infinite;display:flex;width:max-content;}
.txt-left{animation:txtLeft 22s linear infinite;display:flex;width:max-content;white-space:nowrap;}
.txt-right{animation:txtRight 22s linear infinite;display:flex;width:max-content;white-space:nowrap;}

/* ── REVEAL ANIMATIONS ── */
@keyframes revealUp{
  0%{opacity:0;transform:translateY(40px);filter:blur(3px);}
  100%{opacity:1;transform:translateY(0);filter:blur(0);}
}
@keyframes revealLeft{
  0%{opacity:0;transform:translateX(30px);}
  100%{opacity:1;transform:translateX(0);}
}
@keyframes expandCard{
  0%{opacity:0;transform:scale(0.4) rotate(-3deg);border-radius:50%;}
  70%{transform:scale(1.04) rotate(0.5deg);border-radius:20px;}
  100%{opacity:1;transform:scale(1) rotate(0);border-radius:18px;}
}
@keyframes lineExpand{
  0%{transform:scaleX(0);}
  100%{transform:scaleX(1);}
}

/* ── SCROLL INDICATOR ── */
@keyframes scrollBounce{
  0%,100%{transform:translateY(0);opacity:0.8;}
  50%{transform:translateY(10px);opacity:0.3;}
}
.scroll-dot{animation:scrollBounce 2.4s ease infinite;}

@media (max-width:768px){

  html,body{overflow:hidden;}

  /* Looser snap so tall sections don't trap the user */
  .snap-wrap{
    scroll-snap-type:y proximity;
    overflow-y:scroll;
  }

  /* Sections grow with content, no fixed viewport jail */
  .section{
    scroll-snap-align:start;
    scroll-snap-stop:normal;
    min-height:100vh;
    height:auto !important;
    overflow:visible;
    padding:60px 0 40px;
    align-items:flex-start;
  }

  /* All two-column grids collapse */
  .two-col{
    grid-template-columns:1fr !important;
    gap:28px !important;
  }

  /* Three-col keynotes already uses auto-fit — keep it */

  /* Hide the flip card cluster on mobile, show stacked list instead */
  .flip-cluster{ display:none !important; }
  .flip-mobile { display:flex !important; }

  .yazan-img { object-position: 10% 45% !important; }
}

/* ── HOVER STATES ── */
.cta-btn{
  transition:transform 0.25s ease,box-shadow 0.25s ease,background 0.25s ease;
  cursor:pointer;
}
.cta-btn:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(245,166,35,0.35);}

.ghost-btn{
  transition:all 0.25s ease;
  cursor:pointer;
}
.ghost-btn:hover{background:rgba(245,166,35,0.08);border-color:rgba(245,166,35,0.5);}

.card{transition:transform 0.3s ease,box-shadow 0.3s ease;}
.card:hover{
  transform:translateY(-6px);
  box-shadow:0 0 0 1px rgba(245,166,35,0.3),0 32px 80px rgba(0,0,0,0.6),0 8px 24px rgba(245,166,35,0.1);
}

.nav-link{
  transition:color 0.2s ease;
  cursor:pointer;
  font-family:'DM Sans',sans-serif;
  font-size:13px;
  letter-spacing:0.08em;
  text-transform:uppercase;
  color:var(--muted);
}
.nav-link:hover{color:var(--cream);}

.footer-link{
  transition:color 0.2s;
  cursor:pointer;
  color:var(--muted);
}
.footer-link:hover{color:var(--cream);}

.social-cell{
  transition:background 0.2s;
  cursor:pointer;
}
.social-cell:hover{background:rgba(245,166,35,0.04);}
`;

/* ─────────────────────────────────────── */
/*  HELPERS                                */
/* ─────────────────────────────────────── */
const useInView = (threshold = 0.3) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold },
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, visible];
};

const anim = (visible, delay = 0, extra = {}) => ({
  opacity: visible ? 1 : 0,
  transform: visible ? "translateY(0)" : "translateY(36px)",
  transition: `opacity 1s cubic-bezier(.22,1,.36,1) ${delay}s, transform 1s cubic-bezier(.22,1,.36,1) ${delay}s`,
  ...extra,
});

/* ─────────────────────────────────────── */
/*  1. HERO                                */
/* ─────────────────────────────────────── */
function Hero() {
  const [step, setStep] = useState(0);
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  useHeroCanvas(canvasRef, heroRef);

  useEffect(() => {
    const ts = [200, 400, 600, 800, 1000, 1200, 1600, 2100, 2600].map((ms, i) =>
      setTimeout(() => setStep(i + 1), ms),
    );
    return () => ts.forEach(clearTimeout);
  }, []);

  const T = ["T", "E", "C", "H"];
  const P = ["P", "A", "T", "H"];

  const letter = (char, idx, offset, gold) => (
    <span
      key={idx}
      style={{
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: "clamp(88px, 14vw, 180px)",
        lineHeight: 0.88,
        color: gold ? "var(--gold)" : "var(--cream)",
        display: "inline-block",
        opacity: step > idx + offset ? 1 : 0,
        transform:
          step > idx + offset
            ? "translateY(0) skewY(0)"
            : "translateY(80px) skewY(8deg)",
        filter: step > idx + offset ? "blur(0)" : "blur(8px)",
        transition: `all 0.7s cubic-bezier(.22,1,.36,1) ${idx * 0.06}s`,
        animation:
          gold && step > idx + offset ? "goldPulse 4s ease infinite" : "none",
      }}
    >
      {char}
    </span>
  );

  return (
    <section
      ref={heroRef}
      className="section"
      id="about"
      style={{
        justifyContent: "center",
        flexDirection: "column",
        background: "#120601",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
          display: "block",
        }}
      />

      {/* NAV */}
      <nav
        style={{
          flexWrap: "wrap",
          gap: 12,
          padding: "16px 20px",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          opacity: step >= 1 ? 1 : 0,
          transition: "opacity 1s ease 0.5s",
          zIndex: 10,
          borderBottom: "1px solid rgba(245,166,35,0.05)",
        }}
      >
        <div
          style={{
            fontFamily: "'Bebas Neue'",
            fontSize: 22,
            color: "var(--gold)",
            letterSpacing: "0.12em",
          }}
        >
          TECH PATH
        </div>
        <div
          style={{
            display: "flex",
            gap: 36,
            marginLeft: "auto",
            marginRight: 64,
          }}
        >
          {[
            { label: "About", id: "about" },
            { label: "Keynotes", id: "keynotes" },
            { label: "Panel", id: "panel" },
            { label: "Agenda", id: "agenda" },
          ].map(({ label, id }) => (
            <span
              key={label}
              className="nav-link"
              onClick={() => {
                document
                  .getElementById(id)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {label}
            </span>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 16px",
            borderRadius: 100,
            background: "rgba(245,166,35,0.06)",
            border: "1px solid rgba(245,166,35,0.18)",
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--gold)",
            }}
          />
          <span
            style={{
              fontFamily: "'DM Sans'",
              fontSize: 11,
              color: "var(--gold)",
              letterSpacing: "0.12em",
            }}
          >
            IEEE COMPUTER SOCIETY · UJ
          </span>
        </div>
      </nav>

      {/* MAIN TITLE */}
      <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {T.map((c, i) => letter(c, i, 0, i >= 2))}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {P.map((c, i) => letter(c, i, 2, i < 2))}
        </div>

        {step >= 7 && (
          <div
            style={{
              marginTop: 28,
              display: "flex",
              gap: 20,
              justifyContent: "center",
              animation: "fadeSlideUp 0.8s cubic-bezier(.22,1,.36,1) forwards",
            }}
          >
            <div
              style={{
                height: 1,
                width: 60,
                background:
                  "linear-gradient(to right, transparent, var(--gold))",
                alignSelf: "center",
              }}
            />
            <p
              style={{
                fontFamily: "'DM Sans'",
                fontSize: 12,
                color: "var(--muted)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              27 – 29 April 2026 · Online Webinar · 3 Days
            </p>
            <div
              style={{
                height: 1,
                width: 60,
                background:
                  "linear-gradient(to left, transparent, var(--gold))",
                alignSelf: "center",
              }}
            />
          </div>
        )}

        {step >= 8 && (
          <div
            style={{
              marginTop: 40,
              display: "flex",
              gap: 14,
              justifyContent: "center",
              animation: "fadeSlideUp 0.9s cubic-bezier(.22,1,.36,1) forwards",
            }}
          >
            <button
              className="cta-btn"
              style={{
                background: "var(--gold)",
                color: "#080300",
                fontFamily: "'Syne'",
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: "0.1em",
                padding: "14px 36px",
                borderRadius: 100,
                border: "none",
                textTransform: "uppercase",
              }}
            >
              Save My Spot
            </button>
            {/* <button
              className="ghost-btn"
              style={{
                background: "transparent",
                color: "var(--cream)",
                fontFamily: "'Syne'",
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: "0.1em",
                padding: "14px 36px",
                borderRadius: 100,
                border: "1px solid rgba(245,166,35,0.25)",
                textTransform: "uppercase",
              }}
            >
              Learn More
            </button> */}
          </div>
        )}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────── */
/*  2. FILM STRIP                          */
/* ─────────────────────────────────────── */
function FilmStrip() {
  const speakers = [
    {
      initials: "MA",
      name: "Mohammed Abu-Hadhoud",
      role: "Software Engineering",
      bg: "#1E0A00",
      img: imgAbuHadhoud,
    },
    {
      initials: "AD",
      name: "Aladdin Dandis",
      role: "Cybersecurity",
      bg: "#001209",
      img: imgDandis,
    },
    {
      initials: "AA",
      name: "Abdullah Alghwairi",
      role: "AI & Product",
      bg: "#0A0018",
      img: imgAlghwairi,
    },
    {
      initials: "YS",
      name: "Yazan Shannak",
      role: "AI Manager",
      bg: "#001820",
      img: imgShannak,
    },
    {
      initials: "AG",
      name: "Ahmed Ghnimat",
      role: "Cybersecurity Ops",
      bg: "#180010",
      img: imgGhnimat,
    },
    {
      initials: "OI",
      name: "Omar Ismail",
      role: "Tech Lead",
      bg: "#001800",
      img: imgIsmail,
    },
  ];
  const doubled = [...speakers, ...speakers, ...speakers];

  const Holes = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        padding: "7px 10px",
        background: "rgba(0,0,0,0.4)",
        gap: 4,
      }}
    >
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            width: 10,
            height: 16,
            borderRadius: 3,
            background: "#080300",
            border: "1px solid rgba(245,166,35,0.15)",
          }}
        />
      ))}
    </div>
  );

  const Card = ({ s }) => (
    <div
      style={{
        width: "clamp(130px, 22vw, 170px)",
        flexShrink: 0,
        marginRight: 10,
        border: "1px solid rgba(245,166,35,0.12)",
        borderRadius: 14,
        overflow: "hidden",
        background: s.bg,
      }}
    >
      <Holes />
      <div
        style={{
          height: 190,
          overflow: "hidden",
          position: "relative",
          background: `linear-gradient(160deg, ${s.bg}, #100400)`,
        }}
      >
        {s.img ? (
          <img
            src={s.img}
            alt={s.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "10% 50%",
              display: "block",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Bebas Neue'",
              fontSize: 26,
              color: "var(--gold)",
            }}
          >
            {s.initials}
          </div>
        )}
        {/* subtle bottom fade so name reads cleanly */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 60,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.75), transparent)",
            pointerEvents: "none",
          }}
        />
      </div>
      <Holes />
      <div style={{ padding: "10px 12px 14px" }}>
        <p
          style={{
            fontFamily: "'Syne'",
            fontWeight: 700,
            fontSize: 11,
            color: "var(--cream)",
          }}
        >
          {s.name}
        </p>
        <p
          style={{
            fontFamily: "'DM Sans'",
            fontSize: 10,
            color: "var(--gold)",
            marginTop: 3,
          }}
        >
          {s.role}
        </p>
      </div>
    </div>
  );

  const words = ["LECTURES", "WORKSHOPS", "KEYNOTES", "PANELS"];
  const wordsD = [...words, ...words, ...words, ...words];

  return (
    <section
      className="section"
      style={{
        background: "#050100",
        flexDirection: "column",
        justifyContent: "center",
        gap: 0,
      }}
    >
      <div style={{ overflow: "hidden", marginBottom: 12 }}>
        <div className="strip-left">
          {doubled.map((s, i) => (
            <Card key={i} s={s} />
          ))}
        </div>
      </div>

      <div
        style={{
          overflow: "hidden",
          padding: "14px 0",
          borderTop: "1px solid rgba(245,166,35,0.08)",
          borderBottom: "1px solid rgba(245,166,35,0.08)",
          marginBottom: 12,
        }}
      >
        <div className="txt-right">
          {wordsD.map((w, i) => (
            <span
              key={i}
              style={{
                fontFamily: "'Bebas Neue'",
                fontSize: "clamp(30px, 4vw, 52px)",
                color: i % 2 === 0 ? "var(--cream)" : "var(--gold)",
                marginRight: 36,
                display: "inline-block",
                letterSpacing: "0.04em",
              }}
            >
              {w}&nbsp;
              <span style={{ color: "var(--amber)", opacity: 0.7 }}>·</span>
            </span>
          ))}
        </div>
      </div>

      <div style={{ overflow: "hidden" }}>
        <div className="strip-right">
          {[...doubled].reverse().map((s, i) => (
            <Card key={i} s={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────── */
/*  3. ABOUT IEEE                          */
/* ─────────────────────────────────────── */
function AboutIEEE() {
  const [ref, v] = useInView(0.25);
  const stats = [
    { n: "420K+", l: "Members" },
    { n: "160+", l: "Countries" },
    { n: "Since 2017", l: "UJ Branch" },
  ];
  return (
    <section
      className="section"
      id="about"
      ref={ref}
      style={{ background: "var(--bg)" }}
    >
      <div
        className="two-col"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 56px)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Left text */}
        <div>
          <span
            style={{
              ...anim(v, 0),
              display: "block",
              fontFamily: "'DM Sans'",
              fontSize: 11,
              color: "var(--gold)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            About The Organization
          </span>
          <h2
            style={{
              ...anim(v, 0.12),
              fontFamily: "'Bebas Neue'",
              fontSize: "clamp(60px, 8vw, 100px)",
              color: "var(--cream)",
              lineHeight: 0.88,
              marginTop: 8,
            }}
          >
            ABOUT
            <br />
            <span style={{ color: "var(--gold)" }}>IEEE</span>
          </h2>
          <p
            style={{
              ...anim(v, 0.22),
              fontFamily: "'DM Sans'",
              color: "var(--muted)",
              fontSize: 15,
              lineHeight: 1.85,
              marginTop: 24,
            }}
          >
            The largest non-profit technical professionals organization in the
            world — dedicated to advancing technology for the benefit of
            humanity. The global trusted source for engineering & technology
            knowledge through research papers, conferences, and impactful
            activities.
          </p>
          <div style={{ display: "flex", gap: 44, marginTop: 40 }}>
            {stats.map((s, i) => (
              <div key={i} style={{ ...anim(v, 0.3 + i * 0.12) }}>
                <div
                  style={{
                    fontFamily: "'Bebas Neue'",
                    fontSize: 38,
                    color: "var(--gold)",
                    lineHeight: 1,
                  }}
                >
                  {s.n}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans'",
                    fontSize: 10,
                    color: "var(--muted)",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    marginTop: 4,
                  }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: asymmetric award cards */}
        {/* Right: 3D flip award cards */}
        {/* Desktop flip cards */}
        <div
          className="flip-cluster"
          style={{ position: "relative", height: 680 }}
        >
          {[
            {
              top: -10,
              left: "20%",
              w: 450,
              h: 380,
              rot: "-3deg",
              delay: 0.35,
              frontBg: "linear-gradient(145deg,#2A1500,#150800)",
              frontTitle: "CS",
              frontSub: "Computer Society",
              backImg: imgIEEE_CS,
              backTitle: "IEEE CS · UJ Branch",
              backDesc:
                "A student-led club dedicated to computer science and technology at the University of Jordan since 2017.",
            },
            {
              top: "auto",
              bottom: -10,
              right: -200,
              w: 300,
              h: 240,
              rot: "-1.5deg",
              delay: 0.65,
              frontBg: "linear-gradient(135deg,#1A1000,#0D0500)",
              frontTitle: "Outstanding Chapter",
              frontSub: "2023 · 1st in Middle East",
              backImg: imgOutstanding,
              backTitle: "Outstanding Chapter",
              backDesc:
                "First IEEE CS chapter in the Middle East to receive this honor.",
            },
            {
              top: "auto",
              bottom: 10,
              right: 280,
              w: 280,
              h: 260,
              rot: "1.5deg",
              delay: 0.65,
              frontBg: "linear-gradient(135deg,#100A00,#0D0500)",
              frontTitle: "Best Chapter Region 8",
              frontSub: "2024 · Bordeaux",
              backImg: imgRegion_8,
              backTitle: "Region 8 Award",
              backDesc:
                "Best Student Branch Chapter of the Year — IEEE Region 8, Bordeaux 2024.",
            },
          ].map((c, i) => (
            <div
              key={i}
              className="flip-card"
              style={{
                position: "absolute",
                top: c.top ?? undefined,
                bottom: c.bottom ?? undefined,
                left: c.left ?? undefined,
                right: c.right ?? undefined,
                width: c.w,
                height: c.h,
                transform: v
                  ? `rotate(${c.rot})`
                  : `translateY(40px) rotate(${c.rot})`,
                opacity: v ? 1 : 0,
                transition: `opacity 1s ease ${c.delay}s, transform 1s ease ${c.delay}s`,
              }}
            >
              <div className="flip-inner">
                <div
                  className="flip-front"
                  style={{
                    background: c.frontBg,
                    border: "1px solid rgba(245,166,35,0.14)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 20,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Bebas Neue'",
                      fontSize: i === 0 ? 72 : 22,
                      color: "var(--gold)",
                      textAlign: "center",
                      lineHeight: 1,
                    }}
                  >
                    {c.frontTitle}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans'",
                      fontSize: 11,
                      color: "var(--muted)",
                      textAlign: "center",
                      marginTop: 6,
                    }}
                  >
                    {c.frontSub}
                  </div>
                </div>
                <div
                  className="flip-back"
                  style={{
                    border: "1px solid rgba(245,166,35,0.22)",
                    background: "#0D0500",
                  }}
                >
                  <img
                    src={c.backImg}
                    alt={c.backTitle}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center top",
                      display: "block",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to bottom,rgba(0,0,0,0.1) 0%,rgba(8,3,0,0.6) 50%,rgba(8,3,0,0.92) 100%)",
                      pointerEvents: "none",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: 14,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "'Syne'",
                        fontWeight: 700,
                        fontSize: 12,
                        color: "var(--gold)",
                        marginBottom: 5,
                      }}
                    >
                      {c.backTitle}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans'",
                        fontSize: 11,
                        color: "rgba(245,235,220,0.75)",
                        lineHeight: 1.65,
                      }}
                    >
                      {c.backDesc}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile stacked cards — hidden on desktop */}
        <div
          className="flip-mobile"
          style={{
            display: "none",
            flexDirection: "column",
            gap: 14,
            width: "100%",
          }}
        >
          {[
            {
              img: imgIEEE_CS,
              title: "IEEE CS · UJ Branch",
              sub: "Student-led club at University of Jordan since 2017.",
            },
            {
              img: imgOutstanding,
              title: "Outstanding Chapter 2023",
              sub: "1st in the Middle East to receive this honor.",
            },
            {
              img: imgRegion_8,
              title: "Best Chapter Region 8",
              sub: "IEEE Region 8 Award — Bordeaux, France 2024.",
            },
          ].map((c, i) => (
            <div
              key={i}
              style={{
                borderRadius: 16,
                overflow: "hidden",
                position: "relative",
                height: 180,
                border: "1px solid rgba(245,166,35,0.14)",
                opacity: v ? 1 : 0,
                transform: v ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.8s ease ${0.2 + i * 0.15}s`,
              }}
            >
              <img
                src={c.img}
                alt={c.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to bottom,transparent 30%,rgba(8,3,0,0.92) 100%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: "12px 14px",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Syne'",
                    fontWeight: 700,
                    fontSize: 13,
                    color: "var(--gold)",
                  }}
                >
                  {c.title}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans'",
                    fontSize: 11,
                    color: "rgba(245,235,220,0.75)",
                    marginTop: 3,
                    lineHeight: 1.5,
                  }}
                >
                  {c.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────── */
/*  4. IEEE CS UJ BRANCH  (balanced-sound reveal) */
/* ─────────────────────────────────────── */
function IEEEBranch() {
  const [ref, v] = useInView(0.25);
  const goals = [
    {
      n: "01",
      title: "Hands-On Exposure",
      desc: "Provide our volunteers with hands-on exposure to their respective fields.",
    },
    {
      n: "02",
      title: "Extensive Network",
      desc: "Establish an extensive network of connections for our volunteers.",
    },
    {
      n: "03",
      title: "Community Enhancement",
      desc: "Enhance the organization and usability of the community for our volunteers.",
    },
    {
      n: "04",
      title: "Skills Development",
      desc: "Foster the development and enhancement of their technical and soft skills.",
    },
  ];
  return (
    <section className="section" style={{ background: "var(--bg2)" }} ref={ref}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 56px)",
          width: "100%",
        }}
      >
        <span
          style={{
            ...anim(v, 0),
            display: "block",
            fontFamily: "'DM Sans'",
            fontSize: 11,
            color: "var(--gold)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          IEEE Computer Society · UJ Branch · Est. 2017
        </span>
        <div
          className="two-col"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            alignItems: "start",
          }}
        >
          {/* Left */}
          <div>
            <h2
              style={{
                ...anim(v, 0.1),
                fontFamily: "'Bebas Neue'",
                fontSize: "clamp(48px, 6vw, 80px)",
                color: "var(--cream)",
                lineHeight: 0.88,
              }}
            >
              OUR
              <br />
              <span style={{ color: "var(--gold)" }}>VISION</span>
              <br />
              &amp; GOALS
            </h2>
            <p
              style={{
                ...anim(v, 0.22),
                fontFamily: "'DM Sans'",
                color: "var(--muted)",
                fontSize: 15,
                lineHeight: 1.85,
                marginTop: 22,
              }}
            >
              We envision a bridge between students and the business industry —
              empowering students with knowledge, skills, and connections to
              facilitate a seamless transition into the professional world.
            </p>
            <div
              style={{
                ...anim(v, 0.36),
                marginTop: 28,
                padding: "18px 20px",
                borderLeft: "3px solid var(--gold)",
                background: "rgba(245,166,35,0.04)",
                borderRadius: "0 12px 12px 0",
              }}
            >
              <p
                style={{
                  fontFamily: "'Syne'",
                  fontWeight: 700,
                  color: "var(--cream)",
                  fontSize: 14,
                  lineHeight: 1.6,
                  fontStyle: "italic",
                }}
              >
                "IEEE is the catalyst that fills the gap, propelling students
                towards limitless potential."
              </p>
            </div>
          </div>

          {/* Right: balanced-sound style list */}
          <div>
            {goals.map((g, i) => (
              <div
                key={i}
                style={{
                  padding: "20px 0",
                  borderTop: "1px solid rgba(245,166,35,0.1)",
                  display: "grid",
                  gridTemplateColumns: "42px 1fr",
                  gap: 18,
                  opacity: v ? 1 : 0,
                  transform: v ? "translateX(0)" : "translateX(28px)",
                  transition: `all 0.85s cubic-bezier(.22,1,.36,1) ${0.28 + i * 0.14}s`,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Bebas Neue'",
                    fontSize: 30,
                    color: "rgba(245,166,35,0.25)",
                    lineHeight: 1,
                  }}
                >
                  {g.n}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Syne'",
                      fontWeight: 700,
                      color: "var(--cream)",
                      fontSize: 14,
                      marginBottom: 5,
                    }}
                  >
                    {g.title}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans'",
                      color: "var(--muted)",
                      fontSize: 13,
                      lineHeight: 1.7,
                    }}
                  >
                    {g.desc}
                  </div>
                </div>
              </div>
            ))}
            <div
              style={{
                borderTop: "1px solid rgba(245,166,35,0.1)",
                opacity: v ? 1 : 0,
                transition: "opacity 1s ease 1s",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────── */
/*  5. ABOUT THE EVENT                     */
/* ─────────────────────────────────────── */
function AboutEvent() {
  const [ref, v] = useInView(0.25);
  const details = [
    { icon: "◈", label: "Format", value: "Online Webinar" },
    { icon: "◷", label: "Duration", value: "3 Hours / Session" },
    { icon: "◉", label: "Days", value: "27 – 29 April 2026" },
    { icon: "◈", label: "Access", value: "Free · Open To All" },
  ];
  return (
    <section className="section" style={{ background: "var(--bg)" }} ref={ref}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 56px)",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 40,
          }}
        >
          <span
            style={{
              ...anim(v, 0),
              fontFamily: "'DM Sans'",
              fontSize: 11,
              color: "var(--gold)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            Event Overview
          </span>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[
              "27 Apr · Cybersecurity",
              "28 Apr · AI",
              "29 Apr · Software Eng.",
            ].map((t, i) => (
              <span
                key={i}
                style={{
                  ...anim(v, 0.1 + i * 0.08),
                  fontFamily: "'DM Sans'",
                  fontSize: 11,
                  color: "var(--gold)",
                  padding: "5px 14px",
                  borderRadius: 100,
                  background: "rgba(245,166,35,0.07)",
                  border: "1px solid rgba(245,166,35,0.2)",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div
          className="two-col"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            alignItems: "center",
          }}
        >
          <div>
            <h2
              style={{
                ...anim(v, 0.15),
                fontFamily: "'Bebas Neue'",
                fontSize: "clamp(52px, 7vw, 88px)",
                color: "var(--cream)",
                lineHeight: 0.88,
              }}
            >
              ABOUT
              <br />
              THE <span style={{ color: "var(--gold)" }}>EVENT</span>
            </h2>
            <p
              style={{
                ...anim(v, 0.26),
                fontFamily: "'DM Sans'",
                color: "var(--muted)",
                fontSize: 15,
                lineHeight: 1.85,
                marginTop: 26,
              }}
            >
              A 3-day online webinar series designed to introduce participants
              to three major IT fields in a clear and practical way. Each day
              features a dedicated 3-hour session led by an industry expert.
            </p>
            <p
              style={{
                ...anim(v, 0.34),
                fontFamily: "'DM Sans'",
                color: "var(--muted)",
                fontSize: 15,
                lineHeight: 1.85,
                marginTop: 14,
              }}
            >
              The series concludes with a panel discussion on the IT job market,
              offering real insights into career opportunities, required skills,
              and what employers actually look for in 2026.
            </p>
          </div>

          <div
            className="two-col"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
          >
            {details.map((d, i) => (
              <div
                key={i}
                className="card"
                style={{
                  padding: 24,
                  borderRadius: 18,
                  background: "rgba(245,166,35,0.04)",
                  border: "1px solid rgba(245,166,35,0.1)",
                  ...anim(v, 0.28 + i * 0.12),
                }}
              >
                <div
                  style={{
                    fontFamily: "'Bebas Neue'",
                    fontSize: 28,
                    color: "var(--gold)",
                    opacity: 0.5,
                    lineHeight: 1,
                    marginBottom: 10,
                  }}
                >
                  {d.icon}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans'",
                    fontSize: 10,
                    color: "var(--gold)",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    marginBottom: 5,
                  }}
                >
                  {d.label}
                </div>
                <div
                  style={{
                    fontFamily: "'Syne'",
                    fontWeight: 700,
                    color: "var(--cream)",
                    fontSize: 14,
                  }}
                >
                  {d.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────── */
/*  6. KEYNOTES                            */
/* ─────────────────────────────────────── */
function Keynotes() {
  const [ref, v] = useInView(0.2);
  const [hovered, setHovered] = useState(null);

  const kn = [
    {
      n: "01",
      field: "Software Engineering",
      title: "From Idea to System",
      sub: "Understanding Software Engineering and How to Learn It.",
      speaker: "Mohammed Abu-Hadhoud",
      initials: "MA",
      img: imgAbuHadhoud,
      imgPosition: "center top",
      bio: "Jordanian software engineer, entrepreneur & educator with 25+ years in software development, project management, and IT solutions. Founder & CEO of Programming Advices and Epya Solutions.",
      bg: "linear-gradient(145deg,#2A1200,#0D0500)",
      hoverBg: "linear-gradient(145deg,#4A2800,#2A1000)",
      accent: "#E8891A",
      extra:
        "Specializes in teaching students how to build real-world systems from scratch — from requirements analysis to deployment. His YouTube channel has helped hundreds of thousands across the Arab world.",
    },
    {
      n: "02",
      field: "Cybersecurity",
      title: "Inside Cybersecurity",
      sub: "Understanding Attacks, Defense, and How to Learn It.",
      speaker: "Aladdin Dandis",
      initials: "AD",
      img: imgDandis,
      imgPosition: "10% 40%",
      bio: "Jordan-based cybersecurity consultant, educator & technology leader with 25+ years in information security across government and private sectors.",
      bg: "linear-gradient(145deg,#00180A,#050300)",
      hoverBg: "linear-gradient(145deg,#003A18,#001A08)",
      accent: "#2ECC71",
      extra:
        "Worked extensively with CIRT teams and national cybersecurity frameworks. Trains professionals in ethical hacking, risk management, and ISO 27001 compliance.",
    },
    {
      n: "03",
      field: "Artificial Intelligence",
      title: "From Data to Decisions",
      sub: "Understanding AI and How to Learn It.",
      speaker: "Abdullah Alghwairi",
      initials: "AA",
      img: imgAlghwairi,
      imgPosition: "10% 40%",
      bio: "AI professional & product leader with 10+ years at the intersection of AI, business, and product management. Currently leads initiatives at Kernel for AI.",
      bg: "linear-gradient(145deg,#0D0022,#060200)",
      hoverBg: "linear-gradient(145deg,#220044,#100018)",
      accent: "#9B59B6",
      extra:
        "Bridges the gap between technical AI research and real product outcomes. Advises startups on AI adoption strategies and has launched multiple AI-powered SaaS products in the MENA region.",
    },
  ];

  return (
    <section
      className="section"
      id="keynotes"
      style={{ background: "var(--bg3)" }}
      ref={ref}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 56px)",
          width: "100%",
        }}
      >
        <div style={{ ...anim(v, 0), marginBottom: 40 }}>
          <span
            style={{
              fontFamily: "'DM Sans'",
              fontSize: 11,
              color: "var(--gold)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            Event Program
          </span>
          <h2
            style={{
              fontFamily: "'Bebas Neue'",
              fontSize: "clamp(48px, 6vw, 72px)",
              color: "var(--cream)",
              lineHeight: 0.88,
              marginTop: 6,
            }}
          >
            KEYNOTE <span style={{ color: "var(--gold)" }}>SESSIONS</span>
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 18,
          }}
        >
          {kn.map((k, i) => {
            const isHov = hovered === i;
            return (
              <div
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: isHov ? k.hoverBg : k.bg,
                  borderRadius: 20,
                  border: `1px solid ${isHov ? k.accent + "55" : "rgba(245,166,35,0.12)"}`,
                  padding: "28px",
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                  transform: isHov
                    ? "translateY(-8px) scale(1.015)"
                    : "translateY(0) scale(1)",
                  boxShadow: isHov
                    ? `0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px ${k.accent}33, 0 8px 30px ${k.accent}22`
                    : "none",
                  transition: "all 0.55s cubic-bezier(.22,1,.36,1)",
                  ...anim(v, 0.18 + i * 0.14),
                }}
              >
                {/* Accent glow on hover */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${k.accent}18 0%, transparent 70%)`,
                    opacity: isHov ? 1 : 0,
                    transition: "opacity 0.55s ease",
                  }}
                />

                {/* Big number watermark */}
                <div
                  style={{
                    position: "absolute",
                    top: 14,
                    right: 18,
                    fontFamily: "'Bebas Neue'",
                    fontSize: 60,
                    lineHeight: 1,
                    color: isHov ? k.accent + "22" : "rgba(245,166,35,0.06)",
                    pointerEvents: "none",
                    transition: "color 0.55s ease",
                  }}
                >
                  {k.n}
                </div>

                {/* Speaker image — large, grayscale → color on hover */}
                <div
                  style={{
                    width: "100%",
                    height: 200,
                    borderRadius: 14,
                    overflow: "hidden",
                    marginBottom: 18,
                    flexShrink: 0,
                    position: "relative",
                  }}
                >
                  {k.img ? (
                    <img
                      src={k.img}
                      alt={k.speaker}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: k.imgPosition ?? "center top",
                        filter: isHov
                          ? "grayscale(0%) brightness(1)"
                          : "grayscale(100%) brightness(0.55)",
                        transform: isHov ? "scale(1.05)" : "scale(1)",
                        transition: "filter 0.65s ease, transform 0.65s ease",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(245,166,35,0.08)",
                        fontFamily: "'Bebas Neue'",
                        fontSize: 42,
                        color: isHov ? k.accent : "var(--gold)",
                        transition: "color 0.45s ease",
                      }}
                    >
                      {k.initials}
                    </div>
                  )}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: isHov ? "transparent" : "rgba(8,3,0,0.35)",
                      transition: "background 0.65s ease",
                      pointerEvents: "none",
                    }}
                  />
                </div>

                <span
                  style={{
                    fontFamily: "'DM Sans'",
                    fontSize: 10,
                    color: isHov ? k.accent : "var(--gold)",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    transition: "color 0.45s ease",
                  }}
                >
                  {k.field}
                </span>

                <h3
                  style={{
                    fontFamily: "'Syne'",
                    fontWeight: 800,
                    fontSize: 18,
                    color: "var(--cream)",
                    margin: "8px 0 5px",
                  }}
                >
                  {k.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans'",
                    fontSize: 12,
                    color: isHov ? k.accent + "CC" : "rgba(245,166,35,0.75)",
                    marginBottom: 16,
                    lineHeight: 1.5,
                    transition: "color 0.45s ease",
                  }}
                >
                  {k.sub}
                </p>

                <div
                  style={{
                    height: 1,
                    background: isHov
                      ? k.accent + "44"
                      : "rgba(245,166,35,0.08)",
                    marginBottom: 16,
                    transition: "background 0.45s ease",
                  }}
                />

                <p
                  style={{
                    fontFamily: "'Syne'",
                    fontWeight: 700,
                    color: "var(--cream)",
                    fontSize: 14,
                  }}
                >
                  {k.speaker}
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans'",
                    fontSize: 12,
                    color: "var(--muted)",
                    marginTop: 8,
                    lineHeight: 1.75,
                  }}
                >
                  {k.bio}
                </p>

                {/* Expanded content on hover */}
                <div
                  style={{
                    maxHeight: isHov ? "120px" : "0px",
                    overflow: "hidden",
                    opacity: isHov ? 1 : 0,
                    transition:
                      "max-height 0.55s cubic-bezier(.22,1,.36,1), opacity 0.4s ease 0.1s",
                    marginTop: isHov ? 16 : 0,
                  }}
                >
                  <div
                    style={{
                      height: 1,
                      background: k.accent + "33",
                      marginBottom: 14,
                    }}
                  />
                  <p
                    style={{
                      fontFamily: "'DM Sans'",
                      fontSize: 12,
                      color: "rgba(245,235,220,0.65)",
                      lineHeight: 1.8,
                    }}
                  >
                    {k.extra}
                  </p>
                </div>

                {/* Hover hint */}
                <div
                  style={{
                    marginTop: 16,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    opacity: isHov ? 0 : 0.4,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  <div
                    style={{ width: 14, height: 1, background: "var(--gold)" }}
                  />
                  <span
                    style={{
                      fontFamily: "'DM Sans'",
                      fontSize: 10,
                      color: "var(--gold)",
                      letterSpacing: "0.12em",
                    }}
                  >
                    HOVER FOR MORE
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────── */
/*  7. PANEL  (expanding box / bento)      */
/* ─────────────────────────────────────── */
function Panel() {
  const [ref, v] = useInView(0.22);

  const panelists = [
    {
      initials: "YS",
      img: imgShannak,
      imgPosition: "center top",
      name: "Yazan Shannak",
      role: "AI Manager · Revest",
      desc: "Specializes in AI-powered solutions and real-world applications. Master's in Data Science from UJ.",
      bg: "linear-gradient(160deg,#1A1000,#0D0500)",
    },
    {
      initials: "AG",
      img: imgGhnimat,
      imgPosition: "center top",
      name: "Ahmed Ghnimat",
      role: "Cybersecurity Ops Manager · JODDB",
      desc: "15+ years in IT and security. Specializes in incident response, security operations, and building secure enterprise systems.",
      bg: "linear-gradient(160deg,#001510,#0D0500)",
    },
    {
      initials: "OI",
      img: imgIsmail,
      imgPosition: "center top",
      name: "Omar Ismail",
      role: "Tech Lead · Digitinary",
      desc: "Leads digital banking and Open Banking solutions with deep expertise in Java, Spring Boot, and AWS across fintech environments.",
      bg: "linear-gradient(160deg,#0A0015,#0D0500)",
    },
  ];

  const cardAnim = (i) => ({
    opacity: v ? 1 : 0,
    transform: v ? "scale(1)" : "scale(0.5)",
    transition: `opacity 0.9s cubic-bezier(.34,1.56,.64,1) ${0.28 + i * 0.14}s, transform 0.9s cubic-bezier(.34,1.56,.64,1) ${0.28 + i * 0.14}s`,
  });

  return (
    <section
      className="section"
      id="panel"
      style={{ background: "var(--bg)" }}
      ref={ref}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 56px)",
          width: "100%",
        }}
      >
        <div
          className="two-col"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            alignItems: "center",
          }}
        >
          {/* Left — text */}
          <div>
            <span
              style={{
                ...anim(v, 0),
                display: "block",
                fontFamily: "'DM Sans'",
                fontSize: 11,
                color: "var(--gold)",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              Panel Discussion
            </span>
            <h2
              style={{
                ...anim(v, 0.1),
                fontFamily: "'Bebas Neue'",
                fontSize: "clamp(44px, 5.5vw, 68px)",
                color: "var(--cream)",
                lineHeight: 0.9,
              }}
            >
              THE IT JOB MARKET IN 2026:
              <br />
              <span style={{ color: "var(--gold)" }}>SKILLS, REALITY</span>
              <br />
              &amp; OPPORTUNITIES
            </h2>
            <p
              style={{
                ...anim(v, 0.22),
                fontFamily: "'DM Sans'",
                color: "var(--muted)",
                fontSize: 15,
                lineHeight: 1.85,
                marginTop: 22,
              }}
            >
              Industry experts will explore the current and future state of the
              IT job market — focusing on skills truly in demand, the reality of
              different tech fields, and real opportunities for students and
              fresh graduates.
            </p>
            <div
              style={{
                ...anim(v, 0.32),
                marginTop: 28,
                padding: "14px 18px",
                borderRadius: 12,
                background: "rgba(245,166,35,0.05)",
                border: "1px solid rgba(245,166,35,0.12)",
              }}
            >
              <p
                style={{
                  fontFamily: "'DM Sans'",
                  fontSize: 13,
                  color: "var(--muted)",
                }}
              >
                After completing the three keynote sessions, participants join a
                moderated panel to get real-world hiring insights.
              </p>
            </div>
          </div>

          {/* Right — bento cards */}
          <div
            className="two-col"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
          >
            {/* Tall left card — first panelist */}
            <div
              className="card panel-tall"
              style={{
                gridRow: "1 / 3",
                borderRadius: 20,
                border: "1px solid rgba(245,166,35,0.14)",
                height: window.innerWidth < 768 ? "auto" : 574,
                minHeight: 280,
                overflow: "hidden",
                position: "relative",
                background: panelists[0].bg,
                ...cardAnim(0),
              }}
            >
              {panelists[0].img && (
                <img
                  src={panelists[0].img}
                  alt={panelists[0].name}
                  className="yazan-img"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: panelists[0].imgPosition ?? "center top",
                    display: "block",
                  }}
                />
              )}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(8,3,0,0.55) 55%, rgba(8,3,0,0.92) 100%)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "22px 20px",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Bebas Neue'",
                    fontSize: 44,
                    color: "var(--gold)",
                    lineHeight: 1,
                    marginBottom: 6,
                  }}
                >
                  {panelists[0].initials}
                </div>
                <div
                  style={{
                    fontFamily: "'Syne'",
                    fontWeight: 700,
                    color: "var(--cream)",
                    fontSize: 14,
                  }}
                >
                  {panelists[0].name}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans'",
                    fontSize: 11,
                    color: "var(--gold)",
                    marginTop: 3,
                  }}
                >
                  {panelists[0].role}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans'",
                    fontSize: 11,
                    color: "rgba(220,210,195,0.9)",
                    marginTop: 8,
                    lineHeight: 1.65,
                  }}
                >
                  {panelists[0].desc}
                </div>
              </div>
            </div>

            {/* Two smaller right cards */}
            {panelists.slice(1).map((p, i) => (
              <div
                key={i}
                className="card"
                style={{
                  borderRadius: 18,
                  border: "1px solid rgba(245,166,35,0.12)",
                  height: 280,
                  overflow: "hidden",
                  position: "relative",
                  background: p.bg,
                  ...cardAnim(i + 1),
                }}
              >
                {p.img && (
                  <img
                    src={p.img}
                    alt={p.name}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: p.imgPosition ?? "center top",
                      display: "block",
                    }}
                  />
                )}
                {/* Stronger scrim for legibility */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 40%, rgba(8,3,0,0.96) 75%, rgba(8,3,0,1) 100%)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "relative",
                    zIndex: 1,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    padding: "18px 18px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Bebas Neue'",
                      fontSize: 28,
                      color: "var(--gold)",
                      lineHeight: 1,
                    }}
                  >
                    {p.initials}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Syne'",
                      fontWeight: 700,
                      color: "#FFFFFF",
                      fontSize: 14,
                      marginTop: 6,
                    }}
                  >
                    {p.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans'",
                      fontSize: 11,
                      color: "var(--gold)",
                      marginTop: 3,
                      fontWeight: 600,
                    }}
                  >
                    {p.role}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans'",
                      fontSize: 11,
                      color: "rgba(220,210,195,0.9)",
                      marginTop: 7,
                      lineHeight: 1.65,
                    }}
                  >
                    {p.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
/* ─────────────────────────────────────── */
/*  8. AGENDA                              */
/* ─────────────────────────────────────── */
function Agenda() {
  const [ref, v] = useInView(0.2);

  const days = [
    {
      date: "27 April 2026",
      label: "Day 1",
      field: "Cybersecurity",
      color: "#2ECC71",
      items: [
        { time: "5:00 – 5:15 PM", title: "Opening & Welcome", type: "open" },
        {
          time: "5:15 – 6:45 PM",
          title: "Cybersecurity Keynote",
          sub: "Aladdin Dandis · incl. Q&A",
          type: "key",
        },
        { time: "6:45 – 7:00 PM", title: "Break", type: "brk" },
        {
          time: "7:00 – 8:00 PM",
          title: "Panel: IT Job Market 2026",
          sub: "Skills, Reality & Opportunities",
          type: "pnl",
        },
        { time: "8:00 – 8:15 PM", title: "Closing & Q&A", type: "cls" },
      ],
    },
    {
      date: "28 April 2026",
      label: "Day 2",
      field: "Artificial Intelligence",
      color: "#9B59B6",
      items: [
        { time: "5:00 – 5:10 PM", title: "Day 2 Opening", type: "open" },
        {
          time: "5:10 – 6:40 PM",
          title: "AI Keynote",
          sub: "Abdullah Alghwairi · incl. Q&A",
          type: "key",
        },
        { time: "6:40 – 6:55 PM", title: "Break", type: "brk" },
        {
          time: "6:55 – 7:45 PM",
          title: "Kahoot Activity + Discussion",
          type: "act",
        },
        { time: "7:45 – 8:00 PM", title: "Closing", type: "cls" },
      ],
    },
    {
      date: "29 April 2026",
      label: "Day 3",
      field: "Software Engineering",
      color: "#E8891A",
      items: [
        { time: "5:00 – 5:10 PM", title: "Day 3 Opening", type: "open" },
        {
          time: "5:10 – 6:40 PM",
          title: "Software Engineering Keynote",
          sub: "Mohammed Abu-Hadhoud · incl. Q&A",
          type: "key",
        },
        { time: "6:40 – 6:55 PM", title: "Break", type: "brk" },
        { time: "6:55 – 7:45 PM", title: "Open Q&A + Networking", type: "pnl" },
        {
          time: "7:45 – 8:00 PM",
          title: "Series Closing Ceremony",
          type: "cls",
        },
      ],
    },
  ];

  const tc = {
    open: "#F5A623",
    key: "#E8891A",
    brk: "#4A3C2A",
    act: "#4CAF7B",
    pnl: "#FF6B35",
    cls: "#F5A623",
  };

  return (
    <section
      className="section"
      id="agenda"
      ref={ref}
      style={{ background: "var(--bg2)" }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 56px)",
          width: "100%",
        }}
      >
        <div style={{ ...anim(v, 0), marginBottom: 36 }}>
          <span
            style={{
              fontFamily: "'DM Sans'",
              fontSize: 11,
              color: "var(--gold)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            27 – 29 April 2026
          </span>
          <h2
            style={{
              fontFamily: "'Bebas Neue'",
              fontSize: "clamp(48px, 6vw, 72px)",
              color: "var(--cream)",
              lineHeight: 0.88,
              marginTop: 6,
            }}
          >
            EVENT <span style={{ color: "var(--gold)" }}>AGENDA</span>
          </h2>
        </div>

        <div
          className="two-col"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 18,
          }}
        >
          {days.map((day, di) => (
            <div
              key={di}
              style={{
                borderRadius: 16,
                border: `1px solid ${day.color}22`,
                background: "rgba(245,166,35,0.02)",
                overflow: "hidden",
                opacity: v ? 1 : 0,
                transform: v ? "translateY(0)" : "translateY(24px)",
                transition: `all 0.8s ease ${0.1 + di * 0.14}s`,
              }}
            >
              {/* Day header */}
              <div
                style={{
                  padding: "14px 18px",
                  borderBottom: `1px solid ${day.color}22`,
                  background: `${day.color}08`,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Bebas Neue'",
                    fontSize: 11,
                    color: day.color,
                    letterSpacing: "0.2em",
                  }}
                >
                  {day.label}
                </div>
                <div
                  style={{
                    fontFamily: "'Syne'",
                    fontWeight: 700,
                    color: "var(--cream)",
                    fontSize: 15,
                    marginTop: 2,
                  }}
                >
                  {day.field}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans'",
                    fontSize: 11,
                    color: "var(--muted)",
                    marginTop: 2,
                  }}
                >
                  {day.date}
                </div>
              </div>

              {/* Items */}
              <div style={{ padding: "10px 0" }}>
                {day.items.map((item, ii) => (
                  <div
                    key={ii}
                    style={{
                      display: "flex",
                      gap: 14,
                      padding: "10px 18px",
                      alignItems: "flex-start",
                      borderBottom:
                        ii < day.items.length - 1
                          ? "1px solid rgba(245,166,35,0.05)"
                          : "none",
                    }}
                  >
                    <div
                      style={{
                        width: 3,
                        borderRadius: 2,
                        background: tc[item.type],
                        flexShrink: 0,
                        alignSelf: "stretch",
                        minHeight: 20,
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontFamily: "'DM Sans'",
                          fontSize: 10,
                          color: "var(--muted)",
                          marginBottom: 2,
                        }}
                      >
                        {item.time}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Syne'",
                          fontWeight: 700,
                          color: "var(--cream)",
                          fontSize: 13,
                        }}
                      >
                        {item.title}
                      </div>
                      {item.sub && (
                        <div
                          style={{
                            fontFamily: "'DM Sans'",
                            fontSize: 11,
                            color: tc[item.type],
                            marginTop: 2,
                            lineHeight: 1.4,
                          }}
                        >
                          {item.sub}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────── */
/*  9. OUTCOMES  (balanced-sound reveal)   */
/* ─────────────────────────────────────── */
function Outcomes() {
  const [ref, v] = useInView(0.25);
  const items = [
    {
      glyph: "◈",
      title: "Improved Understanding",
      desc: "Improved understanding of major IT fields — Software Engineering, Cybersecurity & AI — among all participants.",
    },
    {
      glyph: "◉",
      title: "Clear Direction",
      desc: "Clear direction for students to choose their preferred field and plan their learning journey.",
    },
    {
      glyph: "◷",
      title: "Market Awareness",
      desc: "Better awareness of required skills, job market realities, and what employers actually look for.",
    },
    {
      glyph: "◈",
      title: "Increased Motivation",
      desc: "Increased motivation to start learning, building, and taking first steps toward a tech career.",
    },
  ];
  return (
    <section
      className="section"
      id="outcomes"
      style={{ background: "var(--bg)" }}
      ref={ref}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 56px)",
          width: "100%",
        }}
      >
        <div style={{ ...anim(v, 0), textAlign: "center", marginBottom: 52 }}>
          <span
            style={{
              fontFamily: "'DM Sans'",
              fontSize: 11,
              color: "var(--gold)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            What You Will Gain
          </span>
          <h2
            style={{
              fontFamily: "'Bebas Neue'",
              fontSize: "clamp(56px, 7vw, 88px)",
              color: "var(--cream)",
              lineHeight: 0.88,
              marginTop: 8,
            }}
          >
            EVENT <span style={{ color: "var(--gold)" }}>OUTCOMES</span>
          </h2>
        </div>
        <div
          className="two-col"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0 60px",
          }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                padding: "26px 0",
                borderTop: "1px solid rgba(245,166,35,0.1)",
                display: "grid",
                gridTemplateColumns: "50px 1fr",
                gap: 18,
                alignItems: "start",
                opacity: v ? 1 : 0,
                transform: v ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.9s cubic-bezier(.22,1,.36,1) ${0.18 + i * 0.14}s`,
              }}
            >
              <div
                style={{
                  fontFamily: "'Bebas Neue'",
                  fontSize: 32,
                  color: "var(--gold)",
                  opacity: 0.4,
                  lineHeight: 1,
                }}
              >
                {item.glyph}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "'Syne'",
                    fontWeight: 700,
                    color: "var(--cream)",
                    fontSize: 16,
                    marginBottom: 8,
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    fontFamily: "'DM Sans'",
                    color: "var(--muted)",
                    fontSize: 14,
                    lineHeight: 1.8,
                  }}
                >
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
          {[0, 1].map((i) => (
            <div
              key={i}
              style={{
                borderTop: "1px solid rgba(245,166,35,0.1)",
                opacity: v ? 1 : 0,
                transition: `opacity 0.8s ease ${0.9 + i * 0.08}s`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────── */
/*  10. FOOTER (ConnectSphere style)       */
/* ─────────────────────────────────────── */
function Footer() {
  const socials = [
    {
      name: "Instagram",
      handle: "@ieee.cs.uj",
      url: "https://www.instagram.com/ieee.cs.uj/",
    },
    {
      name: "LinkedIn",
      handle: "@IEEE CS UJ",
      url: "https://www.linkedin.com/in/ieee-computer-society-uj-3bb5a3258/",
    },
    {
      name: "Facebook",
      handle: "@IEEECSJU",
      url: "https://www.facebook.com/IEEECSJU",
    },
  ];

  const sections = [
    { label: "About IEEE", id: "about" },
    { label: "Keynotes", id: "keynotes" },
    { label: "Panel", id: "panel" },
    { label: "Agenda", id: "agenda" },
    { label: "Outcomes", id: "outcomes" },
  ];

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      className="section"
      style={{
        background: "#040100",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 clamp(20px, 5vw, 48px)",
          display: "flex",
          flexDirection: "column",
          gap: 0,
        }}
      >
        {/* Top — brand + nav + socials */}
        <div
          className="two-col"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 48,
            paddingBottom: 40,
            borderBottom: "1px solid rgba(245,166,35,0.08)",
            alignItems: "start",
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: "var(--gold)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Bebas Neue'",
                  fontSize: 14,
                  color: "#040100",
                }}
              >
                TP
              </div>
              <div
                style={{
                  fontFamily: "'Bebas Neue'",
                  fontSize: 20,
                  color: "var(--cream)",
                  letterSpacing: "0.1em",
                }}
              >
                TECH PATH
              </div>
            </div>
            <p
              style={{
                fontFamily: "'DM Sans'",
                fontSize: 12,
                color: "var(--muted)",
                lineHeight: 1.8,
              }}
            >
              IEEE Computer Society · University of Jordan
              <br />
              27 – 29 April 2026 · Online Webinar
            </p>
          </div>

          {/* Section navigation */}
          <div>
            <div
              style={{
                fontFamily: "'DM Sans'",
                fontSize: 10,
                color: "var(--gold)",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Navigate
            </div>
            {sections.map((s) => (
              <div
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="footer-link"
                style={{
                  fontFamily: "'Syne'",
                  fontWeight: 600,
                  fontSize: 13,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginBottom: 11,
                  cursor: "pointer",
                }}
              >
                {s.label}
              </div>
            ))}
          </div>

          {/* Socials + contact */}
          <div>
            <div
              style={{
                fontFamily: "'DM Sans'",
                fontSize: 10,
                color: "var(--gold)",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Connect
            </div>
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "'Syne'",
                      fontWeight: 600,
                      fontSize: 13,
                      color: "var(--cream)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {s.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "'DM Sans'",
                      fontSize: 11,
                      color: "var(--muted)",
                      marginTop: 1,
                    }}
                  >
                    {s.handle}
                  </div>
                </div>
                <span
                  style={{ color: "var(--gold)", fontSize: 14, opacity: 0.6 }}
                >
                  ↗
                </span>
              </a>
            ))}

            {/* Divider */}
            <div
              style={{
                height: 1,
                background: "rgba(245,166,35,0.08)",
                margin: "16px 0",
              }}
            />

            {/* Contacts */}
            <div style={{ marginBottom: 10 }}>
              <div
                style={{
                  fontFamily: "'DM Sans'",
                  fontSize: 10,
                  color: "var(--gold)",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  marginBottom: 4,
                }}
              >
                Chair
              </div>
              <a
                href="mailto:ahmadmadisafi9@ieee.org"
                style={{
                  fontFamily: "'DM Sans'",
                  fontSize: 12,
                  color: "var(--muted)",
                  textDecoration: "none",
                }}
              >
                ahmadmadisafi9@ieee.org
              </a>
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'DM Sans'",
                  fontSize: 10,
                  color: "var(--gold)",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  marginBottom: 4,
                }}
              >
                Vice Chair
              </div>
              <a
                href="mailto:sura7mdallal@gmail.com"
                style={{
                  fontFamily: "'DM Sans'",
                  fontSize: 12,
                  color: "var(--muted)",
                  textDecoration: "none",
                }}
              >
                sura7mdallal@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div
          style={{
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans'",
              fontSize: 11,
              color: "var(--muted)",
            }}
          >
            © 2026 IEEE Computer Society · University of Jordan · All Rights
            Reserved
          </span>
          <span
            style={{
              fontFamily: "'DM Sans'",
              fontSize: 11,
              color: "var(--muted)",
            }}
          >
            Made with care by IEEE CS UJ
          </span>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────── */
/*  ROOT                                   */
/* ─────────────────────────────────────── */
export default function App() {
  return (
    <>
      <style>{STYLES}</style>
      <div className="snap-wrap" style={{ "--snap-duration": "1.2s" }}>
        <Hero />
        <FilmStrip />
        <AboutIEEE />
        <IEEEBranch />
        <AboutEvent />
        <Keynotes />
        <Panel />
        <Agenda />
        <Outcomes />
        <Footer />
      </div>
    </>
  );
}
