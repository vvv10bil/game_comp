import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { api } from "../api/client.js";
import { KdaBar } from "../components/charts/KdaBar.jsx";
import { KdTrend } from "../components/charts/KdTrend.jsx";
import { MapBar } from "../components/charts/MapBar.jsx";
import { WinLossPie } from "../components/charts/WinLossPie.jsx";
import { Crosshair } from "../components/Crosshair.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    Promise.all([
      api.get("/matches/stats").then((r) => r.data),
      api.get("/matches").then((r) => r.data),
    ]).then(([s, m]) => {
      setStats(s);
      setMatches(m);
    });
  }, []);

  const draws = stats ? stats.total - stats.wins - stats.losses : 0;

  return (
    <section>
      <div className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-content">
          <div className="hero-eyebrow">
            <Crosshair size={18} color="#f5a623" />
            <span>CS2 COMPANION</span>
          </div>
          <h1>Привіт, {user.username}!</h1>
          <p className="hero-sub">
            Твій персональний центр для Counter-Strike 2 — статистика, лоудаути та журнал матчів.
          </p>
        </div>
      </div>

      <div className="grid stats">
        <StatCard label="Матчів зіграно" value={stats?.total ?? "—"} />
        <StatCard label="Перемог" value={stats?.wins ?? "—"} accent="success" />
        <StatCard label="Win rate" value={stats ? `${stats.winRate}%` : "—"} />
        <StatCard label="K/D" value={stats?.kd ?? "—"} accent="primary" />
      </div>

      <div className="grid charts">
        <ChartCard title="Перемоги vs Поразки">
          <WinLossPie wins={stats?.wins ?? 0} losses={stats?.losses ?? 0} draws={draws} />
        </ChartCard>
        <ChartCard title="K/D-тренд (останні матчі)">
          <KdTrend matches={matches} />
        </ChartCard>
        <ChartCard title="K/D/A в останніх 10 матчах">
          <KdaBar matches={matches} />
        </ChartCard>
        <ChartCard title="Розподіл по мапах">
          <MapBar matches={matches} />
        </ChartCard>
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

function StatCard({ label, value, accent }) {
  return (
    <div className="card stat-card">
      <div className={`stat-value ${accent ? `accent-${accent}` : ""}`}>{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="card chart-card">
      <h3>{title}</h3>
      <div className="chart-body">{children}</div>
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
