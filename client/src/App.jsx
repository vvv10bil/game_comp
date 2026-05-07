import { Navigate, Route, Routes } from "react-router-dom";

import { Navbar } from "./components/Navbar.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { Loadouts } from "./pages/Loadouts.jsx";
import { Login } from "./pages/Login.jsx";
import { Matches } from "./pages/Matches.jsx";
import { Register } from "./pages/Register.jsx";
import { Weapons } from "./pages/Weapons.jsx";

function Protected({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="container">Завантаження…</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Protected><Dashboard /></Protected>} />
          <Route path="/loadouts" element={<Protected><Loadouts /></Protected>} />
          <Route path="/matches" element={<Protected><Matches /></Protected>} />
          <Route path="/weapons" element={<Protected><Weapons /></Protected>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}
