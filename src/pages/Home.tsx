import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="pt-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative h-[600px]"
        >
          <img
            src="https://images.unsplash.com/photo-1597290282695-edc43d0e7129?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-5xl font-bold mb-4"
              >
                Spirit Haven
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xl mb-8"
              >
                Discover our premium collection of spirits
              </motion.p>
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/whiskey')}
                className="bg-amber-500 text-white px-8 py-3 rounded-lg text-lg font-semibold"
              >
                Shop Now
              </motion.button>
            </div>
          </div>
        </motion.div>

        <section className="max-w-7xl mx-auto py-16 px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Whiskey', 'Beer', 'Makali'].map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate(`/${category.toLowerCase()}`)}
                className="relative h-64 rounded-lg overflow-hidden cursor-pointer"
              >
                <img
                  src={`https://images.unsplash.com/photo-${
                    category === 'Whiskey'
                      ? '1582819770582-5678d4b3aadf'
                      : category === 'Beer'
                      ? '1535958636266-b0a29e3f74de'
                      : '1551451362-8c80de11b13c'
                  }?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80`}
                  alt={category}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">{category}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  );
};