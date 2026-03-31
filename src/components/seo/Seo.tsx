import React from 'react';

export interface SeoProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  type?: 'website' | 'article';
  locale?: string;
  canonical?: string;
  twitterCard?: 'summary_large_image' | 'summary';
  jsonLd?: Record<string, any> | Record<string, any>[];
  minimal?: boolean; // when true: only render JSON-LD (avoid duplicate meta with Metadata API)
}

/**
 * SEO component for App Router (Next.js 13+)
 * 
 * In App Router, metadata is handled via `export const metadata` or `generateMetadata()`.
 * This component ONLY renders JSON-LD structured data as a <script> tag.
 * 
 * NOTE: `next/head` does NOT work in App Router — removed in favor of direct JSX rendering.
 */
const Seo: React.FC<SeoProps> = ({ jsonLd }) => {
  if (!jsonLd) return null;

  // Normalize to array format for consistent output
  const data = Array.isArray(jsonLd) ? jsonLd : [jsonLd];

  return (
    <>
      {data.map((item, index) => (
        <script
          key={`jsonld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
};

export default Seo;

