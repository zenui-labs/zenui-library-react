
const ComponentDescription = ({text}: {text: string}) => {
    return (
        <p className="mt-2 max-w-[68ch] text-[0.95rem] leading-relaxed text-ink-muted">
            {text}
        </p>
    );
};

export default ComponentDescription;
