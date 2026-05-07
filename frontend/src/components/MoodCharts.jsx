import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#34d399", "#60a5fa", "#f87171", "#fbbf24", "#94a3b8"];

function MoodCharts({ entries }) {
  const weeklyData = [...entries]
    .slice(0, 7)
    .reverse()
    .map((entry) => ({
      day: new Date(entry.created_at).toLocaleDateString(undefined, { weekday: "short" }),
      score: entry.score,
    }));

  const moodCounts = entries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {});

  const moodDistribution = Object.entries(moodCounts).map(([name, value]) => ({ name, value }));

  if (!entries.length) {
    return null;
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="glass-card h-[320px] p-4">
        <h3 className="mb-4 text-lg font-semibold text-slate-100">Weekly Mood Score</h3>
        <ResponsiveContainer width="100%" height="90%">
          <LineChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="day" stroke="#cbd5e1" />
            <YAxis domain={[0, 100]} stroke="#cbd5e1" />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="#22d3ee" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="glass-card h-[320px] p-4">
        <h3 className="mb-4 text-lg font-semibold text-slate-100">Mood Distribution</h3>
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie data={moodDistribution} dataKey="value" nameKey="name" outerRadius={92} label>
              {moodDistribution.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MoodCharts;
