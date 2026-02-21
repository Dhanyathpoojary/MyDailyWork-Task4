import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const fetchProducts = async () => {
    let url = "http://localhost:5000/api/products";

    if (category || maxPrice) {
      url += `?category=${category}&maxPrice=${maxPrice}`;
    }

    const res = await axios.get(url);
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Products</h2>

      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Category"
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <button onClick={fetchProducts}>Filter</button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Home;
