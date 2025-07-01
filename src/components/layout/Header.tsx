'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X, Facebook, Youtube, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navigationItems = [
    {
      title: 'GIỚI THIỆU',
      href: '/gioi-thieu',
      dropdown: [
        { title: 'Lịch sử nhà trường', href: '/lich-su-nha-truong' },
        { title: 'Sứ mạng', href: '/su-mang' },
        { title: 'Chức năng nhiệm vụ', href: '/chuc-nang-nhiem-vu' },
        { title: 'Cơ sở vật chất', href: '/co-so-vat-chat' },
        { title: 'Liên hệ', href: '/lien-he' },
      ]
    },
    {
      title: 'TUYỂN SINH',
      href: '/tuyen-sinh',
      dropdown: [
        { title: 'Thông tin tuyển sinh', href: '/thong-tin-tuyen-sinh' },
        { title: 'Các ngành, nghề đào tạo', href: '/cac-nganh-nghe-dao-tao' },
        { title: 'Đăng ký trực tuyến', href: '/dang-ky-truc-tuyen' },
        { title: 'Kết quả', href: '/ket-qua' },
      ]
    },
    {
      title: 'ĐÀO TẠO',
      href: '/dao-tao',
      dropdown: [
        { title: 'Giới thiệu', href: '/dao-tao-gioi-thieu' },
        { title: 'Kế hoạch đào tạo', href: '/ke-hoach-dao-tao' },
        { title: 'Chương trình đào tạo', href: '/chuong-trinh-dao-tao' },
        { title: 'Quy chế, văn bản đào tạo', href: '/quy-che-van-ban-dao-tao' },
        { title: 'Lịch thi', href: '/lich-thi' },
        { title: 'Thời khóa biểu', href: '/thoi-khoa-bieu' },
        { title: 'Liên kết đào tạo', href: '/lien-ket-dao-tao' },
      ]
    },
    {
      title: 'TỔ CHỨC',
      href: '/to-chuc',
      dropdown: [
        { title: 'Ban giám hiệu', href: '/ban-giam-hieu' },
        { title: 'Phòng đào tạo', href: '/phong-dao-tao' },
        { title: 'Phòng tổ chức hành chính', href: '/phong-to-chuc-hanh-chinh' },
        { title: 'Phòng kế hoạch tài chính', href: '/phong-ke-hoach-tai-chinh' },
        { title: 'Trung tâm tuyển sinh', href: '/trung-tam-tuyen-sinh' },
        { title: 'Khoa Công nghệ In', href: '/khoa-cong-nghe-in' },
        { title: 'Khoa Công nghệ Thông tin', href: '/khoa-cong-nghe-thong-tin' },
        { title: 'Khoa Công nghệ Bao bì', href: '/khoa-cong-nghe-bao-bi' },
        { title: 'Khoa Đại cương', href: '/khoa-dai-cuong' },
      ]
    },
    {
      title: 'HỢP TÁC',
      href: '/hop-tac',
      dropdown: [
        { title: 'Hợp tác doanh nghiệp', href: '/hop-tac-doanh-nghiep' },
        { title: 'Du học', href: '/du-hoc' },
        { title: 'Giới thiệu việc làm', href: '/gioi-thieu-viec-lam' },
        { title: 'Hợp tác quốc tế', href: '/hop-tac-quoc-te' },
      ]
    },
    {
      title: 'HỌC TRỰC TUYẾN',
      href: '/hoc-truc-tuyen',
    },
    {
      title: 'VĂN BẰNG',
      href: '/van-bang',
    }
  ];

  return (
    <header className="bg-gray-900 shadow-lg relative z-50">
      {/* Top Bar */}
      <div className="bg-blue-900 text-white py-2">
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
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-blue-900 rounded-lg flex items-center justify-center">
                <span className="text-yellow-400 font-bold text-2xl">VCIC</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-blue-900 leading-tight">
                  CAO ĐẲNG THÔNG TIN VÀ TRUYỀN THÔNG
                </h1>
                <p className="text-sm text-gray-600 mt-1">College of Information and Communication Technology</p>
                <p className="text-xs text-blue-700 font-medium">BỘ KHOA HỌC VÀ CÔNG NGHỆ</p>
              </div>
            </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              href="/"
              className="px-4 py-2 text-blue-900 hover:bg-blue-50 font-semibold transition-colors rounded"
            >
              TRANG CHỦ
            </Link>
            {navigationItems.map((item) => (
              <div
                key={item.title}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.title)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center space-x-1 px-4 py-2 text-blue-900 hover:bg-blue-50 font-semibold transition-colors rounded"
                >
                  <span>{item.title}</span>
                  {item.dropdown && <ChevronDown size={16} />}
                </Link>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.title && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-1 w-72 bg-white shadow-xl rounded-lg border border-gray-200 py-2 z-50"
                    >
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors border-b border-gray-100 last:border-b-0"
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-blue-900 hover:bg-blue-50 transition-colors rounded"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        </div>
      </div>

      {/* Secondary Navigation Bar */}
      <div className="bg-blue-900 text-white">
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t border-gray-200"
          >
            <nav className="container mx-auto px-4 py-4 space-y-2">
              <Link
                href="/"
                className="block text-blue-900 hover:bg-blue-50 font-semibold transition-colors py-3 px-4 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                TRANG CHỦ
              </Link>
              {navigationItems.map((item) => (
                <div key={item.title}>
                  <Link
                    href={item.href}
                    className="block text-blue-900 hover:bg-blue-50 font-semibold transition-colors py-3 px-4 rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                  {item.dropdown && (
                    <div className="ml-4 space-y-1 mt-2">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          className="block text-sm text-gray-600 hover:text-blue-900 hover:bg-blue-50 transition-colors py-2 px-4 rounded"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
