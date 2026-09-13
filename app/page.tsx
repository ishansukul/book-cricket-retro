"use client";

import { useState, useEffect, useRef } from "react";
import { BookOpen, Trophy, RefreshCw, ShieldAlert, Sparkles, Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// CHARACTERS / STUDENTS
interface StudentCharacter {
    id: string;
    name: string;
    archetype: string;
    handStyle: string;
    flipSpeedMs: number;
    stealthReactionMs: number;
    luckyDigits: number[];
    catchphrase: string;
    avatarEmoji: string;
}

const CHARACTERS: StudentCharacter[] = [
    {
        id: "backbencher",
        name: "Bunty",
        archetype: "The Last-Bench Legend",
        handStyle: "Quick thumb riffle with ink stains on index finger",
        flipSpeedMs: 38,
        stealthReactionMs: 1400,
        luckyDigits: [6, 4],
        catchphrase: "Sir board pe likh rahe hain, maar six maar!",
        avatarEmoji: "🕶️"
    },
    {
        id: "nerd",
        name: "Aditya",
        archetype: "The Class Topper / Frontbencher",
        handStyle: "Meticulous single-leaf fingertip glide with mechanical pencil in hand",
        flipSpeedMs: 65,
        stealthReactionMs: 800,
        luckyDigits: [2, 4],
        catchphrase: "Page 142 pe derivative solve kiya hai maine...",
        avatarEmoji: "🤓"
    },
    {
        id: "gully-captain",
        name: "Rocky",
        archetype: "The PT Period Hero",
        handStyle: "Heavy thumb clamp with rubber wristband",
        flipSpeedMs: 45,
        stealthReactionMs: 1100,
        luckyDigits: [6],
        catchphrase: "Ek over mein 24 chahiye, dekh kaise nikaalta hoon.",
        avatarEmoji: "🏏"
    }
];

// TEXTBOOKS / NOTEBOOKS
interface Notebook {
    id: string;
    title: string;
    subject: string;
    totalPages: number;
    coverColor: string;
    coverBorder: string;
    paperTexture: string;
    marginDoodle: string;
    doodleAuthor: string;
    pageThicknessMod: number;
}

const NOTEBOOKS: Notebook[] = [
    {
        id: "ncert-math",
        title: "NCERT Mathematics (Class X)",
        subject: "Quadratic Equations & Trigonometry",
        totalPages: 348,
        coverColor: "bg-[#8B4513] text-amber-100",
        coverBorder: "border-[#5C2E0B]",
        paperTexture: "bg-[#FBF8EB] text-[#2C2416]",
        marginDoodle: "sin²θ + cos²θ = 1 (Rough Work: 144 / 12 = 12)",
        doodleAuthor: "Pencil scrawls on bottom right",
        pageThicknessMod: 1.0
    },
    {
        id: "classmate-notebook",
        title: "Classmate 6-Subject Spiral",
        subject: "Physics Rough Notes + Doodles",
        totalPages: 240,
        coverColor: "bg-[#1E3A8A] text-blue-100",
        coverBorder: "border-[#172554]",
        paperTexture: "bg-[#FFFFFF] text-[#0F172A]",
        marginDoodle: "KREO vs WORLD • Flame drawings & stick-figure bat",
        doodleAuthor: "Reynolds 045 blue ballpoint ink",
        pageThicknessMod: 0.8
    },
    {
        id: "rd-sharma",
        title: "R.D. Sharma (Vol. 1 Monster)",
        subject: "Pure Mathematical Weight",
        totalPages: 1180,
        coverColor: "bg-[#701A75] text-fuchsia-100",
        coverBorder: "border-[#4A044E]",
        paperTexture: "bg-[#F8F5EC] text-[#1C1917]",
        marginDoodle: "Ex 14.3 Q1 to Q45 (Homework Pending ⚠️)",
        doodleAuthor: "Red cross marks by teacher",
        pageThicknessMod: 1.4
    },
    {
        id: "ncert-english",
        title: "First Flight (NCERT English Literature)",
        subject: "Poetry & Prose Stories",
        totalPages: 184,
        coverColor: "bg-[#065F46] text-emerald-100",
        coverBorder: "border-[#064E3B]",
        paperTexture: "bg-[#FFFDF7] text-[#18181B]",
        marginDoodle: "Amanda, Amanda! Don't bite your nails!",
        doodleAuthor: "Highlighter scribbles",
        pageThicknessMod: 0.7
    }
];

export default function BookCricketApp() {
    const [gameState, setGameState] = useState<"SELECT_CHARACTER" | "SELECT_BOOK" | "MATCH" | "GAME_OVER">("SELECT_CHARACTER");

    const [character, setCharacter] = useState<StudentCharacter>(CHARACTERS[0]);
    const [notebook, setNotebook] = useState<Notebook>(NOTEBOOKS[0]);

    const [bookVisualState, setBookVisualState] = useState<"CLOSED" | "OPEN" | "FLIPPING">("CLOSED");
    const [currentPage, setCurrentPage] = useState<number>(0);

    const [score, setScore] = useState(0);
    const [wickets, setWickets] = useState(0);
    const [balls, setBalls] = useState(0);
    const [targetRuns] = useState(78);
    const [maxBalls] = useState(30);
    const [highScore, setHighScore] = useState(0);
    const [lastOutcome, setLastOutcome] = useState<{ runs: number | "OUT" | "CAUGHT_BY_TEACHER"; label: string; desc: string } | null>(null);
    const [commentaryLog, setCommentaryLog] = useState<{ ball: number; page: number; outcome: string; desc: string }[]>([]);

    const [teacherState, setTeacherState] = useState<"WRITING_ON_BOARD" | "TURNING_AROUND" | "WATCHING_CLASS">("WRITING_ON_BOARD");

    const flipIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const teacherTimerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem("kreo_book_cricket_standalone_high");
        if (saved) setHighScore(parseInt(saved, 10));
    }, []);

    useEffect(() => {
        if (gameState !== "MATCH") return;

        const cycleTeacher = () => {
            const writingTime = 3500 + Math.random() * 2500;
            setTeacherState("WRITING_ON_BOARD");

            teacherTimerRef.current = setTimeout(() => {
                setTeacherState("TURNING_AROUND");

                setTimeout(() => {
                    setTeacherState("WATCHING_CLASS");

                    setTimeout(() => {
                        cycleTeacher();
                    }, 2000);
                }, character.stealthReactionMs);
            }, writingTime);
        };

        cycleTeacher();

        return () => {
            if (teacherTimerRef.current) clearTimeout(teacherTimerRef.current);
        };
    }, [gameState, character]);

    useEffect(() => {
        if (teacherState === "WATCHING_CLASS" && bookVisualState === "FLIPPING") {
            if (flipIntervalRef.current) clearInterval(flipIntervalRef.current);
            setBookVisualState("CLOSED");
            setLastOutcome({
                runs: "CAUGHT_BY_TEACHER",
                label: "CAUGHT BY TEACHER! 🚨",
                desc: "Sir caught you flipping under the desk! 'Staff room mein aao dono!'"
            });
            setGameState("GAME_OVER");
        }
    }, [teacherState, bookVisualState]);

    useEffect(() => {
        if (bookVisualState === "FLIPPING") {
            const calculatedSpeed = Math.round(character.flipSpeedMs * notebook.pageThicknessMod);
            flipIntervalRef.current = setInterval(() => {
                const randomPage = Math.floor(Math.random() * (notebook.totalPages - 12)) + 10;
                setCurrentPage(randomPage);
            }, calculatedSpeed);
        } else {
            if (flipIntervalRef.current) clearInterval(flipIntervalRef.current);
        }

        return () => {
            if (flipIntervalRef.current) clearInterval(flipIntervalRef.current);
        };
    }, [bookVisualState, character, notebook]);

    const handleFlipToggle = () => {
        if (bookVisualState === "CLOSED" || bookVisualState === "OPEN") {
            setBookVisualState("FLIPPING");
            setLastOutcome(null);
        } else if (bookVisualState === "FLIPPING") {
            setBookVisualState("OPEN");
            scoreCurrentPage(currentPage);
        }
    };

    const scoreCurrentPage = (page: number) => {
        const lastDigit = page % 10;
        let runs: number | "OUT" = 0;
        let label = "";
        let desc = "";

        if (lastDigit === 0) {
            runs = "OUT";
            label = "CLEAN BOWLED! 💥";
            desc = `Page ${page} (ends in 0). Stumps cartwheeling into the corridor!`;
        } else if (lastDigit === 8) {
            runs = "OUT";
            label = "CAUGHT AT SHORT COVER! 🧤";
            desc = `Page ${page} (ends in 8). Leading edge straight into the fielder's hands.`;
        } else if (lastDigit === 6) {
            runs = 6;
            label = "SIX! OUT OF THE SCHOOL GROUND! 🚀";
            desc = `Page ${page} (ends in 6). Massive lofted strike over long-on!`;
        } else if (lastDigit === 4) {
            runs = 4;
            label = "FOUR! CRACKING BOUNDARY! 🔥";
            desc = `Page ${page} (ends in 4). Piercing the gap between third-benchers!`;
        } else if (lastDigit === 2) {
            runs = 2;
            label = "Quick Double (2 Runs) ⚡";
            desc = `Page ${page} (ends in 2). Hustling back for the second run.`;
        } else if (lastDigit === 9) {
            runs = 0;
            label = "Dot Ball (0 Runs) 🛡️";
            desc = `Page ${page} (ends in 9). Solid forward defensive stroke.`;
        } else {
            runs = 1;
            label = "Quick Single (1 Run) 🏃";
            desc = `Page ${page} (ends in ${lastDigit}). Tucked onto the leg side for one.`;
        }

        const newBalls = balls + 1;
        setBalls(newBalls);

        if (runs === "OUT") {
            const newWickets = wickets + 1;
            setWickets(newWickets);
            setLastOutcome({ runs: "OUT", label, desc });
            setCommentaryLog(prev => [{ ball: newBalls, page, outcome: "W", desc }, ...prev]);

            if (score > highScore) {
                setHighScore(score);
                localStorage.setItem("kreo_book_cricket_standalone_high", score.toString());
            }

            setGameState("GAME_OVER");
        } else {
            const newScore = score + (runs as number);
            setScore(newScore);
            setLastOutcome({ runs, label, desc });
            setCommentaryLog(prev => [{ ball: newBalls, page, outcome: `${runs}R`, desc }, ...prev]);

            if (newScore > highScore) {
                setHighScore(newScore);
                localStorage.setItem("kreo_book_cricket_standalone_high", newScore.toString());
            }

            if (newScore >= targetRuns || newBalls >= maxBalls) {
                setGameState("GAME_OVER");
            }
        }
    };

    const restartMatch = () => {
        setScore(0);
        setWickets(0);
        setBalls(0);
        setCommentaryLog([]);
        setLastOutcome(null);
        setBookVisualState("CLOSED");
        setGameState("MATCH");
    };

    return (
        <div className="min-h-screen bg-[#0a0c10] text-white p-4 sm:p-8 font-mono flex flex-col items-center select-none">
            {/* TOP BAR */}
            <div className="w-full max-w-4xl flex justify-between items-center mb-6 pb-4 border-b border-white/20">
                <div className="text-xs uppercase tracking-widest text-gray-400 font-bold">
                    RETRO BOOK CRICKET 🏏 // INDIAN SCHOOL NOSTALGIA
                </div>
                <div className="text-xs text-amber-400 uppercase tracking-widest flex items-center gap-2 font-bold">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>Recess Record: {highScore} Runs</span>
                </div>
            </div>

            {/* STAGE 1: CHOOSE CHARACTER */}
            {gameState === "SELECT_CHARACTER" && (
                <div className="w-full max-w-3xl space-y-6">
                    <div className="text-center">
                        <span className="text-[10px] text-amber-400 border border-amber-400/30 px-3 py-1 rounded-full uppercase tracking-widest">
                            STEP 1 // SELECT YOUR BATSMAN & FLIPPER HAND
                        </span>
                        <h2 className="text-3xl sm:text-5xl font-oswald uppercase tracking-wider text-white mt-3">
                            CHOOSE YOUR CHARACTER
                        </h2>
                        <p className="text-xs text-gray-400 mt-1">
                            Different students have different thumb speeds, grip mechanics, and teacher reflex timings.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {CHARACTERS.map((char) => (
                            <motion.div
                                key={char.id}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => {
                                    setCharacter(char);
                                    setGameState("SELECT_BOOK");
                                }}
                                className={`border p-6 rounded-lg cursor-pointer transition-all flex flex-col justify-between ${
                                    character.id === char.id
                                        ? "border-amber-400 bg-amber-400/10 shadow-[0_0_20px_rgba(251,191,36,0.2)]"
                                        : "border-white/20 bg-white/[0.02] hover:border-white/60"
                                }`}
                            >
                                <div>
                                    <div className="text-4xl mb-3">{char.avatarEmoji}</div>
                                    <h3 className="text-xl font-oswald uppercase text-white">{char.name}</h3>
                                    <p className="text-xs text-amber-400 font-bold uppercase mb-3">{char.archetype}</p>
                                    <p className="text-xs text-gray-300 leading-relaxed italic mb-4">
                                        "{char.catchphrase}"
                                    </p>
                                </div>

                                <div className="pt-3 border-t border-white/10 space-y-1.5 text-[11px] text-gray-400 font-mono">
                                    <div>⚡ Thumb Riffle: <strong className="text-white">{char.flipSpeedMs}ms</strong></div>
                                    <div>🛡️ Stealth Reaction: <strong className="text-white">{char.stealthReactionMs}ms</strong></div>
                                    <div>🖐️ Style: <span className="text-gray-300">{char.handStyle}</span></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {/* STAGE 2: CHOOSE TEXTBOOK */}
            {gameState === "SELECT_BOOK" && (
                <div className="w-full max-w-4xl space-y-6">
                    <div className="text-center">
                        <span className="text-[10px] text-emerald-400 border border-emerald-400/30 px-3 py-1 rounded-full uppercase tracking-widest">
                            STEP 2 // SELECT THE WEAPON OF DESTINY
                        </span>
                        <h2 className="text-3xl sm:text-5xl font-oswald uppercase tracking-wider text-white mt-3">
                            PICK YOUR TEXTBOOK
                        </h2>
                        <p className="text-xs text-gray-400 mt-1">
                            Paper weight, total thickness, and subject doodles directly affect flipping aerodynamics.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {NOTEBOOKS.map((nb) => (
                            <motion.div
                                key={nb.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                    setNotebook(nb);
                                    restartMatch();
                                }}
                                className="border border-white/20 bg-black/60 p-6 rounded-lg hover:border-amber-400 hover:bg-white/[0.02] transition-all cursor-pointer flex flex-col justify-between group"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-amber-300">
                                            {nb.totalPages} PAGES
                                        </span>
                                        <BookOpen size={18} className="text-gray-400 group-hover:text-amber-400 transition-colors" />
                                    </div>
                                    <h4 className="text-2xl font-oswald text-white group-hover:text-amber-400 transition-colors mb-0.5">
                                        {nb.title}
                                    </h4>
                                    <p className="text-xs text-gray-400 mb-3">{nb.subject}</p>
                                    
                                    <div className="p-2.5 rounded bg-amber-950/20 border border-amber-500/20 text-xs text-amber-200/90 italic mb-4 font-sans">
                                        ✏️ Margin Doodle: "{nb.marginDoodle}"
                                        <div className="text-[10px] text-amber-400/60 not-italic mt-0.5 font-mono">
                                            — {nb.doodleAuthor}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-amber-400 font-bold uppercase">
                                    <span>Open & Walk Out to Bat</span>
                                    <span>→</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {/* STAGE 3: CLASSROOM MATCH */}
            {(gameState === "MATCH" || gameState === "GAME_OVER") && (
                <div className="w-full max-w-3xl flex flex-col items-center">
                    {/* TEACHER STEALTH MONITOR */}
                    <div className="w-full p-4 rounded-lg border border-white/20 bg-black/70 backdrop-blur-md mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="text-3xl">{character.avatarEmoji}</div>
                            <div>
                                <div className="text-sm font-bold text-white uppercase">{character.name} ({character.archetype})</div>
                                <div className="text-xs text-gray-400">Weapon: {notebook.title}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 px-3 py-1.5 rounded-md border border-white/10 bg-white/5">
                            <ShieldAlert size={16} className={teacherState === "WATCHING_CLASS" ? "text-red-500 animate-pulse" : "text-emerald-400"} />
                            <div className="text-xs uppercase">
                                <span className="text-gray-500">Teacher Status: </span>
                                <strong className={
                                    teacherState === "WATCHING_CLASS" ? "text-red-400 font-bold animate-pulse" :
                                    teacherState === "TURNING_AROUND" ? "text-amber-400 font-bold" : "text-emerald-400"
                                }>
                                    {teacherState === "WRITING_ON_BOARD" ? "Writing on Chalkboard ✍️" :
                                     teacherState === "TURNING_AROUND" ? "TURNING AROUND! ⚠️" : "STARE-DOWN! (SLAM SHUT!) 🚨"}
                                </strong>
                            </div>
                        </div>
                    </div>

                    {/* SCOREBOARD */}
                    <div className="w-full grid grid-cols-4 gap-2 p-4 rounded-lg border border-white/20 bg-white/[0.03] backdrop-blur-md mb-6 text-center">
                        <div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-widest">RUNS</div>
                            <div className="text-3xl sm:text-4xl font-oswald text-amber-400 font-bold">{score}</div>
                        </div>
                        <div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-widest">TARGET</div>
                            <div className="text-3xl sm:text-4xl font-oswald text-white font-bold">{targetRuns}</div>
                        </div>
                        <div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-widest">WICKETS</div>
                            <div className="text-3xl sm:text-4xl font-oswald text-red-500 font-bold">{wickets}/1</div>
                        </div>
                        <div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-widest">OVERS</div>
                            <div className="text-3xl sm:text-4xl font-oswald text-gray-200 font-bold">
                                {Math.floor(balls / 6)}.{balls % 6} / 5.0
                            </div>
                        </div>
                    </div>

                    {/* TEXTBOOK SKEUOMORPHIC STAGE */}
                    <div className="w-full flex flex-col items-center mb-6">
                        <div className="relative w-80 sm:w-[420px] h-60 sm:h-72 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex items-center justify-center p-4">
                            
                            {bookVisualState === "CLOSED" && (
                                <motion.div
                                    initial={{ scale: 0.95 }}
                                    animate={{ scale: 1 }}
                                    className={`w-full h-full rounded-lg ${notebook.coverColor} border-4 ${notebook.coverBorder} p-6 flex flex-col justify-between shadow-2xl relative cursor-pointer group`}
                                    onClick={handleFlipToggle}
                                >
                                    <div className="flex justify-between items-start">
                                        <span className="text-[11px] font-bold uppercase tracking-widest opacity-80">
                                            GOVERNMENT OF INDIA
                                        </span>
                                        <span className="text-xs opacity-70 font-mono">EDITION 2004-05</span>
                                    </div>

                                    <div className="text-center my-auto">
                                        <h3 className="text-2xl sm:text-3xl font-oswald uppercase tracking-wider mb-1">
                                            {notebook.title}
                                        </h3>
                                        <p className="text-xs uppercase tracking-widest opacity-80">{notebook.subject}</p>
                                    </div>

                                    <div className="flex justify-between items-end text-[10px] font-mono opacity-70 border-t border-current/20 pt-2">
                                        <span>TOTAL PAGES: {notebook.totalPages}</span>
                                        <span className="animate-pulse font-bold text-amber-300">CLICK TO FLIP PAGES 📖</span>
                                    </div>
                                </motion.div>
                            )}

                            {bookVisualState !== "CLOSED" && (
                                <div className={`w-full h-full rounded-lg ${notebook.paperTexture} border-2 border-[#D1C7B7] p-5 shadow-2xl flex relative overflow-hidden`}>
                                    <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-4 bg-gradient-to-r from-black/15 via-black/30 to-black/15 pointer-events-none" />

                                    <div className="w-1/2 pr-3 flex flex-col justify-between border-r border-black/10">
                                        <div className="text-[9px] uppercase tracking-wider text-black/50 font-serif">
                                            Chapter 4 • Exercise 4.2
                                        </div>
                                        <div className="space-y-1 my-auto opacity-40 font-serif text-[10px] leading-tight select-none">
                                            <p>1. Find the roots of equation 2x² - 5x + 3 = 0.</p>
                                            <p>2. A cottage industry produces pottery articles in a day...</p>
                                            <p className="italic text-[9px] text-blue-900 mt-2">✏️ {notebook.marginDoodle}</p>
                                        </div>
                                        <div className="text-[10px] font-mono text-black/60">
                                            Page {Math.max(1, currentPage - 1)}
                                        </div>
                                    </div>

                                    <div className="w-1/2 pl-3 flex flex-col justify-between relative">
                                        <div className="text-[9px] uppercase tracking-wider text-black/50 text-right font-serif">
                                            MATHEMATICS
                                        </div>

                                        <div className="text-center my-auto">
                                            <motion.div
                                                key={currentPage}
                                                initial={{ scale: bookVisualState === "FLIPPING" ? 0.95 : 1.1 }}
                                                animate={{ scale: 1 }}
                                                className="text-5xl sm:text-6xl font-oswald tracking-widest text-[#1C1917] drop-shadow-sm font-bold"
                                            >
                                                PAGE {currentPage}
                                            </motion.div>
                                            <div className="text-xs uppercase tracking-widest text-black/60 mt-1 font-bold">
                                                Last Digit: <span className="text-red-700 text-lg font-mono">{currentPage % 10}</span>
                                            </div>
                                        </div>

                                        <div className="text-[10px] font-mono text-black/60 text-right">
                                            Page {currentPage}
                                        </div>
                                    </div>

                                    <div className="absolute bottom-2 right-4 pointer-events-none flex items-center gap-1">
                                        <span className="text-xs font-bold text-black/70 bg-white/80 px-2 py-0.5 rounded shadow">
                                            {character.name}'s Thumb
                                        </span>
                                        <span className="text-3xl filter drop-shadow">👍</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="h-14 mt-4 flex items-center justify-center">
                            <AnimatePresence mode="wait">
                                {lastOutcome && (
                                    <motion.div
                                        key={lastOutcome.label}
                                        initial={{ opacity: 0, y: 8, scale: 0.92 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        className={`text-center font-oswald text-base sm:text-lg uppercase px-5 py-1.5 rounded-full border ${
                                            lastOutcome.runs === "OUT" || lastOutcome.runs === "CAUGHT_BY_TEACHER"
                                                ? "bg-red-500/20 border-red-500 text-red-400 animate-bounce"
                                                : lastOutcome.runs === 6
                                                ? "bg-amber-500/20 border-amber-400 text-amber-300"
                                                : lastOutcome.runs === 4
                                                ? "bg-blue-500/20 border-blue-400 text-blue-300"
                                                : "bg-white/10 border-white/20 text-gray-200"
                                        }`}
                                    >
                                        {lastOutcome.label}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* CONTROLS */}
                    {gameState === "MATCH" && (
                        <div className="w-full flex justify-center mb-6">
                            <button
                                onClick={handleFlipToggle}
                                className={`w-full sm:w-80 py-4 uppercase tracking-widest font-oswald text-xl border-2 transition-all cursor-pointer flex items-center justify-center gap-3 rounded-lg ${
                                    bookVisualState === "FLIPPING"
                                        ? "bg-red-600 hover:bg-red-500 text-white border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.6)] animate-pulse"
                                        : "bg-amber-400 hover:bg-amber-300 text-black border-amber-400 font-bold shadow-[0_0_20px_rgba(251,191,36,0.3)]"
                                }`}
                            >
                                {bookVisualState === "FLIPPING" ? (
                                    <>
                                        <Pause className="w-5 h-5 fill-current" /> SLAM THUMB DOWN! (STOP)
                                    </>
                                ) : (
                                    <>
                                        <Play className="w-5 h-5 fill-current" /> FLIP TEXTBOOK PAGES 📖
                                    </>
                                )}
                            </button>
                        </div>
                    )}

                    {/* GAME OVER MODAL */}
                    {gameState === "GAME_OVER" && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full border-2 border-red-500/50 bg-red-950/30 p-6 rounded-lg text-center mb-6"
                        >
                            <h3 className="text-3xl sm:text-4xl font-oswald text-red-400 uppercase tracking-widest mb-1">
                                {score >= targetRuns ? "TARGET CHASED! RECESS VICTORY! 🏆" : "INNINGS CONCLUDED 💥"}
                            </h3>
                            <p className="text-sm text-gray-300 mb-4">
                                Scored <strong className="text-amber-400 font-bold">{score} Runs</strong> off {balls} balls (Target: {targetRuns}).
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-4">
                                <button
                                    onClick={restartMatch}
                                    className="px-6 py-2.5 bg-amber-400 text-black hover:bg-amber-300 font-bold uppercase text-xs tracking-widest rounded flex items-center gap-2 cursor-pointer"
                                >
                                    <RefreshCw size={14} /> Bat Next Innings
                                </button>
                                <button
                                    onClick={() => setGameState("SELECT_CHARACTER")}
                                    className="px-6 py-2.5 border border-white/30 hover:border-white text-white uppercase font-bold text-xs tracking-widest rounded cursor-pointer"
                                >
                                    Change Character / Book
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* COMMENTARY */}
                    {commentaryLog.length > 0 && (
                        <div className="w-full border-t border-white/10 pt-4">
                            <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                                [BALL-BY-BALL COMMENTARY LOG]
                            </h4>
                            <div className="space-y-1.5 max-h-40 overflow-y-auto pr-2 font-mono">
                                {commentaryLog.map((c, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center justify-between text-xs py-1 px-3 rounded border border-white/5 bg-white/[0.02]"
                                    >
                                        <span className="text-gray-400">Ball {c.ball} (Page {c.page}): {c.desc}</span>
                                        <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                                            c.outcome === "W" ? "bg-red-500 text-white" :
                                            c.outcome === "6R" ? "bg-amber-500 text-black" :
                                            c.outcome === "4R" ? "bg-blue-500 text-white" : "bg-white/10 text-gray-300"
                                        }`}>
                                            {c.outcome}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
