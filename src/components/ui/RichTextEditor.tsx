/**
 * Rich Text Editor Component
 * Integrates TinyMCE for a full-featured editing experience with image uploads.
 */

'use client';

import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import toast from 'react-hot-toast';

// Define the type for the blobInfo object provided by TinyMCE's upload handler
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
        const errorData = await response.json();
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
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'help', 'wordcount', 'codesample', 'powerpaste'
        ],
        toolbar:
          'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | image link | codesample | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',

        // Image Upload Configuration
        image_uploadtab: true, // Ensure the Upload tab is visible
        automatic_uploads: true,
        images_upload_handler: imageUploadHandler,
        paste_data_images: false, // Optional: Disable drag-drop if you only want the button
      }}
    />
  );
};

export default RichTextEditor;
