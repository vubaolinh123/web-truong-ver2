"use client";

import React from 'react';
import { motion } from 'framer-motion';

const LocationMap: React.FC = () => {
  return (
    <section aria-labelledby="location-map-title">
      <h2 id="location-map-title" className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Bản đồ & chỉ đường</h2>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35 }}
        className="bg-white rounded-2xl border border-slate-100 p-3 shadow-sm"
      >
        <div className="aspect-[16/9] w-full rounded-xl overflow-hidden">
          <iframe
            title="Bản đồ vị trí trường"
            aria-label="Bản đồ vị trí trường"
            src="https://maps.google.com/maps?q=36%20C%E1%BA%A7u%20Di%E1%BB%85n,%20B%E1%BA%AFc%20T%E1%BB%AB%20Li%C3%AAm,%20H%C3%A0%20N%E1%BB%99i&t=&z=15&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default LocationMap;

