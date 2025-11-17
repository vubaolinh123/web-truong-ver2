'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

interface MenuItem {
  label: string;
  href?: string;
  children?: MenuItem[];
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuStructure: MenuItem[] = [
  {
    label: 'TRANG CHỦ',
    href: '/'
  },
  {
    label: 'GIỚI THIỆU',
    children: [
      {
        label: 'Giới thiệu chung',
        children: [
          { label: 'Lịch sử hình thành', href: '/lich-su-hinh-thanh' },
          { label: 'Cơ sở vật chất', href: '/co-so-vat-chat' },
          { label: 'Sứ Mệnh Tầm Nhìn', href: '/su-menh-tam-nhin' }
        ]
      },
      {
        label: 'Cơ cấu tổ chức',
        children: [
          { label: 'Ban Giám hiệu', href: '/ban-giam-hieu' },
          { label: 'Phòng Tổ chức hành chính', href: '/phong-to-chuc-hanh-chinh' },
          { label: 'Phòng Quản lý Đào tạo', href: '/phong-quan-ly-dao-tao' },
          { label: 'Phòng Kế hoạch tài chính', href: '/phong-ke-hoach-tai-chinh' },
          { label: 'Phòng Công nghệ số', href: '/phong-cong-nghe-so' },
          { label: 'Khoa Công nghệ thông tin', href: '/phong-cong-nghe-thong-tin' },
          { label: 'Khoa Công nghệ in', href: '/phong-cong-nghe-in' },
          { label: 'Khoa Khoa học đại cương', href: '/khoa-khoa-hoc-dai-cuong' }
        ]
      }
    ]
  },
  {
    label: 'TUYỂN SINH',
    children: [
      { label: 'Thông tin tuyển sinh', href: '/thong-tin-tuyen-sinh' },
      { label: 'Các ngành, nghề đào tạo', href: '/cac-nganh-nghe-dao-tao' },
      { label: 'Đăng ký xét tuyển và tư vấn', href: '/dang-ky-truc-tuyen' },
      { label: 'Hồ sơ nhập học', href: '/ho-so-nhap-hoc' }
    ]
  },
  {
    label: 'ĐÀO TẠO',
    children: [
      { label: 'Kế hoạch đào tạo', href: '/ke-hoach-dao-tao' },
      { label: 'Quy chế đào tạo', href: '/quy-che-dao-tao' },
      { label: 'Công tác HSSV', href: '/cong-tac-hssv' },
      { label: 'Văn bằng', href: '/van-bang' },
      { label: 'Nghiên cứu khoa học', href: '/nghien-cuu-khoa-hoc' }
    ]
  },
  {
    label: 'SINH VIÊN',
    href: '/sinh-vien'
  },
  {
    label: 'HỢP TÁC',
    children: [
      { label: 'Tuyển dụng', href: '/tuyen-dung' },
      { label: 'Du học', href: '/du-hoc' },
      { label: 'Hợp tác đào tạo', href: '/hop-tac-dao-tao' },
      { label: 'Hợp tác các khoa học công nghệ', href: '/hop-tac-khoa-hoc-cong-nghe' },
      { label: 'Hợp tác quốc tế', href: '/hop-tac-quoc-te' }
    ]
  },
  {
    label: 'TIN TỨC',
    children: [
      { label: 'Tin nổi bật', href: '/tin-noi-bat' },
      { label: 'Thông tin khác', href: '/tin-tuc-khac' }
    ]
  },
  {
    label: 'CHUYỂN ĐỔI SỐ',
    children: [
      { label: 'Chương trình đào tạo', href: '/chuong-trinh-dao-tao' },
      { label: 'Học trực tuyến', href: '/hoc-truc-tuyen' },
      { label: 'Học liệu', href: '/hoc-lieu' },
      { label: 'Công nghệ số', href: '/cong-nghe-so' }
    ]
  },
  {
    label: 'LIÊN HỆ',
    href: '/lien-he'
  }
];

const MobileMenuItemComponent: React.FC<{
  item: MenuItem;
  level: number;
  onClose: () => void;
}> = ({ item, level, onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    } else if (item.href) {
      onClose();
    }
  };

  const paddingClass = {
    0: 'px-4',
    1: 'px-6',
    2: 'px-8'
  }[Math.min(level, 2)] || 'px-4';

  const bgClass = {
    0: 'bg-blue-700',
    1: 'bg-blue-600',
    2: 'bg-blue-500'
  }[Math.min(level, 2)] || 'bg-blue-700';

  return (
    <>
      {item.href && !hasChildren ? (
        <Link
          href={item.href}
          className={`${paddingClass} py-3 text-white hover:bg-blue-600 transition-colors border-b border-blue-600 text-sm font-medium block w-full text-left`}
          onClick={onClose}
        >
          {item.label}
        </Link>
      ) : (
        <button
          onClick={handleClick}
          className={`${paddingClass} py-3 text-white hover:bg-blue-600 transition-colors border-b border-blue-600 text-sm font-medium w-full text-left flex items-center justify-between`}
        >
          <span>{item.label}</span>
          {hasChildren && (
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${
                isExpanded ? 'rotate-180' : ''
              }`}
            />
          )}
        </button>
      )}

      {/* Submenu */}
      {hasChildren && isExpanded && (
        <div className={`${bgClass} overflow-hidden`}>
          {item.children?.map((child, index) => (
            <div key={index}>
              <MobileMenuItemComponent
                item={child}
                level={level + 1}
                onClose={onClose}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="mt-3 bg-blue-700 rounded-lg overflow-hidden border border-blue-600 max-h-[70vh] overflow-y-auto">
      <nav className="flex flex-col">
        {menuStructure.map((item, index) => (
          <div key={index}>
            <MobileMenuItemComponent
              item={item}
              level={0}
              onClose={onClose}
            />
          </div>
        ))}
      </nav>
    </div>
  );
};

export default MobileMenu;

