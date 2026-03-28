import { useState, useEffect, useRef } from "react";

/**
 * Custom hook to track the active section in view using IntersectionObserver.
 * @param sectionIds Array of section IDs to observe.
 * @returns The ID of the most prominent section in view.
 */
export const useActiveSection = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Avoid unnecessary work if no sections are defined
    if (!sectionIds || sectionIds.length === 0) return;

    // Track intersection ratios to determine the most prominent section
    const sectionRatios: Record<string, number> = {};

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        sectionRatios[entry.target.id] = entry.intersectionRatio;
      });

      // Find the section with the highest intersection ratio
      const mostProminent = Object.entries(sectionRatios).reduce(
        (acc, [id, ratio]) => (ratio > acc.ratio ? { id, ratio } : acc),
        { id: "", ratio: 0 }
      );

      if (mostProminent.ratio > 0) {
        setActiveSection(mostProminent.id);
      }
    };

    // Create observer with a rootMargin to trigger slightly before the section hits the top
    // and multiple thresholds for smoother detection
    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: "-20% 0px -70% 0px",
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    });

    // Observe each section that exists in the DOM
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    // Explicit cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [sectionIds]);

  return activeSection;
};
