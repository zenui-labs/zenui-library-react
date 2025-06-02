import {useCallback, useEffect, useState} from 'react';

const useScrollspy = (sectionIds, offset = 0) => {
    const [activeId, setActiveId] = useState('');

    const listener = useCallback(() => {
        const scrollPosition = window.scrollY + offset;
        let activeSection = '';

        // Iterate over sections and find the one currently in view
        for (let i = 0; i < sectionIds.length; i++) {
            const sectionId = sectionIds[i];
            const element = document.getElementById(sectionId);
            if (!element) continue;

            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + window.scrollY; // Actual top position relative to the document
            const elementBottom = elementTop + element.offsetHeight;

            // If the scroll position is within the section boundaries
            if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
                activeSection = sectionId;
                break; // Break early when the active section is found
            }
        }

        if (activeSection !== activeId) {
            setActiveId(activeSection);
        }
    }, [sectionIds, offset, activeId]);

    useEffect(() => {
        // Initial check when the component mounts
        listener();

        // Add the scroll event listener
        window.addEventListener('scroll', listener);

        // Clean up the event listener on unmount
        return () => {
            window.removeEventListener('scroll', listener);
        };
    }, [listener]);

    return activeId;
};

export default useScrollspy;
