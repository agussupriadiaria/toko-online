import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products?per_page=2")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Katalog Produk Vite + Woo</h1>
      </header>

      {loading ? (
        <p className="loading-text">Memuat data produk...</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              {product.images[0] && (
                <img
                  src={product.images[0].src}
                  alt={product.name}
                  className="product-image"
                />
              )}
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">
                $ {parseInt(product.price).toLocaleString("id-ID")}
              </p>
              <button
                className="btn-detail"
                onClick={() => window.open(product.permalink, "_blank")}
              >
                Detail Produk
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
