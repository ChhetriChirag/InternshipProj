import { useState } from "react";
import { LoaderCircle, Sparkles } from "lucide-react";

function MoodForm({ onSubmit, loading }) {
  const [text, setText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(text, () => setText(""));
  };

  return (
    <form onSubmit={handleSubmit} className="glass-card p-6">
      <label htmlFor="mood-input" className="mb-3 block text-sm text-slate-300">
        Journal Entry
      </label>
      <textarea
        id="mood-input"
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="How are you feeling today?"
        className="h-40 w-full rounded-xl border border-slate-700/70 bg-slate-900/80 p-4 text-slate-100 outline-none ring-cyan-400 transition focus:ring-2"
      />
      <button
        type="submit"
        disabled={loading}
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 px-4 py-3 font-medium text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
        {loading ? "Analyzing..." : "Analyze Mood"}
      </button>
    </form>
  );
}

export default MoodForm;
