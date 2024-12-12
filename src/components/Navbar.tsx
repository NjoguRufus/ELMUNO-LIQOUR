import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Wine, Martini, FlaskConical, Droplet, Glasses, Beer, ShoppingCart, User, Menu } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';

export const Navbar = () => {
  const { cart, user } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-zinc-900 text-white py-4 px-6 fixed w-full top-0 z-50"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Wine className="h-8 w-8 text-amber-500" />
          <span className="text-xl font-bold">ELMUNO LIQOUR</span>
        </Link>

        {user && (
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden block text-white focus:outline-none"
          >
            <Menu className="h-6 w-6" />
          </button>
        )}

        <div className={`lg:flex ${isMenuOpen ? 'block' : 'hidden'} absolute lg:static top-16 left-0 w-full lg:w-auto bg-zinc-900 lg:bg-transparent z-40 lg:z-auto`}>          
          <div className="lg:flex items-center lg:space-x-8 space-y-2 lg:space-y-0 px-6 lg:px-0">
            <Link to="/whiskey" className="block lg:inline flex items-center space-x-2 hover:text-amber-500 transition-colors">
              {isMenuOpen && <Glasses className="h-5 w-5" />}
              <span>Whiskey</span>
            </Link>
            <Link to="/beer" className="block lg:inline flex items-center space-x-2 hover:text-amber-500 transition-colors">
              {isMenuOpen && <Beer className="h-5 w-5" />}
              <span>Beer</span>
            </Link>
            <Link to="/spirits" className="block lg:inline flex items-center space-x-2 hover:text-amber-500 transition-colors">
              {isMenuOpen && <Martini className="h-5 w-5" />}
              <span>Spirits</span>
            </Link>
            <Link to="/gin" className="block lg:inline flex items-center space-x-2 hover:text-amber-500 transition-colors">
              {isMenuOpen && <FlaskConical className="h-5 w-5" />}
              <span>Gin</span>
            </Link>
            <Link to="/vodka" className="block lg:inline flex items-center space-x-2 hover:text-amber-500 transition-colors">
              {isMenuOpen && <Droplet className="h-5 w-5" />}
              <span>Vodka</span>
            </Link>
            <Link to="/wine" className="block lg:inline flex items-center space-x-2 hover:text-amber-500 transition-colors">
              {isMenuOpen && <Wine className="h-5 w-5" />}
              <span>Wine</span>
            </Link>
            <Link to="/tequila" className="block lg:inline flex items-center space-x-2 hover:text-amber-500 transition-colors">
              {isMenuOpen && <Droplet className="h-5 w-5" />}
              <span>Tequila</span>
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          {user && (
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 hover:text-amber-500 transition-colors" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </Link>
          )}

          {user ? (
            <Link to="/profile">
              <User className="h-6 w-6 hover:text-amber-500 transition-colors" />
            </Link>
          ) : (
            <Link to="/login" className="hover:text-amber-500 transition-colors">
              Login
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
};
