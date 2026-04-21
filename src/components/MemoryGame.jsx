import { useNavigate } from "react-router-dom";
import useMemoryGame from "../hooks/useMemoryGame";
import "../styles/MemoryGame.css";

const MemoryGame = () => {
  const navigate = useNavigate();
  const {
    quantity,
    setQuantity,
    deck,
    matchedCards,
    moves,
    gameStarted,
    loading,
    error,
    fetchDeck,
    handleCardClick,
    isFlipped,
    player,
  } = useMemoryGame();

  if (!player) {
    navigate("/");
    return null;
  }

  return (
    <div className="memory-game-container">
      {!gameStarted ? (
        <div className="game-setup">
          <h2>Bem-vindo, {player.nome}!</h2>
          <p>Escolha a quantidade de cartas para iniciar o jogo:</p>
          <div className="quantity-selector">
            <button onClick={() => setQuantity(8)} disabled={loading}>8</button>
            <button onClick={() => setQuantity(12)} disabled={loading}>12</button>
            <button onClick={() => setQuantity(16)} disabled={loading}>16</button>
          </div>
          <button
            className="start-button"
            onClick={fetchDeck}
            disabled={quantity === 0 || loading}
          >
            Iniciar Jogo
          </button>
          {loading && <p>Carregando baralho...</p>}
          {error && <p className="error">{error}</p>}
        </div>
      ) : (
        <>
          <h2>Jogador: {player.nome}</h2>
          <p>Jogadas: {moves}</p>
          <p>Pontuação: {matchedCards.length}</p>
          <div className="memory-game-grid">
            {deck.map((card) => (
              <div
                key={card.id}
                className={`memory-card ${isFlipped(card.id) ? "flip" : ""}`}
                onClick={() => handleCardClick(card.id)}
              >
                <div className="front-face face"></div>
                <div className="back-face face">
                  <img src={card.src} alt="Carta" />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MemoryGame;
