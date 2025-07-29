import Layout from '@/components/layout/Layout';
import Banner from '@/components/layout/Banner';
import NewsSection from '@/components/sections/NewsSection';
import AdmissionTrainingSection from '@/components/sections/AdmissionTrainingSection';
import StatsSection from '@/components/sections/StatsSection';
import FacultiesSection from '@/components/sections/FacultiesSection';
import AchievementsSection from '@/components/sections/AchievementsSection';
import NavigationSection from '@/components/sections/NavigationSection';

export default function Home() {
  return (
    <Layout>
      <Banner />
      <NavigationSection />
      <NewsSection />
      <AdmissionTrainingSection />
      <FacultiesSection />
      <StatsSection />
      <AchievementsSection />
    </Layout>
  );
}
