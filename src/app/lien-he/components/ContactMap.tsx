'use client';

import React from 'react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';
import styles from '../styles/contact.module.css';

const ContactMap: React.FC = () => {
  // Coordinates for 36 Cầu Diễn, Minh Khai, Bắc Từ Liêm, Hà Nội
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.4737884515447!2d105.73253731533!3d21.053735985993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345457e292d5bf%3A0x20ac91c94d74439a!2zMzYgQ-G6p3UgRGnhu4VuLCBNaW5oIEtoYWksIELhuq9jIFThu6sgTGnDqm0sIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1640995200000!5m2!1svi!2s";
  
  const googleMapsLink = "https://maps.google.com/?q=36+Cầu+Diễn,+Minh+Khai,+Bắc+Từ+Liêm,+Hà+Nội";

  return (
    <div className={styles.contactMapContainer}>
      <div className={styles.mapHeader}>
        <h2>
          <MapPin size={24} aria-hidden="true" />
          Vị trí trường
        </h2>
        <p>Trường Cao đẳng Thông tin và Truyền thông</p>
      </div>

      {/* Interactive Map */}
      <div className={styles.mapWrapper}>
        <iframe
          src={mapUrl}
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Vị trí Trường Cao đẳng Thông tin và Truyền thông - 36 Cầu Diễn, Hà Nội"
          className={styles.mapFrame}
        />
      </div>

      {/* Map Info */}
      <div className={styles.mapInfo}>
        <div className={styles.addressInfo}>
          <h3>Địa chỉ chi tiết</h3>
          <p className={styles.fullAddress}>
            36 Cầu Diễn, Phường Minh Khai, Quận Bắc Từ Liêm, Thành phố Hà Nội
          </p>
        </div>

        <div className={styles.mapActions}>
          <a
            href={googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mapButton}
            aria-label="Mở vị trí trường trong Google Maps"
          >
            <ExternalLink size={18} aria-hidden="true" />
            Mở trong Google Maps
          </a>
          
          <a
            href={`https://maps.google.com/maps/dir//${encodeURIComponent('36 Cầu Diễn, Minh Khai, Bắc Từ Liêm, Hà Nội')}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mapButton}
            aria-label="Chỉ đường đến trường"
          >
            <Navigation size={18} aria-hidden="true" />
            Chỉ đường
          </a>
        </div>
      </div>





      {/* Parking Info */}
      <div className={styles.parkingInfo}>
        <h3>Thông tin đỗ xe</h3>
        <div className={styles.parkingGrid}>
          <div className={styles.parkingItem}>
            <h4>🚗 Ô tô</h4>
            <p>Bãi đỗ xe ô tô: 50 chỗ</p>
            <p>Miễn phí cho sinh viên và khách</p>
          </div>
          
          <div className={styles.parkingItem}>
            <h4>🏍️ Xe máy</h4>
            <p>Bãi đỗ xe máy: 200 chỗ</p>
            <p>Có mái che và bảo vệ 24/7</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMap;
