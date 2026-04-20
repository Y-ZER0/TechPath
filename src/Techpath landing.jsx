import { useState, useEffect, useRef } from "react";
import { useHeroCanvas } from "./HeroCanvas";

// ── Cybersecurity Webinar speakers ──────────────────────────────────────────
import imgDandis from "./assets/speakers/cybersecurity/dandis.png";
import imgRamyAlDamati from "./assets/speakers/cybersecurity/Ramy-AlDamati.jpg";
import imgAliAlTamimi from "./assets/speakers/cybersecurity/Ali_Al-Tamimi.jpg";

// ── AI Webinar speakers ──────────────────────────────────────────────────────
import imgAlghwairi from "./assets/speakers/AI/alghwairi.jpg";
import imgShannak from "./assets/speakers/AI/shannak.jpg";
import imgGhaithHammouri from "./assets/speakers/AI/Ghaith-Hammouri.jpg";

// ── Software Engineering Webinar speakers ────────────────────────────────────
import imgAbuHadhoud from "./assets/speakers/software-engineer/abu-hadhoud.jpg";
import imgIsmail from "./assets/speakers/software-engineer/ismail.jpg";
import imgTariqElouzeh from "./assets/speakers/software-engineer/Tariq-Elouzeh.jpg";

// ── About section ────────────────────────────────────────────────────────────
import imgIEEE_CS from "./assets/about/IEEE-CS-UJ-Branch.png";
import imgOutstanding from "./assets/about/Outstanding_Chapter.jpg";
import imgRegion_8 from "./assets/about/Region_8_Award.jpg";

import { WebinarSection } from "./components/WebinarSection";

/* ══════════════════════════════════════════════════════════════════════════════
   STYLES
══════════════════════════════════════════════════════════════════════════════ */
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

/* ── Normal scroll (no snap) ── */
.snap-wrap{
  height:100vh;
  overflow-y:scroll;
  scroll-behavior:smooth;
  background:var(--bg);
}
.snap-wrap::-webkit-scrollbar{display:none;}

.section{
  min-height:100vh;
  position:relative;
  overflow:hidden;
  display:flex;
  align-items:center;
}

/* ── Flip cards ── */
.flip-card{perspective:1200px;}
.flip-inner{
  position:relative;width:100%;height:100%;
  transform-style:preserve-3d;
  transition:transform 0.75s cubic-bezier(.22,1,.36,1);
}
.flip-card:hover .flip-inner{transform:rotateY(180deg) scale(1.06);}
.flip-front,.flip-back{
  position:absolute;inset:0;
  backface-visibility:hidden;
  -webkit-backface-visibility:hidden;
  border-radius:18px;overflow:hidden;
}
.flip-back{transform:rotateY(180deg);}

/* ── Hero animations ── */
@keyframes letterDrop{
  0%{opacity:0;transform:translateY(80px) skewY(8deg);filter:blur(8px);}
  100%{opacity:1;transform:translateY(0) skewY(0);filter:blur(0);}
}
@keyframes fadeSlideUp{
  0%{opacity:0;transform:translateY(28px);}
  100%{opacity:1;transform:translateY(0);}
}
@keyframes goldPulse{
  0%,100%{text-shadow:0 0 30px rgba(245,166,35,0.25);}
  50%{text-shadow:0 0 80px rgba(245,166,35,0.6),0 0 140px rgba(232,137,26,0.3);}
}

/* ── Film strip ── */
@keyframes filmLeft{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
@keyframes filmRight{0%{transform:translateX(-50%);}100%{transform:translateX(0);}}
@keyframes txtLeft{0%{transform:translateX(0);}100%{transform:translateX(-50%);}}
@keyframes txtRight{0%{transform:translateX(-50%);}100%{transform:translateX(0);}}

.strip-left{animation:filmLeft 35s linear infinite;display:flex;width:max-content;}
.strip-right{animation:filmRight 35s linear infinite;display:flex;width:max-content;}
.txt-left{animation:txtLeft 22s linear infinite;display:flex;width:max-content;white-space:nowrap;}
.txt-right{animation:txtRight 22s linear infinite;display:flex;width:max-content;white-space:nowrap;}

/* ── Hover states ── */
.cta-btn{transition:transform 0.25s ease,box-shadow 0.25s ease;cursor:pointer;}
.cta-btn:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(245,166,35,0.35);}
.ghost-btn{transition:all 0.25s ease;cursor:pointer;}
.ghost-btn:hover{background:rgba(245,166,35,0.08);border-color:rgba(245,166,35,0.5);}
.card{transition:transform 0.3s ease,box-shadow 0.3s ease;}
.card:hover{
  transform:translateY(-6px);
  box-shadow:0 0 0 1px rgba(245,166,35,0.3),0 32px 80px rgba(0,0,0,0.6),0 8px 24px rgba(245,166,35,0.1);
}
.nav-link{
  transition:color 0.2s ease;cursor:pointer;
  font-family:'DM Sans',sans-serif;font-size:13px;
  letter-spacing:0.08em;text-transform:uppercase;color:var(--muted);
}
.nav-link:hover{color:var(--cream);}
.footer-link{transition:color 0.2s;cursor:pointer;color:var(--muted);}
.footer-link:hover{color:var(--cream);}

/* ── Flip cluster / mobile ── */
.flip-cluster{display:block;}
.flip-mobile{display:none;}

/* ── Mobile ── */
@media(max-width:768px){
  .section{min-height:100vh;height:auto!important;overflow:visible;padding:60px 0 40px;align-items:flex-start;}
  .two-col{grid-template-columns:1fr!important;gap:28px!important;}
  .flip-cluster{display:none!important;}
  .flip-mobile{display:flex!important;}
  .panel-tall{height:auto!important;min-height:260px!important;}
  .panel-small{height:220px!important;}
  .yazan-img{object-position:10% 30%!important;}
}
`;

/* ══════════════════════════════════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════════════════════════════════ */
const useInView = (threshold = 0.25) => {
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

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

/* ══════════════════════════════════════════════════════════════════════════════
   SPEAKER CARD — shared between all three webinar sections
══════════════════════════════════════════════════════════════════════════════ */
function SpeakerCard({ speaker, index, visible, accent, hoverBg }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? hoverBg : speaker.bg,
        borderRadius: 20,
        border: `1px solid ${hov ? accent + "55" : "rgba(245,166,35,0.12)"}`,
        padding: "28px",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        transform: hov
          ? "translateY(-8px) scale(1.015)"
          : "translateY(0) scale(1)",
        boxShadow: hov
          ? `0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px ${accent}33`
          : "none",
        transition: "all 0.55s cubic-bezier(.22,1,.36,1)",
        opacity: visible ? 1 : 0,
        transform: visible
          ? hov
            ? "translateY(-8px) scale(1.015)"
            : "translateY(0)"
          : "translateY(36px)",
        transition: `opacity 0.9s ease ${0.15 + index * 0.15}s, transform 0.9s ease ${0.15 + index * 0.15}s, box-shadow 0.55s ease`,
      }}
    >
      {/* Accent glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${accent}18 0%, transparent 70%)`,
          opacity: hov ? 1 : 0,
          transition: "opacity 0.55s ease",
        }}
      />

      {/* Keynote number watermark */}
      <div
        style={{
          position: "absolute",
          top: 14,
          right: 18,
          fontFamily: "'Bebas Neue'",
          fontSize: 60,
          lineHeight: 1,
          color: hov ? accent + "22" : "rgba(245,166,35,0.06)",
          pointerEvents: "none",
          transition: "color 0.55s ease",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Speaker image */}
      <div
        style={{
          width: "100%",
          height: 200,
          borderRadius: 14,
          overflow: "hidden",
          marginBottom: 18,
          position: "relative",
        }}
      >
        {speaker.img ? (
          <img
            src={speaker.img}
            alt={speaker.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: speaker.imgPosition ?? "center top",
              filter: hov
                ? "grayscale(0%) brightness(1)"
                : "grayscale(100%) brightness(0.55)",
              transform: hov ? "scale(1.05)" : "scale(1)",
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
              fontSize: 48,
              color: hov ? accent : "var(--gold)",
              transition: "color 0.45s ease",
            }}
          >
            {speaker.initials}
          </div>
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: hov ? "transparent" : "rgba(8,3,0,0.35)",
            transition: "background 0.65s ease",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Keynote label */}
      <span
        style={{
          fontFamily: "'DM Sans'",
          fontSize: 10,
          color: hov ? accent : "var(--gold)",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          transition: "color 0.45s ease",
        }}
      >
        {speaker.keynoteLabel}
      </span>

      <h3
        style={{
          fontFamily: "'Syne'",
          fontWeight: 800,
          fontSize: 17,
          color: "var(--cream)",
          margin: "7px 0 5px",
          lineHeight: 1.25,
        }}
      >
        {speaker.title}
      </h3>
      <p
        style={{
          fontFamily: "'DM Sans'",
          fontSize: 12,
          color: hov ? accent + "CC" : "rgba(245,166,35,0.75)",
          marginBottom: 14,
          lineHeight: 1.5,
          transition: "color 0.45s ease",
        }}
      >
        {speaker.sub}
      </p>

      <div
        style={{
          height: 1,
          background: hov ? accent + "44" : "rgba(245,166,35,0.08)",
          marginBottom: 14,
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
        {speaker.name}
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
        {speaker.bio}
      </p>

      {/* Hover hint */}
      <div
        style={{
          marginTop: 14,
          display: "flex",
          alignItems: "center",
          gap: 6,
          opacity: hov ? 0 : 0.35,
          transition: "opacity 0.3s ease",
        }}
      >
        <div style={{ width: 14, height: 1, background: "var(--gold)" }} />
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
}

/* ══════════════════════════════════════════════════════════════════════════════
   1. HERO
══════════════════════════════════════════════════════════════════════════════ */
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
      id="home"
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
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          padding: "20px clamp(20px,5vw,48px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
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
            gap: 28,
            marginLeft: "auto",
            marginRight: 48,
            flexWrap: "wrap",
          }}
        >
          {[
            { label: "About", id: "about" },
            { label: "Event", id: "event" },
            { label: "Cyber", id: "webinar-cyber" },
            { label: "AI", id: "webinar-ai" },
            { label: "Software", id: "webinar-software" },
          ].map(({ label, id }) => (
            <span key={label} className="nav-link" onClick={() => scrollTo(id)}>
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

      {/* TITLE */}
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
              animation: "fadeSlideUp 0.8s ease forwards",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                height: 1,
                width: 60,
                background: "linear-gradient(to right,transparent,var(--gold))",
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
              27 – 29 April 2026 · Online Webinar Series
            </p>
            <div
              style={{
                height: 1,
                width: 60,
                background: "linear-gradient(to left,transparent,var(--gold))",
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
              animation: "fadeSlideUp 0.9s ease forwards",
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
              Register Now
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   2. FILM STRIP
══════════════════════════════════════════════════════════════════════════════ */
function FilmStrip() {
  const speakers = [
    {
      initials: "AD",
      name: "Aladdin Dandis",
      role: "Cybersecurity",
      bg: "#001209",
      img: imgDandis,
    },
    {
      initials: "RT",
      name: "Rami Al-Tamimi",
      role: "AI & Cybersecurity",
      bg: "#001800",
      img: imgRamyAlDamati,
    },
    {
      initials: "AT",
      name: "Ali Tamimi",
      role: "Cybersecurity",
      bg: "#001800",
      img: imgAliAlTamimi,
    },
    {
      initials: "AA",
      name: "Abdullah Alghwairi",
      role: "AI & Product Lead",
      bg: "#0A0018",
      img: imgAlghwairi,
    },
    {
      initials: "GH",
      name: "Ghaith Hammouri",
      role: "AI & Cybersecurity",
      bg: "#001800",
      img: imgGhaithHammouri,
    },
    {
      initials: "YS",
      name: "Yazan Shannak",
      role: "AI Manager",
      bg: "#001820",
      img: imgShannak,
      objectPosition: "10% 50%",
    },
    {
      initials: "MA",
      name: "Mohammed Abu-Hadhoud",
      role: "Software Engineering",
      bg: "#1E0A00",
      img: imgAbuHadhoud,
    },
    {
      initials: "TE",
      name: "Tariq Elouzeh",
      role: "Senior Software Automation Engineer",
      bg: "#001800",
      img: imgTariqElouzeh,
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
        width: "clamp(130px,22vw,170px)",
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
          background: `linear-gradient(160deg,${s.bg},#100400)`,
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
              objectPosition: s.objectPosition || "center top",
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
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 60,
            background: "linear-gradient(to top,rgba(0,0,0,0.75),transparent)",
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

  const words = [
    "CYBERSECURITY",
    "ARTIFICIAL INTELLIGENCE",
    "SOFTWARE ENGINEERING",
  ];
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
                fontSize: "clamp(28px,4vw,50px)",
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

/* ══════════════════════════════════════════════════════════════════════════════
   3. ABOUT IEEE
══════════════════════════════════════════════════════════════════════════════ */
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
          padding: "0 clamp(20px,5vw,56px)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "center",
          width: "100%",
        }}
      >
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
              fontSize: "clamp(60px,8vw,100px)",
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

        {/* Mobile stacked */}
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

/* ══════════════════════════════════════════════════════════════════════════════
   4. IEEE CS UJ BRANCH
══════════════════════════════════════════════════════════════════════════════ */
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
          padding: "0 clamp(20px,5vw,56px)",
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
          <div>
            <h2
              style={{
                ...anim(v, 0.1),
                fontFamily: "'Bebas Neue'",
                fontSize: "clamp(48px,6vw,80px)",
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

/* ══════════════════════════════════════════════════════════════════════════════
   5. ABOUT THE EVENT  (updated content from new PDF)
══════════════════════════════════════════════════════════════════════════════ */
function AboutEvent() {
  const [ref, v] = useInView(0.25);
  const details = [
    { icon: "◈", label: "Format", value: "Online Webinar Series" },
    { icon: "◷", label: "Duration", value: "3 Hours Per Session" },
    { icon: "◉", label: "Days", value: "27 – 29 April 2026" },
    { icon: "◈", label: "Sessions", value: "9 Keynote Speeches" },
  ];
  const perspectives = [
    "Understanding the field and how to start learning it",
    "Exploring the field in the age of AI",
    "Highlighting its domains and job market in 2026",
  ];
  return (
    <section
      className="section"
      id="event"
      ref={ref}
      style={{ background: "var(--bg)" }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 clamp(20px,5vw,56px)",
          width: "100%",
        }}
      >
        {/* Tags */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 40,
            flexWrap: "wrap",
            gap: 12,
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
                  ...anim(v, 0.08 + i * 0.06),
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
                ...anim(v, 0.12),
                fontFamily: "'Bebas Neue'",
                fontSize: "clamp(52px,7vw,88px)",
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
                ...anim(v, 0.22),
                fontFamily: "'DM Sans'",
                color: "var(--muted)",
                fontSize: 15,
                lineHeight: 1.85,
                marginTop: 24,
              }}
            >
              A learning-focused online webinar series designed to introduce
              participants to three major IT fields — Software Engineering,
              Cybersecurity, and Artificial Intelligence — in a clear and
              practical way.
            </p>
            <p
              style={{
                ...anim(v, 0.3),
                fontFamily: "'DM Sans'",
                color: "var(--muted)",
                fontSize: 15,
                lineHeight: 1.85,
                marginTop: 14,
              }}
            >
              The series is delivered over three days, with each day dedicated
              to one field. Each day features three keynote speeches by three
              industry experts, each covering a key perspective:
            </p>
            <div style={{ marginTop: 20 }}>
              {perspectives.map((p, i) => (
                <div
                  key={i}
                  style={{
                    ...anim(v, 0.36 + i * 0.1),
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    marginBottom: 12,
                  }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "var(--gold)",
                      flexShrink: 0,
                      marginTop: 7,
                    }}
                  />
                  <p
                    style={{
                      fontFamily: "'DM Sans'",
                      color: "rgba(245,220,180,0.8)",
                      fontSize: 14,
                      lineHeight: 1.7,
                    }}
                  >
                    {p}
                  </p>
                </div>
              ))}
            </div>
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

/* ══════════════════════════════════════════════════════════════════════════════
   6. CYBERSECURITY WEBINAR — Day 1 · 27 April
══════════════════════════════════════════════════════════════════════════════ */
export function WebinarCyber() {
  const speakers = [
    {
      initials: "AD",
      img: imgDandis,
      imgPosition: "10% 20%",
      keynoteLabel: "First Keynote",
      title:
        "Inside Cybersecurity: Understanding Attacks, Defense, and How to Learn It",
      sub: "Understanding the field and how to start learning it.",
      name: "Aladdin Dandis",
      bio: "A Jordan-based cybersecurity consultant, educator, and technology leader with over 25 years of experience in information security across both government and private sectors, specializing in cybersecurity management, training, and compliance.",
      bg: "linear-gradient(145deg,#001A0A,#050300)",
    },
    {
      initials: "RA",
      img: imgRamyAlDamati,
      imgPosition: "center top",
      keynoteLabel: "Second Keynote",
      title: "Cybersecurity in the Age of AI",
      sub: "Exploring the field through the lens of artificial intelligence.",
      name: "Ramy AlDamati",
      bio: "A Jordan-based technology leader and consultant specializing in cybersecurity, AI, blockchain, and emerging technologies. Known for his work in AI governance, risk management, and digital transformation, and has contributed to national-level AI standards in Jordan.",
      bg: "linear-gradient(145deg,#001209,#060200)",
    },
    {
      initials: "AT",
      img: imgAliAlTamimi,
      imgPosition: "center",
      keynoteLabel: "Third Keynote",
      title: "Cybersecurity Fields & Job Market in 2026",
      sub: "Domains, career paths, and what employers demand.",
      name: "Ali Al-Tamimi",
      bio: "Founder & CEO of Hayyan Horizons, an IT security and systems integration company. With over 30 years of experience across the Middle East, Europe, and Africa, he held senior leadership roles at global organizations including Hewlett-Packard (HP).",
      bg: "linear-gradient(145deg,#001510,#050200)",
    },
  ];

  return (
    <WebinarSection
      id="webinar-cyber"
      day="Day 1"
      date="27 April 2026"
      field="Cybersecurity"
      description="A 3-hour deep-dive into the world of cybersecurity — from understanding attacks and defense fundamentals, to how AI is reshaping the threat landscape, to the real job market opportunities waiting in 2026."
      accent="#2ECC71"
      hoverBg="linear-gradient(145deg,#003A18,#001A08)"
      bg="var(--bg3)"
      speakers={speakers}
    />
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   7. AI WEBINAR — Day 2 · 28 April
══════════════════════════════════════════════════════════════════════════════ */
export function WebinarAI() {
  const speakers = [
    {
      initials: "AA",
      img: imgAlghwairi,
      imgPosition: "10% 40%",
      keynoteLabel: "First Keynote",
      title: "From Data to Decisions: Understanding AI and How to Learn It",
      sub: "Understanding the field and how to start learning it.",
      name: "Abdullah Alghwairi",
      bio: "An AI professional and product leader with over 10 years of experience working at the intersection of artificial intelligence, business, and product management. Currently leads initiatives at Kernel for AI, focusing on turning AI technologies into real-world solutions.",
      bg: "linear-gradient(145deg,#0D0022,#060200)",
    },
    {
      initials: "GH",
      img: imgGhaithHammouri,
      imgPosition: "10% 40%",
      keynoteLabel: "Second Keynote",
      title: "Turning AI Knowledge into Real Impact",
      sub: "Exploring AI in practice — from research to production.",
      name: "Ghaith Hammouri",
      bio: "A founder, researcher, and AI systems architect with over 15 years of experience at the intersection of generative AI, cybersecurity, and applied cryptography. Focuses on building secure and scalable intelligent technologies and bridging cutting-edge research with practical industry applications.",
      bg: "linear-gradient(145deg,#100022,#060200)",
    },
    {
      initials: "YS",
      img: imgShannak,
      imgPosition: "10% 40%",
      keynoteLabel: "Third Keynote",
      title: "AI Fields & Job Market in 2026",
      sub: "Domains, career paths, and what employers demand.",
      name: "Yazan Shannak",
      bio: "An AI Manager at Revest, specializing in building AI-powered solutions and real-world applications. Previously worked at ArabiaWeather and holds a Master's degree in Data Science from the University of Jordan.",
      bg: "linear-gradient(145deg,#0A001A,#060200)",
    },
  ];

  return (
    <WebinarSection
      id="webinar-ai"
      day="Day 2"
      date="28 April 2026"
      field="Artificial Intelligence"
      description="A 3-hour exploration of AI — from understanding the fundamentals and how to enter the field, to turning AI knowledge into real-world impact, to mapping the AI job market landscape in 2026."
      accent="#9B59B6"
      hoverBg="linear-gradient(145deg,#220044,#100018)"
      bg="var(--bg2)"
      speakers={speakers}
    />
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   8. SOFTWARE ENGINEERING WEBINAR — Day 3 · 29 April
══════════════════════════════════════════════════════════════════════════════ */
export function WebinarSoftware() {
  const speakers = [
    {
      initials: "MA",
      img: imgAbuHadhoud,
      imgPosition: "center top",
      keynoteLabel: "First Keynote",
      title:
        "From Idea to System: Understanding Software Engineering and How to Learn It",
      sub: "Understanding the field and how to start learning it.",
      name: "Mohammed Abu-Hadhoud",
      bio: "A Jordanian software engineer, entrepreneur, and educator with over 25 years of experience in software development, project management, and IT solutions. Founder & CEO of Programming Advices and Epya Solutions.",
      bg: "linear-gradient(145deg,#2A1200,#0D0500)",
    },
    {
      initials: "TE",
      img: imgTariqElouzeh,
      imgPosition: "10% 20%",
      keynoteLabel: "Second Keynote",
      title: "Software Engineering in the Age of AI",
      sub: "How AI is transforming the way we build software.",
      name: "Tariq Elouzeh",
      bio: "Senior Software Automation Engineer at Apple with over 15 years of experience in software engineering and distributed systems. Previously worked at Twitter and IBM. Well-known mentor and content creator in the Arab tech community.",
      bg: "linear-gradient(145deg,#1E0800,#0D0400)",
    },
    {
      initials: "OI",
      img: imgIsmail,
      imgPosition: "center top",
      keynoteLabel: "Third Keynote",
      title: "Software Engineering Fields & Job Market in 2026",
      sub: "Domains, career paths, and what employers demand.",
      name: "Omar Ismail",
      bio: "A Tech Lead at Digitinary, leading the development of digital banking and Open Banking solutions. Extensive experience building scalable systems using Java, Spring Boot, and AWS in fintech environments.",
      bg: "linear-gradient(145deg,#1A0600,#0D0400)",
    },
  ];

  return (
    <WebinarSection
      id="webinar-software"
      day="Day 3"
      date="29 April 2026"
      field="Software Engineering"
      description="A 3-hour journey through software engineering — from building your first real system, to understanding how AI is reshaping the developer's role, to exploring the software engineering job market and its opportunities in 2026."
      accent="#E8891A"
      hoverBg="linear-gradient(145deg,#4A2800,#2A1000)"
      bg="var(--bg3)"
      speakers={speakers}
    />
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
            WEBINARS <span style={{ color: "var(--gold)" }}>OUTCOMES</span>
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

/* ══════════════════════════════════════════════════════════════════════════════
   10. FOOTER
══════════════════════════════════════════════════════════════════════════════ */
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
    { label: "About the Event", id: "event" },
    { label: "Cybersecurity Webinar", id: "webinar-cyber" },
    { label: "AI Webinar", id: "webinar-ai" },
    { label: "Software Eng. Webinar", id: "webinar-software" },
  ];

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
          padding: "0 clamp(20px,5vw,48px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top 3-col grid */}
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

          {/* Navigation */}
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
            <div
              style={{
                height: 1,
                background: "rgba(245,166,35,0.08)",
                margin: "16px 0",
              }}
            />
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

        {/* Copyright */}
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

/* ══════════════════════════════════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <>
      <style>{STYLES}</style>
      <div className="snap-wrap">
        <Hero />
        <FilmStrip />
        <AboutIEEE />
        <IEEEBranch />
        <AboutEvent />
        <WebinarCyber />
        <WebinarAI />
        <WebinarSoftware />
        <Outcomes />
        <Footer />
      </div>
    </>
  );
}
