import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOption, setSortOption] = useState("");
  const collectionRef = useRef(null);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.title
        ?.toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOption === "low") return a.price - b.price;
      if (sortOption === "high") return b.price - a.price;
      return 0;
    });

  return (
    <div className="bg-[#0e0e0e] text-white min-h-screen">
      {/* ── HERO ── */}
      <section className="max-w-7xl mx-auto px-8 pt-20 pb-28 grid md:grid-cols-2 gap-20 items-center">
        <div>
          <p className="text-[#c6a75e] tracking-[6px] text-[10px] mb-6 hero-fadein">
            NEW COLLECTION 2026
          </p>

          <div style={{ perspective: "800px" }} className="mb-6">
            <h1
              className="text-5xl md:text-6xl font-serif font-light leading-tight tracking-wide hero-title"
              style={{ transformStyle: "preserve-3d" }}
            >
              <span className="block hero-line-1">Curated Luxury</span>
              <span className="block italic text-neutral-400 hero-line-2">
                For Modern
              </span>
              <span className="block hero-line-3">Living</span>
            </h1>
          </div>

          <div className="w-14 h-px bg-[#c6a75e] mb-7" />

          <p className="text-neutral-400 text-sm mb-12 leading-loose max-w-sm">
            Discover premium essentials crafted with elegance and precision.
          </p>

          <button
            onClick={() =>
              collectionRef.current?.scrollIntoView({ behavior: "smooth" })
            }
            className="explore-btn group relative overflow-hidden text-xs tracking-[3px] px-10 py-4"
          >
            <span className="btn-bg" />
            <span className="btn-shine" />
            <span className="relative z-10 flex items-center gap-3 text-black font-medium">
              EXPLORE COLLECTION
              <svg
                className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </button>
        </div>

        {/* IMAGE */}
        <div className="relative flex justify-center">
          <div className="absolute top-4 right-4 w-full h-full border border-[#c6a75e] opacity-10 pointer-events-none" />
          <div className="absolute -bottom-4 -left-4 w-20 h-20 border-b border-l border-[#c6a75e] opacity-30 pointer-events-none" />
          <img
            src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=900"
            alt="Hero"
            className="shadow-2xl w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
          />
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="border-y border-neutral-800 py-3 overflow-hidden bg-[#0a0a0a]">
        <div className="flex gap-16 whitespace-nowrap text-[10px] tracking-[4px] text-neutral-600 animate-marquee">
          {Array(8)
            .fill([
              "PREMIUM QUALITY",
              "FREE SHIPPING",
              "CURATED LUXURY",
              "HANDCRAFTED",
              "EXCLUSIVE DESIGNS",
            ])
            .flat()
            .map((text, i) => (
              <span key={i} className="flex items-center gap-16">
                {text} <span className="text-[#c6a75e]">✦</span>
              </span>
            ))}
        </div>
      </div>

      {/* ── COLLECTION ── */}
      <section ref={collectionRef} className="max-w-7xl mx-auto px-8 py-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-14">
          <div>
            <p className="text-[#c6a75e] tracking-[5px] text-[10px] mb-3">
              OUR PRODUCTS
            </p>
            <h2 className="text-3xl font-serif font-light tracking-wide">
              Featured Collection
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-60 px-5 py-3 bg-transparent border border-neutral-700 focus:outline-none focus:border-[#c6a75e] transition text-sm pr-10"
              />
              <svg
                className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                />
              </svg>
            </div>
            <select
              onChange={(e) => setSortOption(e.target.value)}
              className="px-5 py-3 bg-[#0e0e0e] border border-neutral-700 text-sm focus:outline-none focus:border-[#c6a75e] text-neutral-300 cursor-pointer transition"
            >
              <option value="">Sort By</option>
              <option value="low">Price: Low → High</option>
              <option value="high">Price: High → Low</option>
            </select>
          </div>
        </div>

        {/* CATEGORY TABS */}
        <div className="flex gap-8 mb-14 border-b border-neutral-800 pb-4 text-[11px] tracking-widest overflow-x-auto">
          {["All", "Shirts", "Shoes", "Trousers", "Accessories"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`pb-3 whitespace-nowrap transition-all duration-300 ${
                activeCategory === cat
                  ? "text-[#c6a75e] border-b-2 border-[#c6a75e] -mb-[1px]"
                  : "text-neutral-500 hover:text-white"
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* GRID */}
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center py-24 text-center">
            <div className="w-12 h-px bg-[#c6a75e] mb-6" />
            <p className="text-neutral-500 tracking-widest text-xs">
              NO PRODUCTS FOUND
            </p>
            <div className="w-12 h-px bg-[#c6a75e] mt-6" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 24s linear infinite; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-fadein { animation: fadeUp 0.9s ease forwards; }

        @keyframes float3d {
          0%   { transform: rotateX(6deg) rotateY(-4deg) translateY(0px); }
          33%  { transform: rotateX(-3deg) rotateY(5deg) translateY(-6px); }
          66%  { transform: rotateX(4deg) rotateY(-6deg) translateY(-3px); }
          100% { transform: rotateX(6deg) rotateY(-4deg) translateY(0px); }
        }
        .hero-title {
          animation: float3d 7s ease-in-out infinite;
          transform-style: preserve-3d;
          will-change: transform;
        }
        .hero-line-1 { animation: fadeUp 0.7s ease 0.1s both; display: block; }
        .hero-line-2 { animation: fadeUp 0.7s ease 0.3s both; display: block; }
        .hero-line-3 { animation: fadeUp 0.7s ease 0.5s both; display: block; }

        .explore-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          cursor: pointer;
          border: none;
          outline: none;
        }
        .btn-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #d4b96a 0%, #c6a75e 50%, #b8963f 100%);
          transition: opacity 0.3s ease;
          z-index: 0;
        }
        .explore-btn:hover .btn-bg { opacity: 0.88; }
        .btn-shine {
          position: absolute;
          top: 0; left: -75%;
          width: 50%; height: 100%;
          background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%);
          transform: skewX(-20deg);
          z-index: 1;
        }
        .explore-btn:hover .btn-shine { animation: shine 0.55s ease forwards; }
        @keyframes shine {
          from { left: -75%; }
          to   { left: 130%; }
        }
        .explore-btn:active { transform: translateY(1px); }
      `}</style>
    </div>
  );
}

export default Home;
