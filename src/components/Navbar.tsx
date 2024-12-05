import { Link } from 'react-router-dom';
import { ShoppingCart, User, Wine } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';

export const Navbar = () => {
  const { cart, user } = useStore();
  
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
          <div className="flex items-center space-x-8">
            <Link to="/whiskey" className="hover:text-amber-500 transition-colors">
              Whiskey
            </Link>
            <Link to="/beer" className="hover:text-amber-500 transition-colors">
              Beer
            </Link>
            <Link to="/makali" className="hover:text-amber-500 transition-colors">
              Makali
            </Link>
          </div>
        )}

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