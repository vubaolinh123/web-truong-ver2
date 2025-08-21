/**
 * Tag Input Component
 * Component cho phép nhập và quản lý tags
 */

'use client';

import React, { useState, KeyboardEvent } from 'react';
import { X, Hash } from 'lucide-react';

interface TagInputProps {
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
  placeholder?: string;
  maxTags?: number;
}

const TagInput: React.FC<TagInputProps> = ({
  value,
  onChange,
  disabled = false,
  placeholder = 'Nhập tag và nhấn Enter...',
  maxTags
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && inputValue === '' && value.length > 0) {
      // Remove last tag when backspace is pressed on empty input
      removeTag(value.length - 1);
    }
  };

  const addTag = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !value.includes(trimmedValue)) {
      if (maxTags && value.length >= maxTags) {
        return; // Don't add if max tags reached
      }
      onChange([...value, trimmedValue]);
      setInputValue('');
    }
  };

  const removeTag = (index: number) => {
    const newTags = value.filter((_, i) => i !== index);
    onChange(newTags);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    if (inputValue.trim()) {
      addTag();
    }
  };

  return (
    <div className="space-y-2">
      {/* Input Container */}
      <div
        className={`min-h-[42px] w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus-within:outline-none focus-within:ring-blue-500 focus-within:border-blue-500 ${
          disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
        }`}
      >
        <div className="flex flex-wrap gap-1 items-center">
          {/* Existing Tags */}
          {value.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
            >
              <Hash className="h-3 w-3 mr-1" />
              {tag}
              {!disabled && (
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-gray-200 focus:outline-none"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </span>
          ))}

          {/* Input Field */}
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onBlur={handleInputBlur}
            disabled={disabled || Boolean(maxTags && value.length >= maxTags)}
            placeholder={value.length === 0 ? placeholder : ''}
            className="flex-1 min-w-[120px] border-0 outline-none bg-transparent disabled:cursor-not-allowed text-sm"
          />
        </div>
      </div>

      {/* Help Text */}
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>Nhấn Enter hoặc dấu phẩy để thêm tag</span>
        {maxTags && (
          <span className={value.length >= maxTags ? 'text-red-500' : ''}>
            {value.length}/{maxTags} tags
          </span>
        )}
      </div>

      {/* Tag Suggestions (Optional) */}
      {inputValue && (
        <div className="text-xs text-gray-500">
          Nhấn Enter để thêm "{inputValue}"
        </div>
      )}
    </div>
  );
};

export default TagInput;
