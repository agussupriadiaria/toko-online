import styles from "./App.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Modal from "./components/Modal";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("warning, error: ", err);
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
    <div className={styles["app-container"]}>
      {loading ? (
        <p className={styles["loading-text"]}>
          Loading, mohon ditunggu prosesnya...
        </p>
      ) : (
        <div className={styles["app-content"]}>
          <div className={styles["app-header"]}>
            <h1 className={styles["app-title"]}>Katalog Produk</h1>
          </div>

          <section className={styles["search-section"]}>
            <div className={styles["search-box"]}>
              <input
                className={styles["search-input"]}
                type="text"
                placeholder="Cari produk disini"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleSearch}
              >
                Cari
              </button>
            </div>
            {searchQuery && (
              <div className={styles["search-result"]}>
                <p>
                  Hasil pencarian: <strong>"{searchQuery}"</strong>
                </p>
              </div>
            )}
          </section>

          <div className={styles["product-grid"]}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div className={styles["product-card"]} key={product.id}>
                  {product.images?.[0] ? (
                    <img
                      className={styles["product-image"]}
                      src={product.images[0].src}
                      alt={product.name}
                    />
                  ) : (
                    <p className={styles["loading-text"]}>
                      Gambar tidak tersedia...
                    </p>
                  )}
                  <h2 className={styles["product-name"]}>{product.name}</h2>
                  <h3>Rp {parseInt(product.price).toLocaleString("id-ID")}</h3>

                  <div className="d-flex gap-2 mt-2">
                    <button
                      type="button"
                      className="btn btn-success flex-fill"
                      onClick={() => window.open(product.permalink, "_blank")}
                    >
                      Detail
                    </button>

                    <button
                      type="button"
                      className="btn btn-primary flex-fill"
                      data-bs-toggle="modal"
                      data-bs-target="#modalSaya"
                      onClick={() => setSelectedProduct(product)}
                    >
                      Info
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className={styles["loading-text"]}>Produk tidak tersedia...</p>
            )}
          </div>

          <Modal data={selectedProduct} />
        </div>
      )}
    </div>
  );
}

export default App;
