import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Beer, Wine, Coffee } from 'lucide-react';

const categories = [
  {
    name: 'Whiskey',
    icon: Wine,
    color: 'from-amber-500 to-orange-600',
    image: 'https://i.pinimg.com/736x/02/b1/58/02b1584a0952e6ddf0669d5ecad514d0.jpg'
  },
  {
    name: 'Beer',
    icon: Beer,
    color: 'from-yellow-400 to-orange-500',
    image: 'https://i.pinimg.com/736x/db/1a/84/db1a84d570af242bb578a50adcb78fa0.jpg'
  },
  {
    name: 'Wine',
    icon: Coffee,
    color: 'from-green-400 to-teal-500',
    image: 'https://i.pinimg.com/736x/6f/83/f1/6f83f11b3d936fc203e63789651bfed5.jpg'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const CategoryCards = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 py-12"
    >
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <motion.div
            key={category.name}
            variants={item}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/${category.name.toLowerCase()}`)}
            className="relative group cursor-pointer"
          >
            <div
              className="absolute inset-0 bg-gradient-to-r w-full h-full rounded-xl opacity-75 transition-opacity group-hover:opacity-90"
              style={{
                backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`
              }}
            >
              <div
                className={`w-full h-full bg-gradient-to-r ${category.color} opacity-75 rounded-xl`}
              />
            </div>
            <div className="relative bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="h-48">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-800">
                    {category.name}
                  </h3>
                  <Icon className="h-6 w-6 text-gray-600" />
                </div>
                <p className="mt-2 text-gray-600">
                  Explore our {category.name.toLowerCase()} collection
                </p>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="mt-4 inline-flex items-center text-amber-500"
                >
                  Shop Now
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
