'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu, User, LogOut, Settings, Bell, ChevronDown } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface AdminHeaderProps {
  onMenuClick: () => void;
  sidebarOpen: boolean;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuClick, sidebarOpen }) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationCount] = useState(3); // Mock notification count
  const { user, logout } = useAuth();
  const router = useRouter();
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Force redirect even if logout API fails
      router.push('/admin/login');
    }
  };

  const getUserDisplayName = () => {
    if (!user) return 'Quản Trị Viên';
    return `${user.firstName} ${user.lastName}`.trim() || user.username;
  };

  const getUserRole = () => {
    if (!user) return 'Người Quản Trị';
    switch (user.role) {
      case 'admin':
        return 'Quản Trị Viên';
      case 'faculty':
        return 'Giảng Viên';
      case 'student':
        return 'Sinh Viên';
      default:
        return 'Người Dùng';
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 backdrop-blur-sm shadow-xl fixed top-0 left-0 right-0 z-40 w-full border-b border-blue-500/20">
      {/* Background Extension - Ensures full viewport width coverage */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 w-screen left-1/2 transform -translate-x-1/2"></div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-full">
        <div className="flex items-center justify-between h-16">
          {/* Left Section - Logo and Menu */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <button
              onClick={onMenuClick}
              className="p-2.5 rounded-xl text-yellow-100 hover:text-yellow-300 hover:bg-blue-600/50 transition-all duration-200 hover:scale-105 active:scale-95 lg:hidden"
            >
              <Menu size={24} />
            </button>

            {/* Desktop Menu Button */}
            <button
              onClick={onMenuClick}
              className="hidden lg:block p-2.5 rounded-xl text-yellow-100 hover:text-yellow-300 hover:bg-blue-600/50 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <Menu size={20} />
            </button>

            {/* Logo and Title */}
            <Link href="/admin" className="flex items-center space-x-3 group">
              <div className="relative">
                <Image
                  src="/images/logo.png"
                  alt="University Logo"
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain transition-transform duration-200 group-hover:scale-110 drop-shadow-lg"
                />
                <div className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-yellow-100 group-hover:text-yellow-200 transition-colors duration-200">
                  Bảng Điều Khiển Quản Trị
                </h1>
                <p className="text-xs text-yellow-200/80 group-hover:text-yellow-200 transition-colors duration-200">
                  Trường Cao đẳng Thông tin và Truyền thông
                </p>
              </div>
            </Link>
          </div>

          {/* Right Section - Notifications and User Menu */}
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <button className="relative p-2.5 rounded-xl text-yellow-100 hover:text-yellow-300 hover:bg-blue-600/50 transition-all duration-200 hover:scale-105 active:scale-95">
              <Bell size={20} />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse shadow-lg">
                  {notificationCount}
                </span>
              )}
            </button>

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-3 p-2.5 rounded-xl text-yellow-100 hover:text-yellow-300 hover:bg-blue-600/50 transition-all duration-200 hover:scale-105 active:scale-95 group"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg ring-2 ring-yellow-300/30 group-hover:ring-yellow-300/50 transition-all duration-200">
                  {user?.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={getUserDisplayName()}
                      width={36}
                      height={36}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                  ) : (
                    <User size={20} className="text-blue-700" />
                  )}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-yellow-100 group-hover:text-yellow-200 transition-colors duration-200">{getUserDisplayName()}</p>
                  <p className="text-xs text-yellow-200/80 group-hover:text-yellow-200 transition-colors duration-200">{getUserRole()}</p>
                </div>
                <ChevronDown size={16} className="hidden sm:block text-yellow-200/60 group-hover:text-yellow-200 transition-all duration-200 group-hover:rotate-180" />
              </button>

              {/* User Dropdown Menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl py-2 z-50 border border-gray-200/50 animate-in slide-in-from-top-2 duration-200">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-100/50">
                    <p className="text-sm font-semibold text-gray-900">{getUserDisplayName()}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                    <p className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-full inline-block mt-1">{getUserRole()}</p>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    <Link
                      href="/admin/profile"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <User size={18} className="mr-3 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" />
                      <span className="font-medium">Cài Đặt Hồ Sơ</span>
                    </Link>
                    <Link
                      href="/admin/settings"
                      className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Settings size={18} className="mr-3 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" />
                      <span className="font-medium">Cài Đặt Hệ Thống</span>
                    </Link>
                  </div>

                  <hr className="my-1 border-gray-100" />

                  <div className="py-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 group"
                    >
                      <LogOut size={18} className="mr-3 text-red-400 group-hover:text-red-600 transition-colors duration-200" />
                      <span className="font-medium">Đăng Xuất</span>
                    </button>
                  </div>
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
