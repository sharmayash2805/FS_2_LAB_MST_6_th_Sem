import React, { useState, useEffect, use } from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from './features/cart/cartSlice';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import CartPanel from './components/CartPanel';
import './App.css'

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      // CRITICAL FIX: Add ".products" at the end here
      setProducts(response.data.products); 
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };
  fetchProducts();
}, []);

  const isInCart = (id) => cartItems.some(item => item.id === id);

  if (loading) return <div>Loading...</div>;

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Task 5: Header Section */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '2px solid #eee',
        paddingBottom: '20px',
        marginBottom: '30px'
      }}>
        <h1 style={{ margin: 0 }}>My Product Store</h1>
        <div style={{ fontSize: '1.2rem', background: '#333', color: '#fff', padding: '10px 20px', borderRadius: '30px' }}>
          🛒 Cart: {totalItemsCount} {totalItemsCount === 1 ? 'Item' : 'Items'}
        </div>
      </header>

      {/* Task 3: Product Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '25px' 
      }}>
        {products.map((product) => (
          <div key={product.id} style={{ 
            border: '1px solid #ddd', 
            padding: '15px', 
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
          }}>
            <img 
              src={product.thumbnail} 
              alt={product.title} 
              style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px' }} 
            />
            <h3 style={{ fontSize: '1.1rem', margin: '15px 0 5px' }}>{product.title}</h3>
            <p style={{ fontWeight: 'bold', color: '#2ecc71', fontSize: '1.2rem' }}>${product.price}</p>
            
            <button 
              onClick={() => dispatch(addToCart(product))}
              disabled={isInCart(product.id)}
              style={{
                width: '100%',
                backgroundColor: isInCart(product.id) ? '#bdc3c7' : '#3498db',
                color: 'white',
                padding: '10px',
                border: 'none',
                borderRadius: '6px',
                cursor: isInCart(product.id) ? 'not-allowed' : 'pointer',
                transition: 'background 0.3s'
              }}
            >
              {isInCart(product.id) ? 'Already in Cart' : 'Add to Cart'}
            </button>
          </div>
        ))}
      </div>

      <hr style={{ margin: '50px 0', border: '0', borderTop: '2px dashed #eee' }} />

      {/* Task 4: Cart Panel Section */}
      <section>
        <CartPanel />
      </section>

    </div>
  );
};

export default App
