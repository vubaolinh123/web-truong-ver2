'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Youtube } from 'lucide-react';
import MobileMenu from './MobileMenu';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="shadow-lg relative z-50" style={{ backgroundColor: '#1e40af' }}>
      {/* Top Bar */}
      <div className="text-white py-2 md:py-2" style={{ backgroundColor: '#1e40af' }}>
        <div className="container mx-auto px-4 flex justify-between items-center text-sm md:text-sm">
          {/* Hotline - Hidden on very small screens */}
          <div className="hidden sm:flex items-center space-x-4">
            <span className="text-white font-semibold text-xs sm:text-sm">Hotline: 0964 322 215</span>
          </div>

          {/* Buttons and Social - Responsive sizing */}
          <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto justify-end">
            {/* Register Button - Smaller on mobile */}
            <Link
              href="https://docs.google.com/forms/d/11D5J4efgXnvAMZONrNaTBNIlWL67_q7XvfMFS8vDxR8/viewform?edit_requested=true"
              className="bg-yellow-500 text-gray-900 px-2 sm:px-3 py-1 rounded hover:bg-yellow-400 transition-colors font-semibold text-xs sm:text-sm whitespace-nowrap"
            >
              ĐĂNG KÝ
            </Link>

            {/* Online Learning Button - Smaller on mobile */}
            <Link
              href="https://docs.google.com/forms/d/11D5J4efgXnvAMZONrNaTBNIlWL67_q7XvfMFS8vDxR8/viewform?edit_requested=true"
              className="bg-blue-600 text-white px-2 sm:px-3 py-1 rounded hover:bg-blue-500 transition-colors text-xs sm:text-sm whitespace-nowrap"
            >
              HỌC ONLINE
            </Link>

            {/* Social Icons */}
            <Link
              href="https://youtube.com"
              className="hover:text-white transition-colors ml-1 sm:ml-0"
              aria-label="YouTube của trường"
              title="YouTube của trường"
            >
              <Youtube size={16} />
            </Link>
            <Link
              href="https://facebook.com"
              className="hover:text-white transition-colors"
              aria-label="Facebook của trường"
              title="Facebook của trường"
            >
              <Facebook size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between py-4">
            {/* Logo - Far Left */}
            <div className="flex-shrink-0">
              <Link href="/">
                <Image
                  src="/images/logo.png"
                  alt="Logo Trường Cao đẳng Thông tin và Truyền thông"
                  width={160}
                  height={160}
                  className="w-40 h-40 object-contain"
                />
              </Link>
            </div>

            {/* School Name - Centered in Remaining Space */}
            <div className="flex-1 flex justify-center">
              <Link href="/" className="text-center">
                <p className="text-2xl text-blue-900 leading-tight mb-1 uppercase">BỘ KHOA HỌC VÀ CÔNG NGHỆ</p>
                <p className="text-2xl font-bold text-blue-900 leading-tight mb-1 uppercase">
                  TRƯỜNG CAO ĐẲNG THÔNG TIN VÀ TRUYỀN THÔNG
                </p>
                <p className="text-sm text-gray-600 uppercase">COLLEGE OF INFORMATION AND COMMUNICATIONS</p>
              </Link>
            </div>

            {/* Spacer for Balance - Right Side */}
            <div className="flex-shrink-0 w-32"></div>
          </div>

          {/* Mobile Layout - Vertical Stack */}
          <div className="md:hidden flex flex-col items-center justify-center py-3">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 mb-2">
              <Image
                src="/images/logo.png"
                alt="Logo Trường Cao đẳng Thông tin và Truyền thông"
                width={120}
                height={120}
                className="w-24 h-24 object-contain"
              />
            </Link>

            {/* School Name - Compact on Mobile */}
            <Link href="/" className="text-center">
              <p className="text-xs text-blue-900 leading-tight mb-0.5 uppercase font-medium">BỘ KHOA HỌC VÀ CÔNG NGHỆ</p>
              <p className="text-sm font-bold text-blue-900 leading-tight mb-0.5 uppercase">
                TRƯỜNG CAO ĐẲNG THÔNG TIN VÀ TRUYỀN THÔNG
              </p>
              <p className="text-xs text-gray-600 uppercase">COLLEGE OF INFORMATION AND COMMUNICATIONS</p>
            </Link>
          </div>
        </div>
      </div>



      {/* Navigation Section */}
      <div className="shadow-lg relative z-40" style={{ backgroundColor: '#1e3a8a' }}>
        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <div className="container mx-auto px-4">
            <nav className="flex items-center justify-center space-x-1 py-4">
              <Link
                href="/"
                className="px-4 py-3 text-white hover:bg-yellow-500 hover:text-blue-900 font-semibold transition-colors rounded"
              >
                TRANG CHỦ
              </Link>
              <div className="relative group">
                <Link
                  href=""
                  className="flex items-center space-x-1 px-4 py-3 text-white hover:bg-yellow-500 hover:text-blue-900 font-semibold transition-colors rounded"
                >
                  <span>GIỚI THIỆU</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-lg border border-gray-200 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  {/* Giới thiệu chung - Menu cấp 2 với submenu cấp 3 */}
                  <div className="relative group/sub">
                    <div className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm cursor-pointer">
                      <span>Giới thiệu chung</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    {/* Submenu cấp 3 cho Giới thiệu chung */}
                    <div className="absolute left-full top-0 w-64 bg-white shadow-xl rounded-lg border border-gray-200 py-2 ml-1 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 z-[60]">
                      <Link href="/lich-su-hinh-thanh" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                        Lịch sử hình thành
                      </Link>
                      <Link href="/co-so-vat-chat" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                        Cơ sở vật chất
                      </Link>
                      <Link href="/su-menh-tam-nhin" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                        Sứ Mệnh Tầm Nhìn
                      </Link>
                    </div>
                  </div>

                  {/* Cơ cấu tổ chức - Menu cấp 2 với submenu cấp 3 */}
                  <div className="relative group/sub">
                    <div className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm cursor-pointer">
                      <span>Cơ cấu tổ chức</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    {/* Submenu cấp 3 cho Cơ cấu tổ chức */}
                    <div className="absolute left-full top-0 w-64 bg-white shadow-xl rounded-lg border border-gray-200 py-2 ml-1 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 z-[60]">
                      <Link href="/ban-giam-hieu" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                        Ban Giám hiệu
                      </Link>
                      <Link href="/phong-to-chuc-hanh-chinh" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                        Phòng Tổ chức hành chính
                      </Link>
                      <Link href="/phong-quan-ly-dao-tao" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                        Phòng Quản lý Đào tạo
                      </Link>
                      <Link href="/phong-ke-hoach-tai-chinh" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                        Phòng Kế hoạch tài chính
                      </Link>
                      <Link href="/phong-cong-nghe-so" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                        Phòng Công nghệ số
                      </Link>
                      <Link href="/phong-cong-nghe-thong-tin" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                        Khoa Công nghệ thông tin
                      </Link>
                      <Link href="/phong-cong-nghe-in" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                        Khoa Công nghệ in
                      </Link>
                      <Link href="/khoa-khoa-hoc-dai-cuong" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                        Khoa Khoa học đại cương
                      </Link>
                    </div>
                  </div>

                  {/* Ba Công Khai - Direct link */}
                  <Link href="/ba-cong-khai" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Ba Công Khai
                  </Link>
                </div>
              </div>
              <div className="relative group">
                <Link
                  href=""
                  className="flex items-center space-x-1 px-4 py-3 text-white hover:bg-yellow-500 hover:text-blue-900 font-semibold transition-colors rounded"
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
                    Đăng ký xét tuyển và tư vấn
                  </Link>
                  <Link href="/ho-so-nhap-hoc" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Hồ sơ nhập học
                  </Link>
                </div>
              </div>
              <div className="relative group">
                <Link
                  href=""
                  className="flex items-center space-x-1 px-4 py-3 text-white hover:bg-yellow-500 hover:text-blue-900 font-semibold transition-colors rounded"
                >
                  <span>ĐÀO TẠO</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-lg border border-gray-200 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link href="/ke-hoach-dao-tao" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Kế hoạch đào tạo
                  </Link>
                  <Link href="/quy-che-dao-tao" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Quy chế đào tạo
                  </Link>
                  <Link href="/cong-tac-hssv" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Công tác HSSV
                  </Link>
                  <Link href="/van-bang" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Văn bằng
                  </Link>
                  <Link href="/nghien-cuu-khoa-hoc" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Nghiên cứu khoa học
                  </Link>
                </div>
              </div>
              <div className="relative group">
                <Link
                  href="/sinh-vien"
                  className="flex items-center space-x-1 px-4 py-3 text-white hover:bg-yellow-500 hover:text-blue-900 font-semibold transition-colors rounded"
                >
                  <span>SINH VIÊN</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                {/* <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-lg border border-gray-200 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
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
                </div> */}
              </div>
              <div className="relative group">
                <Link
                  href=""
                  className="flex items-center space-x-1 px-4 py-3 text-white hover:bg-yellow-500 hover:text-blue-900 font-semibold transition-colors rounded"
                >
                  <span>HỢP TÁC</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-lg border border-gray-200 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link href="/tuyen-dung" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Tuyển dụng
                  </Link>
                  <Link href="/du-hoc" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Du học
                  </Link>
                  <Link href="/hop-tac-dao-tao" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Hợp tác đào tạo
                  </Link>
                  <Link href="/hop-tac-cac-khoa-hoc-cong-nghe" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Hợp tác các khoa học công nghệ
                  </Link>
                  <Link href="/hop-tac-quoc-te" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Hợp tác quốc tế
                  </Link>
                </div>
              </div>
              <div className="relative group">
                <Link
                  href="/tin-tuc"
                  className="flex items-center space-x-1 px-4 py-3 text-white hover:bg-yellow-500 hover:text-blue-900 font-semibold transition-colors rounded"
                >
                  <span>TIN TỨC</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-lg border border-gray-200 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link href="/tin-noi-bat" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Tin nổi bật
                  </Link>
                  <Link href="/tin-tuc-khac" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Thông tin khác
                  </Link>
                </div>
              </div>
              <div className="relative group">
                <Link
                  href=""
                  className="flex items-center space-x-1 px-4 py-3 text-white hover:bg-yellow-500 hover:text-blue-900 font-semibold transition-colors rounded"
                >
                  <span>CHUYỂN ĐỔI SỐ</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-lg border border-gray-200 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link href="/chuong-trinh-dao-tao" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Chương trình đào tạo
                  </Link>
                  <Link href="/hoc-truc-tuyen" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Học trực tuyến
                  </Link>
                  <Link href="/hoc-lieu" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Học liệu
                  </Link>
                  <Link href="/cong-nghe-so" className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors text-sm">
                    Công nghệ số
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <h2 className="text-white font-semibold text-base">Danh Sách Menu</h2>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white p-2 hover:bg-blue-600 rounded transition-colors"
                aria-label="Mở menu điều hướng trên thiết bị di động"
                aria-expanded={mobileMenuOpen}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Mobile Menu Component */}
            <MobileMenu
              isOpen={mobileMenuOpen}
              onClose={() => setMobileMenuOpen(false)}
            />
          </div>
        </div>
      </div>


    </header>
  );
};

export default Header;
