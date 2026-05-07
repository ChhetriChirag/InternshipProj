import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchDatabaseView } from "../services/api";

function Database() {
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState(null);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const loadDatabaseView = async () => {
      try {
        const data = await fetchDatabaseView();
        setMeta(data.meta || null);
        setEntries(data.entries || []);
      } catch (error) {
        toast.error(error?.response?.data?.error || "Failed to load database view.");
      } finally {
        setLoading(false);
      }
    };
    loadDatabaseView();
  }, []);

  return (
    <div className="space-y-6">
      <section className="glass-card p-5">
        <h2 className="text-2xl font-semibold text-slate-800">Database Viewer</h2>
        <p className="mt-1 text-slate-600">
          Internship demo tab showing what is currently stored in SQLite.
        </p>
      </section>

      {loading ? (
        <div className="glass-card p-8 text-center text-slate-600">Loading database records...</div>
      ) : (
        <>
          <section className="glass-card p-5">
            <h3 className="mb-3 text-lg font-semibold text-slate-800">Table Metadata</h3>
            {!meta ? (
              <p className="text-slate-600">No metadata available yet.</p>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                <p className="rounded-xl bg-white/70 p-3 text-sm text-slate-700">
                  <span className="font-semibold">Database File:</span> {meta.database}
                </p>
                <p className="rounded-xl bg-white/70 p-3 text-sm text-slate-700">
                  <span className="font-semibold">Table:</span> {meta.table}
                </p>
                <p className="rounded-xl bg-white/70 p-3 text-sm text-slate-700">
                  <span className="font-semibold">Rows:</span> {meta.total_rows}
                </p>
                <p className="rounded-xl bg-white/70 p-3 text-sm text-slate-700">
                  <span className="font-semibold">First Entry:</span> {meta.first_entry_at || "N/A"}
                </p>
                <p className="rounded-xl bg-white/70 p-3 text-sm text-slate-700 sm:col-span-2">
                  <span className="font-semibold">Latest Entry:</span> {meta.latest_entry_at || "N/A"}
                </p>
              </div>
            )}
          </section>

          <section className="glass-card overflow-hidden">
            <div className="border-b border-rose-100 bg-white/55 px-5 py-3">
              <h3 className="text-lg font-semibold text-slate-800">Entries Table</h3>
            </div>
            {!entries.length ? (
              <p className="p-6 text-slate-600">No rows yet. Submit a mood entry to populate the table.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm text-slate-700">
                  <thead className="bg-rose-50/80 text-slate-800">
                    <tr>
                      <th className="px-4 py-3">ID</th>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3">Mood</th>
                      <th className="px-4 py-3">Score</th>
                      <th className="px-4 py-3">Polarity</th>
                      <th className="px-4 py-3">Entry</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((entry) => (
                      <tr key={entry.id} className="border-t border-rose-100/80">
                        <td className="px-4 py-3">{entry.id}</td>
                        <td className="px-4 py-3">{entry.created_at}</td>
                        <td className="px-4 py-3">{entry.mood}</td>
                        <td className="px-4 py-3">{entry.score}</td>
                        <td className="px-4 py-3">{entry.polarity}</td>
                        <td className="max-w-md px-4 py-3">{entry.text}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}

export default Database;
