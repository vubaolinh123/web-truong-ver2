/**
 * Article Content Component
 * Hiển thị nội dung chính của bài viết với typography tối ưu
 */

'use client';

import React, { useState } from 'react';
import { Copy, Check, Share2, Bookmark, ThumbsUp, MessageSquare, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Article } from '@/types/articles';

interface ArticleContentProps {
  article: Article;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ article }) => {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  // Copy article URL to clipboard
  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  // Handle like action
  const handleLike = () => {
    setLiked(!liked);
    // TODO: Implement API call to like/unlike article
  };

  // Handle bookmark action
  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    // TODO: Implement API call to bookmark/unbookmark article
  };

  // Handle social share
  const handleSocialShare = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(article.title);
    const description = encodeURIComponent(article.excerpt || '');

    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  // Handle native share
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      // Fallback to copy URL
      handleCopyUrl();
    }
  };

  // Process content for better display
  const processContent = (content: string) => {
    // Convert markdown-like content to HTML
    // This is a simple implementation - you might want to use a proper markdown parser
    return content
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')
      .replace(/^/, '<p>')
      .replace(/$/, '</p>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/### (.*?)(<br>|$)/g, '<h3>$1</h3>')
      .replace(/## (.*?)(<br>|$)/g, '<h2>$1</h2>')
      .replace(/# (.*?)(<br>|$)/g, '<h1>$1</h1>');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Article Actions Bar */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-6 py-4 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Like Button */}
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                liked 
                  ? 'bg-red-100 text-red-600 hover:bg-red-200 shadow-md' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <ThumbsUp size={18} className={liked ? 'fill-current' : ''} />
              <span className="font-medium">
                {liked ? 'Đã thích' : 'Thích'}
              </span>
              <span className="text-xs bg-white px-2 py-1 rounded-full font-semibold">
                {(article.likeCount || 0) + (liked ? 1 : 0)}
              </span>
            </button>

            {/* Bookmark Button */}
            <button
              onClick={handleBookmark}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                bookmarked 
                  ? 'bg-blue-100 text-blue-600 hover:bg-blue-200 shadow-md' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Bookmark size={18} className={bookmarked ? 'fill-current' : ''} />
              <span className="font-medium">
                {bookmarked ? 'Đã lưu' : 'Lưu'}
              </span>
            </button>

            {/* Comment Button */}
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
              <MessageSquare size={18} />
              <span className="font-medium">Bình luận</span>
              <span className="text-xs bg-white px-2 py-1 rounded-full font-semibold">
                {article.commentCount || 0}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Social Share Buttons */}
            <button
              onClick={() => handleSocialShare('facebook')}
              className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              title="Chia sẻ lên Facebook"
            >
              <Facebook size={18} />
            </button>
            
            <button
              onClick={() => handleSocialShare('twitter')}
              className="p-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600 transition-colors"
              title="Chia sẻ lên Twitter"
            >
              <Twitter size={18} />
            </button>
            
            <button
              onClick={() => handleSocialShare('linkedin')}
              className="p-2 rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition-colors"
              title="Chia sẻ lên LinkedIn"
            >
              <Linkedin size={18} />
            </button>

            {/* Copy URL Button */}
            <button
              onClick={handleCopyUrl}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              <span className="font-medium">
                {copied ? 'Đã sao chép' : 'Sao chép link'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="px-6">
        <div className="prose prose-lg prose-blue max-w-none">
          <div 
            className="article-content text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ 
              __html: processContent(article.content) 
            }}
          />
        </div>

        {/* Article Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            {/* Last Updated */}
            {article.updatedAt && (
              <div className="text-sm text-gray-600">
                <span className="font-semibold">Cập nhật lần cuối:</span>{' '}
                {new Date(article.updatedAt).toLocaleDateString('vi-VN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            )}

            {/* Article Stats Summary */}
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="font-semibold">{article.viewCount?.toLocaleString()} lượt xem</span>
              <span>•</span>
              <span className="font-semibold">{article.likeCount?.toLocaleString()} lượt thích</span>
              <span>•</span>
              <span className="font-semibold">{article.commentCount?.toLocaleString()} bình luận</span>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-50 to-yellow-50 p-6 rounded-xl border border-blue-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h4 className="text-xl font-bold text-blue-900 mb-2">
                  Bạn thấy bài viết này hữu ích?
                </h4>
                <p className="text-blue-700">
                  Hãy chia sẻ để nhiều người khác cũng được biết đến thông tin này.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleShare}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg"
                >
                  Chia sẻ ngay
                </button>
                <button
                  onClick={handleLike}
                  className={`px-6 py-3 rounded-lg transition-colors font-semibold shadow-lg ${
                    liked
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {liked ? 'Đã thích' : 'Thích bài viết'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles for Article Content */}
      <style jsx>{`
        .article-content h1,
        .article-content h2,
        .article-content h3,
        .article-content h4,
        .article-content h5,
        .article-content h6 {
          color: #1e3a8a;
          font-weight: 700;
          margin-top: 2.5rem;
          margin-bottom: 1.5rem;
          line-height: 1.3;
        }

        .article-content h1 { font-size: 2.25rem; }
        .article-content h2 { font-size: 1.875rem; }
        .article-content h3 { font-size: 1.5rem; }
        .article-content h4 { font-size: 1.25rem; }

        .article-content p {
          margin-bottom: 1.75rem;
          line-height: 1.8;
          font-size: 1.125rem;
        }

        .article-content strong {
          font-weight: 600;
          color: #1f2937;
        }

        .article-content em {
          font-style: italic;
          color: #4b5563;
        }

        .article-content code {
          background-color: #f3f4f6;
          padding: 0.25rem 0.5rem;
          border-radius: 0.375rem;
          font-family: 'Courier New', monospace;
          font-size: 0.875rem;
          color: #dc2626;
          border: 1px solid #e5e7eb;
        }

        .article-content blockquote {
          border-left: 4px solid #3b82f6;
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: #4b5563;
          background-color: #f8fafc;
          padding: 1.5rem;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .article-content ul,
        .article-content ol {
          margin: 1.75rem 0;
          padding-left: 2rem;
        }

        .article-content li {
          margin-bottom: 0.75rem;
          line-height: 1.7;
        }

        .article-content img {
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          margin: 2rem 0;
        }
      `}</style>
    </div>
  );
};

export default ArticleContent;
