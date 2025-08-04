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
      title: 'Bảng Điều Khiển',
      href: '/admin',
      icon: LayoutDashboard,
      description: 'Tổng Quan & Phân Tích'
    },
    {
      title: 'Sinh Viên',
      href: '/admin/students',
      icon: Users,
      description: 'Quản Lý Sinh Viên'
    },
    {
      title: 'Giảng Viên',
      href: '/admin/faculty',
      icon: GraduationCap,
      description: 'Giảng Viên & Nhân Viên'
    },
    {
      title: 'Chương Trình',
      href: '/admin/programs',
      icon: BookOpen,
      description: 'Chương Trình Học Tập'
    },
    {
      title: 'Tin Tức & Sự Kiện',
      href: '/admin/news',
      icon: FileText,
      description: 'Quản Lý Nội Dung'
    },
    {
      title: 'Tuyển Sinh',
      href: '/admin/admissions',
      icon: Calendar,
      description: 'Quy Trình Tuyển Sinh'
    },
    {
      title: 'Phân Tích',
      href: '/admin/analytics',
      icon: BarChart3,
      description: 'Báo Cáo & Thống Kê'
    },
    {
      title: 'Phương Tiện',
      href: '/admin/media',
      icon: ImageIcon,
      description: 'Quản Lý Hình Ảnh & File'
    },
    {
      title: 'Tin Nhắn',
      href: '/admin/messages',
      icon: MessageSquare,
      description: 'Liên Lạc'
    },
    {
      title: 'Cài Đặt',
      href: '/admin/settings',
      icon: Settings,
      description: 'Cấu Hình Hệ Thống'
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
        fixed top-16 left-0 z-30 h-[calc(100vh-4rem)] bg-blue-600 border-r border-blue-500 transition-all duration-300
        ${isOpen ? 'w-64' : 'w-16'}
        lg:relative lg:top-0 lg:h-[calc(100vh-4rem)]
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Close Button (Mobile) */}
        <div className="lg:hidden flex justify-end p-4">
          <button
            onClick={onClose}
            className="p-2 rounded-md text-yellow-300 hover:text-yellow-400 hover:bg-blue-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="px-3 py-4 space-y-2 overflow-y-auto h-full">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex items-center px-3 py-3 rounded-lg transition-all duration-200 group
                  ${active 
                    ? 'bg-yellow-400 text-blue-900 shadow-md' 
                    : 'text-yellow-300 hover:bg-blue-700 hover:text-yellow-400'
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
                <Icon 
                  size={20} 
                  className={`flex-shrink-0 ${active ? 'text-blue-900' : ''}`} 
                />
                
                {isOpen && (
                  <div className="ml-3 flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${
                      active ? 'text-blue-900' : ''
                    }`}>
                      {item.title}
                    </p>
                    <p className={`text-xs truncate ${
                      active ? 'text-blue-700' : 'text-yellow-200'
                    }`}>
                      {item.description}
                    </p>
                  </div>
                )}
                
                {!isOpen && (
                  <div className="absolute left-16 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 whitespace-nowrap">
                    {item.title}
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
