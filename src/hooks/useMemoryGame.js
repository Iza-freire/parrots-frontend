import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { generateDeck, playGame } from "../api/api";

const useMemoryGame = () => {
  const [quantity, setQuantity] = useState(0);
  const [deck, setDeck] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [lockBoard, setLockBoard] = useState(false);
  const [moves, setMoves] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const player = JSON.parse(localStorage.getItem("player"));

  const fetchDeck = async () => {
    setLoading(true);
    setError(null);
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
      setError("Erro ao gerar baralho. Tente novamente.");
    } finally {
      setLoading(false);
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
        .then(() => navigate("/ranking"))
        .catch((error) => console.error("Erro ao atualizar pontuação:", error));
    }
  }, [matchedCards, deck, navigate, player.id, moves]);

  return {
    quantity,
    setQuantity,
    deck,
    flippedCards,
    matchedCards,
    lockBoard,
    moves,
    gameStarted,
    loading,
    error,
    fetchDeck,
    handleCardClick,
    isFlipped,
    player,
  };
};

export default useMemoryGame;