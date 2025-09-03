"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Users, PhoneCall, Mail } from 'lucide-react';

const departments = [
  { name: 'Phòng đào tạo', phone: '', email: '' },
  { name: 'Phòng công nghệ số', phone: '0914852086', email: 'cns1.cic@gmail.com' },
  { name: 'Phòng tổ chức hành chính', phone: '', email: '' },
];

const DepartmentContacts: React.FC = () => {
  return (
    <section aria-labelledby="department-contacts-title">
      <h2 id="department-contacts-title" className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Liên hệ phòng ban</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {departments.map((d, i) => (
          <motion.div
            key={d.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-slate-900">{d.name}</h3>
            <div className="mt-2 text-slate-700">
              {d.phone && (
                <div className="flex items-center gap-2"><PhoneCall className="text-blue-700" /> {d.phone}</div>
              )}
              {d.email && (
                <div className="flex items-center gap-2"><Mail className="text-blue-700" /> {d.email}</div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default DepartmentContacts;

