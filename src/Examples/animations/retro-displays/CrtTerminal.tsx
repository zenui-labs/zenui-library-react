import {useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";
import type {FormEvent, KeyboardEvent} from "react";
import {AnimatePresence, motion, useInView, useReducedMotion} from "framer-motion";
import {LuPower} from "react-icons/lu";

export interface TerminalFile {
    name: string;
    /** Shown as a trailing slash in `ls`. */
    directory?: boolean;
}

export interface CrtTerminalProps {
    /** Name in the BIOS banner and on the case. */
    machine?: string;
    user?: string;
    host?: string;
    /** What `ls` prints. */
    files?: TerminalFile[];
    /** Kilobytes counted by the memory test. */
    memoryKb?: number;
    phosphor?: "green" | "amber";
    className?: string;
}

interface Line {
    id: number;
    text: string;
    kind: "out" | "cmd" | "err";
}

const PHOSPHOR = {
    green: {
        text: "#8dffa6",
        dim: "#46b865",
        glow: "0 0 1px rgba(160,255,180,0.9), 0 0 6px rgba(60,255,110,0.55), 0 0 14px rgba(40,255,90,0.25), -0.6px 0 rgba(255,40,90,0.18), 0.6px 0 rgba(40,160,255,0.18)",
        face: "#061009",
        bar: "rgba(120,255,150,0.05)",
    },
    amber: {
        text: "#ffc164",
        dim: "#b77c24",
        glow: "0 0 1px rgba(255,220,160,0.9), 0 0 6px rgba(255,170,40,0.55), 0 0 14px rgba(255,150,20,0.25), -0.6px 0 rgba(255,40,90,0.18), 0.6px 0 rgba(40,160,255,0.18)",
        face: "#100a04",
        bar: "rgba(255,190,100,0.05)",
    },
};

const COMMANDS = ["help", "ls", "date", "whoami", "echo", "clear"];

const formatDate = (date: Date) => {
    const day = date.toLocaleDateString("en-US", {weekday: "short"});
    const month = date.toLocaleDateString("en-US", {month: "short"});
    const time = date.toLocaleTimeString("en-GB", {hour12: false});
    return `${day} ${month} ${String(date.getDate()).padStart(2, " ")} ${time} ${date.getFullYear()}`;
};

/**
 * A CRT terminal that boots with a memory test and then takes real commands: help, ls, date, whoami, echo and
 * clear, with up and down for history. The power button collapses the picture to a line, then a fading dot.
 */
export const CrtTerminal = ({
    machine = "Kestrel 386",
    user = "guest",
    host = "kestrel",
    files = [],
    memoryKb = 4096,
    phosphor = "green",
    className = "",
}: CrtTerminalProps) => {
    const caseRef = useRef<HTMLDivElement>(null);
    const screenRef = useRef<HTMLDivElement>(null);
    const outputRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const inView = useInView(caseRef, {once: true, amount: 0.4});
    const reduceMotion = useReducedMotion() ?? false;
    const colors = PHOSPHOR[phosphor];

    const [power, setPower] = useState(false);
    const [ready, setReady] = useState(false);
    const [lines, setLines] = useState<Line[]>([]);
    const [value, setValue] = useState("");
    const [focused, setFocused] = useState(false);
    const [fontSize, setFontSize] = useState(13);
    const history = useRef<string[]>([]);
    const historyIndex = useRef(-1);
    const nextId = useRef(0);

    const prompt = `${user}@${host}:~$`;

    const push = useCallback((text: string, kind: Line["kind"] = "out") => {
        setLines((current) => [...current, {id: nextId.current++, text, kind}]);
    }, []);
    const replaceLast = useCallback((text: string) => {
        setLines((current) => [...current.slice(0, -1), {...current[current.length - 1], text}]);
    }, []);

    // The screen is sized in em, so one font size keeps roughly 46 columns across at any width.
    useLayoutEffect(() => {
        const node = screenRef.current;
        if (!node) return;
        const observer = new ResizeObserver(([entry]) => setFontSize(Math.max(9, Math.min(15, entry.contentRect.width / 44))));
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    // Switch on by itself the first time it scrolls into view.
    useEffect(() => {
        if (inView) setPower(true);
    }, [inView]);

    // The boot script. Every await checks `cancelled`, so switching off mid-boot stops it cleanly.
    useEffect(() => {
        if (!power) return;
        let cancelled = false;
        const wait = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, reduceMotion ? 0 : ms));

        const boot = async () => {
            setLines([]);
            setReady(false);
            await wait(700);
            const script: [string, number][] = [
                [`${machine.toUpperCase()} BIOS v2.41  (C) 1989`, 260],
                ["CPU 80386DX-33   FPU not installed", 320],
            ];
            for (const [text, pause] of script) {
                if (cancelled) return;
                push(text);
                await wait(pause);
            }
            if (cancelled) return;
            push("Memory test: 0K");
            for (let kb = 0; kb <= memoryKb; kb += reduceMotion ? memoryKb : 128) {
                if (cancelled) return;
                replaceLast(`Memory test: ${kb}K`);
                await wait(18);
            }
            if (cancelled) return;
            replaceLast(`Memory test: ${memoryKb}K OK`);
            await wait(380);
            const drives: [string, number][] = [
                ["IDE0 master .. 42 MB  820 cyl 6 hd 17 sec", 420],
                ["IDE0 slave ... none", 260],
                ["", 120],
            ];
            for (const [text, pause] of drives) {
                if (cancelled) return;
                push(text);
                await wait(pause);
            }
            if (cancelled) return;
            push("Booting from C:");
            for (let dot = 1; dot <= 4; dot += 1) {
                await wait(220);
                if (cancelled) return;
                replaceLast(`Booting from C:${" .".repeat(dot)}`);
            }
            await wait(300);
            if (cancelled) return;
            push("");
            push(`${host} login: `);
            for (const char of user) {
                await wait(90 + Math.random() * 90);
                if (cancelled) return;
                setLines((current) => [...current.slice(0, -1), {...current[current.length - 1], text: current[current.length - 1].text + char}]);
            }
            await wait(400);
            if (cancelled) return;
            push(`Last login: ${formatDate(new Date(Date.now() - 86_400_000 * 2.3))} on tty1`);
            push(`Type "help" to see what this machine can do.`);
            push("");
            setReady(true);
        };
        boot();
        return () => {
            cancelled = true;
        };
    }, [power, machine, host, user, memoryKb, reduceMotion, push, replaceLast]);

    useLayoutEffect(() => {
        const node = outputRef.current;
        if (node) node.scrollTop = node.scrollHeight;
    }, [lines, value]);

    const run = (raw: string) => {
        const input = raw.trim();
        push(`${prompt} ${raw}`, "cmd");
        if (!input) return;
        history.current = [input, ...history.current].slice(0, 30);
        const [command, ...args] = input.split(/\s+/);
        switch (command.toLowerCase()) {
            case "help":
                push("Available commands:");
                push("  help    this list");
                push("  ls      list files in the home directory");
                push("  date    print the date and time");
                push("  whoami  print the current user");
                push("  echo    print the text that follows");
                push("  clear   clear the screen");
                break;
            case "ls": {
                if (!files.length) break;
                const names = files.map((file) => (file.directory ? `${file.name}/` : file.name));
                const width = Math.max(...names.map((name) => name.length)) + 2;
                for (let index = 0; index < names.length; index += 3) {
                    push(names.slice(index, index + 3).map((name) => name.padEnd(width, " ")).join("").trimEnd());
                }
                break;
            }
            case "date":
                push(formatDate(new Date()));
                break;
            case "whoami":
                push(user);
                break;
            case "echo":
                push(args.join(" "));
                break;
            case "clear":
                setLines([]);
                break;
            default:
                push(`${command}: command not found`, "err");
        }
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (!ready) return;
        run(value);
        setValue("");
        historyIndex.current = -1;
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        // The cursor always sits at the end, as on a real line terminal, so left and right do nothing.
        if (event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === "Home") {
            event.preventDefault();
        } else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
            event.preventDefault();
            const next = Math.max(-1, Math.min(history.current.length - 1, historyIndex.current + (event.key === "ArrowUp" ? 1 : -1)));
            historyIndex.current = next;
            setValue(next === -1 ? "" : history.current[next]);
        } else if (event.key === "Tab") {
            const match = COMMANDS.find((command) => value && command.startsWith(value));
            if (match) {
                event.preventDefault();
                setValue(match);
            }
        } else if (event.key === "l" && event.ctrlKey) {
            event.preventDefault();
            setLines([]);
        }
    };

    const togglePower = () => {
        if (!power) setLines([]);
        setPower(!power);
        setValue("");
    };

    // Power on: a dot stretches into a line, then the line opens into the full picture. Power off runs it
    // backwards, faster, with a brightness spike as the beam energy concentrates.
    const screenAnimation = reduceMotion
        ? {opacity: power ? 1 : 0}
        : power
            ? {scaleX: [0.003, 1, 1], scaleY: [0.004, 0.004, 1], opacity: [0, 1, 1], filter: ["brightness(3)", "brightness(2.2)", "brightness(1)"]}
            : {scaleX: [1, 1, 0.003], scaleY: [1, 0.004, 0.004], opacity: [1, 1, 0], filter: ["brightness(1)", "brightness(2.6)", "brightness(4)"]};

    return (
        <div
            ref={caseRef}
            className={`w-full max-w-[640px] rounded-[28px] bg-gradient-to-b from-[#ece6d6] to-[#d3cab4] p-[3.5%] shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_-2px_0_rgba(0,0,0,0.08)_inset,0_30px_50px_-30px_rgba(60,50,30,0.55)] dark:from-[#2e2d2b] dark:to-[#1d1c1b] dark:shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_30px_60px_-30px_rgba(0,0,0,0.95)] ${className}`}
        >
            <style>{`
                @keyframes crt-roll { from { transform: translateY(-30%); } to { transform: translateY(430%); } }
                @keyframes crt-flicker { 0%, 100% { opacity: 1; } 50% { opacity: 0.975; } }
                @keyframes crt-cursor { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
                .crt-roll { animation: crt-roll 7s linear infinite; }
                .crt-flicker { animation: crt-flicker 0.12s steps(2, end) infinite; }
                .crt-cursor { animation: crt-cursor 1.06s steps(1, end) infinite; }
                @media (prefers-reduced-motion: reduce) { .crt-roll, .crt-flicker, .crt-cursor { animation: none; } }
            `}</style>

            {/* Deep bezel around the tube. */}
            <div className="rounded-[20px] bg-gradient-to-b from-[#c9c0a9] to-[#b5ab92] p-[3%] shadow-[inset_0_3px_10px_rgba(0,0,0,0.35),0_1px_0_rgba(255,255,255,0.7)] dark:from-[#1a1a19] dark:to-[#111110] dark:shadow-[inset_0_3px_12px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.06)]">
                <div
                    ref={screenRef}
                    onClick={() => inputRef.current?.focus()}
                    className="relative aspect-[4/3] cursor-text overflow-hidden rounded-[7%/9%] bg-[#0b0d0c] shadow-[inset_0_0_0_2px_rgba(0,0,0,0.9)]"
                >
                    <motion.div
                        initial={false}
                        animate={screenAnimation}
                        transition={reduceMotion ? {duration: 0.2} : {duration: power ? 0.55 : 0.38, times: [0, power ? 0.45 : 0.55, 1], ease: power ? [0.2, 0.7, 0.2, 1] : [0.7, 0, 0.9, 0.4]}}
                        className="absolute inset-0 origin-center"
                        style={{backgroundColor: colors.face}}
                    >
                        <div
                            ref={outputRef}
                            role="log"
                            aria-live="polite"
                            aria-busy={!ready}
                            aria-label={`${machine} terminal output`}
                            style={{fontSize, color: colors.text, textShadow: colors.glow}}
                            className="crt-flicker absolute inset-0 overflow-y-auto whitespace-pre-wrap break-words px-[7%] py-[6%] font-mono leading-[1.35] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                        >
                            {lines.map((line) => (
                                <div key={line.id} style={line.kind === "err" ? {color: colors.dim} : undefined}>
                                    {line.text || " "}
                                </div>
                            ))}
                            <form onSubmit={handleSubmit} className={ready ? "" : "sr-only"}>
                                <label className="flex">
                                    <span className="sr-only">Command</span>
                                    <span aria-hidden="true" className="whitespace-pre-wrap break-all">
                                        {`${prompt} ${value}`}
                                        <span
                                            className={`ml-px inline-block h-[1.1em] w-[0.6em] translate-y-[0.18em] ${focused ? "crt-cursor" : "border border-current bg-transparent"}`}
                                            style={focused ? {backgroundColor: colors.text, boxShadow: `0 0 8px ${colors.text}`} : undefined}
                                        />
                                    </span>
                                    <input
                                        ref={inputRef}
                                        value={value}
                                        onChange={(event) => setValue(event.target.value)}
                                        onKeyDown={handleKeyDown}
                                        onFocus={() => setFocused(true)}
                                        onBlur={() => setFocused(false)}
                                        disabled={!ready || !power}
                                        autoComplete="off"
                                        autoCapitalize="off"
                                        autoCorrect="off"
                                        spellCheck={false}
                                        // 16px stops iOS from zooming the page when the hidden field takes focus.
                                        style={{fontSize: 16}}
                                        className="absolute h-px w-px opacity-0"
                                    />
                                </label>
                            </form>
                        </div>
                    </motion.div>

                    {/* After switch-off the beam parks in the middle and the phosphor lets go slowly. */}
                    <AnimatePresence>
                        {!power && !reduceMotion && lines.length > 0 && (
                            <motion.span
                                key="afterglow"
                                aria-hidden="true"
                                className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                                style={{backgroundColor: "#fff", boxShadow: `0 0 10px 4px ${colors.text}, 0 0 30px 10px ${colors.bar}`}}
                                initial={{opacity: 0, scale: 1}}
                                animate={{opacity: [0, 1, 0], scale: [1, 1, 0.4]}}
                                exit={{opacity: 0}}
                                transition={{duration: 1.6, delay: 0.3, times: [0, 0.08, 1], ease: "easeOut"}}
                            />
                        )}
                    </AnimatePresence>

                    {/* Glass: scanlines, a slow rolling refresh band, vignette for the curved face, and a window reflection. */}
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 [background-image:repeating-linear-gradient(0deg,rgba(0,0,0,0.28)_0px,rgba(0,0,0,0.28)_1px,transparent_1px,transparent_3px)]"/>
                    {power && (
                        <div aria-hidden="true" className="crt-roll pointer-events-none absolute inset-x-0 top-0 h-1/4" style={{background: `linear-gradient(to bottom, transparent, ${colors.bar} 60%, transparent)`}}/>
                    )}
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55)_100%)]"/>
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0_0_40px_rgba(0,0,0,0.75),inset_0_0_4px_rgba(0,0,0,0.9)]"/>
                    <div aria-hidden="true" className="pointer-events-none absolute -left-[10%] -top-[20%] h-[60%] w-[70%] rotate-[-12deg] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.07),transparent_65%)]"/>
                </div>
            </div>

            {/* Chin: badge on the left, power switch and LED on the right. */}
            <div className="mt-[3%] flex items-center justify-between px-1">
                <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.32em] text-[#8a8069] dark:text-zinc-500">{machine}</span>
                <div className="flex items-center gap-3">
                    <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full transition-[background-color,box-shadow] duration-300"
                        style={{backgroundColor: power ? "#4ade80" : "#3f3f3a", boxShadow: power ? "0 0 6px 1px rgba(74,222,128,0.8)" : "none"}}
                    />
                    <button
                        type="button"
                        onClick={togglePower}
                        aria-pressed={power}
                        aria-label="Power"
                        className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-b from-[#f4efe2] to-[#d9d0bb] text-[#7a715c] shadow-[0_2px_0_#a99f86,0_3px_6px_rgba(0,0,0,0.2)] outline-none transition-[transform,box-shadow] duration-75 active:translate-y-[2px] active:shadow-[0_0_0_#a99f86] focus-visible:ring-2 focus-visible:ring-emerald-500 dark:from-[#3a3936] dark:to-[#2a2927] dark:text-zinc-400 dark:shadow-[0_2px_0_#111,0_3px_6px_rgba(0,0,0,0.5)] dark:active:shadow-[0_0_0_#111]"
                    >
                        <LuPower className="h-3.5 w-3.5" aria-hidden="true"/>
                    </button>
                </div>
            </div>
        </div>
    );
};
