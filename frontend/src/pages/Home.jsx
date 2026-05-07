import { useState } from "react";
import toast from "react-hot-toast";
import MoodForm from "../components/MoodForm";
import ResultCard from "../components/ResultCard";
import { analyzeMood } from "../services/api";

function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async (text, onSuccess) => {
    if (!text.trim()) {
      toast.error("Please write something about your day.");
      return;
    }

    try {
      setLoading(true);
      const data = await analyzeMood(text);
      setResult(data);
      onSuccess();
      toast.success("Mood analyzed and saved.");
    } catch (error) {
      toast.error(error?.response?.data?.error || "Could not analyze mood. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-white/80 bg-gradient-to-r from-fuchsia-500/85 via-rose-400/80 to-amber-300/85 p-8 shadow-xl transition duration-500 hover:scale-[1.01]">
        <div className="absolute -right-6 -top-8 h-36 w-36 animate-float rounded-full bg-white/30 blur-3xl" />
        <div className="absolute -bottom-10 left-10 h-36 w-36 animate-float rounded-full bg-sky-200/40 blur-3xl" />
        <div className="relative">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">MoodSync AI</h1>
          <p className="mt-3 text-lg text-pink-50">Track your emotions. Understand yourself.</p>
          <p className="mt-3 max-w-2xl text-rose-50/95">
            Journal your thoughts, get AI-powered emotion insights, and build a beautiful mood timeline.
          </p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <MoodForm onSubmit={handleAnalyze} loading={loading} />
        <ResultCard result={result} />
      </section>
      {loading ? (
        <section className="glass-card overflow-hidden p-5">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-medium text-slate-700">MoodSync AI is processing your journal entry...</p>
            <span className="text-xs text-fuchsia-700">Analyzing</span>
          </div>
          <div className="processing-bar h-2 w-full overflow-hidden rounded-full bg-white/80">
            <div className="processing-bar-inner h-full rounded-full bg-gradient-to-r from-fuchsia-500 via-rose-500 to-amber-400" />
          </div>
        </section>
      ) : null}
    </div>
  );
}

export default Home;
