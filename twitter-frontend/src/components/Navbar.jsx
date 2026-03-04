import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">🐦 Twitter Clone</Link>
        <div className="nav-menu">
          {user ? (
            <>
              <span className="nav-user">Hello, {user.name}</span>
              <button onClick={logout} className="nav-btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-btn">Login</Link>
              <Link to="/register" className="nav-btn">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
