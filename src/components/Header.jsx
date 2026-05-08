import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/cartContext';
import '../styles/Header.css';

function Header({ searchTerm, onSearchChange }) {

  const navigate = useNavigate();

  // Use cart context
  const { getTotalItems, toggleCart } = useCart();

  // Categories
  const categories = [
    'Electronics',
    'Accessories',
    'Home',
    'Sports'
  ];

  return (
    <header className="header">

      <div className="header-container">

        {/* Top Section */}
        <div className="header-content">

          <div className="header-text">

            <Link to="/" className="header-logo">
              <h1 className="header-title">🛒 QuickCart</h1>
            </Link>

            <p className="header-subtitle">
              Your one-stop shop for everything
            </p>

          </div>

          {/* Cart Button */}
          <button
            className="cart-icon-btn"
            onClick={toggleCart}
            aria-label="Open cart"
          >
            🛒

            {getTotalItems() > 0 && (
              <span className="cart-badge">
                {getTotalItems()}
              </span>
            )}
          </button>

        </div>

        {/* Navigation */}
        <nav className="header-nav">

          <Link to="/" className="nav-link">
            Home
          </Link>

          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/category/${cat}`}
              className="nav-link"
            >
              {cat}
            </Link>
          ))}

          <Link to="/cart" className="nav-link">
            Cart
          </Link>

        </nav>

        {/* Search Bar */}
        <div className="search-container">

          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => {
              onSearchChange(e.target.value);

              // Navigate to home while searching
              navigate('/');
            }}
            className="search-input"
          />

        </div>

      </div>

    </header>
  );
}

export default Header;