import Layout from '@/components/layout/Layout';
import Banner from '@/components/layout/Banner';
import NewsSection from '@/components/sections/NewsSection';
import StatsSection from '@/components/sections/StatsSection';
import FacultiesSection from '@/components/sections/FacultiesSection';
import AchievementsSection from '@/components/sections/AchievementsSection';

export default function Home() {
  return (
    <Layout>
      <Banner />
      <NewsSection />
      <StatsSection />
      <FacultiesSection />
      <AchievementsSection />
    </Layout>
  );
}
