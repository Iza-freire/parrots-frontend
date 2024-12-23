import React, { useState } from "react";
import { registerPlayer } from "../api/api";
import "../styles/global.css";

const PlayerForm = ({ onPlayerRegistered }) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerPlayer({ nome: name });
      onPlayerRegistered(response.data);
    } catch (error) {
      console.error("Erro ao registrar jogador:", error);
    }
  };

  return (
    <div className="container">
      <h2>Registrar Jogador</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Iniciar Jogo</button>
      </form>
    </div>
  );
};

export default PlayerForm;
