'use client';

import React from 'react';
import Layout from '@/components/layout/Layout';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ContactHeader from './ContactHeader';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';
import ContactMap from './ContactMap';

import styles from '../styles/contact.module.css';

const ContactPageClient: React.FC = () => {
  // Breadcrumb items
  const breadcrumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Liên hệ', href: '/lien-he', current: true }
  ];

  return (
    <Layout>
      <div className={styles.contactPage}>
        {/* Breadcrumbs */}
        <div className={styles.breadcrumbContainer}>
          <div className={styles.container}>
            <Breadcrumb
              items={breadcrumbs}
              showHomeIcon={false}
              maxItems={5}
            />
          </div>
        </div>

        {/* Page Header */}
        <ContactHeader />

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className={styles.container}>
          {/* Contact Information Section */}
          <section className={styles.contactInfoSection} aria-labelledby="contact-info-heading">
            <ContactInfo />
          </section>

          {/* Contact Form and Map Section */}
          <section className={styles.contactFormSection} aria-labelledby="contact-form-heading">
            <div className={styles.formMapContainer}>
              {/* Contact Form */}
              <div className={styles.formContainer}>
                <ContactForm />
              </div>

              {/* Map Container */}
              <div className={styles.mapContainer}>
                <ContactMap />
              </div>
            </div>
          </section>


        </div>
      </main>
      </div>
    </Layout>
  );
};

export default ContactPageClient;
