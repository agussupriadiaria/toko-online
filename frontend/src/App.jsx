/*
  Membuat app reactjs dengan data dari api woocommerce
*/
import styles from "./App.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ModalTest from "./components/ModalTest";

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
        console.error("warning error: ", err);
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
        <p>Loading, mohon ditunggu prosesnya..</p>
      ) : (
        <main className={styles["catalog-frame"]}>
          <header className={styles["app-header"]}>
            <h1 className={styles["app-title"]}>Woocommerce Catalog</h1>
          </header>

          <section className={styles["search-section"]}>
            <div className={styles["search-box"]}>
              <input
                className={styles["search-input"]}
                type="text"
                placeholder="Cari produk disini"
                style={{ borderRadius: "5px" }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <button
                type="button"
                className="btn btn-primary"
                style={{ width: "100px", marginLeft: "5px", padding: "2px" }}
                onClick={handleSearch}
              >
                Cari
              </button>
              {searchQuery && (
                <p style={{ color: "red" }}>
                  Berikut hasil pencarian dari: <strong>"{searchQuery}"</strong>
                </p>
              )}
            </div>
          </section>

          <div className={styles["product-grid"]}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className={styles["product-card"]}>
                  {product.images?.[0] ? (
                    <img
                      className={styles["product-image"]}
                      src={product.images[0].src}
                      alt={product.name}
                    />
                  ) : (
                    <p>Gambar tidak tersedia</p>
                  )}
                  <h3 className={styles["product-name"]}>{product.name}</h3>
                  <h2 className={styles["product-price"]}>
                    Rp {parseInt(product.price).toLocaleString("id-ID")}
                  </h2>
                  <button className={styles["btn-detail"]}>
                    Detail Product
                  </button>
                  <button
                    type="button"
                    className="btn btn-info"
                    data-bs-toggle="modal"
                    data-bs-target="#modaltesting1"
                    style={{ width: "100px", marginLeft: "5px" }}
                    onClick={() => setSelectedProduct(product)}
                  >
                    Info
                  </button>
                </div>
              ))
            ) : (
              <p>Produk tidak tersedia</p>
            )}
          </div>
          <ModalTest data={selectedProduct} />
        </main>
      )}
    </div>
  );
}

export default App;
