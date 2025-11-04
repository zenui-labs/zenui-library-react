export default function ShimmerButton() {
    const customCss = `
    @property --angle {
      syntax: '<angle>';
      initial-value: 0deg;
      inherits: false;
    }
    @keyframes shimmer-spin {
      to {
        --angle: 360deg;
      }
    }
  `;
    return (<div className="flex items-center justify-center font-sans mb-4">
            <style>{customCss}</style>
            <a href='https://zenui.net/animations/text-effects#spoiler-text-animation'
               rel='noreferrer'
               className="relative inline-flex items-center justify-center p-[1.5px] bg-gray-100 dark:bg-black rounded-full overflow-hidden group">
                <div className="absolute inset-0" style={{
                    background: 'conic-gradient(from var(--angle), transparent 25%, #06b6d4, transparent 50%)',
                    animation: 'shimmer-spin 2.5s linear infinite'
                }}/>
                <span
                    className="relative z-10 inline-flex items-center justify-center w-full h-full px-6 py-1.5 640px:py-2 text-gray-900 dark:text-white bg-white text-[0.8rem] 640px:text-[0.9rem] dark:bg-gray-900 rounded-full group-hover:bg-gray-100 dark:group-hover:bg-gray-800 transition-colors duration-300">

                    ✨ Spoiler Text Animation Added
        </span>
            </a>
        </div>
    );
}