'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'TRƯỜNG CAO ĐẲNG THÔNG TIN VÀ TRUYỀN THÔNG CHÍNH THỨC TUYỂN SINH VÀ ĐÀO TẠO NGHỀ CÔNG NGHỆ THÔNG TIN VÀ LẬP TRÌNH MÁY TÍNH TỪ NĂM 2025',
      subtitle: 'Đào tạo chuyên sâu về công nghệ thông tin, lập trình máy tính và các ngành nghề hiện đại',
      image: '/images/banner-education.svg',
      cta: {
        text: 'ĐĂNG KÝ NGAY',
        href: '/dang-ky-truc-tuyen'
      },
      bgColor: 'from-blue-900 to-blue-700'
    },
    {
      id: 2,
      title: 'SAMSUNG VIỆT NAM TÀI TRỢ CHO TRƯỜNG 38 MÁY TÍNH VÀ HỆ THỐNG THỰC HÀNH MẠNG LAN',
      subtitle: 'Nâng cao chất lượng đào tạo các ngành nghề Công nghệ Thông tin với trang thiết bị hiện đại',
      image: '/images/banner-training.svg',
      cta: {
        text: 'TÌM HIỂU THÊM',
        href: '/hop-tac-doanh-nghiep'
      },
      bgColor: 'from-yellow-600 to-yellow-500'
    },
    {
      id: 3,
      title: 'CHƯƠNG TRÌNH ĐÀO TẠO CHẤT LƯỢNG CAO - LIÊN KẾT QUỐC TẾ',
      subtitle: 'Đào tạo theo tiêu chuẩn quốc tế với cơ hội du học và làm việc tại các doanh nghiệp hàng đầu',
      image: '/images/banner-library.svg',
      cta: {
        text: 'KHÁM PHÁ NGAY',
        href: '/dao-tao'
      },
      bgColor: 'from-green-700 to-green-600'
    },
    {
      id: 4,
      title: 'TUYỂN THỰC TẬP SINH IN VÀ ĐÓNG SÁCH TẠI NHẬT BẢN',
      subtitle: 'Cơ hội học tập và làm việc tại Nhật Bản với mức lương hấp dẫn và môi trường chuyên nghiệp',
      image: '/images/quality-education.svg',
      cta: {
        text: 'ĐĂNG KÝ DU HỌC',
        href: '/du-hoc'
      },
      bgColor: 'from-red-700 to-red-600'
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-[400px] md:h-[500px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].bgColor}`}
        >
          {/* Background Image (as actual <Image> for LCP) */}
          <div className="absolute inset-0 opacity-30">
            <OptimizedImage
              src={slides[currentSlide].image}
              alt={`Hình ảnh minh họa: ${slides[currentSlide].title}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority={currentSlide === 0}
              fetchPriority={currentSlide === 0 ? 'high' : 'auto'}
              loading={currentSlide === 0 ? 'eager' : 'lazy'}
            />
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
            <div className="max-w-4xl text-white">
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight uppercase"
              >
                {slides[currentSlide].title}
              </motion.h1>

              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-sm md:text-lg mb-6 leading-relaxed opacity-90"
              >
                {slides[currentSlide].subtitle}
              </motion.p>
              
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <Link
                  href={slides[currentSlide].cta.href}
                  className="inline-flex items-center space-x-2 bg-yellow-500 text-gray-900 px-6 py-3 rounded font-bold hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  aria-label={`${slides[currentSlide].cta.text} - chuyển đến ${slides[currentSlide].cta.href}`}
                >
                  <span>{slides[currentSlide].cta.text}</span>
                  <ArrowRight size={18} />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-yellow-400 scale-125'
                : 'bg-white/60 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Banner;
