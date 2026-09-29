
// component
import Generator from "./Generator.tsx";

const Index = () => (
    <div className="shell pb-16 pt-10 640px:pt-14">
        <header className="max-w-[62ch]">
            <h1 className="text-[2.2rem] font-semibold leading-tight tracking-display text-ink 640px:text-[2.8rem]">
                ShortKey
            </h1>
            <p className="mt-3 text-[1rem] leading-relaxed text-ink-muted 640px:text-[1.05rem]">
                Press a key combination or type one in, and ShortKey writes a keydown handler that checks for
                exactly those keys. Paste it into your app and replace the placeholder with your own logic.
            </p>
        </header>

        <div className="mt-10">
            <Generator/>
        </div>
    </div>
);

export default Index;
