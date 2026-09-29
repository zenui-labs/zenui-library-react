#!/usr/bin/env node
// Type-checks every copyable code example in strict TypeScript.
//
//   node scripts/check-snippets.mjs [paths...]        default: src/Components/Overview/SidebarContent src/Examples
//   node scripts/check-snippets.mjs --list [paths...] only list the snippets that were found
//
// Snippets are the `code` prop of <ShowCode>, <Showcode> and <BlocksShowCode> (a string, or an array of
// {id, displayText, language, code} tabs whose values may be imported constants), plus files registered
// with `source` in src/Examples. Each snippet is written to .snippet-check/ and compiled with strict
// settings, as if a visitor pasted it into a fresh React + TypeScript project. Safe to run in parallel.

import fs from "node:fs";
import path from "node:path";
import {createRequire} from "node:module";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const require = createRequire(path.join(ROOT, "package.json"));
const ts = require("typescript");

const args = process.argv.slice(2);
const listOnly = args.includes("--list");
const targets = args.filter((a) => !a.startsWith("--"));
const roots = (targets.length ? targets : ["src/Components/Overview/SidebarContent", "src/Examples"])
    .map((p) => path.resolve(ROOT, p))
    .filter((p) => fs.existsSync(p));

const walk = (p, acc = []) => {
    if (fs.statSync(p).isFile()) {
        if (/\.(tsx|ts)$/.test(p)) acc.push(p);
    } else {
        for (const e of fs.readdirSync(p)) walk(path.join(p, e), acc);
    }
    return acc;
};
const files = roots.flatMap((r) => walk(r));

const config = ts.getParsedCommandLineOfConfigFile(path.join(ROOT, "tsconfig.json"), {}, {...ts.sys, onUnRecoverableConfigFileDiagnostic: () => {}});
const program = ts.createProgram(files, config.options);
const checker = program.getTypeChecker();

const TAGS = new Set(["ShowCode", "Showcode", "BlocksShowCode"]);
const problems = [];

/** Resolve an expression to a string: literals, templates without ${}, and identifiers pointing at those. */
const stringOf = (node, depth = 0) => {
    if (!node || depth > 5) return null;
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
    if (ts.isParenthesizedExpression(node) || ts.isAsExpression(node)) return stringOf(node.expression, depth + 1);
    if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) {
        const left = stringOf(node.left, depth);
        const right = stringOf(node.right, depth);
        return left === null || right === null ? null : left + right;
    }
    if (ts.isIdentifier(node) || ts.isPropertyAccessExpression(node)) {
        let symbol = checker.getSymbolAtLocation(node);
        if (symbol && symbol.flags & ts.SymbolFlags.Alias) symbol = checker.getAliasedSymbol(symbol);
        const decl = symbol?.valueDeclaration;
        if (decl && ts.isVariableDeclaration(decl)) return stringOf(decl.initializer, depth + 1);
        if (decl && ts.isPropertyAssignment(decl)) return stringOf(decl.initializer, depth + 1);
    }
    return null;
};

/** Follow identifiers to the literal they were declared with. */
const resolveNode = (node, depth = 0) => {
    if (!node || depth > 5) return node;
    if (ts.isParenthesizedExpression(node) || ts.isAsExpression(node)) return resolveNode(node.expression, depth + 1);
    if (ts.isIdentifier(node) || ts.isPropertyAccessExpression(node)) {
        let symbol = checker.getSymbolAtLocation(node);
        if (symbol && symbol.flags & ts.SymbolFlags.Alias) symbol = checker.getAliasedSymbol(symbol);
        const decl = symbol?.valueDeclaration;
        if (decl && (ts.isVariableDeclaration(decl) || ts.isPropertyAssignment(decl))) return resolveNode(decl.initializer, depth + 1);
    }
    return node;
};

const prop = (obj, name) => obj.properties.find((p) => ts.isPropertyAssignment(p) && p.name.getText() === name)?.initializer;

const snippets = [];
for (const sf of program.getSourceFiles()) {
    if (!files.includes(path.resolve(sf.fileName))) continue;
    const rel = path.relative(ROOT, sf.fileName);

    const visit = (node) => {
        if ((ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) && TAGS.has(node.tagName.getText())) {
            const attr = node.attributes.properties.find((a) => ts.isJsxAttribute(a) && a.name.getText() === "code");
            const line = sf.getLineAndCharacterOfPosition(node.getStart()).line + 1;
            const where = `${rel}:${line}`;
            if (!attr?.initializer) {
                problems.push(`${where}  code prop missing or not static`);
            } else {
                const init = resolveNode(ts.isJsxExpression(attr.initializer) ? attr.initializer.expression : attr.initializer);
                if (init && ts.isArrayLiteralExpression(init)) {
                    const tabs = init.elements.map((el) => {
                        if (!ts.isObjectLiteralExpression(el)) return null;
                        return {
                            name: stringOf(prop(el, "displayText")) || stringOf(prop(el, "id")) || "Component.tsx",
                            language: stringOf(prop(el, "language")) || "tsx",
                            code: stringOf(prop(el, "code")),
                        };
                    });
                    if (tabs.some((t) => !t || t.code === null)) problems.push(`${where}  a tab's code could not be read statically`);
                    else snippets.push({where, tabs});
                } else {
                    const code = stringOf(init);
                    if (code === null) problems.push(`${where}  code could not be read statically`);
                    else snippets.push({where, tabs: [{name: "Component.tsx", language: "tsx", code}]});
                }
            }
        }
        ts.forEachChild(node, visit);
    };
    visit(sf);
}

// src/Examples files show their own source, so the files themselves are the snippets. Reusable examples import
// their component from a sibling file ("./KpiCards"); those files are copied next to the example so the usage is
// checked against the real component, the way a developer would paste both.
for (const f of files.filter((f) => f.includes(`${path.sep}Examples${path.sep}`) && /\.example\.tsx$/.test(f))) {
    const code = fs.readFileSync(f, "utf8");
    const tabs = [{name: path.basename(f), language: "tsx", code}];
    for (const [, spec] of code.matchAll(/from\s+["']\.\/([\w-]+)(?:\.tsx?)?["']/g)) {
        const sibling = [".tsx", ".ts"].map((ext) => path.join(path.dirname(f), spec + ext)).find((p) => fs.existsSync(p));
        if (!sibling) problems.push(`${path.relative(ROOT, f)}  imports ./${spec}, which does not exist`);
        else tabs.push({name: path.basename(sibling), language: sibling.endsWith(".ts") ? "ts" : "tsx", code: fs.readFileSync(sibling, "utf8")});
    }
    snippets.push({where: path.relative(ROOT, f), tabs});
}

if (listOnly) {
    for (const s of snippets) console.log(`${s.where}  ${s.tabs.map((t) => `${t.name} (${t.language})`).join(", ")}`);
    console.log(`\n${snippets.length} snippets`);
    process.exit(0);
}

// Write every snippet as its own small project folder.
// One folder per run, so parallel runs never overwrite each other's files. Removed at the end.
const OUT = path.join(ROOT, ".snippet-check", `run-${process.pid}-${Date.now()}`);
fs.mkdirSync(OUT, {recursive: true});
process.on("exit", () => fs.rmSync(OUT, {recursive: true, force: true}));
fs.writeFileSync(path.join(OUT, "globals.d.ts"), 'declare module "*.css";\ndeclare module "*.png";\ndeclare module "*.jpg";\ndeclare module "*.svg";\n');

const origin = new Map();
const roots2 = [path.join(OUT, "globals.d.ts")];
snippets.forEach((s, i) => {
    const dir = path.join(OUT, `s${String(i).padStart(4, "0")}`);
    fs.mkdirSync(dir, {recursive: true});
    for (const tab of s.tabs) {
        if (!["tsx", "ts", "jsx", "js"].includes(tab.language)) continue;
        const ext = tab.language === "ts" || tab.language === "js" ? ".ts" : ".tsx";
        const base = tab.name.replace(/\.(tsx|ts|jsx|js)$/, "").replace(/[^\w.-]/g, "_") || "Component";
        const file = path.join(dir, base + ext);
        // Markup-only snippets are checked as the body of a component. Snippets without imports or
        // exports are scripts; make each one a module so names don't collide between snippets.
        let code = tab.code;
        if (/^\s*</.test(code)) code = `export const Example = () => (\n<>\n${code}\n</>\n);\n`;
        else if (!/^\s*(import|export)\s/m.test(code)) code = `${code}\nexport {};\n`;
        fs.writeFileSync(file, code);
        origin.set(path.resolve(file), `${s.where} [${tab.name}]`);
        roots2.push(file);
    }
});

const strict = ts.createProgram(roots2, {
    strict: true,
    noEmit: true,
    jsx: ts.JsxEmit.ReactJSX,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    target: ts.ScriptTarget.ES2020,
    lib: ["lib.dom.d.ts", "lib.dom.iterable.d.ts", "lib.es2022.d.ts"],
    allowImportingTsExtensions: true,
    isolatedModules: true,
    esModuleInterop: true,
    skipLibCheck: true,
    resolveJsonModule: true,
    types: [],
});

const byOrigin = new Map();
for (const d of ts.getPreEmitDiagnostics(strict)) {
    if (!d.file) continue;
    const key = origin.get(path.resolve(d.file.fileName));
    if (!key) continue;
    const {line} = d.file.getLineAndCharacterOfPosition(d.start ?? 0);
    const message = ts.flattenDiagnosticMessageText(d.messageText, "\n    ");
    if (!byOrigin.has(key)) byOrigin.set(key, []);
    byOrigin.get(key).push(`    line ${line + 1}: TS${d.code} ${message}`);
}

for (const p of problems) console.log(`EXTRACT  ${p}`);
for (const [key, list] of byOrigin) console.log(`${key}\n${list.join("\n")}`);

const failing = byOrigin.size;
console.log(`\n${snippets.length} snippets checked, ${failing} with type errors, ${problems.length} could not be read.`);
process.exit(failing || problems.length ? 1 : 0);
