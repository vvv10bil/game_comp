import { useEffect, useState } from "react";

import { api } from "../api/client.js";
import { MapThumb } from "../components/MapThumb.jsx";

const EMPTY = { map: "de_dust2", result: "win", score: "16:13", kills: 0, deaths: 0, assists: 0 };

const MAPS = ["de_dust2", "de_mirage", "de_inferno", "de_nuke", "de_overpass", "de_ancient", "de_anubis", "de_vertigo"];

export function Matches() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");

  const load = () => api.get("/matches").then((r) => setItems(r.data));
  useEffect(() => { load(); }, []);

  const onChange = (e) => {
    const { name, value, type } = e.target;
    setForm({ ...form, [name]: type === "number" ? Number(value) : value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/matches", form);
      setForm(EMPTY);
      await load();
    } catch (err) {
      setError(err.response?.data?.error ?? "Помилка збереження");
    }
  };

  const onDelete = async (id) => {
    await api.delete(`/matches/${id}`);
    await load();
  };

  return (
    <section>
      <h1>Журнал матчів</h1>

      <form className="form card" onSubmit={onSubmit}>
        <h3>Додати матч</h3>
        <div className="row">
          <label>
            Мапа
            <select name="map" value={form.map} onChange={onChange}>
              {MAPS.map((m) => <option key={m}>{m}</option>)}
            </select>
          </label>
          <label>
            Результат
            <select name="result" value={form.result} onChange={onChange}>
              <option value="win">Перемога</option>
              <option value="loss">Поразка</option>
              <option value="draw">Нічия</option>
            </select>
          </label>
          <label>
            Рахунок
            <input name="score" value={form.score} onChange={onChange} placeholder="16:13" required />
          </label>
        </div>
        <div className="row">
          <label>K<input name="kills" type="number" min={0} value={form.kills} onChange={onChange} /></label>
          <label>D<input name="deaths" type="number" min={0} value={form.deaths} onChange={onChange} /></label>
          <label>A<input name="assists" type="number" min={0} value={form.assists} onChange={onChange} /></label>
        </div>
        {error && <p className="error">{error}</p>}
        <button className="btn primary">Додати</button>
      </form>

      <div className="grid matches-grid">
        {items.length === 0 && <p className="muted">Поки що немає матчів.</p>}
        {items.map((m) => (
          <article key={m.id} className={`card match-card result-bg-${m.result}`}>
            <MapThumb map={m.map} size="md" />
            <div className="match-body">
              <header className="match-header">
                <span className={`badge result-${m.result}`}>
                  {m.result === "win" ? "Перемога" : m.result === "loss" ? "Поразка" : "Нічия"}
                </span>
                <span className="muted">{new Date(m.playedAt).toLocaleDateString()}</span>
              </header>
              <div className="match-score">{m.score}</div>
              <div className="match-kda">
                <span><b>{m.kills}</b><small>K</small></span>
                <span><b>{m.deaths}</b><small>D</small></span>
                <span><b>{m.assists}</b><small>A</small></span>
              </div>
              <button className="btn ghost match-delete" onClick={() => onDelete(m.id)}>Видалити</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
