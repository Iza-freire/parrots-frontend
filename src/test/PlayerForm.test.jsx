import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PlayerForm from '../components/PlayerForm';
import * as api from '../api/api';

vi.mock('../api/api');

describe('PlayerForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve renderizar o formulário corretamente', () => {
    render(
      <BrowserRouter>
        <PlayerForm />
      </BrowserRouter>
    );

    expect(screen.getByText('Registrar Jogador')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Digite seu nome')).toBeInTheDocument();
    expect(screen.getByText('Iniciar Jogo')).toBeInTheDocument();
  });

  it('deve atualizar o estado quando o nome for digitado', async () => {
    render(
      <BrowserRouter>
        <PlayerForm />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText('Digite seu nome');
    fireEvent.change(input, { target: { value: 'João' } });

    expect(input.value).toBe('João');
  });

  it('deve chamar registerPlayer ao submeter o formulário', async () => {
    const mockResponse = { data: { id: 1, nome: 'João' } };
    api.registerPlayer.mockResolvedValue(mockResponse);

    render(
      <BrowserRouter>
        <PlayerForm />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText('Digite seu nome');
    fireEvent.change(input, { target: { value: 'João' } });

    const button = screen.getByText('Iniciar Jogo');
    fireEvent.click(button);

    await waitFor(() => {
      expect(api.registerPlayer).toHaveBeenCalledWith({ nome: 'João' });
    });
  });

  it('deve exibir erro quando o registro falhar', async () => {
    api.registerPlayer.mockRejectedValue(new Error('Erro de rede'));

    render(
      <BrowserRouter>
        <PlayerForm />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText('Digite seu nome');
    fireEvent.change(input, { target: { value: 'João' } });

    const button = screen.getByText('Iniciar Jogo');
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Erro ao registrar jogador. Tente novamente.')).toBeInTheDocument();
    });
  });

  it('deve desabilitar o input durante o carregamento', () => {
    api.registerPlayer.mockImplementation(() => new Promise(() => {}));

    render(
      <BrowserRouter>
        <PlayerForm />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText('Digite seu nome');
    const button = screen.getByText('Iniciar Jogo');

    fireEvent.change(input, { target: { value: 'João' } });
    fireEvent.click(button);

    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });
});