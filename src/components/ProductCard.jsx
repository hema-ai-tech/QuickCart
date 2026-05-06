import '../styles/ProductCard.css';

function ProductCard({ product, onAddToCart }) {
  const handleAddToCart = () => {
    console.log('Add to cart clicked:', product);
    if (typeof onAddToCart === 'function') {
      onAddToCart(product);
    } else {
      console.warn('onAddToCart is not defined for ProductCard', product);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name} 
          className="product-image"
        />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">${product.price}</span>
          <span className="product-category">{product.category}</span>
        </div>
        <button 
          className="add-to-cart-btn"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;