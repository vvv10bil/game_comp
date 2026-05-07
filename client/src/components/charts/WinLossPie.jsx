import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = { win: "#3fb950", loss: "#f85149", draw: "#8b949e" };

export function WinLossPie({ wins, losses, draws = 0 }) {
  const data = [
    { name: "Перемоги", value: wins, key: "win" },
    { name: "Поразки", value: losses, key: "loss" },
    { name: "Нічиї", value: draws, key: "draw" },
  ].filter((d) => d.value > 0);

  if (data.length === 0) {
    return <p className="muted center">Зіграй кілька матчів, щоб побачити графік.</p>;
  }

  return (
    <ResponsiveContainer width="100%" height={240}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={55}
          outerRadius={90}
          paddingAngle={3}
          stroke="#161b22"
          strokeWidth={2}
        >
          {data.map((entry) => (
            <Cell key={entry.key} fill={COLORS[entry.key]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ background: "#161b22", border: "1px solid #2a313c", borderRadius: 8 }}
          itemStyle={{ color: "#e6edf3" }}
        />
        <Legend wrapperStyle={{ color: "#e6edf3" }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
