import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  RadialBarChart,
  RadialBar,
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
  const averageScore =
    entries.reduce((sum, entry) => sum + entry.score, 0) / Math.max(entries.length, 1);
  const radialData = [
    {
      name: "Mindfulness",
      value: Math.round(averageScore),
      fill: "#f97316",
    },
  ];

  if (!entries.length) {
    return null;
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="glass-card h-[320px] p-4">
        <h3 className="mb-4 text-lg font-semibold text-slate-800">Weekly Mood Flow</h3>
        <ResponsiveContainer width="100%" height="90%">
          <AreaChart data={weeklyData}>
            <CartesianGrid strokeDasharray="4 4" stroke="#f8cfe1" />
            <XAxis dataKey="day" stroke="#475569" />
            <YAxis domain={[0, 100]} stroke="#475569" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#ec4899"
              fill="url(#weeklyGradient)"
              strokeWidth={3}
              animationDuration={1100}
            />
            <defs>
              <linearGradient id="weeklyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f472b6" stopOpacity={0.85} />
                <stop offset="95%" stopColor="#f9a8d4" stopOpacity={0.2} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="glass-card h-[320px] p-4">
        <h3 className="mb-4 text-lg font-semibold text-slate-800">Mood Distribution</h3>
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie
              data={moodDistribution}
              dataKey="value"
              nameKey="name"
              outerRadius={92}
              label
              animationDuration={900}
            >
              {moodDistribution.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="glass-card h-[300px] p-4 lg:col-span-2">
        <h3 className="mb-2 text-lg font-semibold text-slate-800">Mindfulness Meter</h3>
        <p className="mb-4 text-sm text-slate-600">
          Animated score based on your overall mood consistency.
        </p>
        <ResponsiveContainer width="100%" height="80%">
          <RadialBarChart
            innerRadius="35%"
            outerRadius="95%"
            data={radialData}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar background clockWise dataKey="value" cornerRadius={12} animationDuration={1200} />
            <Legend />
            <Tooltip />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MoodCharts;
