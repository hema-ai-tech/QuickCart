import { Link, useParams } from 'react-router-dom';
import ProductList from './ProductList';
import { useCart } from '../context/cartContext';

function CategoryPage({ products }) {

  // Get category from URL
  const { category } = useParams();

  // Get addToCart from context
  const { addToCart } = useCart();

  // Filter products by category
  const filteredProducts = products.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <div className="category-page">

      {/* Category Title */}
      <h2 className="category-title">
        {category} Products
      </h2>

      {/* Empty State */}
      {filteredProducts.length === 0 ? (

        <div className="empty-category">

          <p>
            😕 No products found in this category
          </p>

          <Link
            to="/"
            className="back-home-link"
          >
            ← Back to all products
          </Link>

        </div>

      ) : (

        <ProductList
          products={filteredProducts}
          onAddToCart={addToCart}
        />

      )}

    </div>
  );
}

export default CategoryPage;