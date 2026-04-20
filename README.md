# Parrots Card Game

Um jogo de memória simples desenvolvido com React e Vite. Os jogadores devem encontrar pares de cartas idênticas em um tabuleiro.

## Funcionalidades

- Registro de jogador
- Seleção de quantidade de cartas (8, 12 ou 16)
- Jogo de memória com cartas viradas
- Ranking de jogadores
- Navegação entre páginas com React Router
- Estados de loading e tratamento de erros
- Design responsivo

## Tecnologias Utilizadas

- React 18
- Vite
- React Router DOM
- Axios
- React Spinners (para indicadores de loading)
- ESLint

## Como Executar

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Execute o servidor de desenvolvimento: `npm run dev`
4. Abra [http://localhost:5173](http://localhost:5173) no navegador

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run lint` - Executa ESLint
- `npm run preview` - Visualiza o build de produção

## API

O jogo se conecta a uma API backend para gerar baralhos, registrar jogadores e obter rankings. Configure a URL da API em `src/api/api.js`.

## Docker

### Construir e Executar com Docker

```bash
# Build da imagem
docker build -t parrots-frontend:latest .

# Executar container
docker run -p 3000:80 parrots-frontend:latest
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

### Executar com Docker Compose

```bash
# Iniciar container
docker-compose up -d

# Parar container
docker-compose down
```

## Contribuição

1. Crie uma branch para suas mudanças
2. Faça commits pequenos e descritivos
3. Abra um Pull Request

## Licença

Este projeto é open source.
