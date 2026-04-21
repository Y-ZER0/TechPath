import { useInView } from "../hooks/useInView";
import { anim } from "../helper/anim";
import { SpeakerCard } from "./SpeakerCard";

export function WebinarSection({
  id,
  day,
  date,
  field,
  description,
  accent,
  hoverBg,
  bg,
  speakers,
}) {
  // Replace this hook with whatever intersection observer logic you're currently using
  const [ref, v] = useInView(0.2);

  return (
    <section className="section" id={id} style={{ background: bg }} ref={ref}>
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
            {day} · {date}
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
            {field.toUpperCase()} <span style={{ color: accent }}>WEBINAR</span>
          </h2>
          <p
            style={{
              fontFamily: "'Syne'", // ← matches the webinar title font
              fontWeight: 400,
              color: "rgba(245,237,224,0.9)", // ← near-white, high contrast on dark bg
              maxWidth: 600,
              marginTop: 16,
              lineHeight: 1.7,
              fontSize: "clamp(14px, 1.2vw, 16px)",
            }}
          >
            {description}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 18,
          }}
        >
          {speakers.map((speaker, i) => (
            <SpeakerCard
              key={i}
              index={i}
              speaker={speaker}
              accent={accent}
              hoverBg={hoverBg}
              v={v}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
