"use client";

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, User, Phone as PhoneIcon, Link2 } from 'lucide-react';
import toast from 'react-hot-toast';

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

// API base URL (configurable). Set NEXT_PUBLIC_API_URL in env for production.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// reCAPTCHA
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

const RECAPTCHA_SITE_KEY = process.env.RECAPTCHA_SITE_KEY || '';
const RECAPTCHA_ENABLED = !!RECAPTCHA_SITE_KEY;



const RegistrationForm: React.FC = () => {
  const [form, setForm] = useState<FormState>({ email: '', name: '', phone: '', program: '', facebook: '' });
  const [, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<keyof FormState, boolean>>({ email: false, name: false, phone: false, program: false, facebook: false });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const { executeRecaptcha } = useGoogleReCaptcha();


  // reCAPTCHA v3 is handled by GoogleReCaptchaProvider; no manual script injection needed.

  // Warn if API base URL is localhost while not on localhost
  React.useEffect(() => {
    try {
      if (typeof window === 'undefined') return;
      const isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
      if (!isLocal && API_BASE_URL.includes('localhost')) {
        console.warn('API is pointing to localhost in production. Please set NEXT_PUBLIC_API_URL to your server URL.');
      }
    } catch {}
  }, []);

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
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        facebook: form.facebook?.trim() || undefined,
        phone: form.phone.trim(),
        major: form.program.trim(),
      } as const;

      // Prevent common misconfiguration: production site pointing to localhost API
      if (typeof window !== 'undefined') {
        const isLocalHost = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
        if (!isLocalHost && API_BASE_URL.includes('localhost')) {
          console.error('Form submission blocked: API_BASE_URL points to localhost in non-local environment.', { API_BASE_URL, host: location.hostname });
          toast.error('Không thể gửi đăng ký: API đang trỏ tới localhost. Vui lòng cấu hình NEXT_PUBLIC_API_URL trỏ tới máy chủ backend công khai.');
          setStatus('error');
          return;
        }
      }

      console.info('Submitting registration to API:', { url: `${API_BASE_URL}/students/register`, payload });
      let recaptchaToken: string | undefined = undefined;
      if (RECAPTCHA_ENABLED) {
        try {
          if (!executeRecaptcha) {
            toast.error('reCAPTCHA chưa sẵn sàng. Vui lòng tải lại trang và thử lại.');
            setStatus('error');
            return;
          }
          recaptchaToken = await executeRecaptcha('submit');
        } catch (e) {
          console.warn('reCAPTCHA error:', e);
          toast.error('Không thể xác thực reCAPTCHA. Vui lòng thử lại.');
          setStatus('error');
          return;
        }
      }


      const res = await fetch(`${API_BASE_URL}/students/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, recaptchaToken }),
      });

      const data = await res.json().catch(() => ({ status: 'error', message: 'Không thể phân tích phản hồi từ máy chủ', data: null }));

      if (!res.ok || data.status === 'error') {
        // Merge field-level errors if provided
        if (data?.data?.errors) {
          setErrors((prev) => ({ ...prev, ...data.data.errors }));
        }

        // Handle specific 429 rate limit or DDoS messages
        if (res.status === 429) {
          const remain = data?.data?.remainingSec ?? Math.ceil((data?.data?.remainingMs || 0) / 1000);
          toast((data?.message || `Bạn đã gửi quá nhiều yêu cầu. Vui lòng chờ ${remain || 60} giây trước khi gửi lại`), {
            icon: '⏳',
            style: { background: '#f59e0b', color: '#111827' },
          });
        } else {
          toast.error(data?.message || 'Gửi đăng ký thất bại. Vui lòng thử lại sau.');
        }
        setStatus('error');
        return;
      }

      // Success
      toast.success(data?.message || 'Đăng ký thành công. Chúng tôi sẽ liên hệ sớm!');
      setStatus('success');
      setForm({ email: '', name: '', phone: '', program: '', facebook: '' });
      setTouched({ email: false, name: false, phone: false, program: false, facebook: false });
    } catch (err) {
      console.error('Network error when submitting registration:', err);
      toast.error('Không thể kết nối tới máy chủ. Vui lòng kiểm tra mạng hoặc thử lại sau.');
      setStatus('error');
    }
  };

  const fieldState = (field: keyof FormState) => {
    const hasError = !!liveErrors[field];
    const showError = hasError && touched[field];
    return { hasError, showError };
  };

  const baseInput = 'w-full border rounded-xl px-4 py-3 bg-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600';
  const errorInput = 'border-red-500 focus:ring-red-500 focus:border-red-500';
  const successInput = 'border-green-500 focus:ring-green-500 focus:border-green-500';
  const fieldWrapper = 'bg-white border border-slate-200 rounded-2xl p-4 shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition';


  const emailState = fieldState('email');
  const nameState = fieldState('name');
  const phoneState = fieldState('phone');
  const programState = fieldState('program');
  const facebookState = fieldState('facebook');

  return (
    <section aria-labelledby="registration-form-title">
      {/* Header card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="rounded-3xl overflow-hidden shadow-xl border border-blue-100 bg-white"
      >
        <div className="bg-gradient-to-r from-[#1e3a8a] to-[#2563eb] p-6 md:p-8 text-white">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-yellow-400/90 text-blue-900 flex items-center justify-center font-bold">🎓</div>
            <div>
              <h2 id="registration-form-title" className="text-2xl md:text-3xl font-extrabold tracking-tight uppercase">Đăng ký xét tuyển trực tuyến</h2>
              <p className="text-white/80 mt-1 text-sm md:text-base">Điền thông tin liên hệ và chọn ngành học bạn quan tâm. Nhà trường sẽ phản hồi sớm.</p>
            </div>
          </div>
        </div>

        {/* Form body */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="p-6 md:p-8"
          aria-label="Biểu mẫu đăng ký trực tuyến"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Họ và tên */}
            <div className={`${fieldWrapper} ${nameState.showError ? 'border-red-500 focus-within:ring-red-100' : ''}`}>
              <label htmlFor="reg-name" className="block text-sm font-medium text-slate-700 mb-2">Họ và tên</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-blue-700"><User size={18} /></span>
                <input
                  id="reg-name"
                  type="text"
                  placeholder="Nhập họ và tên"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  onBlur={() => markTouched('name')}
                  className={`${baseInput} pl-10 ${nameState.showError ? errorInput : status === 'success' && !liveErrors.name ? successInput : ''}`}
                  aria-required aria-invalid={nameState.showError}
                  aria-describedby={nameState.showError ? 'reg-name-error' : undefined}
                />
              </div>
              <AnimatePresence>
                {nameState.showError && (
                  <motion.p id="reg-name-error" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="mt-2 text-sm text-red-600">{liveErrors.name}</motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Email */}
            <div className={`${fieldWrapper} ${emailState.showError ? 'border-red-500 focus-within:ring-red-100' : ''}`}>
              <label htmlFor="reg-email" className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-blue-700"><Mail size={18} /></span>
                <input
                  id="reg-email" type="email" placeholder="name@example.com"
                  value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  onBlur={() => markTouched('email')}
                  className={`${baseInput} pl-10 ${emailState.showError ? errorInput : status === 'success' && !liveErrors.email ? successInput : ''}`}
                  aria-required aria-invalid={emailState.showError}
                  aria-describedby={emailState.showError ? 'reg-email-error' : undefined}
                />
              </div>
              <AnimatePresence>
                {emailState.showError && (
                  <motion.p id="reg-email-error" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="mt-2 text-sm text-red-600">{liveErrors.email}</motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Số điện thoại */}
            <div className={`${fieldWrapper} ${phoneState.showError ? 'border-red-500 focus-within:ring-red-100' : ''}`}>
              <label htmlFor="reg-phone" className="block text-sm font-medium text-slate-700 mb-2">Số điện thoại</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-blue-700"><PhoneIcon size={18} /></span>
                <input
                  id="reg-phone" type="tel" inputMode="tel" placeholder="Ví dụ: 0912345678"
                  value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  onBlur={() => markTouched('phone')}
                  className={`${baseInput} pl-10 ${phoneState.showError ? errorInput : status === 'success' && !liveErrors.phone ? successInput : ''}`}
                  aria-required aria-invalid={phoneState.showError}
                  aria-describedby={phoneState.showError ? 'reg-phone-error' : undefined}
                />
              </div>
              <AnimatePresence>
                {phoneState.showError && (
                  <motion.p id="reg-phone-error" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="mt-2 text-sm text-red-600">{liveErrors.phone}</motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Ngành học */}
            <div className={`${fieldWrapper} ${programState.showError ? 'border-red-500 focus-within:ring-red-100' : ''}`}>
              <label htmlFor="reg-program" className="block text-sm font-medium text-slate-700 mb-2">Ngành học</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-blue-700">🎓</span>
                <select
                  id="reg-program" value={form.program}
                  onChange={(e) => setForm({ ...form, program: e.target.value })}
                  onBlur={() => markTouched('program')}
                  className={`${baseInput} pl-10`}
                  aria-required aria-invalid={programState.showError}
                  aria-describedby={programState.showError ? 'reg-program-error' : undefined}
                >
                  <option value="">Chọn ngành học</option>
                  {programs.map((p) => (<option key={p} value={p}>{p}</option>))}
                </select>
              </div>
              <AnimatePresence>
                {programState.showError && (
                  <motion.p id="reg-program-error" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="mt-2 text-sm text-red-600">{liveErrors.program}</motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Facebook (full width) */}
            <div className={`md:col-span-2 ${fieldWrapper} ${facebookState.showError ? 'border-red-500 focus-within:ring-red-100' : ''}`}>
              <label htmlFor="reg-facebook" className="block text-sm font-medium text-slate-700 mb-2">Link Facebook (tuỳ chọn)</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-blue-700"><Link2 size={18} /></span>
                <input
                  id="reg-facebook" type="url" placeholder="https://facebook.com/..."
                  value={form.facebook} onChange={(e) => setForm({ ...form, facebook: e.target.value })}
                  onBlur={() => markTouched('facebook')}
                  className={`${baseInput} pl-10 ${facebookState.showError ? errorInput : status === 'success' && !liveErrors.facebook ? successInput : ''}`}
                  aria-invalid={facebookState.showError}
                  aria-describedby={facebookState.showError ? 'reg-facebook-error' : undefined}
                />
              </div>
              <AnimatePresence>
                {facebookState.showError && (
                  <motion.p id="reg-facebook-error" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="mt-2 text-sm text-red-600">{liveErrors.facebook}</motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Submit row */}
          <div className="mt-6 md:mt-8 flex flex-col md:flex-row md:items-center gap-4">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-400 text-blue-900 font-semibold shadow-md hover:from-yellow-300 hover:to-amber-300 disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={status === 'submitting'}
              aria-busy={status === 'submitting'}
            >
              {status === 'submitting' ? 'Đang gửi...' : 'Gửi đăng ký'}
            </motion.button>
            <p className="text-sm text-slate-500">Bằng việc gửi, bạn đồng ý cho phép nhà trường liên hệ qua email/điện thoại để tư vấn tuyển sinh.</p>
          </div>
        </motion.form>
      </motion.div>
    </section>
  );
};

export default RegistrationForm;

