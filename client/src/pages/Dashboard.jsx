import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { api } from "../api/client.js";
import { useAuth } from "../context/AuthContext.jsx";

export function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/matches/stats").then((res) => setStats(res.data));
  }, []);

  return (
    <section>
      <h1>Привіт, {user.username}!</h1>
      <p className="muted">Це твій персональний центр для CS2.</p>

      <div className="grid stats">
        <StatCard label="Матчів зіграно" value={stats?.total ?? "—"} />
        <StatCard label="Перемог" value={stats?.wins ?? "—"} />
        <StatCard label="Win rate" value={stats ? `${stats.winRate}%` : "—"} />
        <StatCard label="K/D" value={stats?.kd ?? "—"} />
      </div>

      <div className="grid quick">
        <QuickCard
          to="/loadouts"
          title="Лоудаути"
          desc="Зберігай улюблені комплекти зброї та скінів."
        />
        <QuickCard
          to="/matches"
          title="Журнал матчів"
          desc="Логуй гру: K/D, мапа, рахунок, результат."
        />
        <QuickCard
          to="/weapons"
          title="Каталог зброї"
          desc="Переглядай зброю CS2 з фільтрами по сторонах і категоріях."
        />
      </div>
    </section>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="card stat-card">
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function QuickCard({ to, title, desc }) {
  return (
    <Link to={to} className="card quick-card">
      <h3>{title}</h3>
      <p>{desc}</p>
    </Link>
  );
}
