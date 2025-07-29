'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Users, BookOpen, Award } from 'lucide-react';
import { motion } from 'framer-motion';

// Utility function to format numbers consistently across server and client
const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

interface Faculty {
  id: number;
  name: string;
  description: string;
  image: string;
  students: number;
  programs: number;
  achievements: number;
  color: string;
  href: string;
}

const FacultiesSection = () => {
  const faculties: Faculty[] = [
    {
      id: 1,
      name: 'Khoa Kinh tế',
      description: 'Đào tạo các chuyên ngành kinh tế, quản trị kinh doanh, kế toán với chương trình hiện đại và thực tiễn.',
      image: '/images/faculty-economics.svg',
      students: 3500,
      programs: 8,
      achievements: 15,
      color: 'from-blue-500 to-blue-600',
      href: '/khoa-kinh-te'
    },
    {
      id: 2,
      name: 'Khoa Môi trường',
      description: 'Chuyên đào tạo về khoa học môi trường, quản lý môi trường và công nghệ xử lý môi trường.',
      image: '/images/faculty-environment.svg',
      students: 2800,
      programs: 6,
      achievements: 12,
      color: 'from-green-500 to-green-600',
      href: '/khoa-moi-truong'
    },
    {
      id: 3,
      name: 'Khoa Quản lý đất đai',
      description: 'Đào tạo chuyên ngành quản lý đất đai, định giá đất đai và quy hoạch sử dụng đất.',
      image: '/images/faculty-general.svg',
      students: 2200,
      programs: 5,
      achievements: 10,
      color: 'from-yellow-500 to-yellow-600',
      href: '/khoa-quan-ly-dat-dai'
    },
    {
      id: 4,
      name: 'Khoa Công nghệ thông tin',
      description: 'Đào tạo các chuyên ngành CNTT hiện đại: phần mềm, mạng máy tính, an toàn thông tin.',
      image: '/images/faculty-it.svg',
      students: 4200,
      programs: 7,
      achievements: 18,
      color: 'from-purple-500 to-purple-600',
      href: '/khoa-cntt'
    },
    {
      id: 5,
      name: 'Khoa Địa chất',
      description: 'Chuyên đào tạo về địa chất học, thăm dò khoáng sản và địa chất công trình.',
      image: '/images/faculty-general.svg',
      students: 1800,
      programs: 4,
      achievements: 8,
      color: 'from-orange-500 to-orange-600',
      href: '/khoa-dia-chat'
    },
    {
      id: 6,
      name: 'Khoa Tài nguyên nước',
      description: 'Đào tạo về quản lý tài nguyên nước, thủy văn và kỹ thuật cấp thoát nước.',
      image: '/images/faculty-environment.svg',
      students: 1500,
      programs: 4,
      achievements: 7,
      color: 'from-cyan-500 to-cyan-600',
      href: '/khoa-tai-nguyen-nuoc'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
          >
            Các ngành nghề đào tạo
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Khám phá các ngành nghề đào tạo với chương trình học hiện đại, đội ngũ giảng viên giàu kinh nghiệm
            và cơ sở vật chất tiên tiến phục vụ nhu cầu thị trường lao động
          </motion.p>
        </div>

        {/* Faculties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {faculties.map((faculty, index) => (
            <motion.div
              key={faculty.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Image */}
                <div className="relative overflow-hidden">
                  <Image
                    src={faculty.image}
                    alt={faculty.name}
                    width={400}
                    height={192}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${faculty.color} opacity-80`}></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{faculty.name}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {faculty.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="flex justify-center mb-1">
                        <Users size={20} className="text-primary-blue" />
                      </div>
                      <div className="text-lg font-bold text-gray-800">{formatNumber(faculty.students)}</div>
                      <div className="text-xs text-gray-500">Sinh viên</div>
                    </div>
                    <div className="text-center">
                      <div className="flex justify-center mb-1">
                        <BookOpen size={20} className="text-primary-yellow" />
                      </div>
                      <div className="text-lg font-bold text-gray-800">{faculty.programs}</div>
                      <div className="text-xs text-gray-500">Chương trình</div>
                    </div>
                    <div className="text-center">
                      <div className="flex justify-center mb-1">
                        <Award size={20} className="text-accent-blue" />
                      </div>
                      <div className="text-lg font-bold text-gray-800">{faculty.achievements}</div>
                      <div className="text-xs text-gray-500">Thành tựu</div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={faculty.href}
                    className="inline-flex items-center space-x-2 text-primary-blue hover:text-primary-yellow font-semibold transition-colors group-hover:translate-x-1 duration-300"
                  >
                    <span>Tìm hiểu thêm</span>
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/cac-nganh-nghe-dao-tao"
            className="inline-flex items-center space-x-2 bg-primary-blue text-white px-8 py-3 rounded-full font-semibold hover:bg-primary-yellow transition-colors duration-300 transform hover:scale-105"
          >
            <span>Xem tất cả ngành nghề đào tạo</span>
            <ArrowRight size={20} />
          </Link>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Đào tạo chất lượng cao
              </h3>
              <p className="text-gray-600 mb-6">
                Các khoa của trường đều được trang bị cơ sở vật chất hiện đại, 
                phòng thí nghiệm tiên tiến và đội ngũ giảng viên có trình độ cao, 
                đảm bảo chất lượng đào tạo đáp ứng nhu cầu xã hội.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-primary-blue">100%</div>
                  <div className="text-sm text-gray-600">Giảng viên có bằng thạc sĩ trở lên</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-primary-yellow">95%</div>
                  <div className="text-sm text-gray-600">Sinh viên hài lòng với chất lượng đào tạo</div>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Image
                src="/images/quality-education.svg"
                alt="Đào tạo chất lượng cao"
                width={500}
                height={400}
                className="rounded-lg shadow-lg mx-auto"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FacultiesSection;
