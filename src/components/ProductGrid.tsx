import React from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '../types';
import { motion } from 'framer-motion';

interface ProductGridProps {
  products: Product[];
  category?: string;
}

export const ProductGrid = ({ products, category }: ProductGridProps) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4"
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </motion.div>
  );
};