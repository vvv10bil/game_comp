import { useEffect, useState } from "react";

import { api } from "../api/client.js";

const EMPTY = { name: "", side: "T", primary: "AK-47", secondary: "Desert Eagle", knife: "", notes: "" };

export function Loadouts() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");

  const load = () => api.get("/loadouts").then((r) => setItems(r.data));

  useEffect(() => {
    load();
  }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/loadouts", form);
      setForm(EMPTY);
      await load();
    } catch (err) {
      setError(err.response?.data?.error ?? "Помилка збереження");
    }
  };

  const onDelete = async (id) => {
    await api.delete(`/loadouts/${id}`);
    await load();
  };

  return (
    <section>
      <h1>Мої лоудаути</h1>

      <form className="form card" onSubmit={onSubmit}>
        <h3>Створити лоудаут</h3>
        <div className="row">
          <label>
            Назва
            <input name="name" value={form.name} onChange={onChange} required />
          </label>
          <label>
            Сторона
            <select name="side" value={form.side} onChange={onChange}>
              <option value="T">T (Terrorist)</option>
              <option value="CT">CT (Counter-Terrorist)</option>
            </select>
          </label>
        </div>
        <div className="row">
          <label>
            Primary
            <input name="primary" value={form.primary} onChange={onChange} required />
          </label>
          <label>
            Secondary
            <input name="secondary" value={form.secondary} onChange={onChange} required />
          </label>
          <label>
            Ніж
            <input name="knife" value={form.knife} onChange={onChange} />
          </label>
        </div>
        <label>
          Нотатки
          <textarea name="notes" value={form.notes} onChange={onChange} rows={2} />
        </label>
        {error && <p className="error">{error}</p>}
        <button className="btn primary">Зберегти</button>
      </form>

      <div className="grid loadouts">
        {items.length === 0 && <p className="muted">Поки що немає лоудаутів.</p>}
        {items.map((l) => (
          <article key={l.id} className="card loadout-card">
            <header>
              <h3>{l.name}</h3>
              <span className={`badge side-${l.side}`}>{l.side}</span>
            </header>
            <ul className="loadout-list">
              <li><b>Primary:</b> {l.primary}</li>
              <li><b>Secondary:</b> {l.secondary}</li>
              {l.knife && <li><b>Ніж:</b> {l.knife}</li>}
            </ul>
            {l.notes && <p className="muted">{l.notes}</p>}
            <button className="btn danger" onClick={() => onDelete(l.id)}>Видалити</button>
          </article>
        ))}
      </div>
    </section>
  );
}
