/**
 * Article Content Editor Component
 * Rich text editor with TinyMCE for article content
 */

'use client';

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Edit3, Eye, Code } from 'lucide-react';
import { Editor } from '@tinymce/tinymce-react';
import styles from './ArticleContentEditor.module.css';

interface ArticleContentEditorProps {
  content: string;
  onContentChange: (content: string) => void;
  errors?: {
    content?: string;
  };
}

const ArticleContentEditor: React.FC<ArticleContentEditorProps> = ({
  content,
  onContentChange,
  errors = {}
}) => {
  const [editorMode, setEditorMode] = useState<'visual' | 'html'>('visual');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [htmlContent, setHtmlContent] = useState(content || '');
  const editorRef = useRef<any>(null);

  // Sync htmlContent with content prop when it changes from parent
  useEffect(() => {
    console.log('Content prop changed:', content);
    setHtmlContent(content || '');
  }, [content]);

  // Handle editor content changes
  const handleEditorChange = useCallback((newContent: string) => {
    setHtmlContent(newContent);
    onContentChange(newContent);
  }, [onContentChange]);

  // Handle content changes in HTML mode
  const handleHtmlContentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setHtmlContent(newContent);
    onContentChange(newContent);
  }, [onContentChange]);

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Switch between visual and HTML modes
  const switchMode = (mode: 'visual' | 'html') => {
    if (mode === 'html' && editorRef.current) {
      // Get content from TinyMCE when switching to HTML mode
      const currentContent = editorRef.current.getContent();
      setHtmlContent(currentContent);
    }
    setEditorMode(mode);
  };

  // Memoized TinyMCE configuration to prevent re-initialization
  const editorConfig = useMemo(() => ({
    height: 600, // Fixed height for better usability
    menubar: false,
    plugins: [
      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
      'insertdatetime', 'media', 'table', 'help', 'wordcount'
    ],
    toolbar: 'undo redo | blocks | ' +
      'bold italic forecolor | alignleft aligncenter ' +
      'alignright alignjustify | bullist numlist outdent indent | ' +
      'removeformat | link image | code | fullscreen | help',
    content_style: `
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        font-size: 14px;
        line-height: 1.6;
        color: #374151;
      }
      h1, h2, h3, h4, h5, h6 {
        color: #1f2937;
        margin-top: 1em;
        margin-bottom: 0.5em;
      }
      p { margin-bottom: 1em; }
      a { color: #3b82f6; text-decoration: underline; }
      img { max-width: 100%; height: auto; }
      blockquote {
        border-left: 4px solid #e5e7eb;
        margin: 1em 0;
        padding-left: 1em;
        color: #6b7280;
      }
    `,
    skin: 'oxide',
    content_css: 'default',
    branding: false,
    promotion: false,
    // Disable analytics and telemetry to prevent network requests
    analytics: false,
    telemetry: false,
    // Setup function for editor initialization
    setup: (editor: any) => {
      editor.on('init', () => {
        // Editor is ready
        console.log('TinyMCE editor initialized');
      });

      // Handle fullscreen mode changes
      editor.on('FullscreenStateChanged', () => {
        const isEditorFullscreen = editor.plugins.fullscreen.isFullscreen();
        setIsFullscreen(isEditorFullscreen);
      });
    }
  }), []);

  // Calculate word count
  const getWordCount = (text: string): number => {
    return text.replace(/<[^>]*>/g, '').split(/\s+/).filter(word => word.length > 0).length;
  };

  return (
    <div className={styles.editorWrapper}>
      <div className={`${styles.editorContainer} ${isFullscreen ? styles.fullscreen : ''}`}>
        <div className={styles.editorHeader}>
          <div className={styles.editorTitle}>
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Edit3 size={20} className="text-indigo-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Nội dung bài viết</h2>
            <span className="text-red-500">*</span>
          </div>

          <div className={styles.editorControls}>
            {/* Editor Mode Toggle */}
            <div className={styles.modeToggle}>
              <button
                type="button"
                onClick={() => switchMode('visual')}
                className={`${styles.modeButton} ${editorMode === 'visual' ? styles.active : ''}`}
              >
              <Eye size={16} />
              <span>Trực quan</span>
            </button>
              <button
                type="button"
                onClick={() => switchMode('html')}
                className={`${styles.modeButton} ${editorMode === 'html' ? styles.active : ''}`}
              >
              <Code size={16} />
              <span>HTML</span>
            </button>
          </div>

            {/* Fullscreen Toggle */}
            <button
              type="button"
              onClick={toggleFullscreen}
              className={styles.fullscreenButton}
              title={isFullscreen ? 'Thoát toàn màn hình' : 'Toàn màn hình'}
            >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isFullscreen ? (
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
              ) : (
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              )}
            </svg>
          </button>
        </div>
      </div>

        {/* Editor Content */}
        <div className={styles.editorContent}>
        {editorMode === 'visual' ? (
          <Editor
            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || 'no-api-key'}
            onInit={(_, editor) => {
              editorRef.current = editor;
              console.log('TinyMCE initialized with content:', htmlContent);
            }}
            value={htmlContent}
            init={editorConfig}
            onEditorChange={handleEditorChange}
          />
        ) : (
            <textarea
              value={htmlContent}
              onChange={handleHtmlContentChange}
              className={`${styles.htmlTextarea} ${errors.content ? styles.error : ''}`}
              placeholder="Nhập nội dung HTML..."
            />
        )}
      </div>

          {/* Error Message */}
          {errors.content && (
            <div className={styles.errorMessage}>
              <p>{errors.content}</p>
            </div>
          )}

          {/* Editor Footer */}
          <div className={styles.editorFooter}>
            <div>
              <span>Số từ: {getWordCount(htmlContent)}</span>
              <span className="mx-2">•</span>
              <span>Ký tự: {htmlContent.length}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleContentEditor;
