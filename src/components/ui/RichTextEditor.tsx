/**
 * Rich Text Editor Component
 * Component editor văn bản với formatting options
 */

'use client';

import React, { useState } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered,
  Link,
  Image,
  Quote,
  Code,
  Eye,
  Edit
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  minHeight?: number;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  disabled = false,
  placeholder = 'Nhập nội dung...',
  minHeight = 300
}) => {
  const [isPreview, setIsPreview] = useState(false);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const insertText = (before: string, after: string = '') => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    onChange(newText);

    // Restore cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const formatButtons = [
    { icon: Bold, action: () => insertText('**', '**'), title: 'Bold (Ctrl+B)' },
    { icon: Italic, action: () => insertText('*', '*'), title: 'Italic (Ctrl+I)' },
    { icon: Underline, action: () => insertText('<u>', '</u>'), title: 'Underline' },
    { icon: Quote, action: () => insertText('> '), title: 'Quote' },
    { icon: Code, action: () => insertText('`', '`'), title: 'Inline Code' },
    { icon: List, action: () => insertText('- '), title: 'Bullet List' },
    { icon: ListOrdered, action: () => insertText('1. '), title: 'Numbered List' },
    { icon: Link, action: () => insertText('[', '](url)'), title: 'Link' },
    { icon: Image, action: () => insertText('![alt](', ')'), title: 'Image' },
  ];

  // Simple markdown to HTML converter for preview
  const markdownToHtml = (markdown: string) => {
    return markdown
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
      .replace(/^- (.*$)/gm, '<li>$1</li>')
      .replace(/^1\. (.*$)/gm, '<li>$1</li>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
      .replace(/\n/g, '<br>');
  };

  return (
    <div className="border border-gray-300 rounded-md overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-2 flex items-center justify-between">
        <div className="flex items-center space-x-1">
          {formatButtons.map((button, index) => (
            <button
              key={index}
              type="button"
              onClick={button.action}
              disabled={disabled}
              title={button.title}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <button.icon className="h-4 w-4" />
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className={`flex items-center px-3 py-1 text-sm rounded transition-colors ${
              isPreview 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
            }`}
          >
            {isPreview ? (
              <>
                <Edit className="h-4 w-4 mr-1" />
                Chỉnh sửa
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-1" />
                Xem trước
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor/Preview Area */}
      <div style={{ minHeight }}>
        {isPreview ? (
          <div 
            className="p-4 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: markdownToHtml(value) }}
          />
        ) : (
          <textarea
            value={value}
            onChange={handleTextareaChange}
            disabled={disabled}
            placeholder={placeholder}
            className="w-full p-4 border-0 resize-none focus:outline-none disabled:bg-gray-50 disabled:text-gray-500"
            style={{ minHeight }}
            onKeyDown={(e) => {
              // Handle keyboard shortcuts
              if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                  case 'b':
                    e.preventDefault();
                    insertText('**', '**');
                    break;
                  case 'i':
                    e.preventDefault();
                    insertText('*', '*');
                    break;
                  case 'k':
                    e.preventDefault();
                    insertText('[', '](url)');
                    break;
                }
              }
            }}
          />
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 border-t border-gray-300 px-4 py-2 text-xs text-gray-500">
        <div className="flex justify-between items-center">
          <span>{value.length} ký tự</span>
          <span>Hỗ trợ Markdown formatting</span>
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;
