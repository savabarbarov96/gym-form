import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabaseUrl = 'https://dagnscrjrktrrspyamwu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhZ25zY3Jqcmt0cnJzcHlhbXd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg0MzA4NTQsImV4cCI6MjA1NDAwNjg1NH0.UXEhZJmX3wWPNMEMaxoxU_G2o0EURgjW12nsTlNePJc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Function to check Supabase connection
export async function checkSupabaseConnection(): Promise<boolean> {
  try {
    const { data, error } = await supabase.from('_dummy_query').select('*').limit(1);
    
    // If we get an error about the table not existing, that's fine - it means we're connected
    if (error && error.code === '42P01') {
      console.log('Supabase connection successful');
      return true;
    }
    
    if (error) {
      console.error('Error connecting to Supabase:', error);
      return false;
    }
    
    console.log('Supabase connection successful');
    return true;
  } catch (error) {
    console.error('Exception when connecting to Supabase:', error);
    return false;
  }
}

// Function to create the users table if it doesn't exist
export async function createUsersTable(): Promise<{ success: boolean; message: string }> {
  try {
    // Check if the table exists
    const { data: tableExists, error: tableCheckError } = await supabase
      .from('form_submissions')
      .select('*')
      .limit(1);
    
    // If we get a specific error about the table not existing, create it
    if (tableCheckError && tableCheckError.code === '42P01') {
      // Table doesn't exist, so we need to create it
      // Note: In Supabase, we typically create tables through the dashboard
      // This is a workaround to check if we can access the table
      
      console.log('Table does not exist. Please create it in the Supabase dashboard with the following SQL:');
      console.log(`
        CREATE TABLE form_submissions (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          submission_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          form_data JSONB
        );
      `);
      
      return { 
        success: false, 
        message: 'Table does not exist. Please create it in the Supabase dashboard.' 
      };
    }
    
    if (tableCheckError) {
      console.error('Error checking if table exists:', tableCheckError);
      return { 
        success: false, 
        message: `Error checking if table exists: ${tableCheckError.message}` 
      };
    }
    
    return { 
      success: true, 
      message: 'Table exists and is accessible' 
    };
  } catch (error) {
    console.error('Exception when creating table:', error);
    return { 
      success: false, 
      message: `Exception when creating table: ${error instanceof Error ? error.message : String(error)}` 
    };
  }
}

// Function to save user data
export async function saveUserData(
  name: string,
  email: string,
  formData?: any
): Promise<{ success: boolean; message: string }> {
  try {
    const { data, error } = await supabase
      .from('form_submissions')
      .insert([
        { 
          name, 
          email, 
          submission_date: new Date().toISOString(),
          form_data: formData || {}
        }
      ]);
    
    if (error) {
      console.error('Error saving user data:', error);
      return { 
        success: false, 
        message: `Error saving user data: ${error.message}` 
      };
    }
    
    return { 
      success: true, 
      message: 'User data saved successfully' 
    };
  } catch (error) {
    console.error('Exception when saving user data:', error);
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
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        upsert: true,
        cacheControl: '3600',
      });

    if (error) {
      console.error('Error uploading file:', error);
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    console.error('Exception when uploading:', error);
    return { data: null, error };
  }
}

// Function to get a public URL for a file in a Supabase bucket
export function getPublicUrl(bucket: string, path: string): string {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
} 