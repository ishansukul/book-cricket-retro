"use client";

import { useState, useEffect, useRef } from "react";
import { Trophy, RefreshCw, Volume2, Sparkles, BookOpen, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface OfficialNcertBook {
    id: string;
    code: string;
    title: string;
    hindiTitle: string;
    subTitle: string;
    subject: string;
    coverColor: string; // Tailwind gradient / color
    accentBorder: string;
    symbolEmoji: string;
    totalPages: number;
    samplePages: Array<{
        chapterNum: string;
        chapterHindi: string;
        chapterEnglish: string;
        sectionTitle: string;
        contentParagraphs: string[];
        formulaBox?: string;
        roughDoodle: string;
    }>;
}

const OFFICIAL_BOOKS: OfficialNcertBook[] = [
    {
        id: "ncert-maths-10",
        code: "1062",
        title: "MATHEMATICS",
        hindiTitle: "गणित",
        subTitle: "Textbook for Class X",
        subject: "Central Board of Secondary Education (CBSE)",
        coverColor: "from-[#8B3A1C] via-[#6B280E] to-[#4A1806]", // Official Class 10 Math Brown/Rust
        accentBorder: "border-[#A04522]",
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
        coverColor: "from-[#1E3A8A] via-[#172554] to-[#0F172A]", // Official Science Deep Blue
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
                    "Light travels along a straight line in a transparent medium.",
                    "When light travels from rarer to denser medium, it bends towards the normal.",
                    "Snell's Law: The ratio of sine of angle of incidence to sine of angle of refraction is a constant.",
                    "sin i / sin r = constant = n₂₁ (Refractive Index)"
                ],
                formulaBox: "Mirror Formula: 1/v + 1/u = 1/f | Lens Formula: 1/v - 1/u = 1/f",
                roughDoodle: "Ray diagram sketch with sunglasses drawn on the focal point"
            }
        ]
    },
    {
        id: "ncert-english-10",
        code: "1059",
        title: "FIRST FLIGHT",
        hindiTitle: "प्रथम उड़ान",
        subTitle: "Textbook in English for Class X",
        subject: "Central Board of Secondary Education (CBSE)",
        coverColor: "from-[#065F46] via-[#044E3B] to-[#022C22]", // Official English Forest Green
        accentBorder: "border-[#10B981]",
        symbolEmoji: "🕊️",
        totalPages: 184,
        samplePages: [
            {
                chapterNum: "PROSE 1",
                chapterHindi: "एक पत्र भगवान के नाम",
                chapterEnglish: "A LETTER TO GOD",
                sectionTitle: "By G.L. Fuentes — The Story of Lencho",
                contentParagraphs: [
                    "The house — the only one in the entire valley — sat on the crest of a low hill.",
                    "Throughout the morning Lencho — who knew his fields intimately — had done nothing else but see the sky towards the north-east.",
                    "'Now we're really going to get some water, woman.'",
                    "The postmaster — a fat, amiable fellow — also broke out laughing, but almost immediately he turned serious: 'What faith! I wish I had the faith of the man who wrote this letter.'"
                ],
                formulaBox: "Moral: Unshakable faith in God and innocence of rural farmers.",
                roughDoodle: "Reynolds 045 blue ink bird drawing flying off the margin"
            }
        ]
    }
];

export default function SuperAuthenticBookCricket() {
    const [selectedBook, setSelectedBook] = useState<OfficialNcertBook>(OFFICIAL_BOOKS[0]);
    const [bookState, setBookState] = useState<"CLOSED" | "OPEN" | "FLIPPING">("CLOSED");
    
    // Page state
    const [displayedPage, setDisplayedPage] = useState<number>(142);
    const [samplePageIndex, setSamplePageIndex] = useState<number>(0);

    // Scorecard state
    const [score, setScore] = useState(0);
    const [wickets, setWickets] = useState(0);
    const [balls, setBalls] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [matchEnded, setMatchEnded] = useState(false);
    
    const [lastAction, setLastAction] = useState<{
        page: number;
        runs: number | "OUT";
        commentary: string;
        label: string;
        isBoundary: boolean;
    } | null>(null);

    const [ballLogs, setBallLogs] = useState<Array<{
        ballNum: number;
        page: number;
        runs: number | "OUT";
        scoreAfter: number;
        desc: string;
    }>>([]);

    const flipTimerRef = useRef<NodeJS.Timeout | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);

    // Dynamic Sound Synthesis
    const playNostalgiaSound = (type: "FLICK" | "FOUR" | "SIX" | "WICKET" | "SINGLE") => {
        try {
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }
            const ctx = audioContextRef.current;
            if (ctx.state === "suspended") ctx.resume();

            if (type === "FLICK") {
                // Crisp paper flutter rustle
                const bufferSize = ctx.sampleRate * 0.035;
                const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
                const data = buffer.getChannelData(0);
                for (let i = 0; i < bufferSize; i++) {
                    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
                }
                const noise = ctx.createBufferSource();
                noise.buffer = buffer;
                const filter = ctx.createBiquadFilter();
                filter.type = "bandpass";
                filter.frequency.value = 2200;
                noise.connect(filter);
                filter.connect(ctx.destination);
                noise.start();
            } else if (type === "FOUR" || type === "SIX") {
                // Wooden willow bat sweet spot punch
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "triangle";
                osc.frequency.setValueAtTime(type === "SIX" ? 420 : 340, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.22);
                gain.gain.setValueAtTime(0.4, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.22);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 0.22);
            } else if (type === "WICKET") {
                // Shattered wooden stumps sound
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = "sawtooth";
                osc.frequency.setValueAtTime(180, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.35);
                gain.gain.setValueAtTime(0.45, ctx.currentTime);
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
        const saved = localStorage.getItem("kreo_official_book_cricket_record");
        if (saved) setHighScore(parseInt(saved, 10));
    }, []);

    // Flip Loop
    useEffect(() => {
        if (bookState === "FLIPPING") {
            flipTimerRef.current = setInterval(() => {
                const randomP = Math.floor(Math.random() * (selectedBook.totalPages - 20)) + 14;
                setDisplayedPage(randomP);
                playNostalgiaSound("FLICK");
            }, 42); // 42ms rapid flutter
        } else {
            if (flipTimerRef.current) clearInterval(flipTimerRef.current);
        }
        return () => {
            if (flipTimerRef.current) clearInterval(flipTimerRef.current);
        };
    }, [bookState, selectedBook]);

    // Handle Open Cover
    const handleOpenCover = () => {
        setBookState("OPEN");
        setDisplayedPage(142);
        setSamplePageIndex(0);
        playNostalgiaSound("FLICK");
    };

    // Trigger Thumb Action (Flip or Stop)
    const handleThumbToggle = () => {
        if (matchEnded) return;

        if (bookState === "OPEN") {
            setBookState("FLIPPING");
            setLastAction(null);
        } else if (bookState === "FLIPPING") {
            setBookState("OPEN");
            const landedPage = displayedPage;
            setSamplePageIndex(landedPage % selectedBook.samplePages.length);
            evaluatePageOutcome(landedPage);
        }
    };

    const evaluatePageOutcome = (page: number) => {
        const lastDigit = page % 10;
        let runs: number | "OUT" = 0;
        let label = "";
        let commentary = "";
        let isBoundary = false;

        if (lastDigit === 0) {
            runs = "OUT";
            label = "CLEAN BOWLED! 💥";
            commentary = `Page ${page} (0). Middle stump uprooted! Class gasps!`;
            playNostalgiaSound("WICKET");
        } else if (lastDigit === 8) {
            runs = "OUT";
            label = "CAUGHT AT SLIP! 🧤";
            commentary = `Page ${page} (8). Thick outside edge snatched by first slip!`;
            playNostalgiaSound("WICKET");
        } else if (lastDigit === 6) {
            runs = 6;
            isBoundary = true;
            label = "SIX! OUT OF THE SCHOOL GROUND! 🚀";
            commentary = `Page ${page} (6). Lofted clean over the biology lab roof!`;
            playNostalgiaSound("SIX");
        } else if (lastDigit === 4) {
            runs = 4;
            isBoundary = true;
            label = "FOUR! CRACKING COVER DRIVE! 🔥";
            commentary = `Page ${page} (4). Rocked back and smashed through extra cover!`;
            playNostalgiaSound("FOUR");
        } else if (lastDigit === 2) {
            runs = 2;
            label = "Quick Double (2 Runs) ⚡";
            commentary = `Page ${page} (2). Pushed into deep square leg, sprinting back for two.`;
            playNostalgiaSound("SINGLE");
        } else if (lastDigit === 9) {
            runs = 0;
            label = "Dot Ball (0 Runs) 🛡️";
            commentary = `Page ${page} (9). Solid forward defensive right under the nose.`;
        } else {
            runs = 1;
            label = "Single (1 Run) 🏃";
            commentary = `Page ${page} (${lastDigit}). Tucked off the pads into the leg side.`;
            playNostalgiaSound("SINGLE");
        }

        const newBalls = balls + 1;
        setBalls(newBalls);

        if (runs === "OUT") {
            const newWickets = wickets + 1;
            setWickets(newWickets);
            setMatchEnded(true);
            setLastAction({ page, runs: "OUT", commentary, label, isBoundary: false });

            setBallLogs(prev => [
                {
                    ballNum: newBalls,
                    page,
                    runs: "OUT",
                    scoreAfter: score,
                    desc: commentary
                },
                ...prev
            ]);

            if (score > highScore) {
                setHighScore(score);
                localStorage.setItem("kreo_official_book_cricket_record", score.toString());
            }
        } else {
            const newScore = score + (runs as number);
            setScore(newScore);
            setLastAction({ page, runs, commentary, label, isBoundary });

            setBallLogs(prev => [
                {
                    ballNum: newBalls,
                    page,
                    runs,
                    scoreAfter: newScore,
                    desc: commentary
                },
                ...prev
            ]);

            if (newScore > highScore) {
                setHighScore(newScore);
                localStorage.setItem("kreo_official_book_cricket_record", newScore.toString());
            }
        }
    };

    const handleResetMatch = () => {
        setScore(0);
        setWickets(0);
        setBalls(0);
        setMatchEnded(false);
        setLastAction(null);
        setBallLogs([]);
        setBookState("OPEN");
        setDisplayedPage(Math.floor(selectedBook.totalPages / 2));
    };

    const activePageData = selectedBook.samplePages[samplePageIndex] || selectedBook.samplePages[0];

    return (
        <div className="min-h-screen bg-[#17130f] text-[#2d2217] flex flex-col justify-between p-3 sm:p-6 font-serif select-none relative overflow-x-hidden">
            
            {/* WOODEN SCHOOL DESK SURFACE */}
            <div 
                className="fixed inset-0 pointer-events-none opacity-45 z-0"
                style={{
                    backgroundImage: `radial-gradient(#382c23 1px, transparent 1px), linear-gradient(180deg, #130f0c 0%, #261c16 100%)`,
                    backgroundSize: '24px 24px, 100% 100%'
                }}
            />

            {/* CLASSROOM HEADER */}
            <header className="relative z-10 w-full max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between pb-3 border-b border-[#3d2f25] gap-2 text-amber-100 font-mono text-xs">
                <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="font-bold tracking-widest uppercase">
                        CLASS X-B • PERIOD 5 (MATHS LAB) // BOOK CRICKET 🏏
                    </span>
                </div>
                <div className="flex items-center gap-4 text-xs">
                    <span className="text-amber-300 flex items-center gap-1.5 font-bold">
                        <Trophy size={14} className="text-amber-400" />
                        RECESS RECORD: <strong className="text-white text-sm">{highScore} RUNS</strong>
                    </span>
                    <span className="text-amber-500/50">•</span>
                    <span className="text-stone-400">CBSE BOARD 2004-05</span>
                </div>
            </header>

            {/* DESK WORKSPACE: SCORECARD + OFFICIAL TEXTBOOK + SWITCHER */}
            <main className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 my-auto py-4">
                
                {/* 1. TORN ROUGH PAPER SCORECARD (LEFT) */}
                <div className="w-full lg:w-72 bg-[#fefdfa] text-[#1e1b18] p-5 rounded shadow-[0_20px_40px_rgba(0,0,0,0.8)] border border-[#e5dfd0] font-mono relative rotate-[-1deg]">
                    {/* TAPE STRIP */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#f7f2e4] border border-black/10 shadow-sm rotate-1 flex items-center justify-center text-[9px] text-stone-500 font-sans tracking-widest uppercase">
                        CELLOTAPE 📌
                    </div>

                    <div className="text-center pb-2 border-b-2 border-dashed border-stone-300 mt-1 mb-3">
                        <div className="text-[10px] font-bold tracking-widest text-stone-500 uppercase">
                            OFFICIAL MATCH TALLY ✏️
                        </div>
                        <h2 className="text-3xl font-serif font-bold text-stone-900 mt-0.5">
                            {score} <span className="text-xl text-red-600 font-mono">/ {wickets}</span>
                        </h2>
                        <div className="text-[10px] text-stone-600 uppercase font-mono">
                            {balls} BALLS ({Math.floor(balls / 6)}.{balls % 6} OVERS) • SR: {balls > 0 ? ((score / balls) * 100).toFixed(0) : 0}
                        </div>
                    </div>

                    {/* LIVE COMMENTARY / OUTCOME BOX */}
                    <div className="min-h-[55px] flex items-center justify-center text-center p-2 rounded bg-amber-50 border border-amber-200/90 mb-3">
                        {lastAction ? (
                            <div>
                                <span className={`font-bold font-serif text-sm ${
                                    lastAction.runs === 'OUT' ? 'text-red-700' :
                                    lastAction.isBoundary ? 'text-blue-800' : 'text-stone-800'
                                }`}>
                                    {lastAction.label}
                                </span>
                                <div className="text-[10px] text-stone-600 leading-tight mt-0.5 font-sans">
                                    {lastAction.commentary}
                                </div>
                            </div>
                        ) : (
                            <span className="text-[11px] text-stone-400 italic font-serif">
                                {bookState === 'CLOSED' ? 'Open textbook cover to bat' : 'Thumb on page corner ready to flip'}
                            </span>
                        )}
                    </div>

                    {/* BALL-BY-BALL LOG */}
                    <div className="text-[10px] text-stone-500 font-bold uppercase flex justify-between border-b border-stone-200 pb-1 mb-1">
                        <span>BALL (PAGE)</span>
                        <span>RUNS (SCORE)</span>
                    </div>
                    <div className="max-h-36 overflow-y-auto space-y-1 text-xs pr-1 font-mono">
                        {ballLogs.length === 0 ? (
                            <div className="text-[10px] text-stone-400 text-center py-4 italic">
                                Waiting for 1st delivery...
                            </div>
                        ) : (
                            ballLogs.map((b, i) => (
                                <div key={i} className="flex justify-between items-center py-0.5 border-b border-stone-100">
                                    <span className="text-stone-500">
                                        B{ballLogs.length - i} (p.{b.page})
                                    </span>
                                    <span className={`font-bold ${
                                        b.runs === 'OUT' ? 'text-red-600 font-serif' :
                                        b.runs === 6 ? 'text-amber-800' :
                                        b.runs === 4 ? 'text-blue-800' : 'text-stone-800'
                                    }`}>
                                        {b.runs === 'OUT' ? 'OUT' : `+${b.runs}`} <span className="text-stone-400 font-normal">({b.scoreAfter})</span>
                                    </span>
                                </div>
                            ))
                        )}
                    </div>

                    {matchEnded && (
                        <button
                            onClick={handleResetMatch}
                            className="w-full mt-4 py-2.5 bg-stone-900 text-amber-300 hover:bg-amber-600 hover:text-white transition-colors text-xs uppercase font-bold tracking-widest rounded shadow cursor-pointer flex items-center justify-center gap-1.5"
                        >
                            <RefreshCw size={13} /> Bat Next Innings
                        </button>
                    )}
                </div>

                {/* 2. THE OFFICIAL NCERT TEXTBOOK + KID'S FLICKING HAND (CENTER) */}
                <div className="flex flex-col items-center">
                    
                    {/* CASE A: OFFICIAL CLOSED NCERT TEXTBOOK COVER */}
                    {bookState === "CLOSED" && (
                        <motion.div
                            initial={{ scale: 0.95 }}
                            animate={{ scale: 1 }}
                            whileHover={{ scale: 1.02 }}
                            onClick={handleOpenCover}
                            className={`w-72 sm:w-[380px] h-96 sm:h-[500px] bg-gradient-to-br ${selectedBook.coverColor} rounded-r-xl rounded-l-sm border-4 ${selectedBook.accentBorder} shadow-[25px_30px_60px_rgba(0,0,0,0.9)] p-6 sm:p-8 flex flex-col justify-between text-white cursor-pointer relative group transition-all`}
                        >
                            {/* SPINE BINDING CREASE */}
                            <div className="absolute top-0 bottom-0 left-0 w-6 bg-gradient-to-r from-black/50 via-transparent to-black/20 border-r border-black/40 rounded-l-sm" />

                            {/* TOP EMBLEMS: CBSE SEAL & CODE */}
                            <div className="flex items-center justify-between border-b border-white/20 pb-3">
                                <div className="text-[10px] font-mono tracking-widest uppercase opacity-90">
                                    NCERT CODE: {selectedBook.code}
                                </div>
                                <div className="text-[10px] font-mono uppercase bg-black/40 px-2 py-0.5 rounded border border-white/20 text-amber-300">
                                    CBSE CURRICULUM
                                </div>
                            </div>

                            {/* CENTER COVER ARTWORK */}
                            <div className="text-center my-auto">
                                <div className="text-5xl sm:text-6xl mb-2 drop-shadow-md">
                                    {selectedBook.symbolEmoji}
                                </div>
                                <div className="text-xs font-serif tracking-widest text-amber-200/90 uppercase">
                                    {selectedBook.hindiTitle}
                                </div>
                                <h1 className="text-3xl sm:text-4xl font-serif font-extrabold tracking-wider text-white drop-shadow-lg mt-1">
                                    {selectedBook.title}
                                </h1>
                                <p className="text-xs font-serif italic text-white/80 mt-1">
                                    {selectedBook.subTitle}
                                </p>
                            </div>

                            {/* BOTTOM OFFICIAL PUBLISHER BANNER */}
                            <div className="text-center border-t border-white/20 pt-3">
                                <div className="text-[9px] font-mono text-white/70 uppercase tracking-widest leading-tight">
                                    राष्ट्रीय शैक्षिक अनुसंधान और प्रशिक्षण परिषद्
                                    <br />
                                    NATIONAL COUNCIL OF EDUCATIONAL RESEARCH AND TRAINING
                                </div>
                                <div className="mt-3 py-2 bg-amber-400 text-stone-950 font-mono font-bold text-xs uppercase tracking-widest rounded shadow group-hover:bg-amber-300 transition-colors animate-pulse">
                                    📖 Click to Open & Play
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* CASE B: OPEN NCERT TEXTBOOK WITH KID'S FLICKING HAND ANIMATION */}
                    {bookState !== "CLOSED" && (
                        <div className="relative">
                            
                            {/* THE SKEUOMORPHIC OPEN BOOK SPREAD */}
                            <div className="w-80 sm:w-[600px] h-[360px] sm:h-[460px] bg-[#fdfaf2] text-[#221c16] rounded-sm shadow-[0_30px_70px_rgba(0,0,0,0.9)] border border-[#d3ccba] flex relative overflow-hidden">
                                
                                {/* CENTER SEAM & DEEP SHADOW */}
                                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-r from-black/25 via-black/45 to-black/25 pointer-events-none z-20 shadow-inner" />

                                {/* LEFT PAGE (CHAPTER HEADING & THEOREMS) */}
                                <div className="w-1/2 p-4 sm:p-6 pr-6 sm:pr-8 flex flex-col justify-between border-r border-[#e5decb] relative">
                                    <div>
                                        <div className="flex justify-between items-center border-b border-stone-300 pb-1 mb-2 text-[9px] font-mono uppercase text-stone-500">
                                            <span>{activePageData.chapterNum}</span>
                                            <span className="font-serif">{activePageData.chapterHindi}</span>
                                        </div>
                                        <h3 className="font-serif font-bold text-xs sm:text-sm text-stone-900 uppercase leading-snug mb-2">
                                            {activePageData.chapterEnglish}
                                        </h3>
                                        <div className="text-[10px] font-serif font-semibold text-stone-800 mb-2">
                                            {activePageData.sectionTitle}
                                        </div>
                                        <div className="space-y-1.5 text-[9px] sm:text-[11px] text-stone-700 leading-relaxed font-serif">
                                            {activePageData.contentParagraphs.slice(0, 3).map((p, i) => (
                                                <p key={i}>{p}</p>
                                            ))}
                                        </div>

                                        {activePageData.formulaBox && (
                                            <div className="mt-2.5 p-1.5 rounded bg-amber-50/80 border border-amber-300/80 text-[8px] sm:text-[10px] font-mono text-stone-800">
                                                {activePageData.formulaBox}
                                            </div>
                                        )}
                                    </div>

                                    {/* LEFT BOTTOM PAGE NUMBER */}
                                    <div className="flex justify-between items-end text-[10px] font-mono text-stone-500 border-t border-stone-300 pt-1 mt-2">
                                        <span>{Math.max(1, displayedPage - 1)}</span>
                                        <span className="text-[8px] italic text-stone-400">NCERT Class X • {selectedBook.title}</span>
                                    </div>
                                </div>

                                {/* RIGHT PAGE (ACTION SCORING SPREAD) */}
                                <div className="w-1/2 p-4 sm:p-6 pl-6 sm:pl-8 flex flex-col justify-between relative bg-gradient-to-l from-[#faf5e8] to-[#fdfaf2]">
                                    <div>
                                        <div className="text-[9px] font-mono uppercase tracking-wider text-stone-500 text-right border-b border-stone-300 pb-1 mb-2">
                                            EXERCISES & EVALUATION
                                        </div>

                                        {/* PENCIL MARGIN DOODLE */}
                                        <div className="p-2 rounded bg-amber-100/60 border border-amber-300/60 text-[9px] sm:text-xs text-stone-800 font-sans italic my-2">
                                            ✏️ {activePageData.roughDoodle}
                                        </div>

                                        {/* SKEUOMORPHIC ACTIVE PAGE FLUTTERING STATE */}
                                        <div className="my-auto text-center py-4">
                                            {bookState === "FLIPPING" ? (
                                                <div className="space-y-1">
                                                    <div className="text-3xl sm:text-5xl font-mono font-bold tracking-widest text-amber-800 animate-pulse">
                                                        p. {displayedPage}
                                                    </div>
                                                    <div className="text-[10px] font-mono text-stone-500 uppercase tracking-widest animate-bounce">
                                                        Thumb Riffle in Progress...
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="space-y-1">
                                                    <div className="text-xs font-mono uppercase tracking-widest text-stone-400">
                                                        Landed On Page
                                                    </div>
                                                    <div className="text-4xl sm:text-6xl font-mono font-bold text-stone-900 tracking-wider">
                                                        {displayedPage}
                                                    </div>
                                                    <div className="text-xs font-mono text-stone-900 font-bold uppercase mt-1">
                                                        Scoring Digit: <span className="text-xl text-red-700 bg-amber-200/90 px-2 py-0.5 rounded border border-red-700/30">{displayedPage % 10}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* RIGHT BOTTOM PAGE NUMBER (OFFICIAL NCERT FONT POSITION) */}
                                    <div className="flex justify-between items-end text-[11px] font-mono font-bold text-stone-800 border-t border-stone-300 pt-1 mt-2">
                                        <span className="text-[8px] text-stone-400 font-normal">Classroom Recess</span>
                                        <span className="text-sm text-stone-900 bg-amber-100 px-2 py-0.5 rounded border border-stone-300">
                                            p. {displayedPage}
                                        </span>
                                    </div>
                                </div>

                                {/* 3. REAL KID'S HAND & THUMB OVERLAY ON PAGE CORNER */}
                                <motion.div 
                                    animate={bookState === "FLIPPING" ? {
                                        rotate: [0, -8, 4, -6, 0],
                                        y: [0, -4, 2, -3, 0],
                                        transition: { repeat: Infinity, duration: 0.15 }
                                    } : { rotate: 0, y: 0 }}
                                    className="absolute bottom-1 right-2 pointer-events-none z-30 flex items-end drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                                >
                                    <div className="relative">
                                        {/* ILLUSTRATED STUDENT HAND WITH THUMB PRESSING CORNER */}
                                        <div className="w-16 h-20 sm:w-20 sm:h-24 bg-[#e8be96] rounded-t-2xl border-2 border-[#b88c66] shadow-xl relative -rotate-12 flex flex-col justify-between p-1">
                                            {/* KNUCKLE CREASES */}
                                            <div className="w-6 h-0.5 bg-[#b88c66]/40 mx-auto rounded mt-3" />
                                            <div className="w-8 h-0.5 bg-[#b88c66]/40 mx-auto rounded" />
                                            {/* THUMBNAIL WITH INK STAIN */}
                                            <div className="w-5 h-6 bg-[#f3d3b6] rounded-t-lg border border-[#b88c66] mx-auto mb-1 relative overflow-hidden">
                                                {/* BLUE REYNOLDS INK STAIN */}
                                                <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-blue-700/80" />
                                            </div>
                                        </div>
                                        <span className="absolute -top-4 -left-1 text-[8px] font-mono font-bold bg-black/80 text-amber-200 px-1.5 py-0.5 rounded shadow whitespace-nowrap">
                                            {bookState === "FLIPPING" ? "Flicking..." : "Thumb Grip"}
                                        </span>
                                    </div>
                                </motion.div>
                            </div>

                            {/* CONTROLS */}
                            <div className="mt-6 flex flex-col items-center gap-3">
                                <button
                                    onClick={handleThumbToggle}
                                    disabled={matchEnded}
                                    className={`w-72 sm:w-96 py-4 uppercase font-mono tracking-widest text-base sm:text-xl font-bold transition-all shadow-[0_15px_30px_rgba(0,0,0,0.7)] rounded-lg cursor-pointer ${
                                        matchEnded
                                            ? "bg-stone-800 text-stone-500 cursor-not-allowed border border-stone-700"
                                            : bookState === "FLIPPING"
                                            ? "bg-red-600 hover:bg-red-500 text-white animate-pulse shadow-red-600/50 border-2 border-red-400"
                                            : "bg-amber-400 hover:bg-amber-300 text-stone-950 border-2 border-amber-300"
                                    }`}
                                >
                                    {bookState === "FLIPPING" ? "🛑 SLAM THUMB DOWN! (STOP)" : "📖 FLIP TEXTBOOK (CLICK TO RIFFLE)"}
                                </button>
                                <p className="text-[11px] font-mono text-amber-200/70 uppercase">
                                    Last digit of page: 2, 4, 6 = Runs • 1, 3, 5, 7 = Single • 0 or 8 = OUT
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* 3. OFFICIAL NCERT TEXTBOOK PICKER (RIGHT) */}
                <div className="w-full lg:w-64 flex flex-col gap-3 font-mono text-xs text-amber-100">
                    <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest flex items-center gap-1.5">
                        <BookOpen size={13} />
                        [CBSE OFFICIAL PRESCRIBED TEXTBOOKS]
                    </span>
                    {OFFICIAL_BOOKS.map((b) => (
                        <button
                            key={b.id}
                            onClick={() => {
                                setSelectedBook(b);
                                setBookState("CLOSED");
                                setMatchEnded(false);
                                setScore(0);
                                setBalls(0);
                                setWickets(0);
                                setBallLogs([]);
                                setLastAction(null);
                            }}
                            className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer ${
                                selectedBook.id === b.id
                                    ? "bg-amber-500/25 border-amber-400 text-white font-bold shadow-lg ring-1 ring-amber-400"
                                    : "bg-black/40 border-[#3d2f25] text-stone-400 hover:border-stone-400 hover:text-stone-200"
                            }`}
                        >
                            <div className="flex justify-between items-center text-[10px] text-amber-400 uppercase font-mono">
                                <span>CODE {b.code}</span>
                                <span>{b.totalPages} PAGES</span>
                            </div>
                            <div className="font-serif text-base text-stone-100 font-bold mt-1 flex items-center gap-2">
                                <span>{b.symbolEmoji}</span>
                                <span>{b.title}</span>
                            </div>
                            <div className="text-[10px] text-stone-400 italic mt-0.5">
                                {b.hindiTitle} • {b.subTitle}
                            </div>
                        </button>
                    ))}
                </div>
            </main>

            {/* CLASSROOM FOOTER RULES */}
            <footer className="relative z-10 text-[11px] font-mono text-amber-200/50 uppercase tracking-widest pb-2 text-center">
                Strict School Rules: No folding page corners • 0 or 8 is immediate dismissal • Class X Board syllabus.
            </footer>
        </div>
    );
}
