"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, PhoneCall, Mail, Clock } from 'lucide-react';

const ContactInfo: React.FC = () => {
  return (
    <section aria-labelledby="contact-info-title">
      <h2 id="contact-info-title" className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Thông tin liên hệ</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35 }}
          className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <MapPin className="text-blue-700" />
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Địa chỉ</h3>
              <p className="text-slate-600">36 Cầu Diễn, Phường Phú Diễn, Hà Nội</p>
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35 }}
          className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <PhoneCall className="text-blue-700" />
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Điện thoại</h3>
              <p className="text-slate-600">+84-24-3123-4567 (Phòng Hành chính)</p>
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35 }}
          className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <Mail className="text-blue-700" />
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Email</h3>
              <p className="text-slate-600">vanthu.caodangcong</p>
              <p className="text-slate-600">nghiepin@gmail.com</p>
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35 }}
          className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <Clock className="text-blue-700" />
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Giờ làm việc</h3>
              <p className="text-slate-600">Thứ 2 - Thứ 6: 08:00 - 17:00</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactInfo;

