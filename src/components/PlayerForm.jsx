import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerPlayer } from "../api/api";
import "../styles/global.css";

const PlayerForm = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerPlayer({ nome: name });
      localStorage.setItem("player", JSON.stringify(response.data));
      navigate("/game");
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
