import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Memanggil Backend lokal (port 5000)
    axios
      .get("http://localhost:5000/api/products")
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
    <div style={{ padding: "2rem", fontFamily: "Inter, system-ui" }}>
      <header style={{ marginBottom: "2rem", textAlign: "center" }}>
        <h1 style={{ color: "#646cff" }}>Katalog Produk Vite + Woo</h1>
      </header>

      {loading ? (
        <p style={{ textAlign: "center" }}>Memuat data produk...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                border: "1px solid #333",
                borderRadius: "12px",
                padding: "1rem",
                background: "#1a1a1a",
                color: "white",
              }}
            >
              {product.images[0] && (
                <img
                  src={product.images[0].src}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              )}
              <h3 style={{ fontSize: "1.1rem", margin: "1rem 0" }}>
                {product.name}
              </h3>
              <p style={{ color: "#4caf50", fontWeight: "bold" }}>
                $ {parseInt(product.price).toLocaleString("id-ID")}
              </p>
              <button
                style={{
                  width: "100%",
                  padding: "0.6rem",
                  backgroundColor: "#646cff",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
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
