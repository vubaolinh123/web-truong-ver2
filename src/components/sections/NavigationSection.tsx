'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NavigationSection = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      title: 'GIỚI THIỆU',
      href: '/gioi-thieu',
      dropdown: [
        { title: 'Lịch sử hình thành', href: '/lich-su-nha-truong' },
        { title: 'Cơ sở vật chất', href: '/co-so-vat-chat' },
        { title: 'Sứ Mệnh Tầm Nhìn', href: '/su-menh-tam-nhin' },
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
      ]
    },
    {
      title: 'ĐÀO TẠO',
      href: '/dao-tao',
      dropdown: [
        { title: 'Chương trình đào tạo', href: '/chuong-trinh-dao-tao' },
        { title: 'Lịch học', href: '/lich-hoc' },
        { title: 'Tài liệu học tập', href: '/tai-lieu-hoc-tap' },
        { title: 'Thực tập', href: '/thuc-tap' },
      ]
    },
    {
      title: 'SINH VIÊN',
      href: '/sinh-vien',
      dropdown: [
        { title: 'Thông tin sinh viên', href: '/thong-tin-sinh-vien' },
        { title: 'Học bổng', href: '/hoc-bong' },
        { title: 'Hoạt động sinh viên', href: '/hoat-dong-sinh-vien' },
        { title: 'Hỗ trợ sinh viên', href: '/ho-tro-sinh-vien' },
      ]
    },
    {
      title: 'TỔ CHỨC',
      href: '/to-chuc',
      dropdown: [
        { title: 'Cơ cấu tổ chức', href: '/co-cau-to-chuc' },
        { title: 'Ban giám hiệu', href: '/ban-giam-hieu' },
        { title: 'Các khoa', href: '/cac-khoa' },
        { title: 'Phòng ban', href: '/phong-ban' },
      ]
    },
    {
      title: 'HỢP TÁC',
      href: '/hop-tac',
      dropdown: [
        { title: 'Hợp tác doanh nghiệp', href: '/hop-tac-doanh-nghiep' },
        { title: 'Hợp tác quốc tế', href: '/hop-tac-quoc-te' },
        { title: 'Dự án', href: '/du-an' },
        { title: 'Đối tác', href: '/doi-tac' },
      ]
    },
    {
      title: 'TIN TỨC',
      href: '/tin-tuc',
      dropdown: [
        { title: 'Tin tức chung', href: '/tin-tuc-chung' },
        { title: 'Thông báo', href: '/thong-bao' },
        { title: 'Sự kiện', href: '/su-kien' },
        { title: 'Hoạt động', href: '/hoat-dong' },
      ]
    }
  ];

  return (
    <section className="bg-gray-900 shadow-lg relative z-40">
      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-center space-x-1 py-4">
            <Link
              href="/"
              className="px-4 py-3 text-white hover:bg-blue-600 font-semibold transition-colors rounded"
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
                  className="flex items-center space-x-1 px-4 py-3 text-white hover:bg-blue-600 font-semibold transition-colors rounded"
                >
                  <span>{item.title}</span>
                  {item.dropdown && <ChevronDown size={16} />}
                </Link>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {activeDropdown === item.title && item.dropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-lg border border-gray-200 py-2 z-50"
                    >
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm"
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
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold text-lg">Menu</h3>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white p-2 hover:bg-blue-600 rounded transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 space-y-2"
              >
                <Link
                  href="/"
                  className="block text-white hover:bg-blue-600 font-semibold transition-colors py-3 px-4 rounded"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  TRANG CHỦ
                </Link>
                {navigationItems.map((item) => (
                  <div key={item.title} className="space-y-1">
                    <Link
                      href={item.href}
                      className="block text-white hover:bg-blue-600 font-semibold transition-colors py-3 px-4 rounded"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                    {item.dropdown && (
                      <div className="ml-4 space-y-1">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.title}
                            href={subItem.href}
                            className="block text-gray-300 hover:bg-blue-600 hover:text-white transition-colors py-2 px-4 rounded text-sm"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default NavigationSection;
