import { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vcic.edu.vn'
const apiUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api').replace(/\/+$/, '')

// ────────────────────────────────────────
// Static pages with SEO priorities
// ────────────────────────────────────────
const staticPages: MetadataRoute.Sitemap = [
  // ─── Trang chủ ───
  { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },

  // ─── Giới thiệu ───
  { url: `${baseUrl}/lich-su-nha-truong`, changeFrequency: 'yearly', priority: 0.6 },
  { url: `${baseUrl}/lich-su-hinh-thanh`, changeFrequency: 'yearly', priority: 0.6 },
  { url: `${baseUrl}/su-menh-tam-nhin`, changeFrequency: 'yearly', priority: 0.6 },
  { url: `${baseUrl}/co-so-vat-chat`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${baseUrl}/ba-cong-khai`, changeFrequency: 'monthly', priority: 0.5 },

  // ─── Tuyển sinh ───
  { url: `${baseUrl}/thong-tin-tuyen-sinh`, changeFrequency: 'daily', priority: 0.9 },
  { url: `${baseUrl}/dang-ky-truc-tuyen`, changeFrequency: 'daily', priority: 0.9 },
  { url: `${baseUrl}/ho-so-nhap-hoc`, changeFrequency: 'monthly', priority: 0.8 },

  // ─── Ngành đào tạo ───
  { url: `${baseUrl}/cac-nganh-nghe-dao-tao`, changeFrequency: 'monthly', priority: 0.9 },
  { url: `${baseUrl}/cac-nganh-nghe-dao-tao/cong-nghe-thong-tin`, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${baseUrl}/cac-nganh-nghe-dao-tao/lap-trinh-may-tinh`, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${baseUrl}/cac-nganh-nghe-dao-tao/cong-nghe-in`, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${baseUrl}/cac-nganh-nghe-dao-tao/cong-nghe-ky-thuat-co-khi`, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${baseUrl}/cac-nganh-nghe-dao-tao/quan-tri-kinh-doanh`, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${baseUrl}/cac-nganh-nghe-dao-tao/cong-nghe-va-doi-moi-sang-tao`, changeFrequency: 'monthly', priority: 0.8 },

  // ─── Đào tạo ───
  { url: `${baseUrl}/chuong-trinh-dao-tao`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${baseUrl}/ke-hoach-dao-tao`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${baseUrl}/quy-che-dao-tao`, changeFrequency: 'yearly', priority: 0.5 },
  { url: `${baseUrl}/danh-muc-tai-lieu-giao-trinh`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${baseUrl}/hoc-lieu`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${baseUrl}/hoc-truc-tuyen`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${baseUrl}/truy-cap-tai-lieu-dien-tu`, changeFrequency: 'monthly', priority: 0.5 },

  // ─── Sinh viên ───
  { url: `${baseUrl}/sinh-vien`, changeFrequency: 'weekly', priority: 0.7 },
  { url: `${baseUrl}/cong-tac-hssv`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${baseUrl}/van-bang`, changeFrequency: 'monthly', priority: 0.6 },

  // ─── Tổ chức ───
  { url: `${baseUrl}/ban-giam-hieu`, changeFrequency: 'yearly', priority: 0.6 },
  { url: `${baseUrl}/khoa-cong-nghe-thong-tin`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${baseUrl}/khoa-cong-nghe-in`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${baseUrl}/khoa-khoa-hoc-dai-cuong`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${baseUrl}/phong-to-chuc-hanh-chinh`, changeFrequency: 'yearly', priority: 0.5 },
  { url: `${baseUrl}/phong-quan-ly-dao-tao`, changeFrequency: 'yearly', priority: 0.5 },
  { url: `${baseUrl}/phong-ke-hoach-tai-chinh`, changeFrequency: 'yearly', priority: 0.5 },
  { url: `${baseUrl}/phong-cong-nghe-thong-tin`, changeFrequency: 'yearly', priority: 0.5 },
  { url: `${baseUrl}/phong-cong-nghe-in`, changeFrequency: 'yearly', priority: 0.5 },
  { url: `${baseUrl}/phong-cong-nghe-so`, changeFrequency: 'yearly', priority: 0.5 },

  // ─── Hợp tác ───
  { url: `${baseUrl}/hop-tac-dao-tao`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${baseUrl}/hop-tac-quoc-te`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${baseUrl}/hop-tac-khoa-hoc-cong-nghe`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${baseUrl}/du-hoc`, changeFrequency: 'monthly', priority: 0.6 },
  { url: `${baseUrl}/nghien-cuu-khoa-hoc`, changeFrequency: 'monthly', priority: 0.6 },

  // ─── Tin tức & Thông tin ───
  { url: `${baseUrl}/tin-tuc`, changeFrequency: 'daily', priority: 0.8 },
  { url: `${baseUrl}/tin-noi-bat`, changeFrequency: 'daily', priority: 0.7 },
  { url: `${baseUrl}/tin-tuc-khac`, changeFrequency: 'daily', priority: 0.7 },
  { url: `${baseUrl}/tuyen-dung`, changeFrequency: 'weekly', priority: 0.6 },
  { url: `${baseUrl}/van-ban-quy-che-quy-dinh`, changeFrequency: 'monthly', priority: 0.5 },
  { url: `${baseUrl}/hinh-anh`, changeFrequency: 'weekly', priority: 0.5 },
  { url: `${baseUrl}/cong-nghe-so`, changeFrequency: 'monthly', priority: 0.6 },

  // ─── Liên hệ ───
  { url: `${baseUrl}/lien-he`, changeFrequency: 'monthly', priority: 0.8 },
]

// ────────────────────────────────────────
// Fetch dynamic article URLs from API
// ────────────────────────────────────────
async function getArticleUrls(): Promise<MetadataRoute.Sitemap> {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)

    const response = await fetch(`${apiUrl}/articles/public?limit=500&status=published&sort=newest`, {
      signal: controller.signal,
      next: { revalidate: 3600 }, // Re-generate hourly
    })

    clearTimeout(timeout)

    if (!response.ok) return []

    const data = await response.json()
    const articles = data?.data?.articles || []

    return articles.map((article: any) => ({
      url: `${baseUrl}/tin-tuc/${article.slug}`,
      lastModified: new Date(article.updatedAt || article.publishedAt || Date.now()),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))
  } catch (error) {
    console.warn('[Sitemap] Failed to fetch articles:', error)
    return []
  }
}

// ────────────────────────────────────────
// Export sitemap
// ────────────────────────────────────────
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articleUrls = await getArticleUrls()

  return [...staticPages, ...articleUrls]
}
