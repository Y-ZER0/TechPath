import { useState, useEffect, useRef } from "react";

export function useInView(threshold = 0.2) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Once it comes into view, trigger the animation
        if (entry.isIntersecting) {
          setInView(true);
          // Optional: Stop observing if you only want the animation to play once
          // observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: "0px",
        threshold: threshold,
      },
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return [ref, inView];
}
