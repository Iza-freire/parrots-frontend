import React, { useState } from "react";
import MemoryGame from "./components/MemoryGame";
import PlayerForm from "./components/PlayerForm";
import Ranking from "./components/Ranking";
import "./styles/App.css";

const App = () => {
  const [player, setPlayer] = useState(null); // Armazena os dados do jogador registrado
  const [stage, setStage] = useState("register"); // Controla o estágio: 'register', 'game', 'ranking'
  const [quantity, setQuantity] = useState(4); // Número de cartas no jogo

  // Callback para quando o jogador for registrado
  const handlePlayerRegistered = (registeredPlayer) => {
    setPlayer(registeredPlayer);
    setStage("game");
  };

  // Callback para quando o jogo for concluído
  const handleGameCompleted = () => {
    setStage("ranking");
  };

  const handleQuantitySelected = (selectedQuantity) => {
    setQuantity(selectedQuantity);
    setStage("game");
  };

  return (
    <div className="app">
      <h1 className="app-title">Parrots Card Game</h1>
      {stage === "register" && (
        <PlayerForm onPlayerRegistered={handlePlayerRegistered} />
      )}
      {stage === "game" && player && (
        <MemoryGame
          quantity={quantity}
          player={player}
          onGameCompleted={handleGameCompleted}
        />
      )}
      {stage === "ranking" && <Ranking />}
    </div>
  );
};

export default App;
