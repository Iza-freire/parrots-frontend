import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar">
    <h1>Parrots Card Game</h1>
    <ul>
      <li><Link to="/">Registro</Link></li>
      <li><Link to="/game">Jogo</Link></li>
      <li><Link to="/ranking">Ranking</Link></li>
    </ul>
  </nav>
);

export default Navbar;
