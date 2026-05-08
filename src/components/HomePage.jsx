import ProductList from './ProductList';
import { useCart } from '../context/cartContext';

function HomePage({ products, searchTerm }) {

  // Get addToCart from context
  const { addToCart } = useCart();

  // Filter products based on search term
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-page">

      {/* Show filtered count when searching */}
      {searchTerm && (
        <p className="search-results">
          Found {filteredProducts.length} product
          {filteredProducts.length !== 1 ? 's' : ''}
        </p>
      )}

      {/* Show products */}
      <ProductList
        products={filteredProducts}
        onAddToCart={addToCart}
      />

      {/* No results message */}
      {filteredProducts.length === 0 && (
        <p className="no-results">
          No products found
        </p>
      )}

    </div>
  );
}

export default HomePage;