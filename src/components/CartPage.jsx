import { Link } from 'react-router-dom';
import { useCart } from '../context/cartContext';
import '../styles/CartPage.css';

function CartPage() {

  // Get cart functions from context
  const {
    cart,
    updateQuantity,
    removeFromCart
  } = useCart();

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart-page">
          <p>Your cart is empty</p>

          <Link to="/" className="continue-shopping-btn">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-page-content">

          {/* Cart Items */}
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">

                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />

                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>₹{item.price}</p>

                  {/* Quantity Controls */}
                  <div className="quantity-controls">

                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>

                  </div>

                  {/* Remove Button */}
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>

                </div>

              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="cart-summary">

            <h2>
              Total: ₹{calculateTotal().toFixed(2)}
            </h2>

            <div className="cart-buttons">

              <Link to="/" className="continue-shopping-btn">
                Continue Shopping
              </Link>

              <button className="checkout-btn">
                Checkout
              </button>

            </div>

          </div>

        </div>
      )}
    </div>
  );
}

export default CartPage;