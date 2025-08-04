'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, User, LogOut, Settings, Bell } from 'lucide-react';

interface AdminHeaderProps {
  onMenuClick: () => void;
  sidebarOpen: boolean;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuClick, sidebarOpen }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <header className="bg-blue-600 shadow-lg relative z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section - Logo and Menu */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <button
              onClick={onMenuClick}
              className="p-2 rounded-md text-yellow-300 hover:text-yellow-400 hover:bg-blue-700 transition-colors lg:hidden"
            >
              <Menu size={24} />
            </button>
            
            {/* Desktop Menu Button */}
            <button
              onClick={onMenuClick}
              className="hidden lg:block p-2 rounded-md text-yellow-300 hover:text-yellow-400 hover:bg-blue-700 transition-colors"
            >
              <Menu size={20} />
            </button>

            {/* Logo and Title */}
            <Link href="/admin" className="flex items-center space-x-3">
              <Image
                src="/images/logo.png"
                alt="University Logo"
                width={40}
                height={40}
                className="w-10 h-10 object-contain"
              />
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-yellow-300">
                  Bảng Điều Khiển Quản Trị
                </h1>
                <p className="text-xs text-yellow-200">
                  Trường Cao đẳng Thông tin và Truyền thông
                </p>
              </div>
            </Link>
          </div>

          {/* Right Section - Notifications and User Menu */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="p-2 rounded-md text-yellow-300 hover:text-yellow-400 hover:bg-blue-700 transition-colors relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-3 p-2 rounded-md text-yellow-300 hover:text-yellow-400 hover:bg-blue-700 transition-colors"
              >
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <User size={18} className="text-blue-600" />
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium">Quản Trị Viên</p>
                  <p className="text-xs text-yellow-200">Người Quản Trị</p>
                </div>
              </button>

              {/* User Dropdown Menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <Link
                    href="/admin/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <User size={16} className="mr-3" />
                    Cài Đặt Hồ Sơ
                  </Link>
                  <Link
                    href="/admin/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <Settings size={16} className="mr-3" />
                    Cài Đặt Hệ Thống
                  </Link>
                  <hr className="my-1" />
                  <button
                    onClick={() => {
                      // Handle logout logic here
                      console.log('Logout clicked');
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={16} className="mr-3" />
                    Đăng Xuất
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
