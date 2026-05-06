import { useState } from 'react'; 
import Header from './components/Header';
import ProductList from './components/ProductList';
import CartSidebar from './components/CartSidebar';
import { products } from './data/products';
import './styles/App.css';

function App() {
  // State for cart items
  const [cart, setCart] = useState([]);

  // State for cart visibility
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Add item to cart
  function addToCart(product) {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  }

  // Remove item from cart
  function removeFromCart(id) {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  }

  // Update quantity of a specific item
  function updateQuantity(id, newQuantity) {
    setCart(prevCart => {
      if (newQuantity <= 0) {
        return prevCart.filter(item => item.id !== id);
      }
      return prevCart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      );
    });
  }

  // Toggle cart visibility
  function toggleCart() {
    setIsCartOpen(prev => !prev);
  }

  // Get total number of items in cart
  function getTotalItems() {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }

  return (
    <div className="app">
      <Header 
        cartItemCount={getTotalItems()}
        onCartClick={toggleCart}
      />
      <main className="main-content">
        <ProductList products={products} onAddToCart={addToCart} />
      </main>
      <CartSidebar
        isOpen={isCartOpen}
        onClose={toggleCart}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
      />
    </div>
  );
}

export default App;
