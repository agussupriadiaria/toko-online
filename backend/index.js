import "dotenv/config";
import express from "express";
import cors from "cors";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const app = express();
app.use(cors());

const api = new WooCommerceRestApi.default({
  url: process.env.WC_URL,
  consumerKey: process.env.WC_KEY,
  consumerSecret: process.env.WC_SECRET,
  version: "wc/v3",
});

app.get("/api/products", async (req, res) => {
  try {
    const response = await api.get("products", { per_page: 10 });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend aman di port ${PORT}`));
