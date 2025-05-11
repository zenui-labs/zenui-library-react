import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);

export const generateTailwindConfig = async (prompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(`Generate only code, don't explain in markdown for a comprehensive and modern Tailwind CSS configuration file. It should be dark mode enabled using 'class', custom all colors according theme and dark mode specific colors, custom fonts according theme, spacing (4.5rem, 5.5rem, 9rem, 18rem, 24rem, 32rem), extended border radius (1.5rem, 2rem, 2.5rem, full), box shadows for light and dark modes, custom screen sizes (xs, sm, md, lg, xl, 2xl, 3xl), extended z-index values, typography with light and dark mode styles, custom transitions, and a scrollbar-hide utility. Add relevant plugins such as forms, typography, aspect-ratio, and include an extendable utility using a plugin for the following theme:" ${prompt}`);
    return result.response.text().trim();
  } catch (error) {
    console.error("Error generating Tailwind config:", error);
    throw error;
  }
};