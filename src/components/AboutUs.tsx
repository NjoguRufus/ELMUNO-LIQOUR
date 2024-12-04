import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Phone, Mail } from 'lucide-react';

export const AboutUs = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">About Elmuno Liquor</h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-gray-600 leading-relaxed">
              Welcome to Elmuno Liquor, your premier destination for fine spirits and beverages. 
              Since our establishment, we've been committed to providing our customers with the 
              finest selection of whiskey, beer, and traditional Whine.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our expert staff is passionate about helping you discover new favorites and 
              ensuring you find exactly what you're looking for. We pride ourselves on our 
              extensive collection and exceptional customer service.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-amber-500" />
                <div>
                  <h4 className="font-semibold">Hours</h4>
                  <p className="text-sm text-gray-600">Mon-Sat: 9AM - 10PM</p>
                  <p className="text-sm text-gray-600">Sun: 10AM - 8PM</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-amber-500" />
                <div>
                  <h4 className="font-semibold">Contact</h4>
                  <p className="text-sm text-gray-600">+254 712 345 678</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-amber-500" />
                <div>
                  <h4 className="font-semibold">Location</h4>
                  <p className="text-sm text-gray-600">Nairobi, Kenya</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-amber-500" />
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-sm text-gray-600">info@elmuno.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <img
              src="https://images.unsplash.com/photo-1597290282695-edc43d0e7129?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Store Interior"
              className="rounded-lg shadow-lg w-full h-48 object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1574279606130-09958dc756f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Our Products"
              className="rounded-lg shadow-lg w-full h-48 object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1571204829887-3b8d69e4094d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Premium Selection"
              className="rounded-lg shadow-lg w-full h-48 object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1569529465841-dfecdab7503b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Expert Staff"
              className="rounded-lg shadow-lg w-full h-48 object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};