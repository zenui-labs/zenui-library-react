/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    safelist: [
        "group-hover:bg-blue-600", "group-hover:border-blue-600", "group-hover:text-blue-600",
        "group-hover:bg-green-600", "group-hover:border-green-600", "group-hover:text-green-600",
        "group-hover:bg-purple-600", "group-hover:border-purple-600", "group-hover:text-purple-600",
        "group-hover:bg-[#DB06F9]", "group-hover:border-[#DB06F9]", "group-hover:text-[#DB06F9]",
        "group-hover:bg-indigo-600", "group-hover:border-indigo-600", "group-hover:text-indigo-600",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
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
            boxShadow: {
                primary: "0 35px 80px -15px rgba(0, 0, 0, 0.3)",
                secondary: "2px 2px 20px 2px rgba(0, 0, 0, 0.3)",
            },
            borderRadius: {
                normal: "8px",
                high: "12px",
            }
        },

        screens: {
            "640px": "640px",
            "400px": "400px",
            "425px": "425px",
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
