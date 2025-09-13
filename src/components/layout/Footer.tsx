'use client';

import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Facebook,
  Youtube,
  Twitter,
  Instagram,
  ArrowUp
} from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { title: 'Giới thiệu', href: '/gioi-thieu' },
    { title: 'Tuyển sinh', href: '/tuyen-sinh' },
    { title: 'Đào tạo', href: '/dao-tao' },
    { title: 'Tổ chức', href: '/to-chuc' },
    { title: 'Hợp tác', href: '/hop-tac' },
    { title: 'Liên hệ', href: '/lien-he' },
  ];

  const services = [
    { title: 'Học trực tuyến VTC', href: '/hoc-truc-tuyen' },
    { title: 'Đăng ký trực tuyến', href: '/dang-ky-truc-tuyen' },
    { title: 'Văn bằng', href: '/van-bang' },
    { title: 'Thông tin tuyển sinh', href: '/thong-tin-tuyen-sinh' },
    { title: 'Hỗ trợ sinh viên', href: '/ho-tro-sinh-vien' },
    { title: 'Tài liệu học tập', href: '/tai-lieu' },
  ];

  const programs = [
    { title: 'Công nghệ thông tin', href: '/cong-nghe-thong-tin' },
    { title: 'Lập trình máy tính', href: '/lap-trinh-may-tinh' },
    { title: 'Thiết kế đồ họa', href: '/thiet-ke-do-hoa' },
    { title: 'Quản trị mạng', href: '/quan-tri-mang' },
    { title: 'An toàn thông tin', href: '/an-toan-thong-tin' },
    { title: 'Truyền thông đa phương tiện', href: '/truyen-thong-da-phuong-tien' },
  ];

  return (
    <footer className="text-white relative" style={{ backgroundColor: '#1e40af' }}>
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* University Info */}
          <div className="space-y-4">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center space-x-4">
                {/* <div className="flex-shrink-0">
                  <Image
                    src="/images/logo.png"
                    alt="Logo Trường Cao đẳng Thông tin và Truyền thông"
                    width={80}
                    height={80}
                    className="w-20 h-20 object-contain"
                  />
                </div> */}
                <div>
                  <h3 className="text-xl font-bold text-yellow-200 leading-tight uppercase">
                    TRƯỜNG CAO ĐẲNG THÔNG TIN VÀ TRUYỀN THÔNG
                  </h3>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-yellow-300 mt-1 flex-shrink-0" />
                <span className="text-white">
                  36 Cầu Diễn, Phường Phúc Diễn, Hà Nội
                </span>
              </div>

              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-yellow-300 flex-shrink-0" />
                <span className="text-white">0243 764 4489</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4 pt-4">
              <Link
                href="https://facebook.com/cic.edu.vn"
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-yellow-300 transition-colors"
                style={{ backgroundColor: '#1e3a8a' }}
                aria-label="Facebook"
                title="Facebook"
              >
                <Facebook size={18} />
              </Link>
              <Link
                href="https://youtube.com/cic"
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-yellow-300 transition-colors"
                style={{ backgroundColor: '#1e3a8a' }}
                aria-label="YouTube"
                title="YouTube"
              >
                <Youtube size={18} />
              </Link>
              <Link
                href="https://twitter.com/cic"
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-yellow-300 transition-colors"
                style={{ backgroundColor: '#1e3a8a' }}
                aria-label="Twitter"
                title="Twitter"
              >
                <Twitter size={18} />
              </Link>
              <Link
                href="https://instagram.com/cic"
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-yellow-300 transition-colors"
                style={{ backgroundColor: '#1e3a8a' }}
                aria-label="Instagram"
                title="Instagram"
              >
                <Instagram size={18} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-yellow-300 mb-6 uppercase">LIÊN KẾT NHANH</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-white hover:text-yellow-300 transition-colors text-sm"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-yellow-300 mb-6 uppercase">DỊCH VỤ TRỰC TUYẾN</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.title}>
                  <Link
                    href={service.href}
                    className="text-white hover:text-yellow-300 transition-colors text-sm"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-semibold text-yellow-300 mb-6 uppercase">CHƯƠNG TRÌNH ĐÀO TẠO</h4>
            <ul className="space-y-3">
              {programs.map((program) => (
                <li key={program.title}>
                  <Link
                    href={program.href}
                    className="text-white hover:text-yellow-300 transition-colors text-sm"
                  >
                    {program.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-blue-400">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-white text-center md:text-left">
              <p>© 2025, Trường Cao đẳng Thông tin và Truyền thông - Bộ Khoa học và Công nghệ. All rights reserved.</p>
            </div>

            <div className="flex items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-white hover:text-yellow-300 transition-colors">
                Chính sách bảo mật
              </Link>
              <Link href="/terms" className="text-white hover:text-yellow-300 transition-colors">
                Điều khoản sử dụng
              </Link>
              <div className="text-white">
                Online: <span className="text-yellow-300">1,234</span> / 2.581.876 lượt truy cập
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute bottom-6 right-6 w-12 h-12 hover:bg-yellow-400 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg"
        style={{ backgroundColor: '#1d4ed8' }}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
};

export default Footer;
