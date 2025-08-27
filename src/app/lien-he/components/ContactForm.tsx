"use client";

import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, MessageSquare, Loader2, CheckCircle2, XCircle } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

const ContactForm: React.FC = () => {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<keyof FormState, boolean>>({ name: false, email: false, message: false });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const validate = (values: FormState): FormErrors => {
    const e: FormErrors = {};
    if (!values.name.trim()) e.name = 'Vui lòng nhập họ và tên';
    else if (values.name.trim().length < 2) e.name = 'Họ và tên quá ngắn';

    if (!values.email.trim()) e.email = 'Vui lòng nhập email';
    else if (!emailRegex.test(values.email)) e.email = 'Email không hợp lệ';

    if (!values.message.trim()) e.message = 'Vui lòng nhập nội dung';
    else if (values.message.trim().length < 10) e.message = 'Nội dung tối thiểu 10 ký tự';

    return e;
  };

  const liveErrors = useMemo(() => validate(form), [form]);

  const markTouched = (field: keyof FormState) => setTouched(prev => ({ ...prev, [field]: true }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });

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
      setForm({ name: '', email: '', message: '' });
      setTouched({ name: false, email: false, message: false });
    } catch {
      setStatus('error');
    }
  };

  const fieldState = (field: keyof FormState) => {
    const hasError = !!liveErrors[field];
    const showError = hasError && touched[field];
    return { hasError, showError };
  };

  const baseInput =
    'peer w-full border rounded-xl px-10 py-3 bg-white placeholder-transparent transition outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600';
  const errorInput = 'border-red-500 focus:ring-red-500 focus:border-red-500';
  const successInput = 'border-green-500 focus:ring-green-500 focus:border-green-500';

  const labelBase =
    'absolute left-10 top-1/2 -translate-y-1/2 text-slate-500 transition-all pointer-events-none peer-focus:-translate-y-4 peer-focus:text-xs peer-focus:text-blue-700';
  const labelFloated = ' -translate-y-4 text-xs';

  const groupBase =
    'relative focus-within:shadow-md focus-within:shadow-blue-100 rounded-xl border transition-colors';

  const nameState = fieldState('name');
  const emailState = fieldState('email');
  const messageState = fieldState('message');

  return (
    <section aria-labelledby="contact-form-title">
      <h2 id="contact-form-title" className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Gửi liên hệ</h2>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35 }}
        className="p-0.5 rounded-2xl bg-gradient-to-br from-blue-50 to-yellow-50"
        aria-label="Biểu mẫu liên hệ"
      >
        <div className="bg-white rounded-2xl p-6 shadow-sm grid grid-cols-1 gap-5">
          {/* Name */}
          <div
            className={`${groupBase} ${nameState.showError ? 'border-red-500' : nameState.hasError && touched.name ? 'border-red-500' : 'border-slate-200'}`}
          >
            <motion.div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-700" whileFocus={{ scale: 1.1 }}>
              <User />
            </motion.div>
            <input
              id="contact-name"
              type="text"
              placeholder="Họ và tên"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              onBlur={() => markTouched('name')}
              className={`${baseInput} ${nameState.showError ? errorInput : status === 'success' && !liveErrors.name ? successInput : ''}`}
              aria-required
              aria-invalid={nameState.showError}
              aria-describedby={nameState.showError ? 'name-error' : undefined}
            />
            <label htmlFor="contact-name" className={`${labelBase} ${form.name ? labelFloated : ''}`}>Họ và tên</label>
            <AnimatePresence>
              {nameState.showError && (
                <motion.p
                  id="name-error"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="mt-1 px-2 text-sm text-red-600"
                >
                  {liveErrors.name}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Email */}
          <div className={`${groupBase} ${emailState.showError ? 'border-red-500' : 'border-slate-200'}`}>
            <motion.div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-700" whileFocus={{ scale: 1.1 }}>
              <Mail />
            </motion.div>
            <input
              id="contact-email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              onBlur={() => markTouched('email')}
              className={`${baseInput} ${emailState.showError ? errorInput : status === 'success' && !liveErrors.email ? successInput : ''}`}
              aria-required
              aria-invalid={emailState.showError}
              aria-describedby={emailState.showError ? 'email-error' : undefined}
            />
            <label htmlFor="contact-email" className={`${labelBase} ${form.email ? labelFloated : ''}`}>Email</label>
            <AnimatePresence>
              {emailState.showError && (
                <motion.p id="email-error" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="mt-1 px-2 text-sm text-red-600">
                  {liveErrors.email}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Message */}
          <div className={`${groupBase} ${messageState.showError ? 'border-red-500' : 'border-slate-200'}`}>
            <motion.div className="absolute left-3 top-3 text-blue-700" whileFocus={{ scale: 1.1 }}>
              <MessageSquare />
            </motion.div>
            <textarea
              id="contact-message"
              placeholder="Nội dung"
              rows={5}
              maxLength={1000}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              onBlur={() => markTouched('message')}
              className={`${baseInput} pt-3 ${messageState.showError ? errorInput : status === 'success' && !liveErrors.message ? successInput : ''}`}
              aria-required
              aria-invalid={messageState.showError}
              aria-describedby={messageState.showError ? 'message-error' : 'message-counter'}
            />
            <label htmlFor="contact-message" className={`absolute left-10 top-3 text-slate-500 transition-all pointer-events-none ${form.message ? ' -translate-y-4 text-xs' : ''}`}>
              Nội dung
            </label>
            <div className="flex items-center justify-between px-2 pb-1">
              <AnimatePresence>
                {messageState.showError && (
                  <motion.p id="message-error" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="text-sm text-red-600">
                    {liveErrors.message}
                  </motion.p>
                )}
              </AnimatePresence>
              <span id="message-counter" className="ml-auto text-xs text-slate-500">
                {form.message.length}/1000
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <motion.button
              type="submit"
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
              disabled={status === 'submitting'}
              aria-busy={status === 'submitting'}
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 className="animate-spin" /> Đang gửi...
                </>
              ) : (
                'Gửi liên hệ'
              )}
            </motion.button>

            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="inline-flex items-center gap-1.5 text-green-700"
                  role="status"
                  aria-live="polite"
                >
                  <CheckCircle2 /> Đã gửi thành công!
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="inline-flex items-center gap-1.5 text-red-600"
                  role="status"
                  aria-live="assertive"
                >
                  <XCircle /> Gửi thất bại, vui lòng kiểm tra thông tin.
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.form>
    </section>
  );
};

export default ContactForm;

