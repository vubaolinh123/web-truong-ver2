'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  GraduationCap,
  BarChart3,
  Settings,
  Calendar,
  MessageSquare,
  Image as ImageIcon,
  FolderOpen,
  X
} from 'lucide-react';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  const menuItems = [
    {
      title: 'Bảng điều khiển',
      href: '/admin',
      icon: LayoutDashboard,
      description: 'Tổng quan hệ thống'
    },
    {
      title: 'Đăng ký sinh viên',
      href: '/admin/register',
      icon: GraduationCap,
      description: 'Quản lý đăng ký tuyển sinh'
    },
    {
      title: 'Bài viết',
      href: '/admin/articles',
      icon: FileText,
      description: 'Quản lý bài viết & tin tức'
    },
    {
      title: 'Danh mục',
      href: '/admin/categories',
      icon: FolderOpen,
      description: 'Sắp xếp nội dung'
    },
    {
      title: 'Quản lý Hình ảnh',
      href: '/admin/media',
      icon: ImageIcon,
      description: 'Tải lên & duyệt file'
    }
  ];

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-30 h-screen bg-gradient-to-b from-blue-600 via-blue-700 to-blue-800 border-r border-blue-500/20 transition-all duration-300 ease-in-out shadow-2xl
        ${isOpen ? 'w-64' : 'w-16'}
        lg:fixed lg:top-0 lg:left-0 lg:h-screen
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        overflow-hidden backdrop-blur-sm
      `}>
        {/* Header Space - Matches header height to prevent overlap */}
        <div className="h-16 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 border-b border-blue-500/20"></div>
        {/* Close Button (Mobile) - Positioned in header space */}
        <div className="lg:hidden absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            className="p-2.5 rounded-xl text-yellow-100 hover:text-yellow-300 hover:bg-blue-600/50 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="px-3 py-4 space-y-1.5 overflow-y-auto h-[calc(100vh-4rem)] scrollbar-thin scrollbar-thumb-blue-400/50 scrollbar-track-blue-800/30">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center px-3 py-3 rounded-xl transition-all duration-300 ease-in-out group relative overflow-hidden
                  ${active
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-300 text-blue-900 shadow-lg transform scale-105'
                    : 'text-yellow-100 hover:bg-blue-600/40 hover:text-yellow-200 hover:scale-105 hover:shadow-md'
                  }
                  ${isOpen ? 'justify-start' : 'justify-center lg:justify-start'}
                `}
                onClick={() => {
                  // Close sidebar on mobile when item is clicked
                  if (window.innerWidth < 1024) {
                    onClose();
                  }
                }}
              >
                {/* Background glow effect for active items */}
                {active && (
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-300/20 rounded-xl blur-sm"></div>
                )}

                <Icon
                  size={20}
                  className={`flex-shrink-0 transition-all duration-300 relative z-10 ${
                    active
                      ? 'text-blue-900'
                      : 'text-yellow-200 group-hover:text-yellow-100 group-hover:scale-110'
                  }`}
                />
                
                {isOpen && (
                  <div className="ml-3 flex-1 min-w-0 relative z-10">
                    <p className={`text-sm font-semibold truncate transition-colors duration-300 ${
                      active ? 'text-blue-900' : 'text-yellow-100 group-hover:text-yellow-50'
                    }`}>
                      {item.title}
                    </p>
                    <p className={`text-xs truncate transition-colors duration-300 ${
                      active ? 'text-blue-700' : 'text-yellow-200/80 group-hover:text-yellow-200'
                    }`}>
                      {item.description}
                    </p>
                  </div>
                )}

                {!isOpen && (
                  <div className="absolute left-16 bg-gray-900/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50 whitespace-nowrap shadow-xl border border-gray-700">
                    <div className="font-medium">{item.title}</div>
                    <div className="text-xs text-gray-300 mt-0.5">{item.description}</div>
                    {/* Tooltip arrow */}
                    <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45 border-l border-b border-gray-700"></div>
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
