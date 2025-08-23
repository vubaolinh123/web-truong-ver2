/**
 * Rich Text Editor Component
 * Integrates TinyMCE for a full-featured editing experience with image uploads.
 *
 * This component is configured to reliably display the "Upload" tab in TinyMCE's
 * image dialog by using the images_upload_handler approach as recommended by
 * the official TinyMCE documentation.
 */

'use client';

import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import toast from 'react-hot-toast';

// Simple interface for TinyMCE's blobInfo object - contains only necessary properties
interface TinyMceBlobInfo {
  blob: () => Blob;
  filename: () => string;
}

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
  minHeight = 500
}) => {

  /**
   * Image Upload Handler
   * This function is the core mechanism that enables the "Upload" tab in TinyMCE's image dialog.
   * It handles the actual upload process and returns the URL of the uploaded image.
   */
  const imageUploadHandler = async (blobInfo: TinyMceBlobInfo): Promise<string> => {
    const file = new File([blobInfo.blob()], blobInfo.filename(), { type: blobInfo.blob().type });

    try {
      const formData = new FormData();
      formData.append('image', file);
      const token = localStorage.getItem('adminToken');

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/images/upload`, {
        method: 'POST',
        headers: { ...(token && { Authorization: `Bearer ${token}` }) },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      if (!json || typeof json.location !== 'string') {
        throw new Error('Phản hồi JSON không hợp lệ từ máy chủ.');
      }

      const baseUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api').replace(/\/api\/?$/, '');
      const absoluteUrl = `${baseUrl}${json.location}`;

      toast.success('Tải ảnh lên thành công!');
      return absoluteUrl;

    } catch (error: unknown) {
      let errorMessage = 'Không thể tải ảnh lên.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(`Lỗi tải ảnh: ${errorMessage}`);
      throw new Error(errorMessage);
    }
  };

  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
      value={value}
      onEditorChange={(newValue) => onChange(newValue)}
      disabled={disabled}
      init={{
        min_height: minHeight,
        placeholder,

        // Essential plugins - 'image' plugin is required for upload functionality
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'help', 'wordcount', 'codesample', 'powerpaste'
        ],

        // Toolbar with explicit image button to access upload functionality
        toolbar:
          'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | image link | codesample | help',

        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',

        // ===== IMAGE UPLOAD CONFIGURATION =====
        // These settings ensure the "Upload" tab appears reliably in the image dialog

        // Explicitly enable the Upload tab in image dialog (this is the key setting)
        image_uploadtab: true,

        // Enable automatic uploads when images are inserted
        automatic_uploads: true,

        // Core upload handler - this function enables the Upload tab functionality
        images_upload_handler: imageUploadHandler,

        // Additional upload settings for reliability
        images_upload_credentials: false, // Avoid CORS issues
        images_reuse_filename: false,     // Generate unique filenames

        // Control drag-and-drop behavior (set to false to only allow button uploads)
        paste_data_images: false,
      }}
    />
  );
};

export default RichTextEditor;
