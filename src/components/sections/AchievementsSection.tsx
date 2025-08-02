'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy, Star, Target } from 'lucide-react';

const AchievementsSection = () => {
  const achievements = [
    {
      icon: <Award size={40} />,
      title: 'Kiểm định chất lượng',
      description: 'Đạt chuẩn kiểm định chất lượng giáo dục quốc gia',
      year: '2023',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Trophy size={40} />,
      title: 'Top 100 trường ĐH',
      description: 'Xếp hạng trong top 100 trường đại học hàng đầu Việt Nam',
      year: '2024',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: <Star size={40} />,
      title: '5 sao QS Stars',
      description: 'Đạt chứng nhận 5 sao về chất lượng giáo dục từ QS',
      year: '2024',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: <Target size={40} />,
      title: 'Nghiên cứu xuất sắc',
      description: 'Hơn 500 công trình nghiên cứu khoa học được công bố',
      year: '2024',
      color: 'from-green-500 to-green-600'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary-blue rounded-full animate-float"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-primary-yellow rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent-blue rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 uppercase"
          >
            THÀNH TỰU NỔI BẬT
          </motion.h2>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 card-hover">
                {/* Icon */}
                <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r ${achievement.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                  {achievement.icon}
                </div>

                {/* Year Badge */}
                <div className="inline-block bg-primary-yellow text-white px-3 py-1 rounded-full text-sm font-semibold mb-3">
                  {achievement.year}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary-blue transition-colors duration-300">
                  {achievement.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {achievement.description}
                </p>

                {/* Decorative line */}
                <div className="w-12 h-1 bg-gradient-to-r from-primary-blue to-primary-yellow mx-auto mt-4 rounded-full group-hover:w-16 transition-all duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-primary-blue to-primary-yellow rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Tham gia cùng chúng tôi
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Hãy trở thành một phần của cộng đồng học thuật xuất sắc và cùng tạo nên những thành tựu mới
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary-blue px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300"
              >
                Tìm hiểu tuyển sinh
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-primary-blue transition-all duration-300"
              >
                Liên hệ tư vấn
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AchievementsSection;
