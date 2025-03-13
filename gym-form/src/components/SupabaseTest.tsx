import React, { useState, useEffect } from 'react';
import { checkSupabaseConnection, checkRlsPolicies, saveUserData } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Database, Shield, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';

const SupabaseTest: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [rlsStatus, setRlsStatus] = useState<'checking' | 'ok' | 'error'>('checking');
  const [message, setMessage] = useState<string>('');
  const [testName, setTestName] = useState<string>('Test User');
  const [testEmail, setTestEmail] = useState<string>('test@example.com');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [saveMessage, setSaveMessage] = useState<string>('');

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    setConnectionStatus('checking');
    setMessage('');
    try {
      const isConnected = await checkSupabaseConnection();
      if (isConnected) {
        setConnectionStatus('connected');
        checkRls();
      } else {
        setConnectionStatus('error');
        setMessage('Failed to connect to Supabase');
      }
    } catch (error) {
      setConnectionStatus('error');
      setMessage(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const checkRls = async () => {
    setRlsStatus('checking');
    try {
      const result = await checkRlsPolicies();
      if (result.success) {
        setRlsStatus('ok');
        setMessage(result.message);
      } else {
        setRlsStatus('error');
        setMessage(result.message);
      }
    } catch (error) {
      setRlsStatus('error');
      setMessage(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const testSaveData = async () => {
    setSaveStatus('saving');
    setSaveMessage('');
    try {
      const result = await saveUserData(
        testName,
        testEmail,
        { test: true, timestamp: new Date().toISOString() }
      );
      
      if (result.success) {
        setSaveStatus('success');
        setSaveMessage(`Data saved successfully! ID: ${result.data?.[0]?.id || 'unknown'}`);
      } else {
        setSaveStatus('error');
        setSaveMessage(result.message);
      }
    } catch (error) {
      setSaveStatus('error');
      setSaveMessage(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Supabase Connection Test</h2>
      
      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Database className="w-5 h-5 text-blue-500" />
            <span className="font-medium">Connection Status:</span>
            {connectionStatus === 'checking' && <span className="text-blue-500">Checking...</span>}
            {connectionStatus === 'connected' && (
              <span className="text-green-500 flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" /> Connected
              </span>
            )}
            {connectionStatus === 'error' && (
              <span className="text-red-500 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" /> Error
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-blue-500" />
            <span className="font-medium">RLS Policies:</span>
            {rlsStatus === 'checking' && <span className="text-blue-500">Checking...</span>}
            {rlsStatus === 'ok' && (
              <span className="text-green-500 flex items-center">
                <CheckCircle className="w-4 h-4 mr-1" /> Configured
              </span>
            )}
            {rlsStatus === 'error' && (
              <span className="text-red-500 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" /> Error
              </span>
            )}
          </div>
        </div>
        
        {message && (
          <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
            {message}
          </div>
        )}
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium mb-3">Test Data Insertion</h3>
          
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-600 block mb-1">Name</label>
              <Input 
                value={testName} 
                onChange={(e) => setTestName(e.target.value)} 
                placeholder="Enter test name"
              />
            </div>
            
            <div>
              <label className="text-sm text-gray-600 block mb-1">Email</label>
              <Input 
                value={testEmail} 
                onChange={(e) => setTestEmail(e.target.value)} 
                placeholder="Enter test email"
              />
            </div>
            
            <Button 
              onClick={testSaveData}
              disabled={saveStatus === 'saving'}
              className="w-full"
            >
              {saveStatus === 'saving' ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                <span className="flex items-center">
                  <Send className="w-4 h-4 mr-2" />
                  Test Save Data
                </span>
              )}
            </Button>
            
            {saveStatus !== 'idle' && saveMessage && (
              <div className={`mt-2 p-2 rounded text-sm ${saveStatus === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {saveMessage}
              </div>
            )}
          </div>
        </div>
        
        <Button 
          onClick={testConnection}
          variant="outline"
          className="mt-4"
        >
          Test Connection Again
        </Button>
      </div>
    </div>
  );
};

export default SupabaseTest; 