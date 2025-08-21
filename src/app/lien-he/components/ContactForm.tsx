'use client';

import React, { useState } from 'react';
import { Send, User, Mail, Phone, MessageSquare, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import styles from '../styles/contact.module.css';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[0-9+\-\s()]{10,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập họ và tên';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Họ và tên phải có ít nhất 2 ký tự';
    } else if (formData.name.trim().length > 50) {
      newErrors.name = 'Họ và tên không được quá 50 ký tự';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập địa chỉ email';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Địa chỉ email không hợp lệ';
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ (10-11 số)';
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Vui lòng chọn chủ đề';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Vui lòng nhập nội dung tin nhắn';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Nội dung tin nhắn phải có ít nhất 10 ký tự';
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = 'Nội dung tin nhắn không được quá 1000 ký tự';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate form submission (no API call)
      console.log('📧 Contact form data:', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        timestamp: new Date().toISOString()
      });

      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate successful submission
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

      // Scroll to success message
      setTimeout(() => {
        const successElement = document.querySelector(`.${styles.successMessage}`);
        if (successElement) {
          successElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);

    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.contactFormContainer}>
      <div className={styles.formHeader}>
        <h2 id="contact-form-heading">Gửi tin nhắn cho chúng tôi</h2>
        <p>Điền thông tin vào form bên dưới và chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất.</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.contactForm} noValidate>
        {/* Name Field */}
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.formLabel}>
            <User size={18} aria-hidden="true" />
            Họ và tên <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`${styles.formInput} ${errors.name ? styles.inputError : ''}`}
            placeholder="Nhập họ và tên của bạn"
            aria-describedby={errors.name ? 'name-error' : undefined}
            maxLength={50}
            autoComplete="name"
          />
          {errors.name && (
            <span id="name-error" className={styles.errorMessage} role="alert">
              <AlertCircle size={16} aria-hidden="true" />
              {errors.name}
            </span>
          )}
        </div>

        {/* Email Field */}
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.formLabel}>
            <Mail size={18} aria-hidden="true" />
            Email <span className={styles.required}>*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`${styles.formInput} ${errors.email ? styles.inputError : ''}`}
            placeholder="Nhập địa chỉ email của bạn"
            aria-describedby={errors.email ? 'email-error' : undefined}
            autoComplete="email"
          />
          {errors.email && (
            <span id="email-error" className={styles.errorMessage} role="alert">
              <AlertCircle size={16} aria-hidden="true" />
              {errors.email}
            </span>
          )}
        </div>

        {/* Phone Field */}
        <div className={styles.formGroup}>
          <label htmlFor="phone" className={styles.formLabel}>
            <Phone size={18} aria-hidden="true" />
            Số điện thoại <span className={styles.required}>*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`${styles.formInput} ${errors.phone ? styles.inputError : ''}`}
            placeholder="Nhập số điện thoại của bạn"
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            autoComplete="tel"
          />
          {errors.phone && (
            <span id="phone-error" className={styles.errorMessage} role="alert">
              <AlertCircle size={16} aria-hidden="true" />
              {errors.phone}
            </span>
          )}
        </div>

        {/* Subject Field */}
        <div className={styles.formGroup}>
          <label htmlFor="subject" className={styles.formLabel}>
            <MessageSquare size={18} aria-hidden="true" />
            Chủ đề <span className={styles.required}>*</span>
          </label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className={`${styles.formSelect} ${errors.subject ? styles.inputError : ''}`}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
          >
            <option value="">Chọn chủ đề</option>
            <option value="tuyen-sinh">Tư vấn tuyển sinh</option>
            <option value="chuong-trinh">Chương trình đào tạo</option>
            <option value="hoc-phi">Học phí và học bổng</option>
            <option value="co-so-vat-chat">Cơ sở vật chất</option>
            <option value="sinh-vien">Hỗ trợ sinh viên</option>
            <option value="thuc-tap">Thực tập và việc làm</option>
            <option value="khac">Khác</option>
          </select>
          {errors.subject && (
            <span id="subject-error" className={styles.errorMessage} role="alert">
              <AlertCircle size={16} aria-hidden="true" />
              {errors.subject}
            </span>
          )}
        </div>

        {/* Message Field */}
        <div className={styles.formGroup}>
          <label htmlFor="message" className={styles.formLabel}>
            <MessageSquare size={18} aria-hidden="true" />
            Nội dung tin nhắn <span className={styles.required}>*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={5}
            className={`${styles.formTextarea} ${errors.message ? styles.inputError : ''}`}
            placeholder="Nhập nội dung tin nhắn của bạn..."
            aria-describedby={errors.message ? 'message-error' : undefined}
            maxLength={1000}
          />
          <div className={styles.characterCount}>
            {formData.message.length}/1000 ký tự
          </div>
          {errors.message && (
            <span id="message-error" className={styles.errorMessage} role="alert">
              <AlertCircle size={16} aria-hidden="true" />
              {errors.message}
            </span>
          )}
        </div>

        {/* Submit Status Messages */}
        {submitStatus === 'success' && (
          <div className={styles.successMessage} role="alert">
            <CheckCircle size={20} aria-hidden="true" />
            <span>Cảm ơn bạn đã gửi tin nhắn! Thông tin đã được ghi nhận. Chúng tôi sẽ liên hệ lại với bạn sớm nhất có thể qua email hoặc số điện thoại bạn đã cung cấp.</span>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className={styles.errorMessageBox} role="alert">
            <AlertCircle size={20} aria-hidden="true" />
            <span>Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau hoặc liên hệ trực tiếp qua hotline: 024.3123.4567</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`${styles.submitButton} ${isSubmitting ? styles.submitting : ''}`}
          aria-label={isSubmitting ? 'Đang gửi tin nhắn' : 'Gửi tin nhắn'}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={20} className={styles.spinner} aria-hidden="true" />
              Đang gửi...
            </>
          ) : (
            <>
              <Send size={20} aria-hidden="true" />
              Gửi tin nhắn
            </>
          )}
        </button>

        <p className={styles.formNote}>
          <span className={styles.required}>*</span> Các trường bắt buộc
        </p>
      </form>
    </div>
  );
};

export default ContactForm;
