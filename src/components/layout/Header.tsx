'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Youtube } from 'lucide-react';

const Header = () => {

  return (
    <header className="shadow-lg relative z-50" style={{ backgroundColor: '#2563eb' }}>
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
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            {/* Logo and School Name - Horizontal Layout */}
            <Link href="/" className="flex items-center space-x-6">
              <div className="flex-shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Logo Trường Cao đẳng Thông tin và Truyền thông"
                  width={130}
                  height={130}
                  className="w-32 h-32 object-contain"
                />
              </div>
              <div className="text-left">
                <p className="text-2xl text-blue-900 leading-tight mb-1 uppercase">BỘ KHOA HỌC VÀ CÔNG NGHỆ</p>
                <h1 className="text-2xl font-bold text-blue-900 leading-tight mb-1 uppercase">
                  CAO ĐẲNG THÔNG TIN VÀ TRUYỀN THÔNG
                </h1>
                <p className="text-sm text-gray-600 uppercase">COLLEGE OF INFORMATION AND COMMUNICATION TECHNOLOGY</p>
              </div>
            </Link>
          </div>
        </div>
      </div>



      {/* Navigation Section */}
      <div className="shadow-lg relative z-40" style={{ backgroundColor: '#3b82f6' }}>
        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <div className="container mx-auto px-4">
            <nav className="flex items-center justify-center space-x-1 py-4">
              <Link
                href="/"
                className="px-4 py-3 text-yellow-400 hover:bg-yellow-500 hover:text-blue-900 font-semibold transition-colors rounded"
              >
                TRANG CHỦ
              </Link>
              <div className="relative group">
                <Link
                  href="/gioi-thieu"
                  className="flex items-center space-x-1 px-4 py-3 text-yellow-400 hover:bg-yellow-500 hover:text-blue-900 font-semibold transition-colors rounded"
                >
                  <span>GIỚI THIỆU</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-lg border border-gray-200 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link href="/lich-su-nha-truong" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Lịch sử nhà trường
                  </Link>
                  <Link href="/su-mang" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Sứ mạng
                  </Link>
                  <Link href="/chuc-nang-nhiem-vu" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Chức năng nhiệm vụ
                  </Link>
                  <Link href="/co-so-vat-chat" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Cơ sở vật chất
                  </Link>
                  <Link href="/lien-he" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Liên hệ
                  </Link>
                </div>
              </div>
              <div className="relative group">
                <Link
                  href="/tuyen-sinh"
                  className="flex items-center space-x-1 px-4 py-3 text-yellow-400 hover:bg-yellow-500 hover:text-blue-900 font-semibold transition-colors rounded"
                >
                  <span>TUYỂN SINH</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-lg border border-gray-200 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link href="/thong-tin-tuyen-sinh" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Thông tin tuyển sinh
                  </Link>
                  <Link href="/cac-nganh-nghe-dao-tao" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Các ngành, nghề đào tạo
                  </Link>
                  <Link href="/dang-ky-truc-tuyen" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Đăng ký trực tuyến
                  </Link>
                  <Link href="/ket-qua" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Kết quả
                  </Link>
                </div>
              </div>
              <div className="relative group">
                <Link
                  href="/dao-tao"
                  className="flex items-center space-x-1 px-4 py-3 text-yellow-400 hover:bg-yellow-500 hover:text-blue-900 font-semibold transition-colors rounded"
                >
                  <span>ĐÀO TẠO</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-lg border border-gray-200 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link href="/chuong-trinh-dao-tao" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Chương trình đào tạo
                  </Link>
                  <Link href="/lich-hoc" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Lịch học
                  </Link>
                  <Link href="/tai-lieu-hoc-tap" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Tài liệu học tập
                  </Link>
                  <Link href="/thuc-tap" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Thực tập
                  </Link>
                </div>
              </div>
              <div className="relative group">
                <Link
                  href="/sinh-vien"
                  className="flex items-center space-x-1 px-4 py-3 text-yellow-400 hover:bg-yellow-500 hover:text-blue-900 font-semibold transition-colors rounded"
                >
                  <span>SINH VIÊN</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-lg border border-gray-200 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link href="/thong-tin-sinh-vien" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Thông tin sinh viên
                  </Link>
                  <Link href="/hoc-bong" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Học bổng
                  </Link>
                  <Link href="/hoat-dong-sinh-vien" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Hoạt động sinh viên
                  </Link>
                  <Link href="/ho-tro-sinh-vien" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Hỗ trợ sinh viên
                  </Link>
                </div>
              </div>
              <div className="relative group">
                <Link
                  href="/to-chuc"
                  className="flex items-center space-x-1 px-4 py-3 text-yellow-400 hover:bg-yellow-500 hover:text-blue-900 font-semibold transition-colors rounded"
                >
                  <span>TỔ CHỨC</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-lg border border-gray-200 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link href="/co-cau-to-chuc" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Cơ cấu tổ chức
                  </Link>
                  <Link href="/ban-giam-hieu" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Ban giám hiệu
                  </Link>
                  <Link href="/cac-khoa" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Các khoa
                  </Link>
                  <Link href="/phong-ban" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Phòng ban
                  </Link>
                </div>
              </div>
              <div className="relative group">
                <Link
                  href="/hop-tac"
                  className="flex items-center space-x-1 px-4 py-3 text-yellow-400 hover:bg-yellow-500 hover:text-blue-900 font-semibold transition-colors rounded"
                >
                  <span>HỢP TÁC</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-lg border border-gray-200 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link href="/hop-tac-doanh-nghiep" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Hợp tác doanh nghiệp
                  </Link>
                  <Link href="/hop-tac-quoc-te" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Hợp tác quốc tế
                  </Link>
                  <Link href="/du-an" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Dự án
                  </Link>
                  <Link href="/doi-tac" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Đối tác
                  </Link>
                </div>
              </div>
              <div className="relative group">
                <Link
                  href="/tin-tuc"
                  className="flex items-center space-x-1 px-4 py-3 text-yellow-400 hover:bg-yellow-500 hover:text-blue-900 font-semibold transition-colors rounded"
                >
                  <span>TIN TỨC</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-lg border border-gray-200 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link href="/tin-tuc-chung" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Tin tức chung
                  </Link>
                  <Link href="/thong-bao" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Thông báo
                  </Link>
                  <Link href="/su-kien" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Sự kiện
                  </Link>
                  <Link href="/hoat-dong" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Hoạt động
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold text-lg">Menu</h3>
              <button className="text-white p-2 hover:bg-blue-600 rounded transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>


    </header>
  );
};

export default Header;
