import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function MapBar({ matches }) {
  if (!matches || matches.length === 0) {
    return <p className="muted center">Поки що немає даних для графіку.</p>;
  }

  const counts = matches.reduce((acc, m) => {
    acc[m.map] = (acc[m.map] ?? 0) + 1;
    return acc;
  }, {});
  const data = Object.entries(counts)
    .map(([map, count]) => ({ map: map.replace("de_", ""), count }))
    .sort((a, b) => b.count - a.count);

  const palette = ["#f5a623", "#2563eb", "#3fb950", "#a78bfa", "#f85149", "#06b6d4", "#ec4899", "#94a3b8"];

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2a313c" />
        <XAxis dataKey="map" stroke="#8b949e" />
        <YAxis allowDecimals={false} stroke="#8b949e" />
        <Tooltip
          contentStyle={{ background: "#161b22", border: "1px solid #2a313c", borderRadius: 8 }}
          itemStyle={{ color: "#e6edf3" }}
          cursor={{ fill: "rgba(245,166,35,0.08)" }}
        />
        <Bar dataKey="count" name="Матчі" radius={[4, 4, 0, 0]}>
          {data.map((_, i) => (
            <Cell key={i} fill={palette[i % palette.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
