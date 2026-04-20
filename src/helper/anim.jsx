export function anim(inView, delay = 0) {
  return {
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(40px)",
    // Using a nice custom cubic-bezier for a smooth, premium feel
    transition: `opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
    // Prevents pointer events on invisible elements from blocking clicks
    pointerEvents: inView ? "auto" : "none",
  };
}
