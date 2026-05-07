import { useEffect, useState } from "react";

import { api } from "../api/client.js";
import { WeaponImage } from "../components/WeaponImage.jsx";

const EMPTY = { name: "", side: "T", primary: "AK-47", secondary: "Desert Eagle", knife: "", notes: "" };

const PRIMARY_OPTIONS = ["AK-47", "M4A4", "M4A1-S", "AWP", "FAMAS", "Galil AR"];
const SECONDARY_OPTIONS = ["Desert Eagle", "USP-S", "Glock-18", "P250"];

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
            <select name="primary" value={form.primary} onChange={onChange}>
              {PRIMARY_OPTIONS.map((w) => <option key={w}>{w}</option>)}
            </select>
          </label>
          <label>
            Secondary
            <select name="secondary" value={form.secondary} onChange={onChange}>
              {SECONDARY_OPTIONS.map((w) => <option key={w}>{w}</option>)}
            </select>
          </label>
          <label>
            Ніж
            <input name="knife" value={form.knife} onChange={onChange} placeholder="Karambit, Butterfly…" />
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
          <article key={l.id} className={`card loadout-card side-bg-${l.side}`}>
            <header>
              <h3>{l.name}</h3>
              <span className={`badge side-${l.side}`}>{l.side}</span>
            </header>

            <div className="loadout-weapons">
              <div className="loadout-weapon">
                <WeaponImage name={l.primary} />
                <span>{l.primary}</span>
              </div>
              <div className="loadout-weapon">
                <WeaponImage name={l.secondary} />
                <span>{l.secondary}</span>
              </div>
            </div>

            {l.knife && <p className="muted"><b>Ніж:</b> {l.knife}</p>}
            {l.notes && <p className="muted">{l.notes}</p>}

            <button className="btn danger" onClick={() => onDelete(l.id)}>Видалити</button>
          </article>
        ))}
      </div>
    </section>
  );
}
