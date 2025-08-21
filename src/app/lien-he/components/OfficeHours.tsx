'use client';

import React from 'react';
import { Clock, Calendar, Phone, Mail, Users, GraduationCap, HelpCircle, AlertTriangle } from 'lucide-react';
import styles from '../styles/contact.module.css';

const OfficeHours: React.FC = () => {
  const currentHour = new Date().getHours();
  const currentDay = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  // Check if currently open (Monday-Friday 7:30-17:00, Saturday 7:30-11:30)
  const isCurrentlyOpen = () => {
    if (currentDay === 0) return false; // Sunday closed
    if (currentDay === 6) return currentHour >= 7 && currentHour < 12; // Saturday 7:30-11:30
    return currentHour >= 7 && currentHour < 17; // Monday-Friday 7:30-17:00
  };

  const officeStatus = isCurrentlyOpen();

  return (
    <div className={styles.officeHoursContainer}>
      <div className={styles.sectionHeader}>
        <h2 id="office-hours-heading">
          <Clock size={24} aria-hidden="true" />
          Giờ làm việc & Hỗ trợ
        </h2>
        <p>Thông tin về giờ làm việc và các dịch vụ hỗ trợ của trường</p>
      </div>

      <div className={styles.officeHoursGrid}>
        {/* Current Status */}
        <div className={`${styles.statusCard} ${officeStatus ? styles.open : styles.closed}`}>
          <div className={styles.statusHeader}>
            <div className={`${styles.statusIndicator} ${officeStatus ? styles.openIndicator : styles.closedIndicator}`} />
            <h3>{officeStatus ? 'Đang mở cửa' : 'Đã đóng cửa'}</h3>
          </div>
          <p className={styles.statusMessage}>
            {officeStatus 
              ? 'Chúng tôi đang sẵn sàng hỗ trợ bạn!' 
              : 'Chúng tôi sẽ mở cửa vào ngày làm việc tiếp theo.'
            }
          </p>
          <div className={styles.quickContact}>
            <a href="tel:+842431234567" className={styles.quickContactBtn}>
              <Phone size={16} aria-hidden="true" />
              Gọi ngay
            </a>
            <a href="mailto:info@vcic.edu.vn" className={styles.quickContactBtn}>
              <Mail size={16} aria-hidden="true" />
              Gửi email
            </a>
          </div>
        </div>

        {/* Office Hours Schedule */}
        <div className={styles.scheduleCard}>
          <h3>
            <Calendar size={20} aria-hidden="true" />
            Lịch làm việc
          </h3>
          <div className={styles.scheduleList}>
            <div className={styles.scheduleItem}>
              <span className={styles.day}>Thứ 2 - Thứ 6</span>
              <span className={styles.time}>7:30 - 17:00</span>
            </div>
            <div className={styles.scheduleItem}>
              <span className={styles.day}>Thứ 7</span>
              <span className={styles.time}>7:30 - 11:30</span>
            </div>
            <div className={styles.scheduleItem}>
              <span className={styles.day}>Chủ nhật</span>
              <span className={styles.time}>Nghỉ</span>
            </div>
            <div className={styles.scheduleItem}>
              <span className={styles.day}>Nghỉ trưa</span>
              <span className={styles.time}>11:30 - 13:00</span>
            </div>
          </div>
          <div className={styles.scheduleNote}>
            <p>* Nghỉ các ngày lễ, tết theo quy định của nhà nước</p>
            <p>* Thời gian tư vấn tuyển sinh: 8:00 - 16:30</p>
          </div>
        </div>

        {/* Department Hours */}
        <div className={styles.departmentCard}>
          <h3>
            <Users size={20} aria-hidden="true" />
            Giờ làm việc các phòng ban
          </h3>
          <div className={styles.departmentList}>
            <div className={styles.departmentItem}>
              <div className={styles.departmentInfo}>
                <h4>Phòng Tuyển sinh</h4>
                <p>Tư vấn tuyển sinh, hồ sơ nhập học</p>
              </div>
              <div className={styles.departmentTime}>
                <span>8:00 - 16:30</span>
                <small>T2 - T6</small>
              </div>
            </div>
            
            <div className={styles.departmentItem}>
              <div className={styles.departmentInfo}>
                <h4>Phòng Đào tạo</h4>
                <p>Chương trình học, lịch thi, bằng cấp</p>
              </div>
              <div className={styles.departmentTime}>
                <span>7:30 - 17:00</span>
                <small>T2 - T6</small>
              </div>
            </div>
            
            <div className={styles.departmentItem}>
              <div className={styles.departmentInfo}>
                <h4>Phòng CTSV</h4>
                <p>Hỗ trợ sinh viên, học bổng, hoạt động</p>
              </div>
              <div className={styles.departmentTime}>
                <span>7:30 - 17:00</span>
                <small>T2 - T6</small>
              </div>
            </div>
            
            <div className={styles.departmentItem}>
              <div className={styles.departmentInfo}>
                <h4>Phòng Tài chính</h4>
                <p>Học phí, thanh toán, hoàn trả</p>
              </div>
              <div className={styles.departmentTime}>
                <span>8:00 - 16:30</span>
                <small>T2 - T6</small>
              </div>
            </div>
          </div>
        </div>

        {/* Student Services */}
        <div className={styles.servicesCard}>
          <h3>
            <GraduationCap size={20} aria-hidden="true" />
            Dịch vụ sinh viên
          </h3>
          <div className={styles.servicesList}>
            <div className={styles.serviceItem}>
              <div className={styles.serviceIcon}>📚</div>
              <div className={styles.serviceInfo}>
                <h4>Thư viện</h4>
                <p>7:00 - 21:00 (T2-T6)</p>
                <p>8:00 - 17:00 (T7)</p>
              </div>
            </div>
            
            <div className={styles.serviceItem}>
              <div className={styles.serviceIcon}>💻</div>
              <div className={styles.serviceInfo}>
                <h4>Phòng máy tính</h4>
                <p>7:30 - 21:00 (T2-T6)</p>
                <p>8:00 - 17:00 (T7)</p>
              </div>
            </div>
            
            <div className={styles.serviceItem}>
              <div className={styles.serviceIcon}>🍽️</div>
              <div className={styles.serviceInfo}>
                <h4>Căn tin</h4>
                <p>6:30 - 18:00 (T2-T6)</p>
                <p>7:00 - 15:00 (T7)</p>
              </div>
            </div>
            
            <div className={styles.serviceItem}>
              <div className={styles.serviceIcon}>🏥</div>
              <div className={styles.serviceInfo}>
                <h4>Y tế</h4>
                <p>8:00 - 17:00 (T2-T6)</p>
                <p>Cấp cứu 24/7</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className={styles.faqCard}>
          <h3>
            <HelpCircle size={20} aria-hidden="true" />
            Câu hỏi thường gặp
          </h3>
          <div className={styles.faqList}>
            <details className={styles.faqItem}>
              <summary>Làm thế nào để liên hệ ngoài giờ làm việc?</summary>
              <p>Bạn có thể gửi email đến info@vcic.edu.vn hoặc để lại tin nhắn qua form liên hệ trên website. Chúng tôi sẽ phản hồi trong ngày làm việc tiếp theo. Trường hợp khẩn cấp, vui lòng gọi hotline 024.3123.4567.</p>
            </details>
            
            <details className={styles.faqItem}>
              <summary>Có thể đến trường vào cuối tuần không?</summary>
              <p>Trường mở cửa thứ 7 từ 7:30-11:30 cho các dịch vụ cần thiết như thư viện, phòng máy tính. Chủ nhật nghỉ trừ các sự kiện đặc biệt được thông báo trước.</p>
            </details>
            
            <details className={styles.faqItem}>
              <summary>Tôi cần hỗ trợ gấp về học vụ?</summary>
              <p>Liên hệ hotline 024.3123.4569 (Phòng Đào tạo) hoặc đến trực tiếp tầng 2, Tòa A trong giờ làm việc. Trường hợp khẩn cấp ngoài giờ, liên hệ bảo vệ trường: 024.3123.4567.</p>
            </details>
            
            <details className={styles.faqItem}>
              <summary>Làm sao để đặt lịch hẹn tư vấn?</summary>
              <p>Gọi hotline 024.3123.4568 (Phòng Tuyển sinh) hoặc gửi email tuyensinh@vcic.edu.vn với thông tin: họ tên, số điện thoại, nội dung cần tư vấn và thời gian mong muốn. Chúng tôi sẽ xác nhận lịch hẹn trong vòng 24h.</p>
            </details>
            
            <details className={styles.faqItem}>
              <summary>Trường có hỗ trợ đỗ xe không?</summary>
              <p>Có. Trường có bãi đỗ xe ô tô (50 chỗ) và xe máy (200 chỗ) miễn phí cho sinh viên và khách. Bãi xe có mái che và bảo vệ 24/7.</p>
            </details>
            
            <details className={styles.faqItem}>
              <summary>Tôi muốn tham quan trường, có cần đăng ký trước không?</summary>
              <p>Không bắt buộc nhưng khuyến khích đăng ký trước để được hướng dẫn tốt nhất. Liên hệ Phòng Tuyển sinh: 024.3123.4568 hoặc email: tuyensinh@vcic.edu.vn để đặt lịch tham quan.</p>
            </details>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className={styles.emergencyCard}>
          <h3>
            <AlertTriangle size={20} aria-hidden="true" />
            Liên hệ khẩn cấp
          </h3>
          <div className={styles.emergencyInfo}>
            <div className={styles.emergencyItem}>
              <strong>Bảo vệ trường:</strong>
              <a href="tel:+842431234567">024.3123.4567</a>
            </div>
            <div className={styles.emergencyItem}>
              <strong>Y tế khẩn cấp:</strong>
              <a href="tel:115">115</a>
            </div>
            <div className={styles.emergencyItem}>
              <strong>Cảnh sát:</strong>
              <a href="tel:113">113</a>
            </div>
            <div className={styles.emergencyItem}>
              <strong>Cứu hỏa:</strong>
              <a href="tel:114">114</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficeHours;
