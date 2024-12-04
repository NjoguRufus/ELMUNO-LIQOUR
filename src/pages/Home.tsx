import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';
import { CategoryCards } from '../components/CategoryCards';
import { AboutUs } from '../components/AboutUs';
import { LocationMap } from '../components/LocationMap';
import { useStore } from '../store/useStore';

export const Home = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { user } = useStore();

  const toggleModal = () => setShowModal(!showModal);

  // Modal animations
  const modalVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.3, ease: 'easeIn' } },
  };

  return (
    <PageTransition>
      <div className="pt-20">
        {!user ? (
          <>
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative h-[600px] bg-gradient-to-b from-black/70 to-transparent"
            >
              <img
                src="https://images.unsplash.com/photo-1597290282695-edc43d0e7129?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                alt="Hero"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <motion.h1
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-5xl font-bold mb-4"
                  >
                    ELMUNO LIQUOR
                  </motion.h1>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-xl mb-8"
                  >
                    Discover our premium collection of spirits
                  </motion.p>
                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleModal}
                    className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg"
                  >
                    Shop Now
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Modal for Login or Sign Up */}
            {showModal && (
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={modalVariants}
              >
                <motion.div
                  className="bg-white rounded-lg shadow-lg p-8 w-96"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
                    Get Started
                  </h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-center text-gray-600 mb-6"
                  >
                    Choose an option to proceed.
                  </motion.p>
                  <div className="flex flex-col space-y-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate('/login')}
                      className="bg-gradient-to-r from-amber-500 to-orange-600 text-white py-2 px-4 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg"
                    >
                      Login
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate('/signup')}
                      className="bg-gradient-to-r from-green-400 to-teal-500 text-white py-2 px-4 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg"
                    >
                      Sign Up
                    </motion.button>
                  </div>
                  <motion.button
                    onClick={toggleModal}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 text-gray-500 underline text-center w-full"
                  >
                    Cancel
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-gradient-to-r from-amber-500 to-orange-600 py-12 mb-8">
                <div className="max-w-7xl mx-auto px-4">
                  <motion.h1
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl font-bold text-white text-center mb-4"
                  >
                    Welcome, {user.name}!
                  </motion.h1>
                  <motion.p
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl text-white text-center"
                  >
                    Choose your favorite category and start shopping
                  </motion.p>
                </div>
              </div>
              <CategoryCards />
              <AboutUs />
              <LocationMap />
            </motion.div>
          </>
        )}
      </div>
    </PageTransition>
  );
};
