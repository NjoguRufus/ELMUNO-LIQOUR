import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';
import { ProductGrid } from '../components/ProductGrid';
import { products } from '../data/products';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';

export const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name' | 'alcohol'>('name');

  const filteredProducts = products
    .filter(
      (product) =>
        product.category === category?.toLowerCase() &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1] &&
        (searchQuery
          ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
          : true)
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'alcohol':
          return b.alcohol - a.alcohol;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const maxPrice = Math.max(...products.map((p) => p.price));

  return (
    <div className="pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8 bg-zinc-900 text-white"
      >
        <h1 className="text-4xl font-bold mb-4 capitalize">{category}</h1>
        <p className="text-lg text-gray-300">
          Explore our selection of premium {category}
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between my-8">
          <SearchBar onSearch={setSearchQuery} />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
          >
            <Filter className="h-5 w-5" />
            Filters
          </button>
        </div>

        <motion.div
          initial={false}
          animate={{ height: showFilters ? 'auto' : 0 }}
          className="overflow-hidden mb-8"
        >
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-4">Price Range</h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], Number(e.target.value)])
                    }
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="name">Name</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="alcohol">Alcohol Content</option>
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 mt-8"
          >
            No products found matching your criteria.
          </motion.p>
        )}
      </div>
    </div>
  );
};