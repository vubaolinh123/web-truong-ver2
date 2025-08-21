/**
 * Multi Select Component
 * Component cho phép chọn nhiều options từ dropdown
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Check } from 'lucide-react';

interface Option {
  value: string;
  label: string;
  color?: string;
}

interface MultiSelectProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
  placeholder?: string;
  maxSelections?: number;
  loading?: boolean;
  error?: string | null;
  onFocus?: () => void;
  onClick?: () => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value,
  onChange,
  disabled = false,
  placeholder = 'Chọn...',
  maxSelections,
  loading = false,
  error = null,
  onFocus,
  onClick
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOptions = options.filter(option => value.includes(option.value));
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleOption = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter(v => v !== optionValue));
    } else {
      if (maxSelections && value.length >= maxSelections) {
        return; // Don't add if max selections reached
      }
      onChange([...value, optionValue]);
    }
  };

  const handleRemoveOption = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(value.filter(v => v !== optionValue));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Main Input */}
      <div
        className={`min-h-[42px] w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm cursor-pointer focus-within:outline-none focus-within:ring-blue-500 focus-within:border-blue-500 ${
          disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
        }`}
        onClick={() => {
          if (!disabled) {
            onClick?.();
            setIsOpen(!isOpen);
          }
        }}
        onFocus={() => {
          if (!disabled) {
            onFocus?.();
          }
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 flex flex-wrap gap-1">
            {selectedOptions.length > 0 ? (
              selectedOptions.map(option => (
                <span
                  key={option.value}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800"
                  style={option.color ? { backgroundColor: `${option.color}20`, color: option.color } : {}}
                >
                  {option.label}
                  {!disabled && (
                    <button
                      type="button"
                      onClick={(e) => handleRemoveOption(option.value, e)}
                      className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-200 focus:outline-none"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </span>
              ))
            ) : (
              <span className="text-gray-500 text-sm">
                {loading ? 'Đang tải...' : error ? 'Lỗi tải dữ liệu' : placeholder}
              </span>
            )}
          </div>
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent" />
          ) : (
            <ChevronDown
              className={`h-4 w-4 text-gray-400 transition-transform ${
                isOpen ? 'transform rotate-180' : ''
              }`}
            />
          )}
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && !disabled && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          {/* Search Input */}
          <div className="p-2 border-b border-gray-200">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm..."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Options List */}
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map(option => {
                const isSelected = value.includes(option.value);
                const isDisabled = maxSelections && !isSelected && value.length >= maxSelections;

                return (
                  <div
                    key={option.value}
                    className={`px-3 py-2 cursor-pointer flex items-center justify-between hover:bg-gray-50 ${
                      isSelected ? 'bg-blue-50' : ''
                    } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => !isDisabled && handleToggleOption(option.value)}
                  >
                    <div className="flex items-center">
                      {option.color && (
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: option.color }}
                        />
                      )}
                      <span className="text-sm text-gray-900">{option.label}</span>
                    </div>
                    {isSelected && (
                      <Check className="h-4 w-4 text-blue-600" />
                    )}
                  </div>
                );
              })
            ) : (
              <div className="px-3 py-2 text-sm text-gray-500 text-center">
                Không tìm thấy kết quả
              </div>
            )}
          </div>

          {/* Footer */}
          {maxSelections && (
            <div className="p-2 border-t border-gray-200 text-xs text-gray-500 text-center">
              Đã chọn {value.length}/{maxSelections}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
