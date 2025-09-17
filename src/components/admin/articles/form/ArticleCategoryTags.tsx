/**
 * Article Category and Tags Selection Component
 * Handles category dropdown with lazy loading and tag management
 */

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { FolderOpen, Tag, Plus, X, ChevronDown } from 'lucide-react';
import { categoriesApi, Category } from '@/lib/api/categories';

// Category interface is now imported from API

interface ArticleCategoryTagsProps {
  categoryIds: string[];
  tags: string[];
  onCategoryChange: (categoryIds: string[]) => void;
  onTagsChange: (tags: string[]) => void;
  errors?: {
    categoryIds?: string;
    tags?: string;
  };
}

const ArticleCategoryTags: React.FC<ArticleCategoryTagsProps> = ({
  categoryIds,
  tags,
  onCategoryChange,
  onTagsChange,
  errors = {}
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [availableTags] = useState<string[]>([
    'Công nghệ', 'Giáo dục', 'Khoa học', 'Tin tức', 'Sự kiện',
    'Nghiên cứu', 'Đào tạo', 'Sinh viên', 'Giảng viên', 'Học bổng'
  ]);
  const [categoryQuery, setCategoryQuery] = useState('');
  const filteredCategories = useMemo(() => {
    if (!categoryQuery.trim()) return categories;
    const q = categoryQuery.toLowerCase();
    return categories.filter(c => c.name.toLowerCase().includes(q));
  }, [categories, categoryQuery]);


  // Load categories for dropdown and selected category display
  const loadCategories = async () => {
    if (categoriesLoaded || loadingCategories) return;

    setLoadingCategories(true);
    try {
      // Use the public categories API (no auth required)
      const response = await categoriesApi.getPublicCategories({
        status: 'active', // Only get active categories for article form
        limit: 100, // Get all categories for dropdown
        sortBy: 'name',
        sortOrder: 'asc'
      });

      if (response.status === 'success') {
        setCategories(response.data.categories || []);
        setCategoriesLoaded(true);
      } else {
        console.error('Failed to load categories:', response.message);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoadingCategories(false);
    }
  };

  // Load categories when component mounts to show selected categories immediately
  useEffect(() => {
    loadCategories();
  }, []);

  const handleCategoryDropdownToggle = () => {
    if (!categoryDropdownOpen) {
      loadCategories();
    }
    setCategoryDropdownOpen(!categoryDropdownOpen);
  };

  const handleCategorySelect = (selectedCategoryId: string) => {
    let newCategoryIds: string[];

    if (categoryIds.includes(selectedCategoryId)) {
      // Remove category if already selected
      newCategoryIds = categoryIds.filter(id => id !== selectedCategoryId);
    } else {
      // Add category if not selected
      newCategoryIds = [...categoryIds, selectedCategoryId];
    }

    // Debug: Log category selection changes
    console.log('📂 Category selection changed:', {
      selectedCategoryId,
      previousCategories: categoryIds,
      newCategories: newCategoryIds,
      action: categoryIds.includes(selectedCategoryId) ? 'removed' : 'added'
    });

    onCategoryChange(newCategoryIds);
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      onTagsChange([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove));
  };

  const handleAddExistingTag = (tag: string) => {
    if (!tags.includes(tag)) {
      onTagsChange([...tags, tag]);
    }
  };

  const selectedCategories = categories.filter(cat => categoryIds.includes(cat.id));

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 shadow-sm">
      <div className="flex items-center space-x-2 mb-6">
        <div className="p-2 bg-green-100 rounded-lg">
          <FolderOpen size={20} className="text-green-600" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Danh mục và thẻ</h2>
      </div>

      <div className="space-y-6">
        {/* Category Selection */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
            <FolderOpen size={16} className="text-green-500" />
            <span>Danh mục</span>
            <span className="text-red-500">*</span>
          </label>

          {/* Selected Categories Display */}
          {selectedCategories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {selectedCategories.map((category) => (
                <span
                  key={category.id}
                  className="inline-flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                >
                  <span>{category.name}</span>
                  <button
                    type="button"
                    onClick={() => handleCategorySelect(category.id)}
                    className="hover:bg-green-200 rounded-full p-0.5 transition-colors duration-200"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          )}

          <div className="relative">
            <button
              type="button"
              onClick={handleCategoryDropdownToggle}
              className={`
                w-full px-4 py-3 border rounded-lg text-left
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                transition-all duration-200 flex items-center justify-between
                ${errors.categoryIds
                  ? 'border-red-300 bg-red-50'
                  : 'border-gray-300 hover:border-gray-400'
                }
              `}
            >
              <span className={selectedCategories.length > 0 ? 'text-gray-900' : 'text-gray-500'}>
                {selectedCategories.length > 0
                  ? `${selectedCategories.length} danh mục đã chọn`
                  : 'Chọn danh mục...'
                }
              </span>
              <ChevronDown
                size={20}
                className={`text-gray-400 transition-transform duration-200 ${
                  categoryDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {categoryDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-72 overflow-y-auto">
                {loadingCategories ? (
                  <div className="p-4 text-center text-gray-500">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-600 border-t-transparent mx-auto"></div>
                    <span className="mt-2 block">Đang tải danh mục...</span>
                  </div>
                ) : (
                  <>
                    {/* Search box */}
                    <div className="sticky top-0 bg-white border-b border-gray-200 p-2">
                      <input
                        type="text"
                        value={categoryQuery}
                        onChange={(e) => setCategoryQuery(e.target.value)}
                        placeholder="Tìm kiếm danh mục..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Categories list */}
                    {filteredCategories.length > 0 ? (
                      filteredCategories.map((category) => (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => handleCategorySelect(category.id)}
                          className={`
                            w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors duration-200 flex items-center justify-between
                            ${categoryIds.includes(category.id) ? 'bg-blue-100 text-blue-700' : 'text-gray-700'}
                          `}
                        >
                          <div>
                            <div className="font-medium">{category.name}</div>
                            {category.description && (
                              <div className="text-xs text-gray-500 mt-1">{category.description}</div>
                            )}
                          </div>
                          {categoryIds.includes(category.id) && (
                            <div className="text-blue-600">✓</div>
                          )}
                        </button>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500">Không tìm thấy danh mục phù hợp</div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          {errors.categoryIds && (
            <p className="mt-1 text-sm text-red-600">{errors.categoryIds}</p>
          )}
        </div>

        {/* Tags Management */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
            <Tag size={16} className="text-purple-500" />
            <span>Thẻ bài viết</span>
          </label>

          {/* Current Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:bg-blue-200 rounded-full p-0.5 transition-colors duration-200"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* Add New Tag */}
          <div className="flex space-x-2 mb-3">
            <input
              type="text"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              placeholder="Nhập thẻ mới..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={handleAddTag}
              disabled={!newTag.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-1"
            >
              <Plus size={16} />
              <span>Thêm</span>
            </button>
          </div>

          {/* Suggested Tags */}
          <div>
            <p className="text-xs text-gray-500 mb-2">Thẻ gợi ý:</p>
            <div className="flex flex-wrap gap-2">
              {availableTags
                .filter(tag => !tags.includes(tag))
                .map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleAddExistingTag(tag)}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors duration-200"
                  >
                    {tag}
                  </button>
                ))}
            </div>
          </div>

          {errors.tags && (
            <p className="mt-1 text-sm text-red-600">{errors.tags}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleCategoryTags;
