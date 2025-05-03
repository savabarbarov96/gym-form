import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = 'https://dagnscrjrktrrspyamwu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhZ25zY3Jqcmt0cnJzcHlhbXd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg0MzA4NTQsImV4cCI6MjA1NDAwNjg1NH0.UXEhZJmX3wWPNMEMaxoxU_G2o0EURgjW12nsTlNePJc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Enable debug mode for development
const DEBUG = false;

// Helper function for logging
const logDebug = (message: string, data?: any) => {
  // Debug logging removed for production
};

// Function to check Supabase connection
export async function checkSupabaseConnection(): Promise<boolean> {
  try {
    logDebug('Checking Supabase connection...');
    const { data, error } = await supabase.from('form_submissions').select('id').limit(1);
    
    if (error) {
      return false;
    }
    
    logDebug('Supabase connection successful', data);
    return true;
  } catch (error) {
    return false;
  }
}

// Function to check if RLS policies are set up correctly
export async function checkRlsPolicies(): Promise<{ success: boolean; message: string }> {
  try {
    logDebug('Testing RLS policies with an insert...');
    
    // Try to insert a test record
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      submission_date: new Date().toISOString(),
      form_data: { test: true }
    };
    
    const { data, error } = await supabase
      .from('form_submissions')
      .insert([testData])
      .select();
    
    if (error) {
      return {
        success: false,
        message: `RLS policy test failed: ${error.message}. Code: ${error.code}`
      };
    }
    
    // If successful, delete the test record
    if (data && data.length > 0) {
      const id = data[0].id;
      logDebug('Test record created successfully, cleaning up...', id);
      
      const { error: deleteError } = await supabase
        .from('form_submissions')
        .delete()
        .eq('id', id);
    }
    
    return {
      success: true,
      message: 'RLS policies are configured correctly'
    };
  } catch (error) {
    return {
      success: false,
      message: `Exception when testing RLS policies: ${error instanceof Error ? error.message : String(error)}`
    };
  }
}

// Function to save user data to form_submissions table
export async function saveUserData(
  name: string,
  email: string,
  formData: any
): Promise<{ success: boolean; message: string; data?: any }> {
  try {
    // Validate inputs
    if (!name || !email) {
      return {
        success: false,
        message: 'Name and email are required'
      };
    }

    logDebug('Saving user data to Supabase...', { name, email });
    
    // Prepare the data to insert
    const dataToInsert = { 
      name, 
      email, 
      submission_date: new Date().toISOString(),
      form_data: formData
    };
    
    logDebug('Data to insert:', dataToInsert);

    // Insert data into form_submissions table
    const { data, error } = await supabase
      .from('form_submissions')
      .insert([dataToInsert])
      .select();
    
    if (error) {
      return { 
        success: false, 
        message: `Error saving user data: ${error.message}. Code: ${error.code}` 
      };
    }
    
    logDebug('User data saved successfully', data);
    
    return { 
      success: true, 
      message: 'User data saved successfully',
      data
    };
  } catch (error) {
    return { 
      success: false, 
      message: `Exception when saving user data: ${error instanceof Error ? error.message : String(error)}` 
    };
  }
}

// Function to upload a file to a Supabase bucket
export async function uploadToSupabase(
  file: File,
  bucket: string,
  path: string
): Promise<{ data: any; error: any }> {
  try {
    logDebug(`Uploading file to ${bucket}/${path}...`);
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        upsert: true,
        cacheControl: '3600',
      });

    if (error) {
      return { data: null, error };
    }

    logDebug('File uploaded successfully', data);
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

// Function to get a public URL for a file in a Supabase bucket
export function getPublicUrl(bucket: string, path: string): string {
  logDebug(`Getting public URL for ${bucket}/${path}...`);
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  logDebug('Public URL:', data.publicUrl);
  return data.publicUrl;
} 