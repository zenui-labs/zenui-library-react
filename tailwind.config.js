/** @type {import('tailwindcss').Config} */

// Semantic tokens live as RGB triplets in src/index.css (:root / .dark / .light),
// so they follow the nearest theme scope, including forced themes on preview frames.
const token = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    safelist: [
        "group-hover:bg-blue-600", "group-hover:border-blue-600", "group-hover:text-blue-600",
        "group-hover:bg-green-600", "group-hover:border-green-600", "group-hover:text-green-600",
        "group-hover:bg-purple-600", "group-hover:border-purple-600", "group-hover:text-purple-600",
        "group-hover:bg-[#DB06F9]", "group-hover:border-[#DB06F9]", "group-hover:text-[#DB06F9]",
        "group-hover:bg-indigo-600", "group-hover:border-indigo-600", "group-hover:text-indigo-600",
    ],
    // `dark:` applies inside the nearest `.dark` scope unless a closer `.light` scope resets it.
    // This lets a single preview frame force light or dark regardless of the site theme.
    darkMode: ["variant", "&:is(.dark *):not(:where(.dark .light *))"],
    theme: {
        extend: {
            colors: {
                // Site design system
                canvas: token("canvas"),
                surface: token("surface"),
                raised: token("raised"),
                hairline: {DEFAULT: token("hairline"), strong: token("hairline-strong")},
                ink: {DEFAULT: token("ink"), muted: token("ink-muted"), subtle: token("ink-subtle")},
                accent: {DEFAULT: token("accent"), strong: token("accent-strong"), soft: token("accent-soft")},

                // Legacy names used by component examples and their copyable code. Keep the values stable.
                primary: "#3B9DF8",
                secondary: "#ffffff",
                brandColor: '#0FABCA',
                border: "#e5eaf2",
                text: "#424242",
                darkBgColor: '#020617',
                darkSubTextColor: '#abc2d3',
                darkBorderColor: '#334155',
                darkTextColor: '#d2e5f5',
                tabTextColor: '#424242',
                shadowColor: 'rgba(0, 0, 0, 0.2)'
            },
            fontFamily: {
                sans: ['"Geist"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
            },
            letterSpacing: {
                display: '-0.035em',
                heading: '-0.02em',
            },
            boxShadow: {
                primary: "0 35px 80px -15px rgba(0, 0, 0, 0.3)",
                secondary: "2px 2px 20px 2px rgba(0, 0, 0, 0.3)",
                card: "0 1px 0 0 rgb(var(--shadow) / 0.04), 0 1px 2px 0 rgb(var(--shadow) / 0.06)",
                float: "0 1px 1px rgb(var(--shadow) / 0.04), 0 8px 24px -6px rgb(var(--shadow) / 0.14), 0 24px 64px -24px rgb(var(--shadow) / 0.22)",
                overlay: "0 0 0 1px rgb(var(--hairline) / 1), 0 24px 80px -12px rgb(var(--shadow) / 0.35)",
            },
            borderRadius: {
                normal: "8px",
                high: "12px",
                panel: "14px",
                shell: "20px",
            },
            transitionTimingFunction: {
                'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
            },
            keyframes: {
                'marquee-x': {from: {transform: 'translateX(0)'}, to: {transform: 'translateX(-50%)'}},
                'marquee-y': {from: {transform: 'translateY(0)'}, to: {transform: 'translateY(-50%)'}},
                'fade-up': {from: {opacity: 0, transform: 'translateY(6px)'}, to: {opacity: 1, transform: 'none'}},
                'slide-x': {from: {transform: 'translateX(-100%)'}, to: {transform: 'translateX(300%)'}},
                'cta-grid': {from: {backgroundPosition: '0 0'}, to: {backgroundPosition: '0 56px'}},
            },
            animation: {
                'marquee-x': 'marquee-x var(--marquee-duration, 60s) linear infinite',
                'marquee-y': 'marquee-y var(--marquee-duration, 50s) linear infinite',
                // `backwards` (not `both`): a transform left in place after the animation would trap position: fixed children.
                'fade-up': 'fade-up 0.4s cubic-bezier(0.16, 1, 0.3, 1) backwards',
                'slide-x': 'slide-x 1.1s cubic-bezier(0.65, 0, 0.35, 1) infinite',
                'cta-grid': 'cta-grid 2.4s linear infinite',
            },
        },

        // Standard Tailwind breakpoints (used by the copyable examples) plus the site's own pixel-named ones.
        screens: {
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1536px",
            "640px": "640px",
            "400px": "400px",
            "425px": "425px",
            "768px": "768px",
            "1024px": "1024px",
            "1260px": "1260px",
            "1360px": "1360px",
            "1404px": "1404px",
            "1605px": "1605px",
            "1630px": "1630px",
            "2000px": "2000px",
        },
    },
    plugins: [],
};
