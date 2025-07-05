import axios from "axios";

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

console.log(GROQ_API_KEY);

export const generateTailwindConfig = async (prompt) => {
    const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
            model: 'meta-llama/llama-4-scout-17b-16e-instruct',
            messages: [
                {
                    role: 'user',
                    content: `Generate only code, don't explain in markdown for a comprehensive and modern Tailwind CSS v4 configuration in CSS format for the root index.css file. Use the correct v4 syntax with @import "tailwindcss" and @theme directive. Configure custom theme variables using CSS custom properties with proper namespacing (--color-*, --font-*, --spacing-*, --radius-*, --shadow-*, --screen-*, --z-*, --transition-*). Include dark mode support using :root and .dark selectors for theme variables. Add custom spacing values (4.5rem, 5.5rem, 9rem, 18rem, 24rem, 32rem), extended border radius (1.5rem, 2rem, 2.5rem), custom box shadows for light and dark modes, custom screen breakpoints (xs, sm, md, lg, xl, 2xl, 3xl), extended z-index values, custom font families, custom transition utilities, and create custom utilities using @utility directive including a scrollbar-hide utility. Follow Tailwind v4 theme variable namespaces and CSS custom property conventions as documented. Configure according to the following theme: ${prompt}`
                }
            ],
            temperature: 1,
        },
        {
            headers: {
                Authorization: `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json',
            },
        }
    )

    return response.data.choices[0].message.content.trim()
}