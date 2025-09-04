'use client';

import React, { useState, useEffect } from 'react';

import OptimizedImage from '@/components/ui/OptimizedImage';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'TRƯỜNG CAO ĐẲNG THÔNG TIN VÀ TRUYỀN THÔNG CHÍNH THỨC TUYỂN SINH VÀ ĐÀO TẠO NGHỀ CÔNG NGHỆ THÔNG TIN VÀ LẬP TRÌNH MÁY TÍNH TỪ NĂM 2025',
      subtitle: 'Đào tạo chuyên sâu về công nghệ thông tin, lập trình máy tính và các ngành nghề hiện đại',
      image: '/images/banner_1.jpg',
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
      image: '/images/banner_2.jpg',
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
      image: '/images/banner_3.jpg',
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
      image: '/images/banner_4.jpg',
      cta: {
        text: 'ĐĂNG KÝ DU HỌC',
        href: '/du-hoc'
      },
      bgColor: 'from-red-700 to-red-600'
    },
    {
      id: 5,
      title: 'TUYỂN THỰC TẬP SINH IN VÀ ĐÓNG SÁCH TẠI NHẬT BẢN',
      subtitle: 'Cơ hội học tập và làm việc tại Nhật Bản với mức lương hấp dẫn và môi trường chuyên nghiệp',
      image: '/images/banner_5.jpg',
      cta: {
        text: 'ĐĂNG KÝ DU HỌC',
        href: '/du-hoc'
      },
      bgColor: 'from-red-700 to-red-600'
    },
    {
      id: 6,
      title: 'TUYỂN THỰC TẬP SINH IN VÀ ĐÓNG SÁCH TẠI NHẬT BẢN',
      subtitle: 'Cơ hội học tập và làm việc tại Nhật Bản với mức lương hấp dẫn và môi trường chuyên nghiệp',
      image: '/images/banner_6.jpg',
      cta: {
        text: 'ĐĂNG KÝ DU HỌC',
        href: '/du-hoc'
      },
      bgColor: 'from-red-700 to-red-600'
    },
    {
      id: 7,
      title: 'TUYỂN THỰC TẬP SINH IN VÀ ĐÓNG SÁCH TẠI NHẬT BẢN',
      subtitle: 'Cơ hội học tập và làm việc tại Nhật Bản với mức lương hấp dẫn và môi trường chuyên nghiệp',
      image: '/images/banner_7.jpg',
      cta: {
        text: 'ĐĂNG KÝ DU HỌC',
        href: '/du-hoc'
      },
      bgColor: 'from-red-700 to-red-600'
    },
    {
      id: 8,
      title: 'TUYỂN THỰC TẬP SINH IN VÀ ĐÓNG SÁCH TẠI NHẬT BẢN',
      subtitle: 'Cơ hội học tập và làm việc tại Nhật Bản với mức lương hấp dẫn và môi trường chuyên nghiệp',
      image: '/images/banner_8.jpg',
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
    <section
      className="relative w-full overflow-hidden mx-auto max-h-[260px] sm:max-h-[300px] md:max-h-[360px] lg:max-h-[420px] xl:max-h-[480px]"
      style={{ aspectRatio: '2 / 1' }}
    >
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
          <div className="absolute inset-0">
            <OptimizedImage
              src={slides[currentSlide].image}
              alt={`Hình ảnh minh họa: ${slides[currentSlide].title}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
              style={{ objectFit: 'contain', objectPosition: 'center', backgroundColor: 'transparent' }}
              priority={currentSlide === 0}
              fetchPriority={currentSlide === 0 ? 'high' : 'auto'}
              loading={currentSlide === 0 ? 'eager' : 'lazy'}
            />
          </div>

          {/* Overlay */}


          {/* Accessible text for screen readers */}
          <div className="sr-only" aria-live="polite">
            <h1>{slides[currentSlide].title}</h1>
            <p>{slides[currentSlide].subtitle}</p>
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
