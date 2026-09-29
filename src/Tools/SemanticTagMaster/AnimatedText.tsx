import React from "react";

/**
 * Renders a string from the tag data. Text wrapped in <code>…</code> becomes
 * inline code; everything else is plain text.
 */
const AnimatedText = ({text = ""}) => {
    const parts = text.split(/<code>([\s\S]*?)<\/code>/);

    return (
        <>
            {parts.map((part, index) =>
                index % 2 === 1 ? (
                    <code
                        key={index}
                        className="rounded-md border border-hairline bg-raised px-1.5 py-0.5 font-mono text-[0.85em] text-ink"
                    >
                        {part}
                    </code>
                ) : (
                    <React.Fragment key={index}>{part}</React.Fragment>
                )
            )}
        </>
    );
};

export default AnimatedText;
