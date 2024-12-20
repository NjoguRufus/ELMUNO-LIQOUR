import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Beer, Wine, Coffee, Martini } from 'lucide-react';

const categories = [
  {
    name: 'Whiskey',
    icon: Wine,
    color: 'from-amber-500 to-orange-600',
    image: 'https://media.istockphoto.com/id/533957701/photo/whiskey-and-natural-ice.webp?a=1&b=1&s=612x612&w=0&k=20&c=p5ct7Ok6ZFppssBkiNKSksC5OxIp8lF-9YeK-m8UMqI='
  },
  {
    name: 'Beer',
    icon: Beer,
    color: 'from-yellow-400 to-orange-500',
    image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Gin',
    icon: Martini,
    color: 'from-blue-400 to-indigo-500',
    image: 'https://media.istockphoto.com/id/1060748726/photo/sparkling-water-with-lime.jpg?s=612x612&w=0&k=20&c=uCJxkJ_xabTZ7bNe4bXE0I9dJxZjs8mgztzWxHH7SB4='
  },
  {
    name: 'Vodka',
    icon: Coffee,
    color: 'from-gray-400 to-gray-600',
    image: 'https://media.istockphoto.com/id/1357492455/photo/ice-cold-bottle-of-vodka-with-shot-glasses-on-dark-blue-background-with-copy-space.jpg?s=612x612&w=0&k=20&c=WbXAmHLU3bQJbaMWuGihCKiXjNMyFzwYJy0QWNIsLOY='
  },
  {
    name: 'Wine',
    icon: Wine,
    color: 'from-red-400 to-red-600',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
  name: 'Tequila',
    icon: Wine,
    color: 'from-red-400 to-red-600',
    image: 'https://media.istockphoto.com/id/131988952/photo/tequilla-and-lime.webp?a=1&b=1&s=612x612&w=0&k=20&c=FtaEf_8E2oBLz8-7ObKpw6fj2xQtCPIL_V5iFZexCdA='
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
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 py-12"
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
            <div className="absolute inset-0 bg-gradient-to-r w-full h-full rounded-xl opacity-75 transition-opacity group-hover:opacity-90"
                 style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}>
              <div className={`w-full h-full bg-gradient-to-r ${category.color} opacity-75 rounded-xl`} />
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
                  <h3 className="text-xl font-bold text-gray-800">{category.name}</h3>
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