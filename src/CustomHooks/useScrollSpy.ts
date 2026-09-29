import { useState, useEffect } from 'react';

export const useScrollSpy = (sectionIds: string[], offset = 0) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id');
            setActiveSection(sectionId);
          }
        });
      },
      {
        rootMargin: `${-offset}px 0px -${60}% 0px`
      }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [sectionIds, offset]);

  return activeSection;
};