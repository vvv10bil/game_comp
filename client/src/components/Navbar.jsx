import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";
import { Crosshair } from "./Crosshair.jsx";

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [logoBroken, setLogoBroken] = useState(false);

  const onLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="navbar">
      <Link to="/" className="brand">
        {logoBroken ? (
          <Crosshair size={28} color="#f5a623" />
        ) : (
          <img
            className="brand-logo"
            src="/media/game-icon.bmp"
            alt=""
            onError={() => setLogoBroken(true)}
          />
        )}
        CS2<span>Companion</span>
      </Link>
      {user && (
        <nav className="nav-links">
          <NavLink to="/" end>Огляд</NavLink>
          <NavLink to="/loadouts">Лоудаути</NavLink>
          <NavLink to="/matches">Матчі</NavLink>
          <NavLink to="/weapons">Зброя</NavLink>
        </nav>
      )}
      <div className="nav-user">
        {user ? (
          <>
            <span className="username">{user.username}</span>
            <button className="btn ghost" onClick={onLogout}>Вийти</button>
          </>
        ) : (
          <>
            <Link className="btn ghost" to="/login">Вхід</Link>
            <Link className="btn primary" to="/register">Реєстрація</Link>
          </>
        )}
      </div>
    </header>
  );
}
