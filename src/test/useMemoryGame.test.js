import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import useMemoryGame from '../hooks/useMemoryGame';
import * as api from '../api/api';

vi.mock('../api/api');
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('useMemoryGame', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    localStorage.setItem('player', JSON.stringify({ id: 1, nome: 'João' }));
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('deve inicializar com valores padrão', () => {
    const { result } = renderHook(() => useMemoryGame(), {
      wrapper: BrowserRouter,
    });

    expect(result.current.quantity).toBe(0);
    expect(result.current.deck).toEqual([]);
    expect(result.current.moves).toBe(0);
    expect(result.current.gameStarted).toBe(false);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('deve atualizar a quantidade de cartas', () => {
    const { result } = renderHook(() => useMemoryGame(), {
      wrapper: BrowserRouter,
    });

    act(() => {
      result.current.setQuantity(8);
    });

    expect(result.current.quantity).toBe(8);
  });

  it('deve buscar o deck quando fetchDeck for chamado', async () => {
    const mockCards = ['card1', 'card2', 'card3', 'card4'];
    api.generateDeck.mockResolvedValue({ data: { cartas: mockCards } });

    const { result } = renderHook(() => useMemoryGame(), {
      wrapper: BrowserRouter,
    });

    act(() => {
      result.current.setQuantity(4);
    });

    await act(async () => {
      await result.current.fetchDeck();
    });

    expect(api.generateDeck).toHaveBeenCalledWith(4);
    expect(result.current.deck.length).toBe(4);
    expect(result.current.gameStarted).toBe(true);
  });

  it('deve tratar erro quando fetchDeck falhar', async () => {
    api.generateDeck.mockRejectedValue(new Error('Erro de rede'));

    const { result } = renderHook(() => useMemoryGame(), {
      wrapper: BrowserRouter,
    });

    act(() => {
      result.current.setQuantity(4);
    });

    await act(async () => {
      await result.current.fetchDeck();
    });

    expect(result.current.error).toBe('Erro ao gerar baralho. Tente novamente.');
    expect(result.current.loading).toBe(false);
  });

  it('deve verificar se uma carta está virada', async () => {
    const mockCards = ['card1', 'card2', 'card3', 'card4'];
    api.generateDeck.mockResolvedValue({ data: { cartas: mockCards } });

    const { result } = renderHook(() => useMemoryGame(), {
      wrapper: BrowserRouter,
    });

    act(() => {
      result.current.setQuantity(4);
    });

    await act(async () => {
      await result.current.fetchDeck();
    });

    // Inicialmente nenhuma carta está virada
    expect(result.current.isFlipped(0)).toBe(false);
  });
});