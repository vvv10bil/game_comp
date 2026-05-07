import { useEffect, useState } from "react";

import { api } from "../api/client.js";

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

      <div className="filters">
        <select value={side} onChange={(e) => setSide(e.target.value)}>
          <option value="">Усі сторони</option>
          <option value="T">T</option>
          <option value="CT">CT</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Усі категорії</option>
          <option value="rifle">Гвинтівки</option>
          <option value="sniper">Снайперські</option>
          <option value="smg">SMG</option>
          <option value="pistol">Пістолети</option>
        </select>
      </div>

      <div className="grid weapons">
        {items.map((w) => (
          <div key={w.id} className="card weapon-card">
            <h3>{w.name}</h3>
            <div className="muted">{w.category} · {w.side}</div>
            <div className="price">${w.price}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
