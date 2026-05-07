import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import History from "./pages/History";
import Database from "./pages/Database";

function App() {
  return (
    <div className="min-h-screen text-slate-800">
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-4 pb-12 pt-6 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/database" element={<Database />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
