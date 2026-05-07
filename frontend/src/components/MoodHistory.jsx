function MoodHistory({ entries }) {
  if (!entries.length) {
    return (
      <div className="glass-card p-8 text-center text-slate-400">
        No journal entries yet. Start writing to build your mood history.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {entries.map((entry) => (
        <article key={entry.id} className="glass-card p-4">
          <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
            <span>{new Date(entry.created_at).toLocaleString()}</span>
            <span className="rounded-full bg-slate-800/80 px-2 py-1">{entry.mood}</span>
          </div>
          <p className="text-sm text-slate-400">Score: {entry.score}/100</p>
          <p className="mt-2 max-h-16 overflow-hidden text-slate-200">{entry.text}</p>
        </article>
      ))}
    </div>
  );
}

export default MoodHistory;
