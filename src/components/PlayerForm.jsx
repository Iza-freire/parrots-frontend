import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerPlayer } from "../api/api";
import "../styles/global.css";

const PlayerForm = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await registerPlayer({ nome: name });
      localStorage.setItem("player", JSON.stringify(response.data));
      navigate("/game");
    } catch (error) {
      console.error("Erro ao registrar jogador:", error);
      setError("Erro ao registrar jogador. Tente novamente.");
    } finally {
      setLoading(false);
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
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Carregando..." : "Iniciar Jogo"}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default PlayerForm;
