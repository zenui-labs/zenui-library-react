#!/usr/bin/env node
// Type-check only the given folders (plus whatever they import), using the project tsconfig.
//   node scripts/typecheck-dir.mjs src/Components/Overview/SidebarContent/Content/Inputs [more...]
// Faster and lighter than `npm run typecheck` when several people work on different folders.
import fs from "node:fs";
import path from "node:path";
import {createRequire} from "node:module";

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const ts = createRequire(path.join(ROOT, "package.json"))("typescript");
const dirs = process.argv.slice(2);
if (!dirs.length) {
    console.error("Pass one or more folders.");
    process.exit(2);
}

const config = ts.getParsedCommandLineOfConfigFile(path.join(ROOT, "tsconfig.json"), {}, {...ts.sys, onUnRecoverableConfigFileDiagnostic: () => {}});
const inDirs = (f) => dirs.some((d) => path.resolve(f).startsWith(path.resolve(ROOT, d) + path.sep) || path.resolve(f) === path.resolve(ROOT, d));
const extra = config.fileNames.filter((f) => f.endsWith(".d.ts"));
const roots = [...config.fileNames.filter(inDirs), ...extra];

const program = ts.createProgram(roots, config.options);
const diagnostics = ts.getPreEmitDiagnostics(program).filter((d) => d.file && inDirs(d.file.fileName));
for (const d of diagnostics) {
    const {line, character} = d.file.getLineAndCharacterOfPosition(d.start ?? 0);
    console.log(`${path.relative(ROOT, d.file.fileName)}(${line + 1},${character + 1}): TS${d.code} ${ts.flattenDiagnosticMessageText(d.messageText, " ")}`);
}
console.log(`\n${roots.length - extra.length} files checked, ${diagnostics.length} errors.`);
process.exit(diagnostics.length ? 1 : 0);
