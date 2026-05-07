const moodTheme = {
  Happy: "from-emerald-400/20 to-cyan-500/20 border-emerald-400/30",
  Sad: "from-blue-500/20 to-indigo-500/20 border-blue-400/30",
  Angry: "from-red-500/20 to-orange-500/20 border-red-400/30",
  Anxious: "from-amber-400/20 to-yellow-500/20 border-amber-400/30",
  Neutral: "from-slate-500/20 to-gray-500/20 border-slate-400/30",
};

export const getMoodTheme = (mood) => moodTheme[mood] || moodTheme.Neutral;
