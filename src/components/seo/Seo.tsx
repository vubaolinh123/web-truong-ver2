import Head from 'next/head';
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
  minimal?: boolean; // when true: only render canonical + JSON-LD (avoid duplicate meta with Metadata API)
}

const Seo: React.FC<SeoProps> = ({
  title,
  description,
  url,
  image,
  type = 'website',
  locale = 'vi_VN',
  canonical,
  twitterCard = 'summary_large_image',
  jsonLd,
  minimal = false,
}) => {
  const resolvedUrl = canonical || url;
  return (
    <Head>
      {!minimal && (
        <>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {title && <title>{title}</title>}
          {description && <meta name="description" content={description} />}
          {/* Open Graph */}
          {title && <meta property="og:title" content={title} />}
          {description && <meta property="og:description" content={description} />}
          {image && <meta property="og:image" content={image} />}
          {resolvedUrl && <meta property="og:url" content={resolvedUrl} />}        
          <meta property="og:type" content={type} />
          <meta property="og:locale" content={locale} />
          {/* Twitter */}
          <meta name="twitter:card" content={twitterCard} />
          {title && <meta name="twitter:title" content={title} />}
          {description && <meta name="twitter:description" content={description} />}
          {image && <meta name="twitter:image" content={image} />}
        </>
      )}
      {resolvedUrl && <link rel="canonical" href={resolvedUrl} />}
      {jsonLd && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </Head>
  );
};

export default Seo;

