'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Youtube } from 'lucide-react';

const Header = () => {

  return (
    <header className="bg-gray-900 shadow-lg relative z-50">
      {/* Top Bar */}
      <div className="text-white py-2" style={{ backgroundColor: '#2563eb' }}>
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span className="text-yellow-400 font-semibold">Hotline: 0964 322 215</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/dang-ky-truc-tuyen" className="bg-yellow-500 text-gray-900 px-3 py-1 rounded hover:bg-yellow-400 transition-colors font-semibold">
              ĐĂNG KÝ TRỰC TUYẾN
            </Link>
            <Link href="/hoc-truc-tuyen" className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500 transition-colors">
              HỌC TRỰC TUYẾN
            </Link>
            <Link href="https://youtube.com" className="hover:text-yellow-400 transition-colors">
              <Youtube size={16} />
            </Link>
            <Link href="https://facebook.com" className="hover:text-yellow-400 transition-colors">
              <Facebook size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            {/* Logo and School Name */}
            <Link href="/" className="flex items-center space-x-8">
              <div className="flex-shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Logo Trường Cao đẳng Thông tin và Truyền thông"
                  width={120}
                  height={120}
                  className="w-30 h-30 object-contain"
                />
              </div>
              <div className="text-center">
                <p className="text-lg text-gray-600 font-medium mb-2">Bộ khoa học và công nghệ</p>
                <h1 className="text-4xl font-bold text-blue-900 leading-tight mb-2">
                  CAO ĐẲNG THÔNG TIN VÀ TRUYỀN THÔNG
                </h1>
                <p className="text-lg text-gray-600">College of Information and Communication Technology</p>
              </div>
            </Link>
          </div>
        </div>
      </div>



      {/* Secondary Navigation Bar */}
      <div className="text-white" style={{ backgroundColor: '#2563eb' }}>
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-center space-x-8 text-sm">
            <Link href="/dang-ky-truc-tuyen" className="hover:text-yellow-400 transition-colors font-medium">
              ĐĂNG KÝ TRỰC TUYẾN
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/hoc-truc-tuyen" className="hover:text-yellow-400 transition-colors font-medium">
              HỌC TRỰC TUYẾN-VTC
            </Link>
            <span className="text-gray-300">|</span>
            <span className="text-yellow-400 font-semibold">Hotline: 0964 322 215</span>
          </div>
        </div>
      </div>


    </header>
  );
};

export default Header;
