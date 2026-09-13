"use client";

import { useState, useEffect, useRef } from "react";
import { Trophy, RefreshCw, Volume2, VolumeX, Sparkles, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BookData {
    id: string;
    title: string;
    subTitle: string;
    classLabel: string;
    subject: string;
    coverBg: string;
    coverAccent: string;
    totalPages: number;
    samplePages: Array<{
        chapter: string;
        heading: string;
        bodyText: string[];
        diagram?: string;
        doodle: string;
    }>;
}

const BOOKS: BookData[] = [
    {
        id: "ncert-math-10",
        title: "MATHEMATICS",
        subTitle: "Textbook for Class X",
        classLabel: "Class 10",
        subject: "NCERT",
        coverBg: "bg-[#7A3E1D]", // classic worn brown NCERT
        coverAccent: "border-[#4D240E]",
        totalPages: 348,
        samplePages: [
            {
                chapter: "CHAPTER 4 • QUADRATIC EQUATIONS",
                heading: "4.3 Solution of a Quadratic Equation by Factorisation",
                bodyText: [
                    "Consider the quadratic equation 2x² – 5x + 3 = 0. Let us factorise the middle term.",
                    "2x² – 2x – 3x + 3 = 0  =>  2x(x – 1) – 3(x – 1) = 0",
                    "Therefore, (2x – 3)(x – 1) = 0. The roots are x = 3/2 and x = 1.",
                    "Exercise 4.2: Find the dimensions of a prayer hall whose carpet area is 300m²."
                ],
                diagram: "📐 △ABC ~ △PQR | Area = ½ × b × h",
                doodle: "Pencil sketch: Rohit Sharma pull shot + 'KREO 2026'"
            },
            {
                chapter: "CHAPTER 8 • INTRODUCTION TO TRIGONOMETRY",
                heading: "8.2 Trigonometric Ratios",
                bodyText: [
                    "Let us take a right angled triangle ABC right angled at B.",
                    "sin A = (Side opposite to angle A) / Hypotenuse = BC / AC",
                    "cos A = (Side adjacent to angle A) / Hypotenuse = AB / AC",
                    "Remember: sin²θ + cos²θ = 1. (Always verify before board exams!)"
                ],
                diagram: "sin 0° = 0 | sin 30° = 1/2 | sin 45° = 1/√2 | sin 90° = 1",
                doodle: "Compass hole poked through page with ink bleeding"
            },
            {
                chapter: "CHAPTER 12 • AREAS RELATED TO CIRCLES",
                heading: "12.2 Perimeter and Area of a Circle — A Review",
                bodyText: [
                    "The distance covered by traveling once around a circle is its perimeter.",
                    "Circumference = 2πr = πd, where π ≈ 22/7 or 3.14159.",
                    "The great Indian mathematician Aryabhata gave an approximate value for π as 62832/20000 = 3.1416.",
                    "Example 3: Find the cost of fencing a circular field at ₹24 per metre."
                ],
                diagram: "⭕ Sector Area = (θ / 360°) × πr²",
                doodle: "Tick marks on questions: ✓Q1 ✓Q2 ✗Q5 (Pending HW)"
            }
        ]
    },
    {
        id: "classmate-rough",
        title: "CLASSMATE",
        subTitle: "6-Subject Spiral Bound Rough Notebook",
        classLabel: "Rough Copy",
        subject: "Blue Ruled Paper",
        coverBg: "bg-[#1E3A8A]", // iconic blue classmate cover
        coverAccent: "border-[#172554]",
        totalPages: 240,
        samplePages: [
            {
                chapter: "PHYSICS & CHEMISTRY ROUGH WORK",
                heading: "Ohm's Law & Circuit Diagram",
                bodyText: [
                    "V = I × R (Potential difference is directly proportional to current).",
                    "Slope of V-I graph gives resistance R.",
                    "Refractive index of glass with respect to air = 1.50.",
                    "Speed of light in glass = 3 × 10⁸ / 1.5 = 2 × 10⁸ m/s."
                ],
                diagram: "🔋 [ + | - ] ──/\/\/\──( A )──[ Key ]",
                doodle: "Blue Reynolds ballpoint flames + 'DHONI FINISHES OFF IN STYLE'"
            },
            {
                chapter: "BACKBENCHER TIK-TAC-TOE VAULT",
                heading: "Period 4 (Chemistry Lab Period Notes)",
                bodyText: [
                    "CuSO4 + Fe -> FeSO4 + Cu (Displacement Reaction).",
                    "Blue copper sulphate solution turns light green.",
                    "Brown coating deposited on iron nails.",
                    "Note: Practical exam viva on Tuesday. Don't forget lab coat!"
                ],
                diagram: "❌ | ⭕ | ❌ \n──┼───┼──\n ⭕ | ❌ | ⭕ \n──┼───┼──\n ⭕ | ❌ | ❌  (Bunty Won!)",
                doodle: "Caricature drawing of Chemistry teacher holding a test tube"
            }
        ]
    },
    {
        id: "rd-sharma-10",
        title: "MATHEMATICS (VOL. 1)",
        subTitle: "By Dr. R.D. Sharma — Comprehensive Edition",
        classLabel: "1200 Pages",
        subject: "The Weapon",
        coverBg: "bg-[#4A044E]", // heavy maroon/purple R.D. Sharma
        coverAccent: "border-[#2A022D]",
        totalPages: 1180,
        samplePages: [
            {
                chapter: "CHAPTER 14 • REAL NUMBERS & POLYNOMIALS",
                heading: "14.8 Euclid's Division Lemma (Advanced Problems)",
                bodyText: [
                    "Show that the square of any positive integer is of the form 3m or 3m + 1.",
                    "Let a be any positive integer and b = 3. By division algorithm, a = 3q + r where 0 ≤ r < 3.",
                    "Case I: a = 3q => a² = 9q² = 3(3q²) = 3m.",
                    "Case II: a = 3q + 1 => a² = (3q + 1)² = 9q² + 6q + 1 = 3m + 1.",
                    "Total 68 unsolved exercise problems follow."
                ],
                diagram: "Q.E.D. (Hence Proved) ★★★★★ (Important for Boards)",
                doodle: "Red ink double underline: 'DO NOT SKIP THIS QUESTION'"
            }
        ]
    }
];

export default function AuthenticBookCricket() {
    const [selectedBook, setSelectedBook] = useState<BookData>(BOOKS[0]);
    const [bookState, setBookState] = useState<"CLOSED" | "OPEN_IDLE" | "RIFFLING">("CLOSED");
    
    // Page flipping state
    const [displayedPage, setDisplayedPage] = useState<number>(142);
    const [activeSampleIndex, setActiveSampleIndex] = useState<number>(0);

    // Cricket Scorecard (Realistic hand-written tally)
    const [score, setScore] = useState(0);
    const [wickets, setWickets] = useState(0);
    const [balls, setBalls] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [inningsOver, setInningsOver] = useState(false);
    const [lastDelivery, setLastDelivery] = useState<{
        page: number;
        runs: number | "OUT";
        commentary: string;
        isBoundary: boolean;
    } | null>(null);

    const [tallyHistory, setTallyHistory] = useState<Array<{
        over: string;
        page: number;
        runs: number | "OUT";
        runningTotal: number;
    }>>([]);

    const riffleIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // Audio SFX synthesis using Web Audio API (Zero external assets needed)
    const audioCtxRef = useRef<AudioContext | null>(null);

    const playSound = (type: "FLIP" | "FOUR" | "SIX" | "WICKET" | "SINGLE") => {
        try {
            if (!audioCtxRef.current) {
                audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }
            const ctx = audioCtxRef.current;
            if (ctx.state === "suspended") ctx.resume();

            if (type === "FLIP") {
                // Paper rustle white-noise click
                const bufferSize = ctx.sampleRate * 0.04;
                const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
                const data = buffer.getChannelData(0);
                for (let i = 0; i < bufferSize; i++) {
                    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
                }
                const noise = ctx.createBufferSource();
                noise.buffer = buffer;
                const filter = ctx.createBiquadFilter();
                filter.type = "bandpass";
                filter.frequency.value = 1800;
                noise.connect(filter);
                filter.connect(ctx.destination);
                noise.start();
            } else if (type === "FOUR" || type === "SIX") {
                // Wooden bat sweet-spot crack
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "triangle";
                osc.frequency.setValueAtTime(type === "SIX" ? 380 : 320, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.18);
                gain.gain.setValueAtTime(0.35, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 0.2);
            } else if (type === "WICKET") {
                // Stumps crash dissonance
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "sawtooth";
                osc.frequency.setValueAtTime(160, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.3);
                gain.gain.setValueAtTime(0.4, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 0.35);
            }
        } catch (e) {}
    };

    // Load High Score
    useEffect(() => {
        const saved = localStorage.getItem("kreo_book_cricket_authentic_high");
        if (saved) setHighScore(parseInt(saved, 10));
    }, []);

    // Page Riffle loop
    useEffect(() => {
        if (bookState === "RIFFLING") {
            riffleIntervalRef.current = setInterval(() => {
                const randomP = Math.floor(Math.random() * (selectedBook.totalPages - 16)) + 12;
                setDisplayedPage(randomP);
                playSound("FLIP");
            }, 45); // 45ms rapid thumb flick
        } else {
            if (riffleIntervalRef.current) clearInterval(riffleIntervalRef.current);
        }
        return () => {
            if (riffleIntervalRef.current) clearInterval(riffleIntervalRef.current);
        };
    }, [bookState, selectedBook]);

    // Handle Open Book from Closed
    const handleOpenBook = () => {
        setBookState("OPEN_IDLE");
        setDisplayedPage(142);
        setActiveSampleIndex(0);
        playSound("FLIP");
    };

    // Start / Stop thumb riffle
    const handleThumbAction = () => {
        if (inningsOver) return;

        if (bookState === "OPEN_IDLE") {
            // Start flipping pages
            setBookState("RIFFLING");
            setLastDelivery(null);
        } else if (bookState === "RIFFLING") {
            // Slam thumb down on a page
            setBookState("OPEN_IDLE");
            const landedPage = displayedPage;
            setActiveSampleIndex(landedPage % selectedBook.samplePages.length);
            evaluateDelivery(landedPage);
        }
    };

    const evaluateDelivery = (pageNum: number) => {
        const lastDigit = pageNum % 10;
        let runs: number | "OUT" = 0;
        let commentary = "";
        let isBoundary = false;

        if (lastDigit === 0) {
            runs = "OUT";
            commentary = "BOWLED HIM! 💥 Ended in 0. Ball sneaks through the gate!";
            playSound("WICKET");
        } else if (lastDigit === 8) {
            runs = "OUT";
            commentary = "CAUGHT BEHIND! 🧤 Ended in 8. Faint edge to the keeper!";
            playSound("WICKET");
        } else if (lastDigit === 6) {
            runs = 6;
            isBoundary = true;
            commentary = "SIX! 🚀 Smashed over the cycle stand and onto the roof!";
            playSound("SIX");
        } else if (lastDigit === 4) {
            runs = 4;
            isBoundary = true;
            commentary = "FOUR! 🔥 Pierced the gap between third and fourth bench!";
            playSound("FOUR");
        } else if (lastDigit === 2) {
            runs = 2;
            commentary = "Tucked off the pads for 2 quick runs ⚡";
            playSound("SINGLE");
        } else if (lastDigit === 9) {
            runs = 0;
            commentary = "Dot Ball 🛡️ Forward defensive blocked right back.";
        } else {
            runs = 1;
            commentary = `Quick Single 🏃 (Page ended in ${lastDigit}).`;
            playSound("SINGLE");
        }

        const newBalls = balls + 1;
        setBalls(newBalls);

        if (runs === "OUT") {
            const newWickets = wickets + 1;
            setWickets(newWickets);
            setInningsOver(true);
            setLastDelivery({ page: pageNum, runs: "OUT", commentary, isBoundary: false });

            setTallyHistory(prev => [
                {
                    over: `${Math.floor(newBalls / 6)}.${newBalls % 6}`,
                    page: pageNum,
                    runs: "OUT",
                    runningTotal: score
                },
                ...prev
            ]);

            if (score > highScore) {
                setHighScore(score);
                localStorage.setItem("kreo_book_cricket_authentic_high", score.toString());
            }
        } else {
            const newScore = score + (runs as number);
            setScore(newScore);
            setLastDelivery({ page: pageNum, runs, commentary, isBoundary });

            setTallyHistory(prev => [
                {
                    over: `${Math.floor(newBalls / 6)}.${newBalls % 6}`,
                    page: pageNum,
                    runs,
                    runningTotal: newScore
                },
                ...prev
            ]);

            if (newScore > highScore) {
                setHighScore(newScore);
                localStorage.setItem("kreo_book_cricket_authentic_high", newScore.toString());
            }
        }
    };

    const handleRestartMatch = () => {
        setScore(0);
        setWickets(0);
        setBalls(0);
        setInningsOver(false);
        setLastDelivery(null);
        setTallyHistory([]);
        setBookState("OPEN_IDLE");
        setDisplayedPage(Math.floor(selectedBook.totalPages / 2));
    };

    const currentSample = selectedBook.samplePages[activeSampleIndex] || selectedBook.samplePages[0];

    return (
        <div className="min-h-screen bg-[#1c1815] text-[#2c241b] flex flex-col items-center justify-between p-3 sm:p-6 font-serif relative overflow-x-hidden selection:bg-amber-200">
            {/* VINTAGE CLASSROOM WOODEN DESK TEXTURE (SURFACE) */}
            <div 
                className="fixed inset-0 pointer-events-none opacity-40 z-0"
                style={{
                    backgroundImage: `radial-gradient(#3a2e26 1px, transparent 1px), linear-gradient(180deg, #181411 0%, #291e18 100%)`,
                    backgroundSize: '24px 24px, 100% 100%'
                }}
            />

            {/* TOP HEADER: NOSTALGIC STATUS */}
            <header className="relative z-10 w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between pb-3 border-b border-[#4a3b30] gap-2 text-amber-100/90 font-mono text-xs">
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                    <span className="tracking-widest font-bold uppercase">
                        PERIOD 5 • BACKBENCHER'S BOOK CRICKET 🏏
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-amber-300">
                        CLASS RECORD: <strong className="text-white text-sm">{highScore} RUNS</strong>
                    </span>
                    <span className="text-amber-500/60">•</span>
                    <span className="text-stone-400">CLASS X-B</span>
                </div>
            </header>

            {/* MAIN DESK PLAY AREA */}
            <main className="relative z-10 w-full max-w-5xl flex flex-col lg:flex-row items-center justify-center gap-8 my-auto py-6">
                
                {/* LEFT: SKEUOMORPHIC HAND-WRITTEN SCORECARD (ROUGH PAPER) */}
                <div className="w-full lg:w-72 bg-[#fdfcf7] text-[#1a1816] p-5 rounded shadow-[0_15px_35px_rgba(0,0,0,0.6)] border border-[#e2dccd] font-mono relative rotate-[-1.5deg] self-center">
                    {/* TAPE ON TOP */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#f3eddb]/90 border border-black/10 shadow-sm rotate-1" />

                    <div className="text-center pb-2 border-b-2 border-dashed border-[#1a1816]/30 mb-3">
                        <div className="text-[11px] font-bold tracking-widest text-[#1a1816]/60 uppercase">
                            OFFICIAL SCORECARD ✏️
                        </div>
                        <h2 className="text-2xl font-bold font-serif text-[#0f172a] mt-0.5">
                            {score} / {wickets}
                        </h2>
                        <div className="text-[10px] text-[#1a1816]/70 uppercase">
                            {balls} BALLS ({Math.floor(balls / 6)}.{balls % 6} OVERS) • SR: {balls > 0 ? ((score / balls) * 100).toFixed(0) : 0}
                        </div>
                    </div>

                    {/* LAST BALL CALLOUT */}
                    <div className="min-h-[52px] flex items-center justify-center text-center p-1.5 rounded bg-amber-50/80 border border-amber-200/80 mb-3">
                        {lastDelivery ? (
                            <div className="text-xs">
                                <span className={`font-bold font-serif text-sm ${lastDelivery.runs === 'OUT' ? 'text-red-700' : lastDelivery.isBoundary ? 'text-blue-800' : 'text-stone-800'}`}>
                                    {lastDelivery.runs === 'OUT' ? 'WICKET!' : `${lastDelivery.runs} RUNS`}
                                </span>
                                <div className="text-[10px] text-stone-600 leading-tight mt-0.5 font-sans">
                                    {lastDelivery.commentary}
                                </div>
                            </div>
                        ) : (
                            <span className="text-[11px] text-stone-400 italic">
                                {bookState === 'CLOSED' ? 'Open book to start match' : 'Hold thumb & release to flip'}
                            </span>
                        )}
                    </div>

                    {/* OVER-BY-OVER TALLY SCROLL */}
                    <div className="text-[11px] text-stone-600 mb-2 font-bold uppercase flex justify-between border-b border-black/10 pb-1">
                        <span>BALL (PAGE)</span>
                        <span>RUNS (TOTAL)</span>
                    </div>
                    <div className="max-h-36 overflow-y-auto space-y-1 text-xs pr-1 font-mono">
                        {tallyHistory.length === 0 ? (
                            <div className="text-[10px] text-stone-400 text-center py-4 italic">
                                No deliveries bowled yet.
                            </div>
                        ) : (
                            tallyHistory.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center py-0.5 border-b border-stone-100">
                                    <span className="text-stone-500">
                                        B{tallyHistory.length - idx} (p.{item.page})
                                    </span>
                                    <span className={`font-bold ${item.runs === 'OUT' ? 'text-red-600' : item.runs === 6 ? 'text-amber-700' : item.runs === 4 ? 'text-blue-700' : 'text-stone-800'}`}>
                                        {item.runs === 'OUT' ? 'W' : `+${item.runs}`} <span className="text-stone-400 font-normal">({item.runningTotal})</span>
                                    </span>
                                </div>
                            ))
                        )}
                    </div>

                    {/* RESTART BUTTON */}
                    {inningsOver && (
                        <button
                            onClick={handleRestartMatch}
                            className="w-full mt-4 py-2 bg-[#0f172a] text-white hover:bg-amber-600 transition-colors text-xs uppercase font-bold tracking-wider rounded shadow cursor-pointer flex items-center justify-center gap-1.5"
                        >
                            <RefreshCw size={12} /> Play Next Innings
                        </button>
                    )}
                </div>

                {/* CENTER: THE AUTHENTIC 3D BOOK ON DESK */}
                <div className="flex flex-col items-center">
                    
                    {/* CASE A: CLOSED BOOK (SKEUOMORPHIC VINTAGE COVER) */}
                    {bookState === "CLOSED" && (
                        <motion.div
                            initial={{ scale: 0.96 }}
                            animate={{ scale: 1 }}
                            whileHover={{ scale: 1.02 }}
                            onClick={handleOpenBook}
                            className={`w-72 sm:w-[380px] h-96 sm:h-[480px] ${selectedBook.coverBg} rounded-r-lg rounded-l-sm border-4 ${selectedBook.coverAccent} shadow-[20px_25px_50px_rgba(0,0,0,0.85)] p-8 flex flex-col justify-between text-amber-100 cursor-pointer relative group transition-transform`}
                        >
                            {/* SPINE CREASE ON LEFT */}
                            <div className="absolute top-0 bottom-0 left-0 w-5 bg-gradient-to-r from-black/40 via-transparent to-black/20 border-r border-black/30 rounded-l-sm" />

                            {/* WORN GOLD EMBOSSED EMBLEM */}
                            <div className="text-center mt-4">
                                <div className="w-14 h-14 mx-auto rounded-full border-2 border-amber-300/60 flex items-center justify-center text-amber-300 mb-3 opacity-90">
                                    🏛️
                                </div>
                                <div className="text-[10px] tracking-[0.25em] font-mono text-amber-200/80 uppercase">
                                    NATIONAL COUNCIL OF EDUCATIONAL RESEARCH
                                </div>
                                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-amber-100 tracking-wide mt-3 drop-shadow-md">
                                    {selectedBook.title}
                                </h1>
                                <p className="text-xs font-serif italic text-amber-200/90 mt-1">
                                    {selectedBook.subTitle}
                                </p>
                            </div>

                            {/* BOTTOM VINTAGE LABELS */}
                            <div className="text-center border-t border-amber-300/30 pt-4">
                                <div className="text-[11px] font-mono text-amber-200/90 uppercase tracking-widest">
                                    {selectedBook.totalPages} PAGES • BOARD CURRICULUM
                                </div>
                                <div className="mt-4 px-4 py-2 bg-amber-400 text-black font-mono font-bold text-xs uppercase tracking-widest rounded shadow group-hover:bg-amber-300 transition-colors animate-pulse">
                                    📖 Click to Open Textbook
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* CASE B: OPEN VINTAGE TEXTBOOK WITH PAGE RIFFLE PHYSICS */}
                    {bookState !== "CLOSED" && (
                        <div className="relative">
                            {/* THE OPEN BOOK STRUCTURE */}
                            <div className="w-80 sm:w-[580px] h-[360px] sm:h-[440px] bg-[#fdfaf2] text-[#221c16] rounded-sm shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-[#d6cfbe] flex relative overflow-hidden">
                                
                                {/* DEEP BOOK SPINE CREASE */}
                                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-black/25 via-black/40 to-black/25 pointer-events-none z-20 shadow-inner" />

                                {/* LEFT PAGE: CHAPTER HEADING & THEOREMS */}
                                <div className="w-1/2 p-4 sm:p-6 pr-6 sm:pr-8 flex flex-col justify-between border-r border-[#e5decb] relative">
                                    <div>
                                        <div className="text-[9px] font-mono uppercase tracking-wider text-stone-500 border-b border-stone-300 pb-1 mb-2">
                                            {currentSample.chapter}
                                        </div>
                                        <h3 className="font-serif font-bold text-sm sm:text-base text-stone-900 leading-tight mb-2">
                                            {currentSample.heading}
                                        </h3>
                                        <div className="space-y-1.5 text-[10px] sm:text-xs text-stone-700 leading-relaxed font-serif">
                                            {currentSample.bodyText.map((paragraph, i) => (
                                                <p key={i}>{paragraph}</p>
                                            ))}
                                        </div>
                                        {currentSample.diagram && (
                                            <div className="mt-3 p-1.5 bg-stone-100 border border-stone-300 rounded text-[9px] sm:text-[10px] font-mono text-stone-800">
                                                {currentSample.diagram}
                                            </div>
                                        )}
                                    </div>

                                    {/* BOTTOM LEFT PAGE NUMBER */}
                                    <div className="flex justify-between items-end text-[10px] font-mono text-stone-500 border-t border-stone-300 pt-1 mt-2">
                                        <span>{Math.max(1, displayedPage - 1)}</span>
                                        <span className="text-[9px] italic text-stone-400">NCERT Class X</span>
                                    </div>
                                </div>

                                {/* RIGHT PAGE: THE ACTION SCORING PAGE */}
                                <div className="w-1/2 p-4 sm:p-6 pl-6 sm:pl-8 flex flex-col justify-between relative bg-gradient-to-l from-[#faf6eb] to-[#fdfaf2]">
                                    <div>
                                        <div className="text-[9px] font-mono uppercase tracking-wider text-stone-500 text-right border-b border-stone-300 pb-1 mb-2">
                                            EXERCISE & PROBLEMS
                                        </div>

                                        {/* PENCIL MARGIN DOODLE */}
                                        <div className="p-2 rounded bg-amber-100/60 border border-amber-300/60 text-[10px] sm:text-xs text-stone-800 font-sans italic my-2">
                                            ✏️ {currentSample.doodle}
                                        </div>

                                        {/* ACTIVE FLIPPING MOTION VISUAL */}
                                        <div className="my-auto text-center py-4">
                                            {bookState === "RIFFLING" ? (
                                                <div className="space-y-1">
                                                    <div className="text-3xl sm:text-4xl font-mono font-bold tracking-widest text-amber-800 animate-pulse">
                                                        p. {displayedPage}
                                                    </div>
                                                    <div className="text-[10px] font-mono text-stone-500 uppercase tracking-widest animate-bounce">
                                                        Flicking Pages...
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="space-y-1">
                                                    <div className="text-xs font-mono uppercase tracking-widest text-stone-400">
                                                        Landed On
                                                    </div>
                                                    <div className="text-4xl sm:text-5xl font-mono font-bold text-stone-900 tracking-wider">
                                                        Page {displayedPage}
                                                    </div>
                                                    <div className="text-xs font-mono text-amber-900 font-bold uppercase mt-1">
                                                        Last Digit: <span className="text-xl text-red-700 bg-amber-200/80 px-2 py-0.5 rounded">{displayedPage % 10}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* BOTTOM RIGHT PAGE NUMBER (REAL NOSTALGIA POSITION) */}
                                    <div className="flex justify-between items-end text-[11px] font-mono font-bold text-stone-800 border-t border-stone-300 pt-1 mt-2">
                                        <span className="text-[9px] text-stone-400 font-normal">Classroom Recess</span>
                                        <span className="text-sm text-stone-900 bg-stone-200/80 px-1.5 rounded">
                                            p. {displayedPage}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* FLIP CONTROLS */}
                            <div className="mt-6 flex flex-col items-center gap-3">
                                <button
                                    onClick={handleThumbAction}
                                    disabled={inningsOver}
                                    className={`w-72 sm:w-80 py-4 uppercase font-mono tracking-widest text-base sm:text-lg font-bold transition-all shadow-[0_10px_25px_rgba(0,0,0,0.5)] rounded cursor-pointer ${
                                        inningsOver
                                            ? "bg-stone-700 text-stone-400 cursor-not-allowed"
                                            : bookState === "RIFFLING"
                                            ? "bg-red-600 hover:bg-red-500 text-white animate-pulse shadow-red-500/50"
                                            : "bg-amber-500 hover:bg-amber-400 text-stone-950"
                                    }`}
                                >
                                    {bookState === "RIFFLING" ? "🛑 SLAM THUMB DOWN!" : "📖 FLIP PAGES (HOLD & RELEASE)"}
                                </button>
                                <p className="text-[11px] font-mono text-amber-200/60 uppercase">
                                    Last digit of page: 2, 4, 6 = Runs • 1, 3, 5, 7 = Single • 0 or 8 = OUT
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* RIGHT: TEXTBOOK SWITCHER */}
                <div className="w-full lg:w-60 flex flex-col gap-2.5 font-mono text-xs text-amber-100">
                    <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider mb-1">
                        [SWITCH TEXTBOOK / WEAPON]
                    </span>
                    {BOOKS.map((b) => (
                        <button
                            key={b.id}
                            onClick={() => {
                                setSelectedBook(b);
                                setBookState("CLOSED");
                                setInningsOver(false);
                                setScore(0);
                                setBalls(0);
                                setWickets(0);
                                setTallyHistory([]);
                                setLastDelivery(null);
                            }}
                            className={`p-3 rounded border text-left transition-all cursor-pointer ${
                                selectedBook.id === b.id
                                    ? "bg-amber-500/20 border-amber-400 text-white font-bold shadow-md"
                                    : "bg-black/30 border-[#4a3b30] text-stone-400 hover:border-stone-400 hover:text-stone-200"
                            }`}
                        >
                            <div className="text-[10px] text-amber-400 uppercase">{b.classLabel} • {b.totalPages}p</div>
                            <div className="font-serif text-sm text-stone-100 mt-0.5">{b.title}</div>
                            <div className="text-[10px] text-stone-400 italic mt-0.5">{b.subject}</div>
                        </button>
                    ))}
                </div>
            </main>

            {/* BOTTOM NOSTALGIC FOOTER */}
            <footer className="relative z-10 text-[11px] font-mono text-amber-200/50 uppercase tracking-widest pb-2 text-center">
                Strict School Recess Rules: No peaking at pages beforehand • 0 & 8 are immediate dismissals.
            </footer>
        </div>
    );
}
