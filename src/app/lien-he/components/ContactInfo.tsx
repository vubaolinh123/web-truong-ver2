'use client';

import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Users, 
  GraduationCap,
  Facebook,
  Youtube,
  Linkedin,
  Building,
  CreditCard,
  BookOpen
} from 'lucide-react';
import styles from '../styles/contact.module.css';

const ContactInfo: React.FC = () => {
  return (
    <div className={styles.contactInfoContainer}>
      <div className={styles.sectionHeader}>
        <h2 id="contact-info-heading">Thông tin liên hệ chi tiết</h2>
        <p>Tất cả thông tin cần thiết để liên hệ với trường và các phòng ban</p>
      </div>

      <div className={styles.contactInfoGrid}>
        {/* Main Contact Info */}
        <div className={styles.contactInfoCard}>
          <div className={styles.cardHeader}>
            <MapPin className={styles.cardIcon} size={24} aria-hidden="true" />
            <h3>Địa chỉ trường</h3>
          </div>
          <div className={styles.cardBody}>
            <p className={styles.mainAddress}>
              36 Cầu Diễn, Phường Minh Khai
            </p>
            <p className={styles.subAddress}>
              Quận Bắc Từ Liêm, Thành phố Hà Nội
            </p>
            <p className={styles.postalCode}>
              Mã bưu điện: 100000
            </p>
            <div className={styles.addressNote}>
              <p>🚇 Gần ga Metro Cầu Diễn (Tuyến 3)</p>
              <p>🚌 Nhiều tuyến xe buýt đi qua</p>
            </div>
          </div>
        </div>

        {/* Phone Numbers */}
        <div className={styles.contactInfoCard}>
          <div className={styles.cardHeader}>
            <Phone className={styles.cardIcon} size={24} aria-hidden="true" />
            <h3>Số điện thoại</h3>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.contactItem}>
              <span className={styles.label}>Tổng đài chính:</span>
              <a href="tel:+842431234567" className={styles.contactLink}>
                024.3123.4567
              </a>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.label}>Phòng Tuyển sinh:</span>
              <a href="tel:+842431234568" className={styles.contactLink}>
                024.3123.4568
              </a>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.label}>Phòng Đào tạo:</span>
              <a href="tel:+842431234569" className={styles.contactLink}>
                024.3123.4569
              </a>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.label}>Phòng CTSV:</span>
              <a href="tel:+842431234570" className={styles.contactLink}>
                024.3123.4570
              </a>
            </div>
          </div>
        </div>

        {/* Email Addresses */}
        <div className={styles.contactInfoCard}>
          <div className={styles.cardHeader}>
            <Mail className={styles.cardIcon} size={24} aria-hidden="true" />
            <h3>Email liên hệ</h3>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.contactItem}>
              <span className={styles.label}>Email chính:</span>
              <a href="mailto:info@vcic.edu.vn" className={styles.contactLink}>
                info@vcic.edu.vn
              </a>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.label}>Tuyển sinh:</span>
              <a href="mailto:tuyensinh@vcic.edu.vn" className={styles.contactLink}>
                tuyensinh@vcic.edu.vn
              </a>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.label}>Đào tạo:</span>
              <a href="mailto:daotao@vcic.edu.vn" className={styles.contactLink}>
                daotao@vcic.edu.vn
              </a>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.label}>Hỗ trợ kỹ thuật:</span>
              <a href="mailto:support@vcic.edu.vn" className={styles.contactLink}>
                support@vcic.edu.vn
              </a>
            </div>
          </div>
        </div>

        {/* Departments */}
        <div className={styles.contactInfoCard}>
          <div className={styles.cardHeader}>
            <Building className={styles.cardIcon} size={24} aria-hidden="true" />
            <h3>Các phòng ban</h3>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.contactItem}>
              <span className={styles.label}>Phòng Đào tạo:</span>
              <span className={styles.contactText}>Tầng 2, Tòa A</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.label}>Phòng Tuyển sinh:</span>
              <span className={styles.contactText}>Tầng 1, Tòa A</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.label}>Phòng CTSV:</span>
              <span className={styles.contactText}>Tầng 2, Tòa B</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.label}>Phòng Tài chính:</span>
              <span className={styles.contactText}>Tầng 1, Tòa B</span>
            </div>
          </div>
        </div>

        {/* Academic Programs */}
        <div className={styles.contactInfoCard}>
          <div className={styles.cardHeader}>
            <GraduationCap className={styles.cardIcon} size={24} aria-hidden="true" />
            <h3>Chương trình đào tạo</h3>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.contactItem}>
              <span className={styles.label}>Công nghệ thông tin:</span>
              <span className={styles.contactText}>3 năm</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.label}>An toàn thông tin:</span>
              <span className={styles.contactText}>3 năm</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.label}>Thiết kế đồ họa:</span>
              <span className={styles.contactText}>3 năm</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.label}>Mạng máy tính:</span>
              <span className={styles.contactText}>3 năm</span>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className={styles.contactInfoCard}>
          <div className={styles.cardHeader}>
            <div className={styles.cardIcon}>
              <Facebook size={24} aria-hidden="true" />
            </div>
            <h3>Mạng xã hội</h3>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.socialLinks}>
              <a 
                href="https://facebook.com/vcic.edu.vn" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Trang Facebook của trường"
              >
                <Facebook size={20} aria-hidden="true" />
                <span>Facebook</span>
              </a>
              <a 
                href="https://youtube.com/c/vcicedu" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Kênh YouTube của trường"
              >
                <Youtube size={20} aria-hidden="true" />
                <span>YouTube</span>
              </a>
              <a 
                href="https://linkedin.com/school/vcic-edu-vn" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="Trang LinkedIn của trường"
              >
                <Linkedin size={20} aria-hidden="true" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
