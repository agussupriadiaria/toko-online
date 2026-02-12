import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Mengambil data produk (per_page diset 20 agar grid terlihat penuh)
    axios
      .get("http://localhost:5000/api/products?per_page=20")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  const handleSearch = () => {
    setSearchQuery(searchTerm);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Katalog Produk Vite + Woo</h1>
      </header>

      {/* Frame Pencarian Terpisah */}
      <section className="search-frame">
        <div className="search-box">
          <input
            type="text"
            className="search-input"
            placeholder="Cari nama produk..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button className="btn-search" onClick={handleSearch}>
            Cari Produk
          </button>
        </div>
        {searchQuery && (
          <p className="search-status">
            Menampilkan hasil untuk: <strong>"{searchQuery}"</strong>
          </p>
        )}
      </section>

      {/* Katalog Produk */}
      <main className="catalog-frame">
        {loading ? (
          <div className="loading-state">
            <p>Memuat data produk...</p>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="image-wrapper">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0].src}
                        alt={product.name}
                        className="product-image"
                      />
                    ) : (
                      <div className="no-image">No Image</div>
                    )}
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">
                      Rp {parseInt(product.price).toLocaleString("id-ID")}
                    </p>
                    <button
                      className="btn-detail"
                      onClick={() => window.open(product.permalink, "_blank")}
                    >
                      Detail Produk
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="not-found">
                <p>Produk tidak ditemukan.</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSearchTerm("");
                  }}
                >
                  Reset Pencarian
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
