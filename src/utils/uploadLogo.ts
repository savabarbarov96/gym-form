import { supabase } from '@/lib/supabase';
import fs from 'fs';
import path from 'path';

/**
 * Uploads the RM Gym logo to the Supabase storage bucket
 */
async function uploadLogo() {
  try {
    // Path to the logo file
    const logoPath = path.resolve(__dirname, '../../src/images/rm-gym-logo.png');
    
    // Read the file
    const fileBuffer = fs.readFileSync(logoPath);
    
    // Convert buffer to Blob/File
    const file = new File([fileBuffer], 'rm-gym-logo.png', { type: 'image/png' });
    
    // Upload to Supabase
    const { data, error } = await supabase.storage
      .from('blog-images')
      .upload('rm-gym-logo.png', file, {
        upsert: true,
        cacheControl: '3600',
      });
    
    if (error) {
      console.error('Error uploading logo:', error);
      return;
    }
    
    // Get the public URL
    const { data: urlData } = supabase.storage
      .from('blog-images')
      .getPublicUrl('rm-gym-logo.png');
    
    console.log('Logo uploaded successfully!');
    console.log('Public URL:', urlData.publicUrl);
    
    return urlData.publicUrl;
  } catch (error) {
    console.error('Exception when uploading logo:', error);
  }
}

// Execute the upload
uploadLogo()
  .then(url => {
    if (url) {
      console.log('Logo is now available at:', url);
    }
  })
  .catch(err => {
    console.error('Failed to upload logo:', err);
  }); 