import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

export const LocationMap = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Us</h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-lg overflow-hidden shadow-lg"
        >
          <div className="relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.963733891769!2d37.0005783!3d-1.1858966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f417c85ba4d01%3A0x95fe3cfc5ff02640!2sElmuno%20Liquor%20Shop!5e0!3m2!1sen!2ske!4v1733337749268!5m2!1sen!2ske"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Elmuno Liquor Shop Location"
              className="w-full"
            ></iframe>
            <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-amber-500" />
                <p className="font-semibold">Elmuno Liquor Shop</p>
              </div>
              <p className="text-sm text-gray-600 mt-1">Visit us today!</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};