"use client";

import { useState, useEffect, useRef } from "react";
import { Trophy, RefreshCw, Volume2, Sparkles, BookOpen, Users, User, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- TEXTBOOK PRESETS ---
interface TextbookOption {
    id: string;
    code: string;
    title: string;
    hindiTitle: string;
    subTitle: string;
    subject: string;
    coverColor: string;
    accentBorder: string;
    symbolEmoji: string;
    totalPages: number;
    samplePages: Array<{
        chapterNum: string;
        chapterHindi: string;
        chapterEnglish: string;
        sectionTitle: string;
        contentParagraphs: string[];
        formulaBox: string;
        roughDoodle: string;
    }>;
}

const TEXTBOOKS: TextbookOption[] = [
    {
        id: "ncert-math-10",
        code: "1062",
        title: "MATHEMATICS",
        hindiTitle: "गणित",
        subTitle: "Textbook for Class X",
        subject: "Central Board of Secondary Education (CBSE)",
        coverColor: "from-[#8B3A2B] via-[#68271B] to-[#3B140E]",
        accentBorder: "border-[#D97706]",
        symbolEmoji: "📐",
        totalPages: 348,
        samplePages: [
            {
                chapterNum: "CHAPTER 4",
                chapterHindi: "द्विघात समीकरण",
                chapterEnglish: "QUADRATIC EQUATIONS",
                sectionTitle: "4.3 Solution of a Quadratic Equation by Factorisation",
                contentParagraphs: [
                    "Let us consider the quadratic equation 2x² – 5x + 3 = 0.",
                    "Splitting the middle term: 2x² – 2x – 3x + 3 = 0",
                    "=> 2x(x – 1) – 3(x – 1) = 0 => (2x – 3)(x – 1) = 0",
                    "Hence the roots are x = 3/2 and x = 1.",
                    "Exercise 4.2: Find two consecutive positive integers, sum of whose squares is 365."
                ],
                formulaBox: "Discriminant: D = b² - 4ac | Roots: x = (-b ± √D) / 2a",
                roughDoodle: "Pencil: Rohit 264* + compass needle puncture in corner"
            },
            {
                chapterNum: "CHAPTER 8",
                chapterHindi: "त्रिकोणमिति का परिचय",
                chapterEnglish: "INTRODUCTION TO TRIGONOMETRY",
                sectionTitle: "8.2 Trigonometric Ratios of Some Specific Angles",
                contentParagraphs: [
                    "In right triangle ABC right-angled at B:",
                    "sin A = Opposite Side / Hypotenuse = BC / AC",
                    "cos A = Adjacent Side / Hypotenuse = AB / AC",
                    "tan A = sin A / cos A = BC / AB",
                    "Theorem 8.1: In any △ABC, sin²θ + cos²θ = 1 for 0° ≤ θ ≤ 90°."
                ],
                formulaBox: "sin 30° = 1/2 | sin 45° = 1/√2 | sin 60° = √3/2 | tan 45° = 1",
                roughDoodle: "Blue ink FLAMES grid (F-L-A-M-E-S) with classmate names crossed out"
            },
            {
                chapterNum: "CHAPTER 12",
                chapterHindi: "वृत्तों से संबंधित क्षेत्रफल",
                chapterEnglish: "AREAS RELATED TO CIRCLES",
                sectionTitle: "12.2 Area of Sector and Segment of a Circle",
                contentParagraphs: [
                    "The region bounded by two radii and the arc is called a sector.",
                    "Area of sector of angle θ = (θ / 360°) × πr²",
                    "Length of an arc of a sector of angle θ = (θ / 360°) × 2πr",
                    "Where π is taken as 22/7 unless stated otherwise."
                ],
                formulaBox: "Perimeter = 2πr | Area of Circle = πr² | Segment Area = Sector - Triangle",
                roughDoodle: "Tic-Tac-Toe drawn with 0.5mm Natraj pencil"
            }
        ]
    },
    {
        id: "ncert-science-10",
        code: "1064",
        title: "SCIENCE",
        hindiTitle: "विज्ञान",
        subTitle: "Textbook for Class X",
        subject: "Central Board of Secondary Education (CBSE)",
        coverColor: "from-[#1E3A8A] via-[#172554] to-[#0F172A]",
        accentBorder: "border-[#3B82F6]",
        symbolEmoji: "🧬",
        totalPages: 298,
        samplePages: [
            {
                chapterNum: "CHAPTER 1",
                chapterHindi: "रासायनिक अभिक्रियाएं एवं समीकरण",
                chapterEnglish: "CHEMICAL REACTIONS AND EQUATIONS",
                sectionTitle: "1.2 Types of Chemical Reactions (Combustion & Displacement)",
                contentParagraphs: [
                    "When magnesium ribbon burns in air with a dazzling white flame, it changes into a white powder of Magnesium Oxide.",
                    "2Mg (s) + O₂ (g) —> 2MgO (s)",
                    "Displacement Reaction: Fe (s) + CuSO₄ (aq) —> FeSO₄ (aq) + Cu (s)",
                    "The blue colour of copper sulphate solution fades and turns light green."
                ],
                formulaBox: "Activity 1.3: Take zinc granules in a conical flask, add dil. HCl -> H₂ gas evolved with 'pop' sound.",
                roughDoodle: "Sketch of Bunsen burner with huge flames + 'PERIOD 3 OVER!'"
            },
            {
                chapterNum: "CHAPTER 10",
                chapterHindi: "प्रकाश – परावर्तन तथा अपवर्तन",
                chapterEnglish: "LIGHT – REFLECTION AND REFRACTION",
                sectionTitle: "10.3 Refraction of Light & Snell's Law",
                contentParagraphs: [
                    "The ratio of sine of angle of incidence to sine of angle of refraction is a constant, for the light of a given colour.",
                    "sin i / sin r = constant = n₂₁",
                    "This constant value is called the refractive index of the second medium with respect to the first.",
                    "Absolute refractive index of glass = 1.52, Water = 1.33, Diamond = 2.42."
                ],
                formulaBox: "Mirror formula: 1/v + 1/u = 1/f | Lens formula: 1/v - 1/u = 1/f",
                roughDoodle: "Compass poke holes right through the center of Snell's prism"
            }
        ]
    },
    {
        id: "ncert-english-10",
        code: "1059",
        title: "FIRST FLIGHT",
        hindiTitle: "प्रथम उड़ान",
        subTitle: "Textbook in English for Class X",
        subject: "National Council of Educational Research and Training",
        coverColor: "from-[#14532D] via-[#0F3921] to-[#052E16]",
        accentBorder: "border-[#22C55E]",
        symbolEmoji: "🕊️",
        totalPages: 162,
        samplePages: [
            {
                chapterNum: "PROSE 1",
                chapterHindi: "ईश्वर के नाम पत्र",
                chapterEnglish: "A LETTER TO GOD",
                sectionTitle: "By Gregorio López y Fuentes",
                contentParagraphs: [
                    "The house — the only one in the entire valley — sat on the crest of a low hill.",
                    "From this height one could see the river and the field of ripe corn dotted with the flowers.",
                    "All through the night, Lencho thought only of his one hope: the help of God, whose eyes see everything.",
                    "'God,' he wrote, 'if you don't help me, my family and I will go hungry this year. I need a hundred pesos.'"
                ],
                formulaBox: "Vocabulary: Crest (Top of a hill) | Downpour (Heavy rain) | Solitary (Single, isolated)",
                roughDoodle: "Blue Reynolds ink stamp doodle + 'KREO 4 LIFE'"
            }
        ]
    }
];

export default function BookCricketPage() {
    // 1v1 Pass & Play State
    const [maxWickets, setMaxWickets] = useState<number>(3);
    const [currentInnings, setCurrentInnings] = useState<1 | 2>(1);
    const [p1Name, setP1Name] = useState("Player 1 (Desk Left)");
    const [p2Name, setP2Name] = useState("Player 2 (Desk Right)");
    
    // Innings 1 data
    const [p1Runs, setP1Runs] = useState(0);
    const [p1Wickets, setP1Wickets] = useState(0);
    const [p1Balls, setP1Balls] = useState(0);
    const [p1History, setP1History] = useState<Array<{ page: number; run: number | string; commentary: string }>>([]);

    // Innings 2 data
    const [p2Runs, setP2Runs] = useState(0);
    const [p2Wickets, setP2Wickets] = useState(0);
    const [p2Balls, setP2Balls] = useState(0);
    const [p2History, setP2History] = useState<Array<{ page: number; run: number | string; commentary: string }>>([]);

    // Match Flow State
    const [matchState, setMatchState] = useState<"innings1" | "inningsBreak" | "innings2" | "matchOver">("innings1");
    const [winner, setWinner] = useState<string | null>(null);

    // Textbook & Physics State
    const [selectedBook, setSelectedBook] = useState<TextbookOption>(TEXTBOOKS[0]);
    const [isBookOpen, setIsBookOpen] = useState<boolean>(false);
    const [isFlipping, setIsFlipping] = useState<boolean>(false);
    const [currentPageNum, setCurrentPageNum] = useState<number>(1);
    const [lastOutcome, setLastOutcome] = useState<{ page: number; run: number | string; commentary: string; badge: string } | null>(null);

    // Audio Context Synthesizer
    const audioCtxRef = useRef<AudioContext | null>(null);

    const playSfx = (type: "rustle" | "boundary" | "wicket" | "single") => {
        try {
            if (!audioCtxRef.current) {
                const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
                audioCtxRef.current = new AudioContextClass();
            }
            const ctx = audioCtxRef.current;
            if (ctx.state === "suspended") ctx.resume();

            const now = ctx.currentTime;
            if (type === "rustle") {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "sawtooth";
                osc.frequency.setValueAtTime(180, now);
                osc.frequency.exponentialRampToValueAtTime(40, now + 0.08);
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.linearRampToValueAtTime(0.01, now + 0.08);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.08);
            } else if (type === "boundary") {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "triangle";
                osc.frequency.setValueAtTime(320, now);
                osc.frequency.exponentialRampToValueAtTime(640, now + 0.15);
                gain.gain.setValueAtTime(0.3, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.25);
            } else if (type === "wicket") {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "square";
                osc.frequency.setValueAtTime(140, now);
                osc.frequency.exponentialRampToValueAtTime(30, now + 0.35);
                gain.gain.setValueAtTime(0.35, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(now);
                osc.stop(now + 0.35);
            }
        } catch {
            // Audio ignore
        }
    };

    // Riffle Interval
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isFlipping) {
            interval = setInterval(() => {
                const randomPage = Math.floor(Math.random() * (selectedBook.totalPages - 4)) + 4;
                setCurrentPageNum(randomPage);
                playSfx("rustle");
            }, 45);
        }
        return () => clearInterval(interval);
    }, [isFlipping, selectedBook.totalPages]);

    // Flip Trigger
    const startFlip = () => {
        if (!isBookOpen) setIsBookOpen(true);
        if (matchState === "matchOver" || matchState === "inningsBreak") return;
        setIsFlipping(true);
    };

    // Stop and Evaluate Page Outcome
    const stopFlipAndScore = () => {
        if (!isFlipping) return;
        setIsFlipping(false);

        // Landed page
        const landedPage = Math.floor(Math.random() * (selectedBook.totalPages - 4)) + 4;
        setCurrentPageNum(landedPage);

        // Rule of Book Cricket: Last digit determines outcome
        const lastDigit = landedPage % 10;
        let runScored: number | string = 0;
        let commentary = "";
        let badge = "";

        if (lastDigit === 0 || lastDigit === 8) {
            runScored = "OUT!";
            commentary = lastDigit === 0 ? "Clean Bowled! Middle stump uprooted! 💥" : "Caught at deep mid-wicket! 🧤";
            badge = "bg-red-600 text-white";
            playSfx("wicket");
        } else if (lastDigit === 6) {
            runScored = 6;
            commentary = "MASSIVE SIX! Cleared the school boundary wall! 🚀";
            badge = "bg-purple-600 text-white";
            playSfx("boundary");
        } else if (lastDigit === 4) {
            runScored = 4;
            commentary = "CRACKING FOUR! Pierced the cover gap! 🔥";
            badge = "bg-amber-500 text-black";
            playSfx("boundary");
        } else if (lastDigit === 2) {
            runScored = 2;
            commentary = "Quick double! Great running between wickets ⚡";
            badge = "bg-emerald-600 text-white";
            playSfx("rustle");
        } else {
            runScored = 1;
            commentary = "Single taken, rotating the strike 🏃";
            badge = "bg-blue-600 text-white";
            playSfx("rustle");
        }

        setLastOutcome({ page: landedPage, run: runScored, commentary, badge });

        // Update Innings 1 or Innings 2
        if (currentInnings === 1) {
            const nextBalls = p1Balls + 1;
            let nextRuns = p1Runs;
            let nextWickets = p1Wickets;

            if (runScored === "OUT!") {
                nextWickets += 1;
            } else {
                nextRuns += Number(runScored);
            }

            setP1Balls(nextBalls);
            setP1Runs(nextRuns);
            setP1Wickets(nextWickets);
            setP1History((prev) => [{ page: landedPage, run: runScored, commentary }, ...prev]);

            if (nextWickets >= maxWickets) {
                setMatchState("inningsBreak");
                setCurrentInnings(2);
                setIsBookOpen(false);
            }
        } else if (currentInnings === 2) {
            const nextBalls = p2Balls + 1;
            let nextRuns = p2Runs;
            let nextWickets = p2Wickets;

            if (runScored === "OUT!") {
                nextWickets += 1;
            } else {
                nextRuns += Number(runScored);
            }

            setP2Balls(nextBalls);
            setP2Runs(nextRuns);
            setP2Wickets(nextWickets);
            setP2History((prev) => [{ page: landedPage, run: runScored, commentary }, ...prev]);

            // Check chase win or all out
            const target = p1Runs + 1;
            if (nextRuns >= target) {
                setMatchState("matchOver");
                setWinner(`${p2Name} Won by ${maxWickets - nextWickets} Wickets! 🏆`);
            } else if (nextWickets >= maxWickets) {
                setMatchState("matchOver");
                if (nextRuns === p1Runs) {
                    setWinner("Match Tied! Super Over needed! 🤝");
                } else {
                    setWinner(`${p1Name} Won by ${p1Runs - nextRuns} Runs! 🏆`);
                }
            }
        }
    };

    const startInnings2 = () => {
        setMatchState("innings2");
        setIsBookOpen(true);
        setLastOutcome(null);
    };

    const resetFullMatch = () => {
        setP1Runs(0);
        setP1Wickets(0);
        setP1Balls(0);
        setP1History([]);
        setP2Runs(0);
        setP2Wickets(0);
        setP2Balls(0);
        setP2History([]);
        setCurrentInnings(1);
        setMatchState("innings1");
        setWinner(null);
        setIsBookOpen(false);
        setIsFlipping(false);
        setLastOutcome(null);
    };

    const samplePageData = selectedBook.samplePages[currentPageNum % selectedBook.samplePages.length];
    const targetScore = p1Runs + 1;
    const runsNeeded = targetScore - p2Runs;

    return (
        <main className="min-h-screen bg-[#1c1612] text-zinc-100 flex flex-col items-center justify-start p-3 sm:p-6 select-none relative overflow-x-hidden font-sans">
            {/* Wooden Classroom Desk Surface */}
            <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(#4a2b13_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Top Match Bar */}
            <header className="w-full max-w-5xl z-10 flex flex-wrap items-center justify-between gap-3 border-b border-amber-900/40 pb-4 mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-xl shadow-inner">
                        🏏
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-amber-100 font-serif">
                                BOOK CRICKET 1v1 DUAL
                            </h1>
                            <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
                                👥 Pass & Play Mode
                            </span>
                        </div>
                        <p className="text-xs text-amber-300/70 font-mono">
                            NCERT & CBSE 90s Recess Desk Match
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 bg-black/40 border border-amber-900/40 px-3 py-1.5 rounded-lg text-xs font-mono">
                        <span className="text-zinc-400">Match Format:</span>
                        <select
                            disabled={p1Balls > 0}
                            value={maxWickets}
                            onChange={(e) => setMaxWickets(Number(e.target.value))}
                            className="bg-transparent text-amber-300 font-bold outline-none cursor-pointer"
                        >
                            <option value={1} className="bg-zinc-900">1 Wicket (Quick Sudden Death)</option>
                            <option value={3} className="bg-zinc-900">3 Wickets (Standard Recess)</option>
                            <option value={5} className="bg-zinc-900">5 Wickets (Full Period Match)</option>
                        </select>
                    </div>
                    <button
                        onClick={resetFullMatch}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-950/40 border border-red-800/40 text-red-300 hover:bg-red-900/40 text-xs font-semibold transition"
                    >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Reset Match
                    </button>
                </div>
            </header>

            {/* Innings Target Banner */}
            {currentInnings === 2 && matchState === "innings2" && (
                <div className="w-full max-w-5xl z-10 mb-4 bg-gradient-to-r from-amber-950/80 via-purple-950/80 to-amber-950/80 border border-amber-500/40 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm font-mono shadow-xl">
                    <div className="flex items-center gap-2">
                        <span className="animate-pulse text-amber-400 font-bold">🎯 TARGET: {targetScore} RUNS</span>
                        <span className="text-zinc-400">|</span>
                        <span>{p2Name} needs <strong className="text-purple-300 text-base">{runsNeeded > 0 ? runsNeeded : 0} runs</strong> to win!</span>
                    </div>
                    <div className="text-amber-200">
                        Wickets in hand: <strong className="text-amber-400">{maxWickets - p2Wickets}</strong>
                    </div>
                </div>
            )}

            {/* Main Desk Stage */}
            <div className="w-full max-w-5xl z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                
                {/* LEFT SCORECARD: Torn School Paper */}
                <div className="lg:col-span-4 bg-[#fbf5e6] text-[#241f19] rounded-xl p-4 sm:p-5 shadow-2xl border border-amber-900/40 relative font-serif transform -rotate-1 transition hover:rotate-0">
                    {/* Scotch tape on top */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-amber-200/40 backdrop-blur-sm border border-amber-300/30 -rotate-2 rounded shadow-sm pointer-events-none" />

                    <div className="border-b-2 border-dashed border-[#d5c3aa] pb-3 mb-3">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-mono tracking-widest text-[#8a684b] uppercase font-bold">
                                CLASSROOM SCORECARD
                            </span>
                            <span className="text-[10px] font-mono text-[#a58467]">
                                Period 4 • Desk #7
                            </span>
                        </div>
                    </div>

                    {/* Innings 1 Tab */}
                    <div className={`p-3 rounded-lg mb-3 border ${currentInnings === 1 ? 'bg-amber-100/80 border-amber-600/60 shadow-sm' : 'bg-transparent border-stone-300 opacity-85'}`}>
                        <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-1.5 font-bold text-sm text-[#3b2314]">
                                <User className="w-3.5 h-3.5 text-amber-700" />
                                <span>{p1Name} (1st Innings)</span>
                            </div>
                            {currentInnings === 1 && <span className="px-1.5 py-0.5 rounded bg-amber-600 text-white text-[9px] font-mono font-bold">BATTING</span>}
                        </div>
                        <div className="flex items-baseline justify-between font-mono">
                            <div className="text-2xl font-black text-[#6d2518]">
                                {p1Runs} <span className="text-sm font-normal text-stone-600">/ {p1Wickets}</span>
                            </div>
                            <div className="text-xs text-stone-600">
                                Balls: <span className="font-bold text-black">{p1Balls}</span> | SR: <span className="font-bold text-black">{p1Balls > 0 ? ((p1Runs / p1Balls) * 100).toFixed(0) : 0}</span>
                            </div>
                        </div>
                    </div>

                    {/* Innings 2 Tab */}
                    <div className={`p-3 rounded-lg border ${currentInnings === 2 ? 'bg-purple-100/90 border-purple-600/60 shadow-sm' : 'bg-transparent border-stone-300 opacity-85'}`}>
                        <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-1.5 font-bold text-sm text-[#271033]">
                                <Users className="w-3.5 h-3.5 text-purple-700" />
                                <span>{p2Name} (2nd Innings)</span>
                            </div>
                            {currentInnings === 2 && matchState === "innings2" && <span className="px-1.5 py-0.5 rounded bg-purple-600 text-white text-[9px] font-mono font-bold">CHASING</span>}
                        </div>
                        <div className="flex items-baseline justify-between font-mono">
                            <div className="text-2xl font-black text-[#431407]">
                                {p2Runs} <span className="text-sm font-normal text-stone-600">/ {p2Wickets}</span>
                            </div>
                            <div className="text-xs text-stone-600">
                                Balls: <span className="font-bold text-black">{p2Balls}</span> | Target: <span className="font-bold text-purple-900">{p1Balls > 0 ? targetScore : "-"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Ball-by-ball ledger */}
                    <div className="mt-4 pt-3 border-t border-dashed border-[#d5c3aa]">
                        <span className="text-[11px] font-mono text-[#8a684b] uppercase font-bold block mb-2">
                            RECENT BALLS (BALL-BY-BALL)
                        </span>
                        <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto">
                            {(currentInnings === 1 ? p1History : p2History).slice(0, 14).map((h, idx) => (
                                <span
                                    key={idx}
                                    className={`px-2 py-0.5 rounded text-xs font-mono font-bold shadow-sm ${
                                        h.run === 6 ? 'bg-purple-600 text-white' :
                                        h.run === 4 ? 'bg-amber-600 text-white' :
                                        h.run === "OUT!" ? 'bg-red-600 text-white' :
                                        'bg-[#ece3cf] text-[#413327]'
                                    }`}
                                >
                                    p.{h.page} → {h.run}
                                </span>
                            ))}
                            {(currentInnings === 1 ? p1History : p2History).length === 0 && (
                                <span className="text-xs italic text-stone-400 font-sans">No balls bowled yet. Click Flip to start!</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* CENTER: Skeuomorphic Textbook & Desk Area */}
                <div className="lg:col-span-8 flex flex-col items-center">
                    
                    {/* MATCH BREAK / VICTORY OVERLAY */}
                    <AnimatePresence>
                        {matchState === "inningsBreak" && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-full bg-gradient-to-br from-[#2a1b11] to-[#1a0f08] border-2 border-amber-500 rounded-2xl p-6 sm:p-8 text-center shadow-2xl mb-6 z-20"
                            >
                                <div className="text-4xl mb-2">🔔</div>
                                <h2 className="text-2xl font-black text-amber-200 font-serif mb-1">
                                    INNINGS BREAK!
                                </h2>
                                <p className="text-amber-400 font-mono text-sm mb-4">
                                    {p1Name} scored <strong className="text-xl text-white">{p1Runs}/{p1Wickets}</strong>
                                </p>
                                <div className="bg-black/50 border border-amber-900/60 rounded-xl p-4 max-w-md mx-auto mb-6">
                                    <p className="text-xs text-zinc-300 font-mono mb-1">PASS THE TEXTBOOK TO</p>
                                    <p className="text-lg font-bold text-purple-300 font-serif">{p2Name}</p>
                                    <p className="text-xs text-amber-400 mt-2 font-mono">
                                        TARGET TO WIN: <strong>{targetScore} RUNS</strong>
                                    </p>
                                </div>
                                <button
                                    onClick={startInnings2}
                                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-amber-600 text-white font-bold text-sm tracking-wide hover:from-purple-500 hover:to-amber-500 shadow-xl flex items-center gap-2 mx-auto transition transform hover:scale-105"
                                >
                                    <span>START 2ND INNINGS (CHASE TARGET)</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </motion.div>
                        )}

                        {matchState === "matchOver" && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-full bg-gradient-to-br from-[#2e190a] to-[#120904] border-2 border-amber-400 rounded-2xl p-6 sm:p-8 text-center shadow-2xl mb-6 z-20"
                            >
                                <div className="text-5xl mb-3">🏆</div>
                                <h2 className="text-2xl sm:text-3xl font-black text-amber-200 font-serif mb-2">
                                    {winner}
                                </h2>
                                <p className="text-xs sm:text-sm text-zinc-300 font-mono mb-6">
                                    Final Score: {p1Name} ({p1Runs}/{p1Wickets}) vs {p2Name} ({p2Runs}/{p2Wickets})
                                </p>
                                <button
                                    onClick={resetFullMatch}
                                    className="px-6 py-3 rounded-xl bg-amber-600 text-black font-black text-sm tracking-wider hover:bg-amber-500 shadow-xl flex items-center gap-2 mx-auto transition transform hover:scale-105"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    <span>PLAY REMATCH (NEW INNINGS)</span>
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* THE PHYSICAL TEXTBOOK */}
                    <div className="w-full relative flex justify-center py-4">
                        {!isBookOpen ? (
                            /* CLOSED TEXTBOOK COVER */
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setIsBookOpen(true)}
                                className={`w-full max-w-lg aspect-[3/4] rounded-r-2xl rounded-l-md bg-gradient-to-r ${selectedBook.coverColor} p-6 sm:p-8 shadow-2xl border-2 ${selectedBook.accentBorder} flex flex-col justify-between cursor-pointer relative overflow-hidden group transform hover:-rotate-1 transition-all`}
                            >
                                {/* Spine crease on left */}
                                <div className="absolute left-0 top-0 bottom-0 w-7 bg-gradient-to-r from-black/60 via-black/20 to-transparent border-r border-black/30" />
                                <div className="absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-l from-black/40 to-transparent" />

                                {/* Top Header */}
                                <div className="pl-6">
                                    <div className="flex items-center justify-between text-amber-400/90 text-xs font-mono font-bold tracking-widest uppercase mb-1">
                                        <span>CODE {selectedBook.code}</span>
                                        <span>{selectedBook.symbolEmoji} CLASS X</span>
                                    </div>
                                    <p className="text-[11px] text-zinc-300 tracking-wide font-serif">
                                        {selectedBook.subject}
                                    </p>
                                </div>

                                {/* Main Title */}
                                <div className="pl-6 text-center my-auto">
                                    <span className="text-xl sm:text-2xl text-amber-300/90 font-serif font-bold block mb-1">
                                        {selectedBook.hindiTitle}
                                    </span>
                                    <h2 className="text-3xl sm:text-5xl font-black text-white font-serif tracking-tight drop-shadow-md">
                                        {selectedBook.title}
                                    </h2>
                                    <p className="text-xs sm:text-sm text-zinc-300 italic mt-2 font-serif">
                                        {selectedBook.subTitle}
                                    </p>
                                </div>

                                {/* Bottom Publisher Seal */}
                                <div className="pl-6 flex items-center justify-between text-[10px] text-zinc-400 font-mono pt-4 border-t border-white/10">
                                    <span>NCERT / राष्ट्रीय शैक्षिक अनुसंधान</span>
                                    <span className="text-amber-400 group-hover:underline flex items-center gap-1 font-bold">
                                        CLICK TO OPEN BOOK 📖
                                    </span>
                                </div>
                            </motion.div>
                        ) : (
                            /* OPEN TEXTBOOK SPREAD WITH SKEUOMORPHIC HAND FLIPPER */
                            <div className="w-full max-w-2xl bg-[#faf5e8] text-[#1c1917] rounded-xl shadow-2xl border-4 border-[#3d2616] p-4 sm:p-8 relative font-serif min-h-[380px] flex flex-col justify-between">
                                {/* Spine fold shadow in center */}
                                <div className="absolute left-1/2 top-0 bottom-0 w-8 -translate-x-1/2 bg-gradient-to-r from-black/15 via-black/5 to-black/15 pointer-events-none" />

                                {/* Chapter Header */}
                                <div className="border-b border-[#d8c8b4] pb-3 mb-3">
                                    <div className="flex items-center justify-between text-xs font-mono text-[#8a684b]">
                                        <span>{samplePageData.chapterNum}</span>
                                        <span>{samplePageData.chapterHindi} / {samplePageData.chapterEnglish}</span>
                                    </div>
                                    <h3 className="text-base sm:text-lg font-bold text-[#45220a] mt-1">
                                        {samplePageData.sectionTitle}
                                    </h3>
                                </div>

                                {/* Authentic NCERT Exercises & Math Text */}
                                <div className="space-y-2 text-xs sm:text-sm text-[#2c241c] leading-relaxed my-auto pr-8">
                                    {samplePageData.contentParagraphs.map((para, i) => (
                                        <p key={i}>{para}</p>
                                    ))}
                                    <div className="bg-[#ede4ce] border border-[#cfbe9f] p-2.5 rounded text-xs font-mono text-[#3a2f26] my-2">
                                        <strong>Key Theorem:</strong> {samplePageData.formulaBox}
                                    </div>
                                </div>

                                {/* Margin Scribble */}
                                <div className="mt-3 pt-2 border-t border-dashed border-[#d8c8b4] flex items-center justify-between text-[11px] font-mono text-[#825c38]">
                                    <span className="italic">✏️ Margin: {samplePageData.roughDoodle}</span>
                                </div>

                                {/* BOTTOM RIGHT: The Authentic Page Number + Animated Kid Thumb */}
                                <div className="absolute bottom-4 right-6 flex items-center gap-3">
                                    <div className="text-right">
                                        <span className="text-[10px] font-mono uppercase text-stone-500 block">PAGE</span>
                                        <span className="text-2xl sm:text-3xl font-black font-serif text-[#7c2d12] tracking-tighter">
                                            {currentPageNum}
                                        </span>
                                    </div>

                                    {/* Kid's Animated Hand Thumb */}
                                    <motion.div
                                        animate={isFlipping ? { x: [0, -3, 2, -2, 0], rotate: [-1, 2, -2, 1] } : {}}
                                        transition={{ repeat: Infinity, duration: 0.08 }}
                                        className="w-12 h-14 bg-[#d4a373] rounded-t-full border-2 border-[#8a5a36] shadow-lg relative flex items-center justify-center cursor-pointer transform -rotate-12"
                                    >
                                        {/* Blue Ink Reynolds Stain on Thumb */}
                                        <div className="w-3.5 h-3.5 bg-blue-700/80 rounded-full blur-[1px] absolute top-2 right-2" />
                                        <span className="text-[9px] font-bold text-[#4a2e1b] font-mono transform rotate-12 mt-4">
                                            THUMB
                                        </span>
                                    </motion.div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* INTERACTIVE FLIP CONTROLS */}
                    <div className="w-full max-w-lg mt-4 flex flex-col gap-3 items-center">
                        {matchState !== "inningsBreak" && matchState !== "matchOver" && (
                            <div className="w-full flex gap-3">
                                {!isFlipping ? (
                                    <button
                                        onClick={startFlip}
                                        className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-black font-black text-sm sm:text-base tracking-wider shadow-xl transition transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        <Sparkles className="w-5 h-5" />
                                        <span>FLIP PAGES WITH THUMB (HOLD & RUN)</span>
                                    </button>
                                ) : (
                                    <button
                                        onClick={stopFlipAndScore}
                                        className="w-full py-4 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:from-red-500 hover:to-red-400 text-white font-black text-base sm:text-lg tracking-wider shadow-2xl animate-pulse transition transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        <span>🛑 SLAM THUMB DOWN! (STOP PAGE)</span>
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Recent Ball Outcome Callout */}
                        {lastOutcome && (
                            <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="w-full bg-black/60 border border-amber-900/60 rounded-xl p-3 flex items-center justify-between gap-3 text-xs font-mono"
                            >
                                <div className="flex items-center gap-2">
                                    <span className={`px-2 py-0.5 rounded font-black text-xs ${lastOutcome.badge}`}>
                                        {lastOutcome.run}
                                    </span>
                                    <span className="text-zinc-300">{lastOutcome.commentary}</span>
                                </div>
                                <span className="text-stone-400">Page {lastOutcome.page}</span>
                            </motion.div>
                        )}
                    </div>

                    {/* TEXTBOOK SELECTOR TABS */}
                    <div className="w-full max-w-lg mt-6 pt-4 border-t border-amber-900/40 flex items-center justify-between gap-2 overflow-x-auto">
                        <span className="text-xs font-mono text-zinc-400 uppercase">Change Book:</span>
                        <div className="flex gap-2">
                            {TEXTBOOKS.map((book) => (
                                <button
                                    key={book.id}
                                    onClick={() => {
                                        setSelectedBook(book);
                                        setIsBookOpen(false);
                                    }}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                                        selectedBook.id === book.id
                                            ? 'bg-amber-600 text-black shadow-md'
                                            : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                                    }`}
                                >
                                    {book.symbolEmoji} {book.title} ({book.code})
                                </button>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
