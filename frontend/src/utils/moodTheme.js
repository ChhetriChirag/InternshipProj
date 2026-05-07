const moodTheme = {
  Happy: "from-emerald-200/60 to-cyan-200/60 border-emerald-300/80",
  Sad: "from-indigo-200/60 to-sky-200/60 border-blue-300/80",
  Angry: "from-rose-200/60 to-orange-200/60 border-rose-300/80",
  Anxious: "from-amber-200/60 to-yellow-200/60 border-amber-300/80",
  Neutral: "from-slate-200/70 to-zinc-200/70 border-slate-300/80",
};

export const getMoodTheme = (mood) => moodTheme[mood] || moodTheme.Neutral;
