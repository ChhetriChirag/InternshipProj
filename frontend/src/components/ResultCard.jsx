import { Music2, Quote } from "lucide-react";
import { getMoodTheme } from "../utils/moodTheme";

const moodEmoji = {
  Happy: "😊",
  Sad: "😔",
  Angry: "😠",
  Anxious: "😰",
  Neutral: "😌",
};

function ResultCard({ result }) {
  if (!result) {
    return (
      <div className="glass-card p-6 text-center text-slate-400">
        Your AI mood insights will appear here after you submit an entry.
      </div>
    );
  }

  return (
    <div className={`glass-card bg-gradient-to-br p-6 ${getMoodTheme(result.mood)}`}>
      <h3 className="text-xl font-semibold text-slate-800">AI Mood Response</h3>
      <div className="mt-4 space-y-2 text-slate-700">
        <p>
          Mood: <span className="font-semibold">{result.mood}</span> {moodEmoji[result.mood] || "🙂"}
        </p>
        <p>
          Score: <span className="font-semibold">{result.score}/100</span>
        </p>
        <p>
          Polarity: <span className="font-semibold">{result.polarity}</span>
        </p>
      </div>
      <div className="mt-5 space-y-3 rounded-xl border border-white/80 bg-white/65 p-4">
        <p className="flex items-start gap-2 text-slate-700">
          <Quote className="mt-1 h-4 w-4 shrink-0 text-cyan-200" />
          {result.quote}
        </p>
        <p className="flex items-start gap-2 text-slate-700">
          <Music2 className="mt-1 h-4 w-4 shrink-0 text-violet-200" />
          {result.music}
        </p>
      </div>
    </div>
  );
}

export default ResultCard;
