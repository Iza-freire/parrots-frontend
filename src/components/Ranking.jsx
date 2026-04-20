import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRanking } from "../api/api";
import "../styles/Ranking.css";

const Ranking = () => {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRanking = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getRanking();
        setRanking(response.data);
      } catch (error) {
        console.error("Erro ao carregar ranking:", error);
        setError("Erro ao carregar ranking. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchRanking();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <h2>Ranking de Jogadores</h2>
        <p>Carregando ranking...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h2>Ranking de Jogadores</h2>
        <p className="error">{error}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Ranking de Jogadores</h2>
      <ul>
        {ranking.map((player, index) => (
          <li key={player.id}>
            <strong>
              {index + 1}. {player.nome}
            </strong>{" "}
            - Pontuação: {player.pontuacao}, Jogadas: {player.jogadas}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/game")}>Jogar Novamente</button>
    </div>
  );
};

export default Ranking;
