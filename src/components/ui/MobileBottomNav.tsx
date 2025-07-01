'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  BookOpen, 
  Users, 
  Phone, 
  Menu 
} from 'lucide-react';
import { motion } from 'framer-motion';

const MobileBottomNav = () => {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/',
      icon: Home,
      label: 'Trang chủ'
    },
    {
      href: '/dao-tao',
      icon: BookOpen,
      label: 'Đào tạo'
    },
    {
      href: '/sinh-vien',
      icon: Users,
      label: 'Sinh viên'
    },
    {
      href: '/lien-he',
      icon: Phone,
      label: 'Liên hệ'
    },
    {
      href: '/menu',
      icon: Menu,
      label: 'Menu'
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center py-2 px-3 min-w-0 flex-1"
            >
              <motion.div
                className={`flex flex-col items-center ${
                  isActive ? 'text-primary-blue' : 'text-gray-500'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <div className={`p-1 rounded-lg ${
                  isActive ? 'bg-primary-blue/10' : ''
                }`}>
                  <Icon size={20} />
                </div>
                <span className="text-xs mt-1 font-medium truncate">
                  {item.label}
                </span>
              </motion.div>
              
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-primary-blue rounded-b-full"
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
