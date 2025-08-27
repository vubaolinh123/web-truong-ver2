"use client";

import React, { useState } from 'react';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { motion, AnimatePresence } from 'framer-motion';
import { Images } from 'lucide-react';

const galleryItems = [
  { src: '/images/history-1.jpg', alt: 'Lễ khai giảng khóa đầu tiên' },
  { src: '/images/history-2.jpg', alt: 'Ký kết hợp tác doanh nghiệp' },
  { src: '/images/history-3.jpg', alt: 'Phòng thực hành máy tính' },
  { src: '/images/history-4.jpg', alt: 'Sinh viên tại thư viện' },
  { src: '/images/history-5.jpg', alt: 'Sự kiện học thuật năm 2019' },
  { src: '/images/history-6.jpg', alt: 'Nhà trường trong lễ tổng kết' },
];

const Gallery: React.FC = () => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section aria-labelledby="gallery-title">
      <h2 id="gallery-title" className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Thư viện hình ảnh lịch sử</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {galleryItems.map((item, i) => (
          <motion.button
            key={item.src}
            onClick={() => setActive(i)}
            className="group relative aspect-[4/3] rounded-xl overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            aria-label={`Mở ảnh: ${item.alt}`}
          >
            <OptimizedImage
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
            onClick={() => setActive(null)}
            aria-label="Đóng xem ảnh"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-[4/3]"
            >
              <OptimizedImage
                src={galleryItems[active].src}
                alt={galleryItems[active].alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
              <button
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded text-slate-800 hover:bg-white"
              >
                Đóng
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;

