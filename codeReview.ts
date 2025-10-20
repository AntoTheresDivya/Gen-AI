import React, { useState, useMemo } from "react";
import { Search, ShoppingCart } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  rating: number;
}

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Apple iPhone 15 Pro",
    price: 999,
    image: "https://m.media-amazon.com/images/I/81CgtwSII3L._AC_UY327_.jpg",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    price: 1199,
    image: "https://m.media-amazon.com/images/I/71G5lFzVxYL._AC_UY327_.jpg",
    rating: 4.6,
  },
  {
    id: 3,
    name: "Sony WH-1000XM5 Headphones",
    price: 399,
    image: "https://m.media-amazon.com/images/I/61cL3JfXfVL._AC_UY327_.jpg",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Apple MacBook Air M3",
    price: 1299,
    image: "https://m.media-amazon.com/images/I/71TPda7cwUL._AC_UY327_.jpg",
    rating: 4.9,
  },
];

const AmazonSearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("name");

  const filteredProducts = useMemo(() => {
    let products = mockProducts.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (sortOption === "price") {
      products = products.sort((a, b) => a.price - b.price);
    } else if (sortOption === "name") {
      products = products.sort((a, b) => a.name.localeCompare(b.name));
    }
    return products;
  }, [searchTerm, sortOption]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-amber-600">Amazon Clone</h1>
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>
        <button className="flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600">
          <ShoppingCart size={18} /> Cart
        </button>
      </div>

      {/* Sort Dropdown */}
      <div className="flex justify-end mb-4">
        <select
          className="border rounded-lg px-3 py-2 text-sm"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-48 object-contain mb-4"
            />
            <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
            <p className="text-gray-500 mb-2">${product.price}</p>
            <p className="text-yellow-500 mb-3">
              {"★".repeat(Math.round(product.rating))}{" "}
              <span className="text-gray-400 text-sm">
                ({product.rating.toFixed(1)})
              </span>
            </p>
            <button className="mt-auto bg-amber-500 text-white rounded-lg py-2 hover:bg-amber-600">
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-12 text-lg">
          No products found.
        </p>
      )}
    </div>
  );
};

export default AmazonSearchPage;
