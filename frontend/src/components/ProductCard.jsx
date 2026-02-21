import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-[#141414] overflow-hidden group transition-all duration-300 border border-neutral-800 hover:border-[#c6a75e] hover:shadow-[0_8px_30px_rgba(198,167,94,0.1)] flex flex-col">
      {/* IMAGE */}
      <div className="relative h-64 overflow-hidden flex-shrink-0">
        <img
          src={product.image_url}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/600x600?text=No+Image";
          }}
        />
        {product.stock > 0 && (
          <span className="absolute top-4 left-4 bg-[#c6a75e] text-black text-[10px] px-3 py-1 tracking-widest">
            IN STOCK
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-base font-serif font-light tracking-wide mb-1">
            {product.title}
          </h3>
          <p className="text-neutral-500 text-xs leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex justify-between items-center pt-4 mt-4 border-t border-neutral-800">
          <p className="text-[#c6a75e] font-serif text-lg">₹ {product.price}</p>
          <button
            onClick={() => addToCart(product)}
            className="group/btn relative overflow-hidden border border-[#c6a75e] text-[#c6a75e] text-[10px] tracking-[2px] px-5 py-2 transition-all duration-300 hover:text-black"
          >
            <span className="absolute inset-0 bg-[#c6a75e] translate-x-[-101%] group-hover/btn:translate-x-0 transition-transform duration-300" />
            <span className="relative z-10">ADD TO CART</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
