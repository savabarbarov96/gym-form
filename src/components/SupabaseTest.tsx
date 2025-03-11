import React, { useState, useEffect } from 'react';
import { checkSupabaseConnection, createUsersTable } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle } from 'lucide-react';

const SupabaseTest: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [tableStatus, setTableStatus] = useState<'checking' | 'exists' | 'not-exists' | 'error'>('checking');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    setConnectionStatus('checking');
    try {
      const isConnected = await checkSupabaseConnection();
      if (isConnected) {
        setConnectionStatus('connected');
        checkTable();
      } else {
        setConnectionStatus('error');
        setMessage('Failed to connect to Supabase');
      }
    } catch (error) {
      setConnectionStatus('error');
      setMessage(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const checkTable = async () => {
    setTableStatus('checking');
    try {
      const result = await createUsersTable();
      if (result.success) {
        setTableStatus('exists');
        setMessage(result.message);
      } else {
        setTableStatus('not-exists');
        setMessage(result.message);
      }
    } catch (error) {
      setTableStatus('error');
      setMessage(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Supabase Connection Test</h2>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <span>Connection Status:</span>
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
          <span>Table Status:</span>
          {tableStatus === 'checking' && <span className="text-blue-500">Checking...</span>}
          {tableStatus === 'exists' && (
            <span className="text-green-500 flex items-center">
              <CheckCircle className="w-4 h-4 mr-1" /> Table Exists
            </span>
          )}
          {tableStatus === 'not-exists' && (
            <span className="text-orange-500 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" /> Table Needs Creation
            </span>
          )}
          {tableStatus === 'error' && (
            <span className="text-red-500 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" /> Error
            </span>
          )}
        </div>
        
        {message && (
          <div className="mt-4 p-3 bg-gray-100 rounded text-sm">
            {message}
          </div>
        )}
        
        <Button 
          onClick={testConnection}
          className="mt-4"
        >
          Test Connection Again
        </Button>
      </div>
    </div>
  );
};

export default SupabaseTest; 