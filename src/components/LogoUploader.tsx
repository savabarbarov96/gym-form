import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const LogoUploader: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    uploadLogo();
  }, []);

  const uploadLogo = async () => {
    try {
      setUploading(true);
      setError(null);

      // Fetch the logo file
      const response = await fetch('/rm-gym-logo.png');
      if (!response.ok) {
        throw new Error('Failed to fetch logo file');
      }
      
      const blob = await response.blob();
      const file = new File([blob], 'rm-gym-logo.png', { type: 'image/png' });

      // Upload to Supabase
      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload('rm-gym-logo.png', file, {
          upsert: true,
          cacheControl: '3600',
        });

      if (uploadError) {
        throw new Error(`Upload error: ${uploadError.message}`);
      }

      // Get the public URL
      const { data } = supabase.storage
        .from('blog-images')
        .getPublicUrl('rm-gym-logo.png');

      setUploadedUrl(data.publicUrl);
      console.log('Logo uploaded successfully!', data.publicUrl);
    } catch (err) {
      console.error('Error uploading logo:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 bg-card rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Logo Uploader</h2>
      
      {uploading && <p>Uploading logo to Supabase...</p>}
      
      {error && (
        <div className="text-red-500 mb-4">
          <p>Error: {error}</p>
          <button 
            onClick={uploadLogo}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry Upload
          </button>
        </div>
      )}
      
      {uploadedUrl && (
        <div className="mt-4">
          <p className="text-green-500 mb-2">Logo uploaded successfully!</p>
          <div className="flex items-center gap-4">
            <img src={uploadedUrl} alt="Uploaded Logo" className="h-12" />
            <p className="text-sm break-all">{uploadedUrl}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoUploader; 