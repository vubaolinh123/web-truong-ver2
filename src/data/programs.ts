export interface HomepageProgram {
  id: number;
  name: string;
  description: string;
  image: string;
  students: number;
  programs: number;
  achievements: number;
  color: string; // gradient tailwind
  href: string;
}

export const homepagePrograms: HomepageProgram[] = [
  {
    id: 1,
    name: 'Công nghệ thông tin',
    description:
      'Đào tạo chuyên sâu về phát triển phần mềm, lập trình web, mobile và các công nghệ hiện đại.',
    image: '/images/faculty-it.svg',
    students: 4200,
    programs: 8,
    achievements: 18,
    color: 'from-blue-500 to-blue-600',
    href: '/cac-nganh-nghe-dao-tao/cong-nghe-thong-tin',
  },
  {
    id: 2,
    name: 'Lập trình máy tính',
    description:
      'Đào tạo lập trình viên chuyên nghiệp với các ngôn ngữ lập trình hiện đại và kỹ năng thực tế.',
    image: '/images/quality-education.svg',
    students: 3800,
    programs: 6,
    achievements: 15,
    color: 'from-purple-500 to-purple-600',
    href: '/cac-nganh-nghe-dao-tao/lap-trinh-may-tinh',
  },
  {
    id: 3,
    name: 'Công nghệ kỹ thuật cơ khí',
    description:
      'Đào tạo kỹ sư cơ khí với kiến thức về thiết kế, chế tạo và vận hành máy móc thiết bị.',
    image: '/images/mechanical-engineering.svg',
    students: 2500,
    programs: 5,
    achievements: 12,
    color: 'from-orange-500 to-orange-600',
    href: '/cac-nganh-nghe-dao-tao/cong-nghe-ky-thuat-co-khi',
  },
  {
    id: 4,
    name: 'Quản trị kinh doanh',
    description:
      'Đào tạo các chuyên gia quản trị với kiến thức toàn diện về kinh doanh và quản lý hiện đại.',
    image: '/images/faculty-economics.svg',
    students: 3200,
    programs: 7,
    achievements: 14,
    color: 'from-green-500 to-green-600',
    href: '/cac-nganh-nghe-dao-tao/quan-tri-kinh-doanh',
  },
  {
    id: 5,
    name: 'Công nghệ in',
    description:
      'Đào tạo chuyên ngành công nghệ in hiện đại, thiết kế đồ họa và quản lý sản xuất in ấn.',
    image: '/images/printing-technology.svg',
    students: 1800,
    programs: 4,
    achievements: 10,
    color: 'from-yellow-500 to-yellow-600',
    href: '/cac-nganh-nghe-dao-tao/cong-nghe-in',
  },
  {
    id: 6,
    name: 'Công nghệ và đổi mới sáng tạo',
    description:
      'Đào tạo về công nghệ mới, khởi nghiệp và đổi mới sáng tạo trong thời đại số.',
    image: '/images/technology-innovation.svg',
    students: 2100,
    programs: 5,
    achievements: 11,
    color: 'from-cyan-500 to-cyan-600',
    href: '/cac-nganh-nghe-dao-tao/cong-nghe-va-doi-moi-sang-tao',
  },
];

