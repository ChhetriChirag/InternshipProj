import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import MoodHistory from "../components/MoodHistory";
import MoodCharts from "../components/MoodCharts";
import { fetchEntries } from "../services/api";

function History() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEntries = async () => {
      try {
        const data = await fetchEntries();
        setEntries(data.entries || []);
      } catch (error) {
        toast.error(error?.response?.data?.error || "Failed to load mood history.");
      } finally {
        setLoading(false);
      }
    };
    loadEntries();
  }, []);

  return (
    <div className="space-y-6">
      <section className="glass-card p-5">
        <h2 className="text-2xl font-semibold text-slate-800">Mood History</h2>
        <p className="mt-1 text-slate-600">See your emotional trends and progress over time.</p>
      </section>
      {loading ? (
        <div className="glass-card p-8 text-center text-slate-600">Loading entries...</div>
      ) : (
        <>
          <MoodCharts entries={entries} />
          <MoodHistory entries={entries} />
        </>
      )}
    </div>
  );
}

export default History;
