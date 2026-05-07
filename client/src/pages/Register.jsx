import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";

export function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await register(email, username, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error ?? "Не вдалося зареєструватися");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="auth-card">
      <h1>Реєстрація</h1>
      <form onSubmit={onSubmit} className="form">
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Нікнейм
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            minLength={3}
            maxLength={32}
            required
          />
        </label>
        <label>
          Пароль (мін. 8 символів)
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
            autoComplete="new-password"
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button className="btn primary" disabled={busy}>
          {busy ? "Створення…" : "Створити акаунт"}
        </button>
      </form>
      <p className="muted">
        Вже маєте акаунт? <Link to="/login">Увійти</Link>
      </p>
    </div>
  );
}
