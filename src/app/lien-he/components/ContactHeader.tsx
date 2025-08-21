'use client';

import React from 'react';
import { Phone, Mail, MapPin, MessageCircle, Clock, Users } from 'lucide-react';
import styles from '../styles/contact.module.css';

const ContactHeader: React.FC = () => {
  return (
    <header className={styles.contactHeader}>
      <div className={styles.container}>
        <div className={styles.headerContent}>
          {/* Main Title */}
          <div className={styles.titleSection}>
            <h1 className={styles.pageTitle}>
              Liên hệ với chúng tôi
            </h1>
            <p className={styles.pageSubtitle}>
              Chúng tôi luôn sẵn sàng hỗ trợ và tư vấn cho bạn về các chương trình đào tạo, 
              tuyển sinh và các dịch vụ của trường. Hãy liên hệ với chúng tôi qua các kênh bên dưới.
            </p>
          </div>

          {/* Quick Contact Cards */}
          <div className={styles.quickContactCards}>
            <div className={styles.quickContactCard}>
              <div className={styles.cardIcon}>
                <Phone size={28} aria-hidden="true" />
              </div>
              <div className={styles.cardContent}>
                <h3>Hotline Tuyển sinh</h3>
                <p>
                  <a href="tel:+842431234567" className={styles.headerContactLink}>
                    024.3123.4567
                  </a>
                </p>
                <span>Hỗ trợ 24/7</span>
              </div>
            </div>

            <div className={styles.quickContactCard}>
              <div className={styles.cardIcon}>
                <Mail size={28} aria-hidden="true" />
              </div>
              <div className={styles.cardContent}>
                <h3>Email Liên hệ</h3>
                <p>
                  <a href="mailto:info@vcic.edu.vn" className={styles.headerContactLink}>
                    info@vcic.edu.vn
                  </a>
                </p>
                <span>Phản hồi trong 24h</span>
              </div>
            </div>

            <div className={styles.quickContactCard}>
              <div className={styles.cardIcon}>
                <MapPin size={28} aria-hidden="true" />
              </div>
              <div className={styles.cardContent}>
                <h3>Địa chỉ Trường</h3>
                <p>36 Cầu Diễn, Minh Khai</p>
                <span>Bắc Từ Liêm, Hà Nội</span>
              </div>
            </div>

            <div className={styles.quickContactCard}>
              <div className={styles.cardIcon}>
                <MessageCircle size={28} aria-hidden="true" />
              </div>
              <div className={styles.cardContent}>
                <h3>Tư vấn Miễn phí</h3>
                <p>Tuyển sinh 2025</p>
                <span>Đăng ký ngay</span>
              </div>
            </div>

            <div className={styles.quickContactCard}>
              <div className={styles.cardIcon}>
                <Clock size={28} aria-hidden="true" />
              </div>
              <div className={styles.cardContent}>
                <h3>Giờ Làm việc</h3>
                <p>Thứ 2 - Thứ 6</p>
                <span>7:30 - 17:00</span>
              </div>
            </div>

            <div className={styles.quickContactCard}>
              <div className={styles.cardIcon}>
                <Users size={28} aria-hidden="true" />
              </div>
              <div className={styles.cardContent}>
                <h3>Hỗ trợ Sinh viên</h3>
                <p>Phòng CTSV</p>
                <span>Tầng 2, Tòa A</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ContactHeader;
