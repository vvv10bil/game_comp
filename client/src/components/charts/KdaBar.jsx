import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function KdaBar({ matches }) {
  if (!matches || matches.length === 0) {
    return <p className="muted center">Поки що немає даних для графіку.</p>;
  }

  const data = [...matches]
    .slice(0, 10)
    .reverse()
    .map((m, i) => ({
      label: `#${i + 1}`,
      kills: m.kills,
      deaths: m.deaths,
      assists: m.assists,
    }));

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#2a313c" />
        <XAxis dataKey="label" stroke="#8b949e" />
        <YAxis stroke="#8b949e" />
        <Tooltip
          contentStyle={{ background: "#161b22", border: "1px solid #2a313c", borderRadius: 8 }}
          itemStyle={{ color: "#e6edf3" }}
          cursor={{ fill: "rgba(245,166,35,0.08)" }}
        />
        <Legend wrapperStyle={{ color: "#e6edf3" }} />
        <Bar dataKey="kills" name="Kills" fill="#f5a623" radius={[4, 4, 0, 0]} />
        <Bar dataKey="deaths" name="Deaths" fill="#f85149" radius={[4, 4, 0, 0]} />
        <Bar dataKey="assists" name="Assists" fill="#3fb950" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
