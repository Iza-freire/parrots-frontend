import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/game', // Atualize para o domínio do backend após o deploy
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getWelcomeMessage = () => api.get('/');
export const generateDeck = (quantity) => api.get(`/gerar-baralho?quantidadeCartas=${quantity}`);
export const registerPlayer = (player) => api.post('/registrar-jogador', player);
export const playGame = (playerId, jogada, cartaCorreta) =>
  api.post(`/jogar?playerId=${playerId}&jogada=${jogada}&cartaCorreta=${cartaCorreta}`);
export const getRanking = () => api.get('/ranking');

export default api;
