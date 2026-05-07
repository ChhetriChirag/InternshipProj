import { NavLink } from "react-router-dom";
import { BrainCircuit } from "lucide-react";

function Navbar() {
  const navClass = ({ isActive }) =>
    `rounded-xl px-3 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-gradient-to-r from-fuchsia-500/30 to-orange-400/30 text-white"
        : "text-slate-700 hover:bg-white/70 hover:text-slate-900"
    }`;

  return (
    <header className="sticky top-0 z-20 border-b border-rose-200/60 bg-white/70 backdrop-blur-xl">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-2 text-lg font-semibold text-fuchsia-700">
          <BrainCircuit className="h-5 w-5" />
          MoodSync AI
        </NavLink>
        <div className="flex items-center gap-2">
          <NavLink to="/" className={navClass}>
            Home
          </NavLink>
          <NavLink to="/history" className={navClass}>
            History
          </NavLink>
          <NavLink to="/database" className={navClass}>
            Database
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
