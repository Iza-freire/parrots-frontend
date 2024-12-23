import React, { useEffect, useState } from "react";
import { getWelcomeMessage } from "../api/api";
import "../styles/Home.css";

const Home = () => {
  const [message, setMessage] = useState("Bem-vindo ao Parrots Card Game!");

  useEffect(() => {
    getWelcomeMessage()
      .then((res) => setMessage(res.data))
      .catch((err) => console.error("Erro ao carregar mensagem:", err));
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-title">{message}</h1>
      <p className="home-description">
        Prepare-se para um jogo emocionante de memória com os papagaios!
      </p>
    </div>
  );
};

export default Home;
