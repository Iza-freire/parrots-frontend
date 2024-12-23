import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar">
    <h1>Parrots Card Game</h1>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/game">Game</Link></li>
    </ul>
  </nav>
);

export default Navbar;
