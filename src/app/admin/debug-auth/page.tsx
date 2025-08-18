/**
 * Debug Authentication Page
 * Trang debug để kiểm tra authentication state
 */

'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getStoredUser, getStoredToken, getStoredRefreshToken } from '@/lib/api/auth';

const DebugAuthPage: React.FC = () => {
  const authContext = useAuth();

  const handleClearStorage = () => {
    localStorage.clear();
    window.location.reload();
  };

  const storedUser = getStoredUser();
  const storedToken = getStoredToken();
  const storedRefreshToken = getStoredRefreshToken();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          🔍 Authentication Debug
        </h1>

        {/* Auth Context State */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            📊 Auth Context State
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Is Authenticated
              </label>
              <div className={`px-3 py-2 rounded ${
                authContext.isAuthenticated ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {authContext.isAuthenticated ? '✅ True' : '❌ False'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Is Loading
              </label>
              <div className={`px-3 py-2 rounded ${
                authContext.isLoading ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {authContext.isLoading ? '⏳ True' : '✅ False'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Error
              </label>
              <div className={`px-3 py-2 rounded ${
                authContext.error ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {authContext.error || 'None'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                User Role
              </label>
              <div className="px-3 py-2 rounded bg-blue-100 text-blue-800">
                {authContext.user?.role || 'None'}
              </div>
            </div>
          </div>
        </div>

        {/* User Data */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            👤 User Data (Context)
          </h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(authContext.user, null, 2)}
          </pre>
        </div>

        {/* Stored Data */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            💾 Stored Data (localStorage)
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stored User
              </label>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                {JSON.stringify(storedUser, null, 2)}
              </pre>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Access Token
              </label>
              <div className="bg-gray-100 p-4 rounded text-sm break-all">
                {storedToken ? `${storedToken.substring(0, 50)}...` : 'None'}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Refresh Token
              </label>
              <div className="bg-gray-100 p-4 rounded text-sm break-all">
                {storedRefreshToken ? `${storedRefreshToken.substring(0, 50)}...` : 'None'}
              </div>
            </div>
          </div>
        </div>

        {/* localStorage Raw Data */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            🗄️ Raw localStorage Data
          </h2>
          <div className="space-y-2">
            {Object.keys(localStorage).map(key => (
              <div key={key} className="flex">
                <span className="font-medium text-gray-700 w-48">{key}:</span>
                <span className="text-gray-600 break-all">
                  {localStorage.getItem(key)?.substring(0, 100)}
                  {(localStorage.getItem(key)?.length || 0) > 100 ? '...' : ''}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            🔧 Actions
          </h2>
          <div className="space-x-4">
            <button
              onClick={handleClearStorage}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Clear All Storage
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Reload Page
            </button>
            <button
              onClick={() => authContext.logout()}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebugAuthPage;
