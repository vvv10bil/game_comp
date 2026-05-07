import { useEffect, useState } from "react";

import { api } from "../api/client.js";

const EMPTY = { map: "de_dust2", result: "win", score: "16:13", kills: 0, deaths: 0, assists: 0 };

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
              <option>de_dust2</option>
              <option>de_mirage</option>
              <option>de_inferno</option>
              <option>de_nuke</option>
              <option>de_overpass</option>
              <option>de_ancient</option>
              <option>de_anubis</option>
              <option>de_vertigo</option>
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

      <table className="matches">
        <thead>
          <tr>
            <th>Дата</th>
            <th>Мапа</th>
            <th>Результат</th>
            <th>Рахунок</th>
            <th>K/D/A</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((m) => (
            <tr key={m.id}>
              <td>{new Date(m.playedAt).toLocaleDateString()}</td>
              <td>{m.map}</td>
              <td className={`result-${m.result}`}>{m.result}</td>
              <td>{m.score}</td>
              <td>{m.kills}/{m.deaths}/{m.assists}</td>
              <td><button className="btn ghost" onClick={() => onDelete(m.id)}>×</button></td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr><td colSpan={6} className="muted">Поки що немає матчів.</td></tr>
          )}
        </tbody>
      </table>
    </section>
  );
}
