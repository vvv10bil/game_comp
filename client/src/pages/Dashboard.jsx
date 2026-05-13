import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { api } from "../api/client.js";
import { HERO_VIDEO } from "../assets/images.js";
import { KdaBar } from "../components/charts/KdaBar.jsx";
import { KdTrend } from "../components/charts/KdTrend.jsx";
import { MapBar } from "../components/charts/MapBar.jsx";
import { WinLossPie } from "../components/charts/WinLossPie.jsx";
import { Crosshair } from "../components/Crosshair.jsx";
import { MapThumb } from "../components/MapThumb.jsx";
import { WeaponImage } from "../components/WeaponImage.jsx";
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
        <video
          className="hero-video"
          src={HERO_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={(e) => e.currentTarget.remove()}
        />
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
        <ChartCard title="Розподіл по мапах">
          <MapBar matches={matches} />
        </ChartCard>
        <ChartCard title="K/D/A в останніх 10 матчах">
          <KdaBar matches={matches} />
        </ChartCard>
        <ChartCard title="K/D-тренд (останні матчі)" full>
          <KdTrend matches={matches} />
        </ChartCard>
      </div>

      <div className="grid quick">
        <QuickCard
          to="/loadouts"
          title="Лоудаути"
          desc="Зберігай улюблені комплекти зброї та скінів."
          accent="t"
          art={<WeaponImage name="AK-47" className="quick-art-img" />}
        />
        <QuickCard
          to="/matches"
          title="Журнал матчів"
          desc="Логуй гру: K/D, мапа, рахунок, результат."
          accent="map"
          art={<MapThumb map="de_dust2" size="md" />}
        />
        <QuickCard
          to="/weapons"
          title="Каталог зброї"
          desc="Переглядай зброю CS2 з фільтрами по сторонах і категоріях."
          accent="ct"
          art={<WeaponImage name="AWP" className="quick-art-img" />}
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

function ChartCard({ title, children, full }) {
  return (
    <div className={`card chart-card ${full ? "chart-full" : ""}`}>
      <h3>{title}</h3>
      <div className="chart-body">{children}</div>
    </div>
  );
}

function QuickCard({ to, title, desc, art, accent }) {
  return (
    <Link to={to} className={`card quick-card quick-${accent ?? "default"}`}>
      <div className="quick-art">{art}</div>
      <div className="quick-body">
        <h3>{title}</h3>
        <p>{desc}</p>
        <span className="quick-arrow" aria-hidden="true">→</span>
      </div>
    </Link>
  );
}
