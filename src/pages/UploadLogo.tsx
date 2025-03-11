import React from 'react';
import LogoUploader from '@/components/LogoUploader';

const UploadLogoPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Upload Logo to Supabase</h1>
      <LogoUploader />
    </div>
  );
};

export default UploadLogoPage; 