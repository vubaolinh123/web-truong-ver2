"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Users, PhoneCall, Mail } from 'lucide-react';

const departments = [
  { name: 'Phòng Đào tạo', phone: '+84-24-3123-1111', email: 'daotao@vcic.edu.vn' },
  { name: 'Phòng Tuyển sinh', phone: '+84-24-3123-2222', email: 'tuyensinh@vcic.edu.vn' },
  { name: 'Phòng Công tác SV', phone: '+84-24-3123-3333', email: 'sinhvien@vcic.edu.vn' },
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
              <div className="flex items-center gap-2"><PhoneCall className="text-blue-700" /> {d.phone}</div>
              <div className="flex items-center gap-2"><Mail className="text-blue-700" /> {d.email}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default DepartmentContacts;

