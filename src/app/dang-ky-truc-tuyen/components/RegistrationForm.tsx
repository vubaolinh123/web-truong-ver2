"use client";

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, User, Phone as PhoneIcon, Link2 } from 'lucide-react';

interface FormState {
  email: string;
  name: string;
  phone: string;
  program: string;
  facebook?: string;
}

interface FormErrors {
  email?: string;
  name?: string;
  phone?: string;
  program?: string;
  facebook?: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const vnPhoneRegex = /^(\+84|0)(\d{9}|\d-\d{3}-\d{3}-\d{3}|\d{2}-\d{3}-\d{4})$/; // simple flexible
const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[^\s]*)?$/i;

const programs = [
  'Công nghệ thông tin',
  'An toàn thông tin',
  'Thiết kế đồ họa & Truyền thông số',
  'Mạng máy tính và Truyền thông dữ liệu',
  'Quản trị mạng và Bảo mật thông tin',
  'Lập trình ứng dụng di động',
  'Trí tuệ nhân tạo và Học máy',
  'Thương mại điện tử',
];

const RegistrationForm: React.FC = () => {
  const [form, setForm] = useState<FormState>({ email: '', name: '', phone: '', program: '', facebook: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<keyof FormState, boolean>>({ email: false, name: false, phone: false, program: false, facebook: false });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const validate = (values: FormState): FormErrors => {
    const e: FormErrors = {};
    if (!values.email.trim()) e.email = 'Vui lòng nhập email';
    else if (!emailRegex.test(values.email)) e.email = 'Email không hợp lệ';

    if (!values.name.trim()) e.name = 'Vui lòng nhập họ và tên';
    else if (values.name.trim().length < 2) e.name = 'Họ và tên quá ngắn';

    if (!values.phone.trim()) e.phone = 'Vui lòng nhập số điện thoại';
    else if (!vnPhoneRegex.test(values.phone.replaceAll(' ', ''))) e.phone = 'Số điện thoại không hợp lệ';

    if (!values.program.trim()) e.program = 'Vui lòng chọn ngành học';

    if (values.facebook && values.facebook.trim() && !urlRegex.test(values.facebook)) e.facebook = 'URL Facebook không hợp lệ';

    return e;
  };

  const liveErrors = useMemo(() => validate(form), [form]);
  const markTouched = (field: keyof FormState) => setTouched(prev => ({ ...prev, [field]: true }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, name: true, phone: true, program: true, facebook: true });

    const eNow = validate(form);
    setErrors(eNow);
    if (Object.keys(eNow).length > 0) {
      setStatus('error');
      return;
    }

    setStatus('submitting');
    try {
      await new Promise((r) => setTimeout(r, 1000)); // simulate
      setStatus('success');
      setForm({ email: '', name: '', phone: '', program: '', facebook: '' });
      setTouched({ email: false, name: false, phone: false, program: false, facebook: false });
    } catch {
      setStatus('error');
    }
  };

  const fieldState = (field: keyof FormState) => {
    const hasError = !!liveErrors[field];
    const showError = hasError && touched[field];
    return { hasError, showError };
  };

  const baseInput = 'peer w-full border rounded-xl px-10 py-3 bg-white placeholder-transparent transition outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600';
  const errorInput = 'border-red-500 focus:ring-red-500 focus:border-red-500';
  const successInput = 'border-green-500 focus:ring-green-500 focus:border-green-500';
  const labelBase = 'absolute left-10 top-1/2 -translate-y-1/2 text-slate-500 transition-all pointer-events-none peer-focus:-translate-y-4 peer-focus:text-xs peer-focus:text-blue-700';
  const labelFloated = ' -translate-y-4 text-xs';
  const groupBase = 'relative focus-within:shadow-md focus-within:shadow-blue-100 rounded-xl border transition-colors';

  const [programFocused, setProgramFocused] = useState(false);

  const emailState = fieldState('email');
  const nameState = fieldState('name');
  const phoneState = fieldState('phone');
  const programState = fieldState('program');
  const facebookState = fieldState('facebook');

  return (
    <section aria-labelledby="registration-form-title">
      <h2 id="registration-form-title" className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Biểu mẫu đăng ký</h2>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35 }}
        className="p-0.5 rounded-2xl bg-gradient-to-br from-blue-50 to-yellow-50"
        aria-label="Biểu mẫu đăng ký trực tuyến"
      >
        <div className="bg-white rounded-2xl p-6 shadow-sm grid grid-cols-1 gap-5">
          {/* Email */}
          <div className={`${groupBase} ${emailState.showError ? 'border-red-500' : 'border-slate-200'}`}>
            <motion.div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-700" whileFocus={{ scale: 1.1 }}>
              <Mail />
            </motion.div>
            <input
              id="reg-email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              onBlur={() => markTouched('email')}
              className={`${baseInput} ${emailState.showError ? errorInput : status === 'success' && !liveErrors.email ? successInput : ''}`}
              aria-required
              aria-invalid={emailState.showError}
              aria-describedby={emailState.showError ? 'reg-email-error' : undefined}
            />
            <label htmlFor="reg-email" className={`${labelBase} ${form.email ? labelFloated : ''}`}>Email</label>
            <AnimatePresence>
              {emailState.showError && (
                <motion.p id="reg-email-error" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="mt-1 px-2 text-sm text-red-600">
                  {liveErrors.email}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Name */}
          <div className={`${groupBase} ${nameState.showError ? 'border-red-500' : 'border-slate-200'}`}>
            <motion.div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-700" whileFocus={{ scale: 1.1 }}>
              <User />
            </motion.div>
            <input
              id="reg-name"
              type="text"
              placeholder="Họ và tên"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              onBlur={() => markTouched('name')}
              className={`${baseInput} ${nameState.showError ? errorInput : status === 'success' && !liveErrors.name ? successInput : ''}`}
              aria-required
              aria-invalid={nameState.showError}
              aria-describedby={nameState.showError ? 'reg-name-error' : undefined}
            />
            <label htmlFor="reg-name" className={`${labelBase} ${form.name ? labelFloated : ''}`}>Họ và tên</label>
            <AnimatePresence>
              {nameState.showError && (
                <motion.p id="reg-name-error" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="mt-1 px-2 text-sm text-red-600">
                  {liveErrors.name}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Phone */}
          <div className={`${groupBase} ${phoneState.showError ? 'border-red-500' : 'border-slate-200'}`}>
            <motion.div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-700" whileFocus={{ scale: 1.1 }}>
              <PhoneIcon />
            </motion.div>
            <input
              id="reg-phone"
              type="tel"
              inputMode="tel"
              placeholder="Số điện thoại"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              onBlur={() => markTouched('phone')}
              className={`${baseInput} ${phoneState.showError ? errorInput : status === 'success' && !liveErrors.phone ? successInput : ''}`}
              aria-required
              aria-invalid={phoneState.showError}
              aria-describedby={phoneState.showError ? 'reg-phone-error' : undefined}
            />
            <label htmlFor="reg-phone" className={`${labelBase} ${form.phone ? labelFloated : ''}`}>Số điện thoại</label>
            <AnimatePresence>
              {phoneState.showError && (
                <motion.p id="reg-phone-error" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="mt-1 px-2 text-sm text-red-600">
                  {liveErrors.phone}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Program */}
          <div className={`${groupBase} ${programState.showError ? 'border-red-500' : 'border-slate-200'}`}>
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-700" aria-hidden>🎓</div>
            <select
              id="reg-program"
              value={form.program}
              onChange={(e) => setForm({ ...form, program: e.target.value })}
              onFocus={() => setProgramFocused(true)}
              onBlur={() => { markTouched('program'); setProgramFocused(false); }}
              className="w-full border rounded-xl pl-10 pr-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
              aria-required
              aria-invalid={programState.showError}
              aria-describedby={programState.showError ? 'reg-program-error' : undefined}
            >
              <option value="">Chọn ngành học</option>
              {programs.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <label htmlFor="reg-program" className={`absolute left-10 top-1/2 text-slate-500 transition-all pointer-events-none ${(programFocused || form.program) ? '-translate-y-4 text-xs text-blue-700' : '-translate-y-1/2 opacity-0'}`}>Ngành học</label>
            <AnimatePresence>
              {programState.showError && (
                <motion.p id="reg-program-error" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="mt-1 px-2 text-sm text-red-600">
                  {liveErrors.program}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Facebook (optional) */}
          <div className={`${groupBase} ${facebookState.showError ? 'border-red-500' : 'border-slate-200'}`}>
            <motion.div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-700" whileFocus={{ scale: 1.1 }}>
              <Link2 />
            </motion.div>
            <input
              id="reg-facebook"
              type="url"
              placeholder="Link Facebook (tuỳ chọn)"
              value={form.facebook}
              onChange={(e) => setForm({ ...form, facebook: e.target.value })}
              onBlur={() => markTouched('facebook')}
              className={`${baseInput} ${facebookState.showError ? errorInput : status === 'success' && !liveErrors.facebook ? successInput : ''}`}
              aria-invalid={facebookState.showError}
              aria-describedby={facebookState.showError ? 'reg-facebook-error' : undefined}
            />
            <label htmlFor="reg-facebook" className={`${labelBase} ${form.facebook ? labelFloated : ''}`}>Link Facebook (tuỳ chọn)</label>
            <AnimatePresence>
              {facebookState.showError && (
                <motion.p id="reg-facebook-error" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="mt-1 px-2 text-sm text-red-600">
                  {liveErrors.facebook}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Submit */}
          <div className="flex items-center gap-3">
            <motion.button
              type="submit"
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
              disabled={status === 'submitting'}
              aria-busy={status === 'submitting'}
            >
              {status === 'submitting' ? 'Đang gửi...' : 'Gửi đăng ký'}
            </motion.button>

            <AnimatePresence>
              {status === 'success' && (
                <motion.span initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="text-green-700">Đã gửi đăng ký!</motion.span>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {status === 'error' && (
                <motion.span initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="text-red-600">Vui lòng kiểm tra thông tin.</motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.form>
    </section>
  );
};

export default RegistrationForm;

