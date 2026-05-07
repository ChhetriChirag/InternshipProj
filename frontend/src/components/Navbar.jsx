import { NavLink } from "react-router-dom";
import { BrainCircuit } from "lucide-react";

function Navbar() {
  const navClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm transition ${
      isActive ? "bg-cyan-500/20 text-cyan-200" : "text-slate-300 hover:bg-slate-800/70 hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-20 border-b border-slate-800/70 bg-slate-950/80 backdrop-blur-xl">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-2 text-lg font-semibold text-cyan-200">
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
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
