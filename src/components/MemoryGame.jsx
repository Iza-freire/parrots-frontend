import React, { useState, useEffect } from "react";
import { generateDeck, playGame } from "../api/api";
import "../styles/MemoryGame.css";

const MemoryGame = ({ player, onGameCompleted }) => {
  const [quantity, setQuantity] = useState(0);
  const [deck, setDeck] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [lockBoard, setLockBoard] = useState(false);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const fetchDeck = async () => {
    try {
      const response = await generateDeck(quantity);
      const cards = response.data.cartas.map((card, index) => ({
        id: index,
        src: card,
        flipped: false,
        matched: false,
      }));
      setDeck(cards);
      setGameStarted(true);
    } catch (error) {
      console.error("Erro ao gerar baralho:", error);
    }
  };

  const handleCardClick = (cardId) => {
    if (lockBoard || flippedCards.includes(cardId)) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setLockBoard(true);
      setMoves((prevMoves) => prevMoves + 1);

      const [firstId, secondId] = newFlippedCards;
      const firstCard = deck.find((card) => card.id === firstId);
      const secondCard = deck.find((card) => card.id === secondId);

      if (firstCard.src === secondCard.src) {
        setMatchedCards((prev) => [...prev, firstId, secondId]);
        setFlippedCards([]);
        setLockBoard(false);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
          setLockBoard(false);
        }, 1000);
      }
    }
  };

  const isFlipped = (cardId) =>
    flippedCards.includes(cardId) || matchedCards.includes(cardId);

  useEffect(() => {
    if (matchedCards.length === deck.length && deck.length > 0) {
      playGame(player.id, moves, matchedCards.length)
        .then(() => onGameCompleted())
        .catch((error) => console.error("Erro ao atualizar pontuação:", error));
    }
  }, [matchedCards, deck, onGameCompleted, player.id, moves]);

  return (
    <div className="memory-game-container">
      {!gameStarted ? (
        <div className="game-setup">
          <h2>Bem-vindo, {player.nome}!</h2>
          <p>Escolha a quantidade de cartas para iniciar o jogo:</p>
          <div className="quantity-selector">
            <button onClick={() => setQuantity(8)}>8</button>
            <button onClick={() => setQuantity(12)}>12</button>
            <button onClick={() => setQuantity(16)}>16</button>
          </div>
          <button
            className="start-button"
            onClick={fetchDeck}
            disabled={quantity === 0}
          >
            Iniciar Jogo
          </button>
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
