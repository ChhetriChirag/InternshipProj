function MindfulnessWidgets({ entries }) {
  if (!entries.length) {
    return null;
  }

  const averageScore = Math.round(entries.reduce((sum, entry) => sum + entry.score, 0) / entries.length);
  const lastMood = entries[0]?.mood || "Neutral";
  const positiveDays = entries.filter((entry) => entry.score >= 60).length;
  const mindfulRatio = Math.round((positiveDays / entries.length) * 100);

  return (
    <section className="grid gap-4 md:grid-cols-3">
      <article className="glass-card p-5">
        <p className="text-sm text-slate-600">Average Mood Score</p>
        <p className="mt-2 text-3xl font-bold text-fuchsia-600">{averageScore}</p>
        <p className="mt-1 text-sm text-slate-500">Based on {entries.length} entries</p>
      </article>

      <article className="glass-card p-5">
        <p className="text-sm text-slate-600">Current Emotion</p>
        <p className="mt-2 text-3xl font-bold text-sky-600">{lastMood}</p>
        <p className="mt-1 text-sm text-slate-500">Your latest logged mood</p>
      </article>

      <article className="glass-card p-5">
        <p className="text-sm text-slate-600">Mindfulness Figure</p>
        <div className="mt-3 flex items-center gap-4">
          <div className="mind-breathe-orb" />
          <div>
            <p className="text-3xl font-bold text-amber-600">{mindfulRatio}%</p>
            <p className="text-sm text-slate-500">Balanced days</p>
          </div>
        </div>
      </article>
    </section>
  );
}

export default MindfulnessWidgets;
