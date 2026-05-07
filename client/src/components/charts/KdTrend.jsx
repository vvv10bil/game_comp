import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function KdTrend({ matches }) {
  if (!matches || matches.length === 0) {
    return <p className="muted center">Поки що немає даних для графіку.</p>;
  }

  const data = [...matches]
    .slice(0, 15)
    .reverse()
    .map((m, i) => ({
      label: `#${i + 1}`,
      kd: m.deaths === 0 ? m.kills : Number((m.kills / m.deaths).toFixed(2)),
    }));

  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
        <defs>
          <linearGradient id="kdFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f5a623" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#f5a623" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#2a313c" />
        <XAxis dataKey="label" stroke="#8b949e" />
        <YAxis stroke="#8b949e" />
        <Tooltip
          contentStyle={{ background: "#161b22", border: "1px solid #2a313c", borderRadius: 8 }}
          itemStyle={{ color: "#e6edf3" }}
        />
        <Area
          type="monotone"
          dataKey="kd"
          name="K/D"
          stroke="#f5a623"
          strokeWidth={2}
          fill="url(#kdFill)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
