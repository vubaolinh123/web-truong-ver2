/**
 * Article Content Component
 * Renders article content with proper styling that matches admin editor
 */

'use client';

import React, { useEffect, useRef } from 'react';
import { ArticleContentProps } from '../types/article.types';
import styles from '../styles/article-content.module.css';

const ArticleContent: React.FC<ArticleContentProps> = ({
  content,
  className = ''
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add any post-render processing here
    if (contentRef.current) {
      // Add lazy loading to images that weren't already processed
      const images = contentRef.current.querySelectorAll('img:not([loading])');
      images.forEach((img) => {
        img.setAttribute('loading', 'lazy');
      });

      // Add target="_blank" to external links
      const links = contentRef.current.querySelectorAll('a[href^="http"]');
      links.forEach((link) => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      });

      // Add copy functionality to code blocks
      const codeBlocks = contentRef.current.querySelectorAll('pre');
      codeBlocks.forEach((block, index) => {
        // Create copy button
        const copyButton = document.createElement('button');
        copyButton.innerHTML = '📋 Copy';
        copyButton.style.cssText = `
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          padding: 0.25rem 0.5rem;
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.2s ease;
        `;

        // Add hover effect
        copyButton.addEventListener('mouseenter', () => {
          copyButton.style.background = 'rgba(255, 255, 255, 0.2)';
        });
        copyButton.addEventListener('mouseleave', () => {
          copyButton.style.background = 'rgba(255, 255, 255, 0.1)';
        });

        // Add copy functionality
        copyButton.addEventListener('click', async () => {
          const code = block.querySelector('code');
          if (code) {
            try {
              await navigator.clipboard.writeText(code.textContent || '');
              copyButton.innerHTML = '✅ Copied!';
              setTimeout(() => {
                copyButton.innerHTML = '📋 Copy';
              }, 2000);
            } catch (err) {
              console.error('Failed to copy code:', err);
            }
          }
        });

        // Make pre block relative and add button
        block.style.position = 'relative';
        block.appendChild(copyButton);
      });

      // Add smooth scroll to anchor links
      const anchorLinks = contentRef.current.querySelectorAll('a[href^="#"]');
      anchorLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href')?.substring(1);
          if (targetId) {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
              targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }
          }
        });
      });
    }
  }, [content]);

  // Sanitize and process content
  const processContent = (htmlContent: string) => {
    // Basic HTML sanitization (in production, use a proper sanitization library)
    return htmlContent
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
      .replace(/javascript:/gi, '') // Remove javascript: protocols
      .replace(/on\w+\s*=/gi, ''); // Remove event handlers
  };

  return (
    <div className={`${styles.articleContent} ${className}`}>
      <div
        ref={contentRef}
        dangerouslySetInnerHTML={{
          __html: processContent(content)
        }}
        style={{
          // Ensure content doesn't break layout
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          hyphens: 'auto'
        }}
      />
    </div>
  );
};

export default ArticleContent;
