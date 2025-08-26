'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  ArrowUp, 
  X,
  Plus
} from 'lucide-react';

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const actions = [
    {
      icon: <MessageCircle size={20} />,
      label: 'Chat hỗ trợ',
      color: 'bg-green-500 hover:bg-green-600',
      action: () => console.log('Open chat')
    },
    {
      icon: <Phone size={20} />,
      label: 'Gọi điện',
      color: 'bg-blue-500 hover:bg-blue-600',
      action: () => window.open('tel:0902130130')
    },
    {
      icon: <Mail size={20} />,
      label: 'Email',
      color: 'bg-purple-500 hover:bg-purple-600',
      action: () => window.open('mailto:DHTNMT@hunre.edu.vn')
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="mb-4 w-12 h-12 bg-primary-blue hover:bg-primary-yellow rounded-full flex items-center justify-center text-white shadow-lg transition-colors duration-300"
            aria-label="Cuộn lên đầu trang"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Action Buttons */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mb-4 space-y-3"
          >
            {actions.map((action, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: 50, scale: 0 }}
                animate={{ 
                  opacity: 1, 
                  x: 0, 
                  scale: 1,
                  transition: { delay: index * 0.1 }
                }}
                exit={{ 
                  opacity: 0, 
                  x: 50, 
                  scale: 0,
                  transition: { delay: (actions.length - index - 1) * 0.1 }
                }}
                onClick={action.action}
                className={`w-12 h-12 ${action.color} rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 group relative`}
                aria-label={action.label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {action.icon}

                {/* Tooltip */}
                <div className="absolute right-full mr-3 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  {action.label}
                  <div className="absolute top-1/2 left-full transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary-yellow hover:bg-secondary-yellow rounded-full flex items-center justify-center text-white shadow-lg transition-colors duration-300"
        aria-label={isOpen ? 'Đóng menu hành động' : 'Mở menu hành động'}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
      >
        {isOpen ? <X size={24} /> : <Plus size={24} />}
      </motion.button>

      {/* Background Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 -z-10"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingActionButton;
