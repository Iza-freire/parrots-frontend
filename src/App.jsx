import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import PlayerForm from "./components/PlayerForm";
import MemoryGame from "./components/MemoryGame";
import Ranking from "./components/Ranking";
import "./styles/App.css";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<PlayerForm />} />
          <Route path="/game" element={<MemoryGame />} />
          <Route path="/ranking" element={<Ranking />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
