// component
import Generator from "./Generator.tsx";

const Index = () => (
    <div className="shell pb-16 pt-10 640px:pt-14">
        <header className="max-w-[62ch]">
            <h1 className="text-[2.2rem] font-semibold leading-tight tracking-display text-ink 640px:text-[2.8rem]">
                Config AI
            </h1>
            <p className="mt-3 text-[1rem] leading-relaxed text-ink-muted 640px:text-[1.05rem]">
                Describe your project in a few words and get a Tailwind CSS v4 theme for your index.css, with
                colors, fonts, spacing, shadows and breakpoints set up for light and dark mode.
            </p>
        </header>

        <div className="mt-10">
            <Generator/>
        </div>
    </div>
);

export default Index;
