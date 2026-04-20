import { useState } from "react";
import { anim } from "../helper/anim";

export function SpeakerCard({ speaker, accent, hoverBg, index, v }) {
  const [isHov, setIsHov] = useState(false);
  const n = String(index + 1).padStart(2, "0");

  // Hover timing for that extra smoothness
  const SLOW_SMOOTH = "0.85s cubic-bezier(0.16, 1, 0.3, 1)";
  const IMAGE_SMOOTH = "0.9s cubic-bezier(0.16, 1, 0.3, 1)";

  return (
    <div
      onMouseEnter={() => setIsHov(true)}
      onMouseLeave={() => setIsHov(false)}
      style={{
        background: isHov ? hoverBg : speaker.bg,
        borderRadius: 20,
        border: `1px solid ${isHov ? accent + "55" : "rgba(245,166,35,0.12)"}`,
        padding: "28px",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        transform: isHov
          ? "translateY(-10px) scale(1.02)"
          : "translateY(0) scale(1)",
        boxShadow: isHov
          ? `0 30px 70px rgba(0,0,0,0.6), 0 0 0 1px ${accent}33`
          : "none",
        transition: `all ${SLOW_SMOOTH}`,
        ...anim(v, 0.18 + index * 0.14),
      }}
    >
      {/* Accent glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${accent}18 0%, transparent 70%)`,
          opacity: isHov ? 1 : 0,
          transition: `opacity ${SLOW_SMOOTH}`,
        }}
      />

      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          top: 14,
          right: 18,
          fontFamily: "'Bebas Neue'",
          fontSize: 60,
          color: isHov ? accent + "22" : "rgba(245,166,35,0.06)",
          transition: `color ${SLOW_SMOOTH}`,
        }}
      >
        {n}
      </div>

      {/* Image container */}
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
        {speaker.img && (
          <img
            src={speaker.img}
            alt={speaker.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: speaker.imgPosition ?? "center top",
              filter: isHov
                ? "grayscale(0%) brightness(1.1)"
                : "grayscale(100%) brightness(0.55)",
              transform: isHov ? "scale(1.08)" : "scale(1)",
              transition: `filter ${IMAGE_SMOOTH}, transform ${IMAGE_SMOOTH}`,
            }}
          />
        )}
      </div>

      {/* Category/Label */}
      <span
        style={{
          fontFamily: "'DM Sans'",
          fontSize: 10,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: isHov ? accent : "var(--gold)",
          transition: `color ${SLOW_SMOOTH}`,
        }}
      >
        {speaker.keynoteLabel}
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
        {speaker.title}
      </h3>

      {/* RESTORED: Original DM Sans and 1.5 line height */}
      <p
        style={{
          fontFamily: "'DM Sans'",
          fontSize: 12,
          lineHeight: 1.5,
          color: isHov ? accent + "CC" : "rgba(245,166,35,0.75)",
          transition: `color ${SLOW_SMOOTH}`,
          marginBottom: 16,
        }}
      >
        {speaker.sub}
      </p>

      <div
        style={{
          height: 1,
          background: isHov ? accent + "44" : "rgba(245,166,35,0.08)",
          marginBottom: 16,
          transition: `background ${SLOW_SMOOTH}`,
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

      {/* Expanded Bio Expansion */}
      <div
        style={{
          maxHeight: isHov ? "200px" : "0px",
          opacity: isHov ? 1 : 0,
          overflow: "hidden",
          transition: `max-height ${SLOW_SMOOTH}, opacity 0.6s ease 0.1s`,
          marginTop: isHov ? 16 : 0,
        }}
      >
        <div
          style={{ height: 1, background: accent + "33", marginBottom: 14 }}
        />
        {/* RESTORED: Original DM Sans and 1.8 line height */}
        <p
          style={{
            fontFamily: "'DM Sans'",
            fontSize: 12,
            color: "rgba(245,235,220,0.65)",
            lineHeight: 1.8,
          }}
        >
          {speaker.bio}
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
        <div style={{ width: 14, height: 1, background: "var(--gold)" }} />
        <span
          style={{
            fontFamily: "'DM Sans'",
            fontSize: 10,
            color: "var(--gold)",
            letterSpacing: "0.12em",
          }}
        >
          HOVER FOR DETAILS
        </span>
      </div>
    </div>
  );
}
