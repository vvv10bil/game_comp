import { useEffect, useState } from "react";

import { api } from "../api/client.js";
import { WeaponImage } from "../components/WeaponImage.jsx";

export function Weapons() {
  const [items, setItems] = useState([]);
  const [side, setSide] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const params = {};
    if (side) params.side = side;
    if (category) params.category = category;
    api.get("/weapons", { params }).then((r) => setItems(r.data));
  }, [side, category]);

  return (
    <section>
      <h1>Каталог зброї CS2</h1>
      <p className="muted">Обери сторону і категорію — побачиш доступні стволи з ціною.</p>

      <div className="filters">
        <select value={side} onChange={(e) => setSide(e.target.value)}>
          <option value="">Усі сторони</option>
          <option value="T">T (Terrorist)</option>
          <option value="CT">CT (Counter-Terrorist)</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Усі категорії</option>
          <option value="rifle">Гвинтівки</option>
          <option value="sniper">Снайперські</option>
          <option value="smg">SMG</option>
          <option value="heavy">Важка зброя</option>
          <option value="pistol">Пістолети</option>
        </select>
      </div>

      <div className="grid weapons">
        {items.map((w) => (
          <article key={w.id} className="card weapon-card">
            <div className="weapon-img-wrap">
              <WeaponImage name={w.name} />
            </div>
            <h3>{w.name}</h3>
            <div className="weapon-meta">
              <span className={`badge cat-${w.category}`}>{w.category}</span>
              {w.side !== "BOTH" ? (
                <span className={`badge side-${w.side}`}>{w.side}</span>
              ) : (
                <span className="badge side-BOTH">T / CT</span>
              )}
            </div>
            <div className="price">${w.price}</div>
          </article>
        ))}
        {items.length === 0 && <p className="muted">Немає зброї за цими фільтрами.</p>}
      </div>
    </section>
  );
}
