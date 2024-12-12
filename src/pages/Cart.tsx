import React from 'react';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2 } from 'lucide-react';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useStore();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="pt-20 max-w-4xl mx-auto px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 text-center"
      >
        Shopping Cart
      </motion.h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty</p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          {cart.map((item) => (
            <motion.div
              key={item.id}
              layout
              className="flex items-center gap-4 bg-white p-4 rounded-lg shadow"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">ksh{item.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </motion.div>
          ))}

          <div className="mt-8 bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between text-xl font-bold mb-4">
              <span>Total:</span>
              <span>ksh{total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-amber-500 text-white py-3 rounded-lg hover:bg-amber-600 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};