import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlayerForm from "./components/PlayerForm";
import MemoryGame from "./components/MemoryGame";
import Ranking from "./components/Ranking";
import "./styles/App.css";

const App = () => {
  return (
    <Router>
      <div className="app">
        <h1 className="app-title">Parrots Card Game</h1>
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
