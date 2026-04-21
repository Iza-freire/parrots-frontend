import { useEffect, useState } from "react";
import { getRanking } from "../api/api";
import "../styles/Ranking.css";

const Ranking = () => {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await getRanking();
        setRanking(response.data);
      } catch (error) {
        console.error("Erro ao carregar ranking:", error);
      }
    };

    fetchRanking();
  }, []);

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
    </div>
  );
};

export default Ranking;
