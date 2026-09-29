import {useEffect, useRef, useState} from "react";
import type {KeyboardEvent, ReactNode} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {LuCalendarClock, LuCheck, LuCopy, LuMail, LuWebhook} from "react-icons/lu";

type Language = "ts" | "python" | "curl";
type FeatureId = "send" | "schedule" | "events";

interface Snippet {
    code: string;
    // 1-based line numbers to highlight for this feature.
    highlight: number[];
}

interface Feature {
    id: FeatureId;
    icon: ReactNode;
    title: string;
    body: string;
    snippets: Record<Language, Snippet>;
}

const languages: {id: Language; label: string; file: string}[] = [
    {id: "ts", label: "TypeScript", file: "send.ts"},
    {id: "python", label: "Python", file: "send.py"},
    {id: "curl", label: "cURL", file: "send.sh"},
];

const features: Feature[] = [
    {
        id: "send",
        icon: <LuMail className="h-4 w-4"/>,
        title: "Send with one call",
        body: "Pass a template and the data to fill it. We handle DKIM, retries and bounce suppression.",
        snippets: {
            ts: {
                code: `import { Relay } from "@relay/node";

const relay = new Relay(process.env.RELAY_KEY);

await relay.emails.send({
  from: "Acme <billing@acme.com>",
  to: "maya@example.com",
  template: "invoice-ready",
  data: { amount: "$240.00", due: "Nov 1" },
});`,
                highlight: [5, 6, 7, 8, 9, 10],
            },
            python: {
                code: `from relay import Relay
import os

relay = Relay(os.environ["RELAY_KEY"])

relay.emails.send(
    sender="Acme <billing@acme.com>",
    to="maya@example.com",
    template="invoice-ready",
    data={"amount": "$240.00", "due": "Nov 1"},
)`,
                highlight: [6, 7, 8, 9, 10, 11],
            },
            curl: {
                code: `curl https://api.relay.dev/v1/emails \\
  -H "Authorization: Bearer $RELAY_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "from": "Acme <billing@acme.com>",
    "to": "maya@example.com",
    "template": "invoice-ready"
  }'`,
                highlight: [1, 4, 5, 6, 7, 8],
            },
        },
    },
    {
        id: "schedule",
        icon: <LuCalendarClock className="h-4 w-4"/>,
        title: "Schedule for the right moment",
        body: "Send at a fixed time or in each recipient's local morning. Cancel any scheduled email until it leaves.",
        snippets: {
            ts: {
                code: `const email = await relay.emails.send({
  to: "maya@example.com",
  template: "trial-ending",
  sendAt: "2026-11-01T09:00",
  timezone: "recipient",
});

// Changed your mind?
await relay.emails.cancel(email.id);`,
                highlight: [4, 5, 8, 9],
            },
            python: {
                code: `email = relay.emails.send(
    to="maya@example.com",
    template="trial-ending",
    send_at="2026-11-01T09:00",
    timezone="recipient",
)

# Changed your mind?
relay.emails.cancel(email.id)`,
                highlight: [4, 5, 8, 9],
            },
            curl: {
                code: `curl https://api.relay.dev/v1/emails \\
  -H "Authorization: Bearer $RELAY_KEY" \\
  -d '{
    "to": "maya@example.com",
    "template": "trial-ending",
    "send_at": "2026-11-01T09:00",
    "timezone": "recipient"
  }'`,
                highlight: [6, 7],
            },
        },
    },
    {
        id: "events",
        icon: <LuWebhook className="h-4 w-4"/>,
        title: "React to every delivery event",
        body: "Signed webhooks tell you when an email is delivered, opened, bounced or marked as spam.",
        snippets: {
            ts: {
                code: `app.post("/webhooks/relay", async (req, res) => {
  const event = relay.webhooks.verify(
    req.body,
    req.headers["relay-signature"],
  );

  if (event.type === "email.bounced") {
    await markInvalid(event.data.to);
  }
  res.sendStatus(200);
});`,
                highlight: [2, 3, 4, 5, 7, 8, 9],
            },
            python: {
                code: `@app.post("/webhooks/relay")
def relay_webhook(request):
    event = relay.webhooks.verify(
        request.body,
        request.headers["relay-signature"],
    )

    if event.type == "email.bounced":
        mark_invalid(event.data["to"])
    return 200`,
                highlight: [3, 4, 5, 6, 8, 9],
            },
            curl: {
                code: `# Register an endpoint for bounce events
curl https://api.relay.dev/v1/webhooks \\
  -H "Authorization: Bearer $RELAY_KEY" \\
  -d '{
    "url": "https://acme.com/webhooks/relay",
    "events": ["email.bounced", "email.complained"]
  }'`,
                highlight: [5, 6],
            },
        },
    },
];

const KEYWORDS = new Set([
    "import", "from", "const", "await", "async", "new", "if", "return", "def", "function", "export", "curl",
]);

// A tiny highlighter: comments, strings, numbers and a short keyword list are enough for these samples.
const TOKEN = /((?<=^|\s)(?:\/\/|#).*|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`[^`]*`|\b\d+\b|\b[A-Za-z_]+\b|\$[A-Z_]+)/g;

const highlightLine = (line: string): ReactNode[] => {
    const parts: ReactNode[] = [];
    let last = 0;
    for (const match of line.matchAll(TOKEN)) {
        const token = match[0];
        const start = match.index ?? 0;
        if (start > last) parts.push(line.slice(last, start));
        let className = "";
        if (token.startsWith("//") || token.startsWith("#")) className = "text-slate-500 italic";
        else if (/^["'`]/.test(token)) className = "text-emerald-300";
        else if (/^\d/.test(token)) className = "text-amber-300";
        else if (token.startsWith("$")) className = "text-sky-300";
        else if (KEYWORDS.has(token)) className = "text-fuchsia-300";
        parts.push(className ? <span key={start} className={className}>{token}</span> : token);
        last = start + token.length;
    }
    if (last < line.length) parts.push(line.slice(last));
    return parts;
};

const CodeFeatures = () => {
    const [feature, setFeature] = useState<FeatureId>("send");
    const [language, setLanguage] = useState<Language>("ts");
    const [copied, setCopied] = useState(false);
    const timer = useRef<number | undefined>(undefined);
    const langRefs = useRef<(HTMLButtonElement | null)[]>([]);

    useEffect(() => () => window.clearTimeout(timer.current), []);

    const current = features.find((f) => f.id === feature) ?? features[0];
    const snippet = current.snippets[language];
    const lines = snippet.code.split("\n");
    const file = languages.find((l) => l.id === language)?.file ?? "";

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(snippet.code);
            setCopied(true);
            window.clearTimeout(timer.current);
            timer.current = window.setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopied(false);
        }
    };

    const onLanguageKey = (event: KeyboardEvent<HTMLDivElement>) => {
        const index = languages.findIndex((l) => l.id === language);
        let next = index;
        if (event.key === "ArrowRight") next = (index + 1) % languages.length;
        else if (event.key === "ArrowLeft") next = (index - 1 + languages.length) % languages.length;
        else return;
        event.preventDefault();
        setLanguage(languages[next].id);
        langRefs.current[next]?.focus();
    };

    return (
        <section className="w-full bg-slate-50 px-4 py-16 sm:px-8 sm:py-24 dark:bg-slate-950">
            <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                <div>
                    <p className="font-mono text-xs font-medium uppercase tracking-widest text-fuchsia-600 dark:text-fuchsia-400">Relay API</p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                        Transactional email in a few lines of code
                    </h2>
                    <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-400">
                        SDKs for Node, Python, Go and Ruby, plus a plain REST API. Pick a feature to see the code behind it.
                    </p>

                    <ul className="mt-8 space-y-2">
                        {features.map((f) => {
                            const selected = f.id === feature;
                            return (
                                <li key={f.id}>
                                    <button
                                        type="button"
                                        aria-pressed={selected}
                                        onClick={() => setFeature(f.id)}
                                        className={`relative w-full rounded-2xl border p-4 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-fuchsia-500 ${selected
                                            ? "border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
                                            : "border-transparent hover:bg-white/60 dark:hover:bg-slate-900/50"}`}
                                    >
                                        <span className="flex items-center gap-3">
                                            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${selected
                                                ? "bg-fuchsia-600 text-white"
                                                : "bg-slate-200/70 text-slate-500 dark:bg-slate-800 dark:text-slate-400"}`}>
                                                {f.icon}
                                            </span>
                                            <span className="font-medium text-slate-900 dark:text-white">{f.title}</span>
                                        </span>
                                        <AnimatePresence initial={false}>
                                            {selected && (
                                                <motion.span
                                                    initial={{height: 0, opacity: 0}}
                                                    animate={{height: "auto", opacity: 1}}
                                                    exit={{height: 0, opacity: 0}}
                                                    transition={{duration: 0.25, ease: [0.16, 1, 0.3, 1]}}
                                                    className="block overflow-hidden"
                                                >
                                                    <span className="block pl-11 pt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{f.body}</span>
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <div className="overflow-hidden rounded-2xl bg-slate-900 shadow-2xl shadow-slate-900/20 ring-1 ring-slate-900/10 dark:ring-white/10">
                    <div className="flex items-center justify-between gap-3 border-b border-white/10 pr-2">
                        <div role="tablist" aria-label="Language" onKeyDown={onLanguageKey} className="flex overflow-x-auto">
                            {languages.map((lang, i) => {
                                const selected = lang.id === language;
                                return (
                                    <button
                                        key={lang.id}
                                        ref={(el) => {
                                            langRefs.current[i] = el;
                                        }}
                                        type="button"
                                        role="tab"
                                        aria-selected={selected}
                                        aria-controls="code-features-panel"
                                        tabIndex={selected ? 0 : -1}
                                        onClick={() => setLanguage(lang.id)}
                                        className={`relative shrink-0 px-4 py-3 text-xs font-medium outline-none transition-colors focus-visible:bg-white/10 ${selected ? "text-white" : "text-slate-400 hover:text-slate-200"}`}
                                    >
                                        {lang.label}
                                        {selected && (
                                            <motion.span layoutId="code-features-tab" className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-fuchsia-400"/>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                        <button
                            type="button"
                            onClick={copy}
                            className="flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-300 outline-none transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-fuchsia-400"
                        >
                            {copied ? <LuCheck className="h-3.5 w-3.5 text-emerald-400"/> : <LuCopy className="h-3.5 w-3.5"/>}
                            <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
                        </button>
                    </div>

                    <div id="code-features-panel" role="tabpanel" aria-label={`${current.title} in ${file}`} className="relative">
                        <p className="px-4 pt-3 font-mono text-[11px] text-slate-500">{file}</p>
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.pre
                                key={`${feature}-${language}`}
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                                transition={{duration: 0.15}}
                                className="min-h-[300px] overflow-x-auto py-3 font-mono text-[13px] leading-6"
                            >
                                <code>
                                    {lines.map((line, i) => {
                                        const on = snippet.highlight.includes(i + 1);
                                        return (
                                            <span key={i} className={`flex min-w-max border-l-2 pr-6 transition-colors ${on
                                                ? "border-fuchsia-400 bg-fuchsia-400/10"
                                                : "border-transparent opacity-60"}`}>
                                                <span aria-hidden="true" className="w-10 shrink-0 select-none pr-4 text-right text-slate-600">{i + 1}</span>
                                                <span className="text-slate-200">{highlightLine(line)}</span>
                                            </span>
                                        );
                                    })}
                                </code>
                            </motion.pre>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CodeFeatures;
