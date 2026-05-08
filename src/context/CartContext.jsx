import {
  useState,
  useEffect
} from 'react';

import { CartContext } from './cartContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
// Export context

export function CartProvider({ children }) {

  // Cart state
  const [cart, setCart] = useLocalStorage(
    'quickcart-cart',
    []
  );

  // Cart sidebar state
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);

  }, []);

  // Add To Cart
  const addToCart = (product) => {

    setCart((prevCart) => {

      const existingItem = prevCart.find(
        (item) => item.id === product.id
      );

      if (existingItem) {

        return prevCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1
              }
            : item
        );
      }

      return [
        ...prevCart,
        {
          ...product,
          quantity: 1
        }
      ];
    });
  };

  // Remove From Cart
  const removeFromCart = (productId) => {

    setCart((prevCart) =>
      prevCart.filter(
        (item) => item.id !== productId
      )
    );
  };

  // Update Quantity
  const updateQuantity = (
    productId,
    newQuantity
  ) => {

    setCart((prevCart) => {

      if (newQuantity <= 0) {

        return prevCart.filter(
          (item) => item.id !== productId
        );
      }

      return prevCart.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: newQuantity
            }
          : item
      );
    });
  };

  // Toggle Cart
  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  // Total Items
  const getTotalItems = () => {

    return cart.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );
  };

  // Total Price
  const getTotalPrice = () => {

    return cart.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );
  };

  // Context Value
  const value = {
    cart,
    isCartOpen,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleCart,
    getTotalItems,
    getTotalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
