import type {CodeLanguage} from "@/Store/Index.ts";

// Code examples are written in TypeScript. The JavaScript version is produced from the same source,
// so the two can never drift apart. Sucrase strips types without reformatting the code; it is loaded
// only when someone first asks for JavaScript.

type SourceLanguage = "tsx" | "ts" | "jsx" | "js" | "css" | string;

let sucrase: Promise<typeof import("sucrase")> | null = null;
const cache = new Map<string, string>();

/** Remove the gaps left behind where interfaces, type imports and casts used to be. */
const tidy = (code: string) =>
    code
        .split("\n")
        .map((line) => line
            .replace(/\s+$/, "")
            // "import {useState, type Foo}" leaves "{useState,}" behind.
            .replace(/^(import\s+.*?),\s*}/, "$1}")
            // "value as Type;" leaves "value ;" behind.
            .replace(/(\S)[ \t]+;$/, "$1;"))
        .join("\n")
        .replace(/\n{3,}/g, "\n\n")
        .replace(/^\n+/, "");

/** Point local imports at .jsx/.js files instead of .tsx/.ts. */
const renameLocalImports = (code: string) =>
    code.replace(/(from\s+["'](?:\.{1,2}\/)[^"']+?)\.(tsx|ts)(["'])/g, (_, path, ext, quote) =>
        `${path}.${ext === "tsx" ? "jsx" : "js"}${quote}`);

export async function toJavaScript(source: string): Promise<string> {
    const cached = cache.get(source);
    if (cached !== undefined) return cached;

    sucrase ??= import("sucrase");
    const {transform} = await sucrase;
    // Drop whole-line type-only imports first so they don't leave a gap inside the import block.
    const withoutTypeImports = source.replace(/^import\s+type\s[^;]*?;[ \t]*\n/gm, "");
    const {code} = transform(withoutTypeImports, {
        transforms: ["typescript", "jsx"],
        jsxRuntime: "preserve",
        disableESTransforms: true,
        keepUnusedImports: false,
    });

    const result = tidy(renameLocalImports(code));
    cache.set(source, result);
    return result;
}

/** Whether a tab has a JavaScript counterpart (CSS and plain text do not). */
export const isScript = (language: SourceLanguage) => ["tsx", "ts", "jsx", "js"].includes(language);

/** Prism language for a tab in the chosen code language. */
export const highlightLanguage = (language: SourceLanguage, mode: CodeLanguage) => {
    if (!isScript(language)) return language;
    const jsx = language === "tsx" || language === "jsx";
    if (mode === "ts") return jsx ? "tsx" : "typescript";
    return jsx ? "jsx" : "javascript";
};

/** File name for a tab in the chosen code language, e.g. Button.tsx becomes Button.jsx. */
export const fileName = (name: string, language: SourceLanguage, mode: CodeLanguage) => {
    if (!isScript(language)) return name;
    const jsx = language === "tsx" || language === "jsx";
    const ext = mode === "ts" ? (jsx ? "tsx" : "ts") : (jsx ? "jsx" : "js");
    return /\.(tsx|ts|jsx|js)$/.test(name) ? name.replace(/\.(tsx|ts|jsx|js)$/, `.${ext}`) : name;
};
