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
      <section className="relative overflow-hidden rounded-3xl border border-slate-700/40 bg-gradient-to-r from-slate-900/90 to-slate-800/70 p-8 shadow-glow transition duration-500 hover:border-cyan-400/40">
        <div className="absolute -right-6 -top-8 h-36 w-36 animate-float rounded-full bg-cyan-500/25 blur-3xl" />
        <div className="absolute -bottom-10 left-10 h-36 w-36 animate-float rounded-full bg-violet-500/20 blur-3xl" />
        <div className="relative">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">MoodSync AI</h1>
          <p className="mt-3 text-lg text-slate-300">Track your emotions. Understand yourself.</p>
          <p className="mt-3 max-w-2xl text-slate-400">
            Journal your thoughts, get AI-powered emotion insights, and build a beautiful mood timeline.
          </p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <MoodForm onSubmit={handleAnalyze} loading={loading} />
        <ResultCard result={result} />
      </section>
    </div>
  );
}

export default Home;
