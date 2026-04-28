import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Ranking from '../components/Ranking';
import * as api from '../api/api';

vi.mock('../api/api');

describe('Ranking', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar o título do ranking', async () => {
    api.getRanking.mockResolvedValue({ data: [] });

    render(
      <BrowserRouter>
        <Ranking />
      </BrowserRouter>
    );

    expect(screen.getByText('Ranking de Jogadores')).toBeInTheDocument();
  });

  it('deve exibir mensagem de carregamento inicialmente', async () => {
    api.getRanking.mockResolvedValue({ data: [] });

    render(
      <BrowserRouter>
        <Ranking />
      </BrowserRouter>
    );

    expect(screen.getByText('Carregando ranking...')).toBeInTheDocument();
  });

  it('deve exibir a lista de jogadores quando carregada', async () => {
    const mockRanking = [
      { id: 1, nome: 'João', pontuacao: 100 },
      { id: 2, nome: 'Maria', pontuacao: 80 },
    ];
    api.getRanking.mockResolvedValue({ data: mockRanking });

    render(
      <BrowserRouter>
        <Ranking />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/João/)).toBeInTheDocument();
      expect(screen.getByText(/Maria/)).toBeInTheDocument();
    });
  });

  it('deve exibir erro quando a requisição falhar', async () => {
    api.getRanking.mockRejectedValue(new Error('Erro de rede'));

    render(
      <BrowserRouter>
        <Ranking />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Erro ao carregar ranking. Tente novamente.')).toBeInTheDocument();
    });
  });

  it('deve chamar a API para buscar o ranking', async () => {
    api.getRanking.mockResolvedValue({ data: [] });

    render(
      <BrowserRouter>
        <Ranking />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(api.getRanking).toHaveBeenCalled();
    });
  });
});