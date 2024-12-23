import React from "react";
import PlayerForm from "../components/PlayerForm";
import DeckGenerator from "../components/DeckGenerator";
import "../styles/Game.css";

const Game = () => (
  <div className="game-container">
    <h2 className="game-title">Parrots Card Game</h2>
    <PlayerForm />
    <DeckGenerator />
  </div>
);

export default Game;
